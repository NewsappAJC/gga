GeneralAssemblyApp.module("Entities", function(Entities, GeneralAssemblyApp, Backbone, Marionette, $, _){
  Entities.Member = Backbone.Model.extend({
    initialize: function() {
      // Create proper full name string
      var fullName = this.get("name_first");
      if (this.get("name_middle")) {
        fullName += " " + this.get("name_middle");
      }
      if (this.get("name_nickname")) {
        fullName += " '" + this.get("name_nickname") + "'";
      }
      fullName += " " + this.get("name_last");
      this.set("full_name", fullName);

      // Create tooltip info string
      var tooltipInfo = this.get("full_name") + ", " + this.get("district_address_city");
      if ( this.get("title") !== "" ) {
        tooltipInfo += ", " + this.get("title");
      }
      this.set("tooltip_info", tooltipInfo);
    }
  });

  Entities.MembersCollection = Backbone.Collection.extend({
    model: Entities.Member,
    url: "http://localhost:3000/members/",
    comparator: function(member) {
      return ( (member.get("district_type") === "House" ? "A" : "B") + _.string.sprintf('%03s', member.get("district_number")) );
    },
    criterion: {}
  });

  var API = {
    getMembers: function() {
      if (! Entities.members) {
        Entities.members = new Entities.MembersCollection();
        var defer = $.Deferred();
        Entities.members.fetch({
          success: function(data) {
            defer.resolve(data);
          }
        });
      }
      return defer.promise();
    }
  };

  GeneralAssemblyApp.reqres.setHandler("members:collection", function() {
    return API.getMembers();
  });
});
