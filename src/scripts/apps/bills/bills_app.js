define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("BillsApp", function(BillsApp, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    BillsApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "bills/list/:filter": "listBillsByEvent",
        "bills(?:query)": "listBills",
        "bills/:id": "showBill",
        "bills/:doctype/:number": "showBillByNumber"
      }
    });

    var API = {
      listBills: function(query) {
        require(["apps/bills/list/list_controller"], function (ListController) {
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
      },
      listBillsByEvent: function(event) {
        require(["apps/bills/list/list_controller"], function(ShowController) {
          ShowController.ListBillsByEvent(event);
        });
      },
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
