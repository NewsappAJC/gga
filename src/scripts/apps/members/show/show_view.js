GeneralAssemblyApp.module("MembersApp.Show", function(Show, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  Show.Member = Marionette.ItemView.extend({
    template: "#member-detail"
  });
});
