define(["app"], function(GeneralAssemblyApp){
  GeneralAssemblyApp.module("MembersApp.Show.View", function(View, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    View.Layout = Marionette.Layout.extend({
      template: "#member-show-layout",
      regions: {
        detailRegion: "#detail-region",
        topContributorsRegion: "#top-contributors-region",
        committeesRegion: "#committee-list-region",
        billsListRegion: "#bills-list-region",
        votesRegion: "#vote-list-region",
        districtRegion: "#district-region"
      }
    });

    View.Detail = Marionette.ItemView.extend({
      template: "#member-detail-template",

      onShow: function() {
        $(".accordion").accordion({
          heightStyle: "content",
          collapsible: true,
          active: false
        });
      }
    });

    View.TopContributor = Marionette.ItemView.extend({
      tagName: 'tr',
      template: "#top-contributor-template"
    });
    View.TopContributors = Marionette.CompositeView.extend({
      tagName: 'table',
      className: "dataTable table table-hover table-condensed",
      id: "top-contributors-table",
      itemView: View.TopContributor,
      template: "#top-contributors-table-template",
      itemViewContainer: "tbody",

      onShow: function() {
        $("#top-contributors-table").dataTable({
          "sPaginationType": "two_button"
        });
      }
    });

    View.Committee = Marionette.ItemView.extend({
      tagName: 'tr',
      template: "#committee-template"
    });
    View.Committees = Marionette.CompositeView.extend({
      tagName: 'table',
      className: "table table-hover",
      id: "committee-list",
      itemView: View.Committee,
      template: "#committees-table-template",
      itemViewContainer: "tbody"
    });

    View.Bill = Marionette.ItemView.extend({
      template: "#bill-compact-template"
    });
    View.Bills = Marionette.CollectionView.extend({
      itemView: View.Bill
    });

    View.Vote = Marionette.ItemView.extend({
      template: "#member-vote-template",
      tagName: "tr",
      className: "member-vote"
    });
    View.Votes = Marionette.CompositeView.extend({
      itemView: View.Vote,
      tagName: "table",
      className: "table table-hover table-condensed",
      id: "vote-list",
      template: "#member-vote-list-template",
      itemViewContainer: "tbody",

      onShow: function() {
        $("#vote-list").dataTable({
          "bFilter": false,
          "bSort": false,
          "sPaginationType": "two_button"
        });
      }
    });

    View.District = Marionette.ItemView.extend({
      template: "#member-district-template"
    });
  });
  return GeneralAssemblyApp.MembersApp.Show.View;
});
