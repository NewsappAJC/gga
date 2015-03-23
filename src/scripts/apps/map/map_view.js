define(["app"],function(GeneralAssemblyApp){
  return GeneralAssemblyApp.module("MapApp.View",function(View,GeneralAssemblyApp,Backbone,Marionette,$){
    View.MapView = Marionette.ItemView.extend({
      template:"#map-template",
      onShow:function(){
        $(document).tooltip({predelay:0,cancelDefault:!0});
      }
    });
  }), GeneralAssemblyApp.MapApp.View
});