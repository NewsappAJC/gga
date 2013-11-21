GeneralAssemblyApp.module("BillsApp.Show", function(Show, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  Show.BillView = Marionette.ItemView.extend({
    template: "#bill-detail-template"
  });
});
