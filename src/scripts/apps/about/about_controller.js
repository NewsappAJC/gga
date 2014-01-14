define(["app","apps/about/about_view"], function(GeneralAssemblyApp, View) {
  GeneralAssemblyApp.module("AboutApp", function(AboutApp, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    AboutApp.Controler = {
      showAbout: function() {
        var aboutView = new View.AboutView();
        GeneralAssemblyApp.mainRegion.show(aboutView);
      }
    };
  });
  return GeneralAssemblyApp.AboutApp.Controller;
});
