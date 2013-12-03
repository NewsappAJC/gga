define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("WatchedBillsApp.Show.View", function(View, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    View.CategoryLayout = Marionette.Layout.extend({
      template: "#show-category-layout",
      regions: {
        headlineRegion: "#headline-region",
        billListRegion: "#watched-bill-list"
      }
    });

    View.CategoryHeadlineView = Marionette.ItemView.extend({
      template: "#category-headline-template"
    });

    View.CategoryItemView = Marionette.ItemView.extend({
      template: "#category-item-template",
      tagName: "li",
      className: "list-group-item"
    });

    View.CategoryCollectionView = Marionette.CollectionView.extend({
      itemView: View.CategoryItemView,
      tagName: "ui",
      className: "list-group"
    });
  });
  return GeneralAssemblyApp.WatchedBillsApp.Show.View;
});
