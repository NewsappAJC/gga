GeneralAssemblyApp.module("MembersApp.Show", function(Show, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  Show.Controller = {
    showMember: function(id) {
      var fetchingMembers = GeneralAssemblyApp.request("members:member", id);
      var memberShowLayout = new Show.Layout();

      $.when(fetchingMembers).done(function(member) {
        window.member = member;

        var memberDetailView = new Show.Detail({
          model: member
        });

        var top_contributors = new GeneralAssemblyApp.Entities.TopContributorsCollection(member.get("top_contributors"));
        var topContributorsView = new Show.TopContributors({
          collection: top_contributors
        });

        var committees = new GeneralAssemblyApp.Entities.MemberCommittees(member.get("member_committees"));
        var committeesView = new Show.Committees({
          collection: committees
        });

        var bills = new GeneralAssemblyApp.Entities.MemberBills(member.get("bills"))
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
