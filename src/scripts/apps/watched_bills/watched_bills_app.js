GeneralAssemblyApp.module("WatchedBillsApp", function(WatchedBillsApp, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  WatchedBillsApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "watched_bills": "listBillCategories",
      "watched_bills/category/:category": "ShowBillsCategory"
    }
  });

  var API = {
    listBillCategories: function() {
      WatchedBillsApp.List.Controller.listCategories()
    },
    ShowBillsCategory: function(category) {
      console.log(category)
      WatchedBillsApp.Show.Controller.showBillsForCategory(category)
    }
  };

  GeneralAssemblyApp.on( "watchedbills:categories:list", function() {
    GeneralAssemblyApp.navigate("watched_bills");
  });

  GeneralAssemblyApp.on( "watchedbills:categories:show", function(category) {
    GeneralAssemblyApp.navigate("watched_bills/category/" + category);
  });

  GeneralAssemblyApp.addInitializer(function() {
    new WatchedBillsApp.Router({
      controller: API
    });
  });
});
