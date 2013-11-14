GeneralAssemblyApp.module("Entities", function(Entities, GeneralAssemblyApp, Backbone, Marionette, $, _){
  Entities.WatchedBill = Backbone.Model.extend({
    base_url: "http://localhost:3000/api/watched_bills/"
  });

  Entities.WatchedBills = Backbone.Collection.extend({
    model: Entities.WatchedBill,
    url: "http://localhost:3000/api/watched_bills"
  })
});
