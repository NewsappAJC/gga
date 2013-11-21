GeneralAssemblyApp.module("WatchedBillsApp.Show", function(Show, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  Show.Controller = {
    showBillsForCategory: function(category) {
      var fetchingWatchedBills = GeneralAssemblyApp.request("watched_bills:collection");

      $.when(fetchingWatchedBills).done(function(watched_bills) {
        billsForCategory = GeneralAssemblyApp.Entities.FilteredCollection({
          collection: watched_bills
        });

        billsForCategory.filter({category: category});
        category_view = new Show.CategoryCollectionView({
          collection: billsForCategory
        });

        GeneralAssemblyApp.mainRegion.show(category_view);
      });
    }

  };
});
