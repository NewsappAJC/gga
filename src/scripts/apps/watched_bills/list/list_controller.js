GeneralAssemblyApp.module("WatchedBillsApp.List", function(List, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  List.Controller = {
    listCategories: function() {
      var fetchingWatchedBills = GeneralAssemblyApp.request("watched_bills:collection");
      var categoriesLayout = new List.CategoriesLayout();

      $.when(fetchingWatchedBills).done(function(watcehd_bills) {
        category_model_data = _.chain(watcehd_bills.models)
          .countBy(function(model) { return model.get("category") })
          .pairs()
          .map(function(model) { return {name: model[0], count: model[1]}; })
          .value();
        window.category_model_data = category_model_data

        categories = new GeneralAssemblyApp.Entities.BillCategories( category_model_data );

        categoriesView = new List.CategoriesView({
          collection: categories
        });

        categoriesLayout.on("show", function() {
          categoriesLayout.categoriesRegion.show(categoriesView);
        });

        GeneralAssemblyApp.mainRegion.show(categoriesLayout);
      });
    },
    listWatchedBills: function(category) {
    }
  }
});
