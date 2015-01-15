define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("Entities", function(Entities, GeneralAssemblyApp, Backbone, Marionette, $, _){

    Entities.LegislativeDays = Backbone.Model.extend({
      urlRoot: Entities.api_base + 'legislativedays'
    });

    var API = {
      getLegislativeDays: function() {
        var d = $.Deferred();
        if (! Entities.days || Entities.days.length === 0) {
          Entities.days = new Entities.LegislativeDays();
          Entities.days.fetch({
            dataType: "jsonp",
            success: function(data) {
              d.resolve(data);
            }
          });

          return d.promise();
        } else {
          return Entites.days;
        }
      }
    };

    GeneralAssemblyApp.reqres.setHandler("days", function() {
      return API.getLegislativeDays();
    });
  });

  return ;
});
