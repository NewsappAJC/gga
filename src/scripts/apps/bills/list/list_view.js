define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("BillsApp.List.View", function(View, GeneralAssemblyApp, Backbone, Marionette) {
    // TODO: Determine if this is dead code and remove if so.
    View.BillView = Marionette.ItemView.extend({
      template: "bill-item-template"
    });

    View.BillListView = Marionette.CompositView.extend({
      template: "bill-search-list-template",
      itemView: View.BillView,
      tagName: "tr",
      itemViewContainer: "tbody"
    });
  });
  return GeneralAssemblyApp.BillsApp.List.View;
});
