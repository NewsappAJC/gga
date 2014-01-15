define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("BillsApp", function(BillsApp, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    BillsApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "bills/:id": "showBill",
        "bills/:doctype/:number": "showBillByNumber"
      }
    });

    var API = {
      showBill: function(id) {
        require(["apps/bills/show/show_controller"], function() {
          BillsApp.Show.Controller.showBill(id);
        });
      },
      showBillByNumber: function(doctype, number) {
        require(["apps/bills/show/show_controller"], function() {
          BillsApp.Show.Controller.showBill(doctype + '/' + number);
        });
      }
    };

    GeneralAssemblyApp.on("bills:show", function(id) {
      GeneralAssemblyApp.navigate("bills/" + id);
      API.showBill(id);
    });

    GeneralAssemblyApp.addInitializer(function() {
      new BillsApp.Router({
        controller: API
      });
    });
  });
  return GeneralAssemblyApp.BillsApp;
});
