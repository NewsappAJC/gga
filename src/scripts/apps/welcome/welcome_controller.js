define(["app","app/welcome/welcome_view"], function(GeneralAssemblyApp, View) {
  GeneralAssemblyApp.module("WelcomeApp", function(WelcomeApp, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    WelcomeApp.Controler = {
      welcome: function() {
        require(["entities/bill"], function() {
          var fetchingBillsCount = GeneralAssemblyApp.request("bills:count");
          $.when(fetchingBillsCount).done(function(bills_count) {

          });
        });
      }
    };
  });
  return GeneralAssemblyApp.WelcomeApp.Controller;
});
