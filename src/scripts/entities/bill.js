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

  Entities.BillsCount = Backbone.Model.extend({
    url: 'http://localhost:3000/api/bills/count/'
  });

  var API = {
    getBillsCount: function() {
      var defer = $.Deferred();
      Entities.bills_count = new Entities.BillsCount()
      Entities.bills_count.fetch({
        success: function(data) {
          defer.resolve(data);
        }
      });
      return defer.promise();
    }
  };

  GeneralAssemblyApp.reqres.setHandler("bills:count", function() {
    return API.getBillsCount();
  });
});
