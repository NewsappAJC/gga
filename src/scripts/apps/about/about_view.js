define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("AboutApp.View", function(View, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    View.AboutView = Marionette.ItemView.extend({
      template: "#about-template"
    });
  });
  return GeneralAssemblyApp.AboutApp.View;
});
