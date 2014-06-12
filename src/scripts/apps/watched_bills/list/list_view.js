define(["app"], function(GeneralAssemblyApp) {
  "use strict";

  GeneralAssemblyApp.module("WatchedBillsApp.List.View", function(View, GeneralAssemblyApp, Backbone, Marionette, $) {
    View.CategoriesLayout = Marionette.Layout.extend({
      template: "#bill-category-layout",
      regions: {
        categoriesRegion: "#bill-category-region",
        billsCountRegion: "#bills-count-region"
      },
      events: {
        "submit form#bill-search": "showBill"
      },
      showBill: function(e) {
        e.preventDefault();
        e.stopPropagation();
        var doctype = $("#document-type").val();
        var number = $("#number").val();
        GeneralAssemblyApp.trigger("bills:show", doctype + '/' + number);
      }
    });

    View.CategoryView = Marionette.ItemView.extend({
      template: "#bill-category-template",
      className: "col-sm-3",
      events: {
        "click div.watched-bill": "showBillsCategory"
      },
      showBillsCategory: function(e) {
        e.preventDefault();
        e.stopPropagation();
        GeneralAssemblyApp.trigger("watchedbills:categories:show", this.model.get("name"));
      }
    });

    View.CategoriesView = Marionette.CollectionView.extend({
      itemView: View.CategoryView
      // className: "container"
    });

  });
  return GeneralAssemblyApp.WatchedBillsApp.List.View;
});
