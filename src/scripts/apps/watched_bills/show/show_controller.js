define(["app","apps/watched_bills/show/show_view"], function(GeneralAssemblyApp, View) {
  "use strict";

  GeneralAssemblyApp.module("WatchedBillsApp.Show", function(Show, GeneralAssemblyApp, Backbone, Marionette, $) {
    Show.Controller = {
      showBillsForCategory: function(category) {
        require(["entities/watched_bill"], function() {
          var fetchingWatchedBills = GeneralAssemblyApp.request("watched_bills:collection");
          var categoryLayout = new View.CategoryLayout();

          $.when(fetchingWatchedBills).done(function(watched_bills) {
            var billsForCategory = GeneralAssemblyApp.Entities.FilteredCollection({
              collection: watched_bills
            });

            billsForCategory.filter({category: category});

            var categoryView = new View.CategoryCollectionView({
              collection: billsForCategory
            });

            var headline = new GeneralAssemblyApp.Entities.CetegoryHeadline({category: category.replace(/\_/g, " ")});
            var headlineView = new View.CategoryHeadlineView({
              model: headline
            });

            categoryLayout.on("show", function() {
              categoryLayout.headlineRegion.show(headlineView);
              categoryLayout.billListRegion.show(categoryView);
              $(document).tooltip({
                predelay: 0,
                cancelDefault: true
              });
            });

            GeneralAssemblyApp.mainRegion.show(categoryLayout);
          });
        });
      }
    };
  });
  return GeneralAssemblyApp.WatchedBillsApp.Show.Controller;
});
