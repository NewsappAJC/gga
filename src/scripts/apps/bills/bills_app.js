define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("BillsApp", function(BillsApp, GeneralAssemblyApp, Backbone, Marionette) {
    BillsApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "bills(?:query)": "listBills",
        "bills/:id": "showBill",
        "bills/:doctype/:number": "showBillByNumber"
      }
    });

    var API = {
      listBills: function() {
        require(["apps/bills/list/list_controller"], function () {
          // TODO: Do something with required module?
        });
      },
      showBill: function(id) {
        require(["apps/bills/show/show_controller"], function(ShowController) {
          ShowController.showBill(id);
        });
      },
      showBillByNumber: function(doctype, number) {
        require(["apps/bills/show/show_controller"], function(ShowController) {
          ShowController.showBill(doctype + '/' + number);
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
