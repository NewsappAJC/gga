GeneralAssemblyApp.module("MembersApp.List", function(List, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  List.Controller = {
    listMembers: function() {
      var searchCriterion = {};
      var fetchingMembers = GeneralAssemblyApp.request("members:collection");

      var membersListLayout = new List.Layout();
      var membersListPanel = new List.Panel();

      $.when(fetchingMembers).done(function(members) {
        window.members = members;
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

        membersListPanel.on("members:filter", function(criterion) {
          if (_.contains(_.values(criterion), "all")) {
            delete searchCriterion[ _.keys(criterion)[0] ];
          } else {
            $.extend(searchCriterion, criterion);
          }
          console.log(searchCriterion);
          console.log(members.where(searchCriterion));
        });

        GeneralAssemblyApp.mainRegion.show(membersListLayout);
      });
    }
  };
});