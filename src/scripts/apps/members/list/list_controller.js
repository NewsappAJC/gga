define(["app","apps/members/list/list_view"], function(GeneralAssemblyApp, View) {
  GeneralAssemblyApp.module("MembersApp.List", function(List, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    List.Controller = {
      listMembers: function(criterion) {
        require(["entities/member","goog!maps,3,other_params:sensor=false"], function() {
          var fetchingMembers = GeneralAssemblyApp.request("members:collection");
          var membersLayout = new View.MembersLayout();
          var memberBrowseLayout = new View.MemberBrowseLayout();
          var membersListPanel = new View.MemberPanel();
          var mapView = new View.MemberMapView();

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
            var membersListView = new View.Members({
              collection: filteredMembers
            });

            membersListView.on("itemview:member:show", function(childView, id) {
              GeneralAssemblyApp.trigger("member:show", id);
            });

            memberBrowseLayout.on("show", function() {
              memberBrowseLayout.panelRegion.show(membersListPanel);
              memberBrowseLayout.membersRegion.show(membersListView);
            });

            membersLayout.on("show", function() {
              membersLayout.membersRegion.show(memberBrowseLayout);
              membersLayout.mapRegion.show(mapView);
            });

            membersListPanel.on("members:filter", function(criterion) {
              filteredMembers.filter(criterion);
              GeneralAssemblyApp.trigger("members:filter", filteredMembers.filterCriterion);
            });

            GeneralAssemblyApp.mainRegion.show(membersLayout);
          });
        });
      }
    };
  });
  return GeneralAssemblyApp.MembersApp.List.Controller;
});
