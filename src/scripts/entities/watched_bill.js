define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("Entities", function(Entities, GeneralAssemblyApp, Backbone, Marionette, $, _){
    Entities.WatchedBill = Backbone.Model.extend({
      base_url: "http://ajcgga-api.herokuapp.com/api/watched_bills/",
      initialize: function() {
        if ( this.get("category") ) this.set("category", this.get("category").replace(/ /g,'_'));
      }
    });

    Entities.WatchedBills = Backbone.Collection.extend({
      model: Entities.WatchedBill,
      url: "http://ajcgga-api.herokuapp.com/api/watched_bills"
    });

    Entities.BillCategory = Backbone.Model.extend();
    Entities.BillCategories = Backbone.Collection.extend({
      model: Entities.BillCategory
    });

    Entities.CetegoryHeadline = Backbone.Model.extend();

    var API = {
      getWatchedBills: function() {
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
  return GeneralAssemblyApp.Entities.WatchedBill;
});
