GeneralAssemblyApp.module("MembersApp.List", function(List, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  List.Controller = {
    listMembers: function() {
      var members = GeneralAssemblyApp.request("members:collection");
      var membersListView = new List.Members({
        collection: members
      });

      membersListView.on("itemview:member:show", function(childView, model) {
        GeneralAssemblyApp.trigger("member:show", model.get("id"));
      });
      GeneralAssemblyApp.mainRegion.show(membersListView);
    }
  };
});