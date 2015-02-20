define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("BillsApp.List.View", function(View, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    View.BillView = Marrionette.ItemView,extend({
      template: "bill-item-template"
    });

    View.BillListView = Marrinonette.CompositView.extend({
      template: "bill-search-list-template",
      itemView: View.BillView,
      tagName: "tr",
      itemViewContainer: "tbody"
    });


  });
  return GeneralAssemblyApp.BillsApp.List.View;
});
