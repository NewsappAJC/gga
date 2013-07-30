GeneralAssemblyApp.module("MembersApp", function(MembersApp, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  MembersApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "members": "listMembers",
      "members/:id": "showMember"
    }
  });

  var API = {
    listMembers: function() {
      MembersApp.List.Controller.listMembers();
    },
    showMember: function(id) {
      MembersApp.Show.Controller.showMember(id);
    }
  };

  GeneralAssemblyApp.on("members:list", function() {
    GeneralAssemblyApp.navigate("members");
    API.listMembers();
  });

  GeneralAssemblyApp.on("member:show", function(id) {
    GeneralAssemblyApp.navigate("members/" + id);
    API.showMember(id);
  })

  GeneralAssemblyApp.addInitializer(function() {
    new MembersApp.Router({
      controller: API
    });
  });
});
