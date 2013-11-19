GeneralAssemblyApp.module("Entities", function(Entities, GeneralAssemblyApp, Backbone, Marionette, $, _){
  Entities.WatchedBill = Backbone.Model.extend({
    base_url: "http://localhost:3000/api/watched_bills/"
  });

  Entities.WatchedBills = Backbone.Collection.extend({
    model: Entities.WatchedBill,
    url: "http://localhost:3000/api/watched_bills"
  });

  Entities.BillCategory = Backbone.Model.extend();
  Entities.BillCategories = Backbone.Collection.extend({
    model: Entities.BillCategory
  });

  var API = {
    getWatchedBills: function() {
      console.log("getWatchedBills")
      var defer = $.Deferred();
      if (! Entities.watched_bills || Entities.watched_bills.length == 0) {
        Entities.watched_bills = new Entities.WatchedBills();
        Entities.watched_bills.fetch({
          success: function(data) {
            defer.resolve(data);
          }
        });
        return defer.promise();
      } else {
        return Entities.watched_bills;
      }
    }
  };

  GeneralAssemblyApp.reqres.setHandler("watched_bills:collection", function() {
    return API.getWatchedBills();
  });
});
