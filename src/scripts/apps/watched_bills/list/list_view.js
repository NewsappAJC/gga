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
<<<<<<< HEAD
      className: "col-lg-3"
    });

    View.CategoriesView = Marionette.CollectionView.extend({
      itemView: View.CategoryView,
      className: ""
=======
      className: "col-sm-3"
    });

    View.CategoriesView = Marionette.CollectionView.extend({
      itemView: View.CategoryView
      // className: "container"
>>>>>>> feature/welcome-page
    });

    View.BillsCountView = Marionette.ItemView.extend({
      template: "#bills-count-template",
<<<<<<< HEAD
      className: ""
=======
      className: "bill-sum-header"
>>>>>>> feature/welcome-page
    });
  });
  return GeneralAssemblyApp.WatchedBillsApp.List.View;
});
