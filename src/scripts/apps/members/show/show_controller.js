GeneralAssemblyApp.module("MembersApp.Show", function(Show, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  Show.Controller = {
    showMember: function(id) {
      var members = GeneralAssemblyApp.request("members:collection");
      var model = members.get(id);
      var memberView = new Show.Member({
        model: model
      });

      GeneralAssemblyApp.mainRegion.show(memberView);
    }
  };
});
