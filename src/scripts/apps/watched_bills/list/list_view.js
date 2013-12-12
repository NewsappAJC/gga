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
      className: "col-lg-3"
    });

    View.CategoriesView = Marionette.CollectionView.extend({
      itemView: View.CategoryView,
      className: ""
    });

    View.BillsCountView = Marionette.ItemView.extend({
      template: "#bills-count-template",
      className: ""
    });
  });
  return GeneralAssemblyApp.WatchedBillsApp.List.View;
});
