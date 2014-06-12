define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("WatchedBillsApp.Show.View", function(View, GeneralAssemblyApp, Backbone, Marionette, $) {
    View.CategoryLayout = Marionette.Layout.extend({
      template: "#show-category-layout",
      regions: {
        headlineRegion: "#headline-region",
        billListRegion: "#watched-bill-list"
      }
    });

    View.CategoryHeadlineView = Marionette.ItemView.extend({
      template: "#category-headline-template"
    });

    View.CategoryItemView = Marionette.ItemView.extend({
      template: "#category-item-template",
      tagName: "li",
      className: "list-group-item",
      onShow: function() {
        var prob = this.model.get("predictions") * 100;
        var id = this.model.get("bill_id");
        var obj = $("#" + id);
        $(obj).addClass( function() {
          return prob <= 20 ? "alert-danger"  :
                 prob <  80 ? "alert-warning" :
                 "alert-success";
        });
      }
    });

    View.CategoryCollectionView = Marionette.CollectionView.extend({
      itemView: View.CategoryItemView,
      tagName: "ui",
      className: "list-group"
    });
  });
  return GeneralAssemblyApp.WatchedBillsApp.Show.View;
});
