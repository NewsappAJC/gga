define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("WelcomeApp", function(WelcomeApp, GeneralAssemblyApp, Backbone, Marionette) {
    WelcomeApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "": "welcome"
      }
    });

    var API = {
      welcome: function() {
        require(["apps/welcome/welcome_controller"], function() {
          WelcomeApp.Controler.showWelcome();
        });
      }
    };

    GeneralAssemblyApp.on("welcome:show", function() {
      GeneralAssemblyApp.navigate("/");
      API.welcome();
    });

    GeneralAssemblyApp.addInitializer(function() {
      new WelcomeApp.Router({
        controller: API
      });
    });
  });
  return GeneralAssemblyApp.WelcomeApp;
});
