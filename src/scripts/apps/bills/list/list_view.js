define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("BillsApp.List.View", function(View, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    View.BillView = Marionette.ItemView.extend({
      template: "bill-item-template"
    });

    View.BillListView = Marionette.CompositeView.extend({
      template: "bill-search-list-template",
      itemView: View.BillView,
      tagName: "tr",
      itemViewContainer: "tbody"
    });

    View.CompactLayout = Marionette.Layout.extend({
      template: "#show-category-layout",
      regions: {
        headlineRegion: "#headline-region",
        billListRegion: "#watched-bill-list"
      }
    });

    View.HeadlineView = Marionette.ItemView.extend({
      template: "#category-headline-template"
    });

    View.BillCompactView = Marionette.ItemView.extend({
      template: "#bill-list-template",
      tagName: "li",
      className: "list-group-item",
      onShow: function() {
        var prob = this.model.get("predictions") * 100;
        var obj = $("#" + this.model.get("id"));
        $(obj).addClass( function() {
          return prob <= 20 ? "alert-danger"  :
                 prob <  80 ? "alert-warning" :
                 "alert-success";
        });
      }
    });

    View.BillCompactListView = Marionette.CollectionView.extend({
      itemView: View.BillCompactView,
      tagName: 'ui',
      className: "list-group"
    });
  });
  return GeneralAssemblyApp.BillsApp.List.View;
});
