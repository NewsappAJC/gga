GeneralAssemblyApp.module("WatchedBillsApp.List", function(List, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  List.Controller = {
    listCategories: function() {
      var fetchingWatchedBills = GeneralAssemblyApp.request("watched_bills:collection");
      var fetchingBillsCount = GeneralAssemblyApp.request("bills:count");
      var categories_layout = new List.CategoriesLayout();

      $.when(fetchingWatchedBills, fetchingBillsCount).done(function(watcehd_bills, bills_count) {
        category_model_data = _.chain(watcehd_bills.models)
          .countBy(function(model) { return model.get("category") })
          .pairs()
          .map(function(model) { return {name: model[0], count: model[1]}; })
          .value();
        window.category_model_data = category_model_data

        categories = new GeneralAssemblyApp.Entities.BillCategories( category_model_data );

        categories_view = new List.CategoriesView({
          collection: categories
        });

        bills_count_view = new List.BillsCountView({
          model: bills_count
        });

        categories_layout.on("show", function() {
          categories_layout.billsCountRegion.show(bills_count_view);
          categories_layout.categoriesRegion.show(categories_view);
        });

        GeneralAssemblyApp.mainRegion.show(categories_layout);
      });
    },
    listWatchedBills: function(category) {
    }
  }
});
