define(["app","apps/watched_bills/list/list_view"], function(GeneralAssemblyApp, View) {
  "use strict";

  GeneralAssemblyApp.module("WatchedBillsApp.List", function(List, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    List.Controller = {
      listCategories: function() {
        require(["entities/watched_bill","entities/bill"], function() {
          var fetchingWatchedBills = GeneralAssemblyApp.request("watched_bills:collection");
          var fetchingBillsCount = GeneralAssemblyApp.request("bills:count");
          var categories_layout = new View.CategoriesLayout();

          $.when(fetchingWatchedBills, fetchingBillsCount).done(function(watched_bills, bills_count) {
            var category_model_data = _.chain(watched_bills.models)
              .countBy(function(model) { return model.get("category"); })
              .pairs()
              .map(function(model) { return {name: model[0], count: model[1]}; })
              .value();

            var categories = new GeneralAssemblyApp.Entities.BillCategories( category_model_data );

            var categories_view = new View.CategoriesView({
              collection: categories
            });

            var bills_count_view = new GeneralAssemblyApp.Common.View.BillsCountView({
              model: bills_count,
              className: "jumbotron"
            });

            categories_layout.on("show", function() {
              categories_layout.billsCountRegion.show(bills_count_view);
              categories_layout.categoriesRegion.show(categories_view);
            });

            GeneralAssemblyApp.mainRegion.show(categories_layout);
          });
        });
      },
      listWatchedBills: function() {
      }
    };
  });
  return GeneralAssemblyApp.WatchedBillsApp.List.Controller;
});
