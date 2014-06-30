define(["app"], function(GeneralAssemblyApp) {
  "use strict";

  GeneralAssemblyApp.module("MembersApp.List.View", function(View, GeneralAssemblyApp, Backbone, Marionette, $) {
    View.MemberLayout = Marionette.Layout.extend({
      template: "#member-list-layout",
      regions: {
        panelRegion: "#panel-region",
        membersRegion: "#members-region"
      }
    });

    View.MemberPanel = Marionette.ItemView.extend({
      template: "#member-list-panel",
      className: "container",
      events: {
        "click .filter": "filterMembers"
      },

      filterMembers: function(e) {
        e.preventDefault();
        $(e.currentTarget).siblings().removeClass("btn-default");
        $(e.currentTarget).addClass("btn-default");

        var key = $(e.currentTarget).parent().attr("id").match(/filter-(.*)$/)[1];
        var val = $(e.currentTarget).attr("id").match(/filter-(.*)$/)[1];
        var criterion = {};
        criterion[key] = val;
        this.trigger("members:filter", criterion);
      },

      onSetFilterCriterion: function(criterion) {
        $(".filter").removeClass("btn-default");

        if (! criterion.party) {
          $("#filter-party").children("#filter-all-parties").addClass("btn-default");
        } else {
          $("#filter-" + criterion.party).addClass("btn-default");
        }

        if (! criterion.district_type) {
          $("#filter-district_type").children("#filter-all-districtTypes").addClass("btn-default");
        } else {
          $("#filter-" + criterion.district_type).addClass("btn-default");
        }
      },

      onShow: function() {
        $(document).tooltip({
          items: "div.member",
          predelay: 0,
          cancelDefault: true,
          position: {
            my: "center bottom",
            at: "center top",
            collision: "flipfit"
          }
        });

        $(window).scroll(function(){
          var navPos = $('#member-jumbotron').offset();
          var jumboHeight = $('#member-jumbotron').height()+100;
          var offset = $(window).scrollTop();

          if ((navPos.top+jumboHeight) < offset){
            $('#panel-region').addClass('fixed');
            $('#members-region').css({'margin-top':'50px'});
          }
          if ((navPos.top+jumboHeight) >= offset){
            $('#members-region').css({'margin-top':'0px'});
            $('#panel-region').removeClass('fixed');
          }
        });
      }
    });

    View.Member = Marionette.ItemView.extend({
      template: "#member-icon-template",
      events: {
        "click div.js-show-member-detail": "showMemberDetail"
      },

      showMemberDetail: function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.trigger("member:show", this.model.id);
      }
    });

    View.Members = Marionette.CollectionView.extend({
      itemView: View.Member
    });
  });
  return GeneralAssemblyApp.MembersApp.List.View;
});
