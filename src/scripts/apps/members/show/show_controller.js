GeneralAssemblyApp.module("MembersApp.Show", function(Show, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  Show.Controller = {
    showMember: function(id) {
      var fetchingMembers = GeneralAssemblyApp.request("members:collection");
      var fetchingTopContributors = GeneralAssemblyApp.request("member:top_contributors", id);
      var fetchingBills = GeneralAssemblyApp.request("member:bills", id);
      var fetchingCommittees = GeneralAssemblyApp.request("member:committees", id);
      var memberShowLayout = new Show.Layout();

      $.when(fetchingMembers, fetchingTopContributors, fetchingBills, fetchingCommittees).done(function(members, top_contributors, bills, committees) {
        var member = members.get(id);

        var memberDetailView = new Show.Detail({
          model: member
        });

        var topContributorsView = new Show.TopContributors({
          collection: top_contributors
        });

        var committeesView = new Show.Committees({
          collection: committees
        });

        var billsListView = new Show.Bills({
          collection: bills
        });

        memberShowLayout.on("show", function() {
          if (bills.length > 0) {
            memberShowLayout.billsListRegion.show(billsListView);
          }
          memberShowLayout.committeesRegion.show(committeesView);
          memberShowLayout.topContributorsRegion.show(topContributorsView);
          memberShowLayout.detailRegion.show(memberDetailView);
        });

        GeneralAssemblyApp.mainRegion.show(memberShowLayout);
      });
    }
  };
});
