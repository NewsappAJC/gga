define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("MembersApp.List.View", function(View, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    View.MembersLayout = Marionette.Layout.extend({
      template: "#member-list-layout",
      regions: {
        membersRegion: "#member-browse-region",
        mapRegion: "#map-region"
      }
    });

    View.MemberBrowseLayout = Marionette.Layout.extend({
      template: "#member-browse-layout",
      regions: {
        panelRegion: "#panel-region",
        membersRegion: "#members-region"
      }
    });

    View.MapView = Marionette.ItemView.extend({
      template:"#map-template",
      onShow:function(){
        $(document).tooltip({predelay:0,cancelDefault:!0});
      }
    });

    View.MemberPanel = Marionette.ItemView.extend({
      template: "#member-list-panel",
      className: "container",
      events: {
        "click .btn-filter": "filterMembers"
      },

      filterMembers: function(e) {
        e.preventDefault();
        console.log(e.currentTarget);
        $(e.currentTarget).siblings().removeClass("btn-filter-default");
        $(e.currentTarget).addClass("btn-filter-default");

        var key = $(e.currentTarget).parent().attr("id").match(/filter-(.*)$/)[1];
        var val = $(e.currentTarget).attr("id").match(/filter-(.*)$/)[1];
        var criterion = {};
        criterion[key] = val;
        this.trigger("members:filter", criterion);
      },

      onSetFilterCriterion: function(criterion) {
        $(".filter").removeClass("btn-filter-default");

        if (! criterion.party) {
          $("#filter-party").children("#filter-all-parties").addClass("btn-filter-default");
        } else {
          $("#filter-" + criterion.party).addClass("btn-filter-default");
        }

        if (! criterion.district_type) {
          $("#filter-district_type").children("#filter-all-districtTypes").addClass("btn-filter-default");
        } else {
          $("#filter-" + criterion.district_type).addClass("btn-filter-default");
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
          } if ((navPos.top+jumboHeight) >= offset){
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
