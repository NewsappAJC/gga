GeneralAssemblyApp.module("WatchedBillsApp.Show", function(Show, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  Show.CategoryLayout = Marionette.Layout.extend({
    template: "#show-category-layout",
    regions: {
      headlineRegion: "#headline-region",
      billListRegion: "#watched-bill-list"
    }
  });

  Show.CategoryHeadlineView = Marionette.ItemView.extend({
    template: "#category-headline-template"
  });

  Show.CategoryItemView = Marionette.ItemView.extend({
    template: "#category-item-template",
    tagName: "li",
    className: "list-group-item"
  });

  Show.CategoryCollectionView = Marionette.CollectionView.extend({
    itemView: Show.CategoryItemView,
    tagName: "ui",
    className: "list-group"
  });
});
