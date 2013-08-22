GeneralAssemblyApp.module("MembersApp.List", function(List, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  List.Controller = {
    listMembers: function(criterion) {
      var fetchingMembers = GeneralAssemblyApp.request("members:collection");

      var membersListLayout = new List.Layout();
      var membersListPanel = new List.Panel();

      $.when(fetchingMembers).done(function(members) {
        filteredMembers = GeneralAssemblyApp.Entities.FilteredCollection({
          collection: members,
          filterCriterion: criterion
        });

        if (criterion) {
          filteredMembers.filter(criterion);
          membersListPanel.once("show", function() {
            membersListPanel.triggerMethod("set:filter:criterion", criterion);
          });
        }
        var membersListView = new List.Members({
          collection: filteredMembers
        });

        membersListView.on("itemview:member:show", function(childView, id) {
          GeneralAssemblyApp.trigger("member:show", id);
        });

        membersListLayout.on("show", function() {
          membersListLayout.panelRegion.show(membersListPanel);
          membersListLayout.membersRegion.show(membersListView);
        });

        membersListPanel.on("members:filter", function(criterion) {
          filteredMembers.filter(criterion);
          GeneralAssemblyApp.trigger("members:filter", filteredMembers.filterCriterion);
        });

        GeneralAssemblyApp.mainRegion.show(membersListLayout);
      });
    }
  };
});