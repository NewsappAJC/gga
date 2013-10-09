GeneralAssemblyApp.module("MembersApp.Show", function(Show, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  Show.Layout = Marionette.Layout.extend({
    template: "#member-show-layout",
    regions: {
      detailRegion: "#detail-region",
      topContributorsRegion: "#top-contributors-region",
      committeesRegion: "#committee-list-region",
      billsListRegion: "#bills-list-region"
    }
  });

  Show.Detail = Marionette.ItemView.extend({
    template: "#member-detail-template",

    onShow: function() {
      $(".accordion").accordion({
        heightStyle: "content",
        collapsible: true,
        active: false
      });
    }
  });

  Show.TopContributor = Marionette.ItemView.extend({
    tagName: 'tr',
    template: "#top-contributor-template"
  });

  Show.TopContributors = Marionette.CompositeView.extend({
    tagName: 'table',
    className: "dataTable table table-hover",
    id: "top-contributors-table",
    itemView: Show.TopContributor,
    template: "#top-contributors-table-template",
    itemViewContainer: "tbody",

    onShow: function() {
      $("#top-contributors-table").dataTable({
        "sPaginationType": "two_button"
      });
    }
  });

  Show.Committee = Marionette.ItemView.extend({
    tagName: 'tr',
    template: "#committee-template"
  });

  Show.Committees = Marionette.CompositeView.extend({
    tagName: 'table',
    className: "table table-hover",
    id: "committee-list",
    itemView: Show.Committee,
    template: "#committees-table-template",
    itemViewContainer: "tbody"
  });

  Show.Bill = Marionette.ItemView.extend({
    template: "#bill-template"
  });

  Show.Bills = Marionette.CollectionView.extend({
    itemView: Show.Bill
  })
});
