GeneralAssemblyApp.module("Entities", function(Entities, GeneralAssemblyApp, Backbone, Marionette, $, _){
  Entities.Bill = Backbone.Model.extend({
    initialize: function(id) {
      this.url = "http://localhost:3000/api/bills/" + id
    }
  });

  Entities.Bills = Backbone.Collection.extend({
    model: Entities.Bill,
    url: "http://localhost:3000/api/bills/"
  });

  Entities.BillCount = Backbone.Model.extend({
    url: 'http://localhost:3000/api/bills/count/'
  });
});
