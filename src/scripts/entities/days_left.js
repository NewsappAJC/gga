define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("Entities", function(Entities, GeneralAssemblyApp, Backbone, Marionette, $){

    Entities.DaysLeft = Backbone.Model.extend({
      urlRoot: Entities.api_base + 'days_left',
      defaults: {
        "days_left": 0
      }
    });

    var API = {
      getDaysLeft: function() {
        var d = $.Deferred();
        Entities.daysLeft = new Entities.DaysLeft();
        Entities.daysLeft.fetch({
          dataType: "jsonp",
          success: function(data) {
            d.resolve(data);
          }
        });

        return d.promise();
      }
    };

    GeneralAssemblyApp.reqres.setHandler("days:left", function() {
      return API.getDaysLeft();
    });
  });

  return ;
});
