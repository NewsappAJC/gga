define(["app","apps/welcome/welcome_view"], function(GeneralAssemblyApp, View) {
  GeneralAssemblyApp.module("WelcomeApp", function(WelcomeApp, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    WelcomeApp.Controler = {
      showWelcome: function() {
        require(["entities/bill"], function() {
          var welcomeLayout = new View.WelcomeLayout();
          var fetchingBillsCount = GeneralAssemblyApp.request("bills:count");
          $.when(fetchingBillsCount).done(function(bills_count) {
            billsCountView = new View.BillsCountView({
              model: bills_count
            });

            welcomeLayout.on("show", function() {
              welcomeLayout.billsCountRegion.show(billsCountView);
            });

            GeneralAssemblyApp.mainRegion.show(welcomeLayout);
          });
        });
      }
    };
  });
  return GeneralAssemblyApp.WelcomeApp.Controller;
});
