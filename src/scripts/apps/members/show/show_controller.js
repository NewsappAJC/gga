GeneralAssemblyApp.module("MembersApp.Show", function(Show, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  Show.Controller = {
    showMember: function(id) {
      var fetchingTopContributors = GeneralAssemblyApp.request("member:top_contributors", id);
      var fetchingMembers = GeneralAssemblyApp.request("members:collection");
      var memberShowLayout = new Show.Layout();

      $.when(fetchingMembers, fetchingTopContributors).done(function(members, top_contributors) {
        var member = members.get(id);
        var committees = new GeneralAssemblyApp.Entities.MemberCommittees(member.get('member_committees'));
        var bills = new GeneralAssemblyApp.Entities.MemberBills(member.get('primary_sponsorships_bills'));

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
