define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("Entities", function(Entities, GeneralAssemblyApp, Backbone, Marionette, $, _){
    Entities.members_url = Entities.api_base + "members/";

    Entities.Member = Backbone.Model.extend({
      urlRoot: Entities.members_url,
      initialize: function() {
        // Create tooltip info string
        var tooltipInfo = this.get("full_name") + ", " + this.get("district_address_city");
        if ( this.get("title") !== null ) {
          tooltipInfo += ", " + this.get("title");
        }
        this.set("tooltip_info", tooltipInfo);
      }
    });

    Entities.MembersCollection = Backbone.Collection.extend({
      model: Entities.Member,
      url: Entities.members_url,
      comparator: function(member) {
        return ( (member.get("district_type") === "House" ? "A" : "B") + _.string.sprintf('%03s', member.get("district_number")) );
      },
      criterion: {}
    });

    Entities.MemberCommittee = Backbone.Model.extend();
    Entities.MemberCommittees = Backbone.Collection.extend({
      initialize: function(id) {
        this.url = Entities.members_url + id + '/committees';
      },
      model: Entities.MemberCommittee
    });

    Entities.MemberBill = Backbone.Model.extend();
    Entities.MemberBills = Backbone.Collection.extend({
      initialize: function(id) {
        this.url = GeneralAssemblyApp.api_base + "members/" + id + '/bills';
      },
      model: Entities.MemberBill
    });

    Entities.MemberVote = Backbone.Model.extend({
      initialize: function() {
        this.set("vote_date", new Date(this.get("vote_date")));
      }
    });
    Entities.MemberVotes = Backbone.Collection.extend({
      initialize: function(id) {
        this.url = Entities.members_url+ id + '/votes';
      },
      model: Entities.MemberVote
    });

    var API = {
      getMembers: function() {
        var defer = $.Deferred();
        if (! Entities.members || Entities.members.length === 0) {
          Entities.members = new Entities.MembersCollection();
          Entities.members.fetch({
            dataType: "jsonp",
            success: function(data) {
              defer.resolve(data);
            }
          });
          return defer.promise();
        } else {
          return Entities.members;
        }
      },

      getMember: function(memberId) {
        // var member = Entities.members.where({id: memberId})[0];
        var defer = $.Deferred();
        var member = new Entities.Member({id: memberId});
        member.fetch({
          dataType: "jsonp",
          success: function(data) {
            defer.resolve(data);
          }
        });
        return defer.promise();
      },

      getMemberBills: function(id) {
        var defer = $.Deferred();
        Entities.memberBills = new Entities.MemberBills(id);
        Entities.memberBills.fetch({
          dataType: "jsonp",
          success: function(data) {
            defer.resolve(data);
          }
        });
        return defer.promise();
      },

      getMemberCommittees: function(id) {
        var defer = $.Deferred();
        Entities.memberCommittees = new Entities.MemberCommittees(id);
        Entities.memberCommittees.fetch({
          dataType: "jsonp",
          success: function(data) {
            defer.resolve(data);
          }
        });
        return defer.promise();
      }
    };

    GeneralAssemblyApp.reqres.setHandler("members:collection", function() {
      return API.getMembers();
    });

    GeneralAssemblyApp.reqres.setHandler("members:member", function(id) {
      return API.getMember(id);
    });

    GeneralAssemblyApp.reqres.setHandler("member:bills", function(id) {
      return API.getMemberBills(id);
    });

    GeneralAssemblyApp.reqres.setHandler("member:committees", function(id) {
      return API.getMemberCommittees(id);
    });
  });

  return ;
});
