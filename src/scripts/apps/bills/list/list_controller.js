define(["app","apps/bills/list/list_view"], function(GeneralAssemblyApp, View) {
  GeneralAssemblyApp.module("BillsApp.List", function(List, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    List.Controller = {
      ListBills: function(criterion) {
        require(["entities/bills"], function() {
        });
      };
    };
  });
  return GeneralAssemblyApp.BillsApp.List.Controller;
});
