define(["app","apps/welcome/welcome_view"], function(GeneralAssemblyApp, View) {
  GeneralAssemblyApp.module("WelcomeApp", function(WelcomeApp, GeneralAssemblyApp, Backbone, Marionette, $) {
    WelcomeApp.Controler = {
      showWelcome: function() {
        require(["entities/bill","entities/days_left","goog!feeds,1"], function() {
          var welcomeLayout = new View.WelcomeLayout();
          var fetchingBillsCount = GeneralAssemblyApp.request("bills:count");
          var fetchingDaysLeft = GeneralAssemblyApp.request("days:left");

          $.when(fetchingBillsCount, fetchingDaysLeft).done(function(billsCount, daysLeft) {
            var billsCountView = new GeneralAssemblyApp.Common.View.BillsCountView({
              model: billsCount
            });

            var daysLeftView = new View.DaysLeftView({
              model: daysLeft
            });

            welcomeLayout.on("show", function() {
              welcomeLayout.billsCountRegion.show(billsCountView);
              welcomeLayout.daysLeftRegion.show(daysLeftView);
            });

            GeneralAssemblyApp.mainRegion.show(welcomeLayout);
          });
        });
      }
    };
  });
  return GeneralAssemblyApp.WelcomeApp.Controller;
});
