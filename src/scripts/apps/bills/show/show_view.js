GeneralAssemblyApp.module("BillsApp.Show", function(Show, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  Show.BillLayout = Marionette.Layout.extend({
    template: "#bill-detail-layout",
    className: "container",
    regions: {
      billRegion: "#bill-region",
      authorRegion: "#author-region",
      coauthorsRegion: "#coauthors-region",
      statusRegion: "#status-region"
    }
  });

  Show.BillView = Marionette.ItemView.extend({
    template: "#bill-detail-template",
    className: "panel panel-default"
  });

  Show.AuthorView = Marionette.ItemView.extend({
    tagName: "li",
    className: "media",
    template: "#bill-author-template"
  });

  Show.AuthorsView = Marionette.CompositeView.extend({
    itemView: Show.AuthorView,
    template: "#bill-author-list",
    itemViewContainer: "#bill-authors"
  });

  Show.StatusView = Marionette.ItemView.extend({
    tagName: "li",
    template: "#bill-status-template"
  });

  Show.StatusListingsView = Marionette.CompositeView.extend({
    itemView: Show.StatusView,
    template: "#bill_status_listings_template",
    itemViewContainer: "#bill_statuses"
  });
});
