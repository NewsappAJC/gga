define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("WelcomeApp.View", function(View, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    View.WelcomeLayout = Marionette.Layout.extend({
      template: "#welcome-layout",
      regions: {
        billsCountRegion: "#bill-count-region"
      },
      events: {
        "click #bills": "showWatchedBills",
        "click #members": "showMembers"
      },
      showWatchedBills: function(e) {
        e.preventDefault();
        e.stopPropagation();
        GeneralAssemblyApp.trigger("watchedbills:categories:list");
      },
      showMembers: function(e) {
        e.preventDefault();
        e.stopPropagation();
        GeneralAssemblyApp.trigger("members:list");
      }
    });
  });
  return GeneralAssemblyApp.WelcomeApp.View;
});
