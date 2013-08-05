GeneralAssemblyApp.module("MembersApp.List", function(List, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  List.Controller = {
    listMembers: function() {
      var members = GeneralAssemblyApp.request("members:collection");
      var membersListLayout = new List.Layout();
      var membersListPanel = new List.Panel();
      var membersListView = new List.Members({
        collection: members
      });

      membersListView.on("itemview:member:show", function(childView, model) {
        GeneralAssemblyApp.trigger("member:show", model.get("id"));
      });

      membersListLayout.on("show", function() {
        membersListLayout.panelRegion.show(membersListPanel);
        membersListLayout.membersRegion.show(membersListView);
      });

      GeneralAssemblyApp.mainRegion.show(membersListLayout);
    }
  };
});