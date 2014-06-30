define(["app"], function(GeneralAssemblyApp) {
  "use strict";

  GeneralAssemblyApp.module("AboutApp", function(AboutApp, GeneralAssemblyApp, Backbone, Marionette) {
    AboutApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "about": "about"
      }
    });

    var API = {
      about: function() {
        require(["apps/about/about_controller"], function() {
          AboutApp.Controler.showAbout();
        });
      }
    };

    GeneralAssemblyApp.on("about:show", function() {
      GeneralAssemblyApp.navigate("about");
      API.welcome();
    });

    GeneralAssemblyApp.addInitializer(function() {
      new AboutApp.Router({
        controller: API
      });
    });
  });
  return GeneralAssemblyApp.AboutApp;
});
