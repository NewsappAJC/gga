GeneralAssemblyApp.module("WatchedBillsApp.Show", function(Show, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  Show.Controller = {
    showBillsForCategory: function(category) {
      var fetchingWatchedBills = GeneralAssemblyApp.request("watched_bills:collection");
      var categoryLayout = new Show.CategoryLayout();

      $.when(fetchingWatchedBills).done(function(watched_bills) {
        billsForCategory = GeneralAssemblyApp.Entities.FilteredCollection({
          collection: watched_bills
        });

        billsForCategory.filter({category: category});
        console.log(category);

        categoryView = new Show.CategoryCollectionView({
          collection: billsForCategory
        });

        headline = new GeneralAssemblyApp.Entities.CetegoryHeadline({category: category.replace(/\_/g, " ")});
        headlineView = new Show.CategoryHeadlineView({
          model: headline
        });

        categoryLayout.on("show", function() {
          categoryLayout.headlineRegion.show(headlineView);
          categoryLayout.billListRegion.show(categoryView);
        });

        GeneralAssemblyApp.mainRegion.show(categoryLayout);
      });
    }

  };
});
