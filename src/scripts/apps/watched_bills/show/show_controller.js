define(["app","apps/watched_bills/show/show_view"], function(GeneralAssemblyApp, View) {
  GeneralAssemblyApp.module("WatchedBillsApp.Show", function(Show, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    Show.Controller = {
      showBillsForCategory: function(category) {
        require(["entities/watched_bill"], function() {
          var fetchingWatchedBills = GeneralAssemblyApp.request("watched_bills:collection");
          var categoryLayout = new View.CategoryLayout();

          $.when(fetchingWatchedBills).done(function(watched_bills) {
            billsForCategory = GeneralAssemblyApp.Entities.FilteredCollection({
              collection: watched_bills
            });

            billsForCategory.filter({category: category});

            categoryView = new View.CategoryCollectionView({
              collection: billsForCategory
            });

            headline = new GeneralAssemblyApp.Entities.CetegoryHeadline({category: category.replace(/\_/g, " ")});
            headlineView = new View.CategoryHeadlineView({
              model: headline
            });

            categoryLayout.on("show", function() {
              categoryLayout.headlineRegion.show(headlineView);
              categoryLayout.billListRegion.show(categoryView);
            });

            GeneralAssemblyApp.mainRegion.show(categoryLayout);
          });
        });
      }
    };
  });
return GeneralAssemblyApp.WatchedBillsApp.Show.Controller;
});
