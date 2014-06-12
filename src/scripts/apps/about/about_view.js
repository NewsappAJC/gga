define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("AboutApp.View", function(View, GeneralAssemblyApp, Backbone, Marionette, $) {
    View.AboutView = Marionette.ItemView.extend({
      template: "#about-template",
      onShow: function() {
        $(document).tooltip({
          predelay: 0,
          cancelDefault: true
        });
      }
    });
  });
  return GeneralAssemblyApp.AboutApp.View;
});
