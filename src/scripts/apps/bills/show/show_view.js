GeneralAssemblyApp.module("BillsApp.Show", function(Show, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  Show.BillLayout = Marionette.Layout.extend({
    template: "#bill-detail-layout",
    className: "container",
    regions: {
      billRegion: "#bill-region",
      authorRegion: "#author-region",
      coauthorsRegion: "#coauthors-region",
      statusRegion: "#status-region",
      versionRegion: "#version-region"
    }
  });

  Show.BillView = Marionette.ItemView.extend({
    template: "#bill-detail-template",
    className: "panel panel-default"
  });

  // Bill author views
  Show.AuthorView = Marionette.ItemView.extend({
    tagName: "li",
    className: function() {
      return "media " + this.model.get("party")
    },
    template: "#bill-author-template"
  });
  Show.AuthorsView = Marionette.CompositeView.extend({
    itemView: Show.AuthorView,
    template: "#bill-author-list",
    itemViewContainer: "#bill-authors"
  });

  // Bill status views
  Show.StatusView = Marionette.ItemView.extend({
    tagName: "li",
    className: "list-group-item",
    template: "#bill-status-template"
  });
  Show.StatusListingsView = Marionette.CollectionView.extend({
    itemView: Show.StatusView,
    tagName: "ul",
    className: "list-group"
  });

  // Bill version views
  Show.VersionView = Marionette.ItemView.extend({
    tagName: "li",
    className: "list-group-item",
    template: "#bill-version-template"
  });
  Show.VersionsListingView = Marionette.CollectionView.extend({
    itemView: Show.VersionView,
    tagName: "ul",
    className: "list-group"
  });
});
