define(["app","apps/map/map_view"],function(GeneralAssemblyApp,View){
  return GeneralAssemblyApp.module("MapApp",function(MapApp,GeneralAssemblyApp){
    MapApp.Controler={
      showMap:function(){
        var mapView=new View.MapView;
        GeneralAssemblyApp.mainRegion.show(mapView);
      }
    };
  }),GeneralAssemblyApp.MapApp.Controller
});