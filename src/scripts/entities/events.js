define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("Entities", function(Entities, GeneralAssemblyApp, Backbone, Marionette, $, _){

    Entities.event_url = Entities.api_base + 'billevents/';
    Entities.Event = Backbone.Model.extend();

    Entities.Events = Backbone.Collection.extend({
      model: Entities.Event,
      initialize: function(date) {
        this.url = Entities.event_url + date;
      }
    });

    var API = {
      getEvents: function(date) {
        var d = $.Deferred();
        Entities.events = new Entities.Events(date);
        Entities.events.fetch({
          dataType: "jsonp",
          success: function(data) {
            d.resolve(data);
          }
        });

        return d.promise();
      }
    };

    GeneralAssemblyApp.reqres.setHandler("bill:events", function(date) {
      return API.getEvents(date);
    });
  });

  return ;
});
