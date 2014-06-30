define(["app","apps/about/about_view"], function(GeneralAssemblyApp, View) {
  "use strict";

  GeneralAssemblyApp.module("AboutApp", function(AboutApp, GeneralAssemblyApp) {
    AboutApp.Controler = {
      showAbout: function() {
        var aboutView = new View.AboutView();
        GeneralAssemblyApp.mainRegion.show(aboutView);
      }
    };
  });
  return GeneralAssemblyApp.AboutApp.Controller;
});
