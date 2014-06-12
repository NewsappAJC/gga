define(["app","apps/members/list/list_view"], function(GeneralAssemblyApp, View) {
  "use strict";

  GeneralAssemblyApp.module("MembersApp.List", function(List, GeneralAssemblyApp, Backbone, Marionette, $) {
    List.Controller = {
      listMembers: function(criterion) {
        require(["entities/member"], function() {
          var fetchingMembers = GeneralAssemblyApp.request("members:collection");

          var membersListLayout = new View.MemberLayout();
          var membersListPanel = new View.MemberPanel();

          $.when(fetchingMembers).done(function(members) {
            var filteredMembers = GeneralAssemblyApp.Entities.FilteredCollection({
              collection: members,
              filterCriterion: criterion
            });

            if (criterion) {
              filteredMembers.filter(criterion);
              membersListPanel.once("show", function() {
                membersListPanel.triggerMethod("set:filter:criterion", criterion);
              });
            }
            var membersListView = new View.Members({
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
        });
      }
    };
  });
  return GeneralAssemblyApp.MembersApp.List.Controller;
});
