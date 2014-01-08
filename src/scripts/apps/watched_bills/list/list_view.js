define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("WatchedBillsApp.List.View", function(View, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    View.CategoriesLayout = Marionette.Layout.extend({
      template: "#bill-category-layout",
      regions: {
        categoriesRegion: "#bill-category-region",
        billsCountRegion: "#bills-count-region"
      }
    });

    View.CategoryView = Marionette.ItemView.extend({
      template: "#bill-category-template",
      className: "watched-bill-icon"
    });

    View.CategoriesView = Marionette.CollectionView.extend({
      itemView: View.CategoryView,
      className: "container"
    });
  });
  return GeneralAssemblyApp.WatchedBillsApp.List.View;
});
