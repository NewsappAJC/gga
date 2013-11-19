GeneralAssemblyApp.module("WatchedBillsApp.List", function(List, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  List.CategoriesLayout = Marionette.Layout.extend({
    template: "#bill-category-layout",
    regions: {
      categoriesRegion: "#bill-category-region",
      billsCountRegion: "#bills-count-region"
    }
  });

  List.CategoryView = Marionette.ItemView.extend({
    template: "#bill-category-template",
    className: "watched-bill-icon"
  });

  List.CategoriesView = Marionette.CollectionView.extend({
    itemView: List.CategoryView,
    className: "container"
  });

  List.BillsCountView = Marionette.ItemView.extend({
    template: "#bills-count-template"
  });
});
