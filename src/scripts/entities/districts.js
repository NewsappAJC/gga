define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("Entities", function(Entities, GeneralAssemblyApp, Backbone, Marionette, $, _){
    Entities.districts_url = Entities.api_base + "members/";

    Entities.District = Backbone.Model.extend({
      urlRoot: Entities.districts_url
    });
  });

  return ;
});
