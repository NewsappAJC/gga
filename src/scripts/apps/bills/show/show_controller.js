GeneralAssemblyApp.module("BillsApp.Show", function(Show, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  Show.Controller = {
    showBill: function(id) {
      var fetchingBill = GeneralAssemblyApp.request("bills:bill", id);
      $.when(fetchingBill).done(function(bill) {
        console.log(bill);
        bill_view = new Show.BillView({
          model: bill
        });

        GeneralAssemblyApp.mainRegion.show(bill_view);
      });
    }
  };
});