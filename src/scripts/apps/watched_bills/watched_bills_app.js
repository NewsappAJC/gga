define(["app"], function(GeneralAssemblyApp) {
  "use strict";

  GeneralAssemblyApp.module("WatchedBillsApp", function(WatchedBillsApp, GeneralAssemblyApp, Backbone, Marionette) {
    WatchedBillsApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "watched_bills": "listBillCategories",
        "watched_bills/category/:category": "showBillsCategory"
      }
    });

    var API = {
      listBillCategories: function() {
        require(["apps/watched_bills/list/list_controller"], function() {
          WatchedBillsApp.List.Controller.listCategories();
        });
      },
      showBillsCategory: function(category) {
        require(["apps/watched_bills/show/show_controller"], function() {
          WatchedBillsApp.Show.Controller.showBillsForCategory(category);
        });
      }
    };

    GeneralAssemblyApp.on( "watchedbills:categories:list", function() {
      GeneralAssemblyApp.navigate("watched_bills");
      API.listBillCategories();
    });

    GeneralAssemblyApp.on( "watchedbills:categories:show", function(category) {
      GeneralAssemblyApp.navigate("watched_bills/category/" + category);
      API.showBillsCategory(category);
    });

    GeneralAssemblyApp.addInitializer(function() {
      new WatchedBillsApp.Router({
        controller: API
      });
    });
  });
  return GeneralAssemblyApp.WatchedBillsApp;
});
