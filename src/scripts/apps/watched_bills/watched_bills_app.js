define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("WatchedBillsApp", function(WatchedBillsApp, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    WatchedBillsApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "watched_bills": "listBillCategories",
        "watched_bills/category/:category": "ShowBillsCategory"
      }
    });

    var API = {
      listBillCategories: function() {
        require(["apps/watched_bills/list/list_controller"], function() {
          WatchedBillsApp.List.Controller.listCategories()
        });
      },
      ShowBillsCategory: function(category) {
        require(["apps/watched_bills/show/show_controller"], function() {
          WatchedBillsApp.Show.Controller.showBillsForCategory(category)
        });
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
  return GeneralAssemblyApp.WatchedBillsApp;
});
