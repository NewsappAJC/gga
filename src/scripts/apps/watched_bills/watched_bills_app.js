GeneralAssemblyApp.module("WatchedBillsApp", function(WatchedBillsApp, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  WatchedBillsApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "watched_bills": "listBillCategories",
      "members/category/:category": "listWatchedBills"
    }
  });

  var API = {
    listBillCategories: function() {
      console.log("listBillCategories")
      WatchedBillsApp.List.Controller.listCategories()
    },
    listWatchedBills: function(category) {
      WatchedBillsApp.Controller.List.listWatchedBills(category)
    }
  };

  GeneralAssemblyApp.on( "watchedbills:categories:list", function() {
    GeneralAssemblyApp.navigate("watched_bills");
  });

  GeneralAssemblyApp.addInitializer(function() {
    new WatchedBillsApp.Router({
      controller: API
    });
  });
});
