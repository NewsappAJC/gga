define(["app"],function(GeneralAssemblyApp){
  return GeneralAssemblyApp.module("MapApp",function(MapApp,GeneralAssemblyApp,Backbone,Marionette){
    MapApp.Router=Marionette.AppRouter.extend({
      appRoutes:{map:"map"}
    });

    var API={
      map:function(){
        require(["apps/map/map_controller"], function(){
          MapApp.Controler.showMap();
        });
      }};

      GeneralAssemblyApp.on("map:show",function(){
        GeneralAssemblyApp.navigate("map");
        API.welcome();
      });

      GeneralAssemblyApp.addInitializer(function(){
        new MapApp.Router({controller:API})
      })
    }),GeneralAssemblyApp.MapApp
});