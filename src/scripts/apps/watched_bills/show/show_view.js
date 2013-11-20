GeneralAssemblyApp.module("WatchedBillsApp.Show", function(Show, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  Show.CategoryItemView = Marionette.ItemView.extend({
    template: "#category-item-template"
  });

  Show.CategoryCollectionView = Marionette.CollectionView.extend({
    itemView: Show.CategoryItemView,
    className: "container"
  });
});
