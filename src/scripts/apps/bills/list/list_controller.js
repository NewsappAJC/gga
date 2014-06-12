// TODO: Remove dependency on "list_view" module if it has no side-effects
define(["app","apps/bills/list/list_view"], function(GeneralAssemblyApp) {
  "use strict";

  // TODO: Determine if this is dead code and remove if so.
  GeneralAssemblyApp.module("BillsApp.List", function(List) {
    List.Controller = {
      ListBills: function() {
        require(["entities/bills"], function() {
        });
      }
    };
  });
  return GeneralAssemblyApp.BillsApp.List.Controller;
});
