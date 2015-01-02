define(["app","apps/members/show/show_view"], function(GeneralAssemblyApp, View) {
  GeneralAssemblyApp.module("MembersApp.Show", function(Show, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    Show.Controller = {
      showMember: function(id) {
        require(["entities/member","entities/top_contributors","entities/districts"], function() {
          var loadingView = new GeneralAssemblyApp.Common.View.Loading();
          GeneralAssemblyApp.mainRegion.show(loadingView);

          var fetchingMembers = GeneralAssemblyApp.request("members:member", id);
          var memberShowLayout = new View.Layout();

          $.when(fetchingMembers).done(function(member) {
            window.member = member;

            var memberDetailView = new View.Detail({
              model: member
            });

            var top_contributors = new GeneralAssemblyApp.Entities.TopContributorsCollection(member.get("top_contributors"));
            var topContributorsView = new View.TopContributors({
              collection: top_contributors
            });

            var committees = new GeneralAssemblyApp.Entities.MemberCommittees(member.get("member_committees"));
            var committeesView = new View.Committees({
              collection: committees
            });

            var bills = new GeneralAssemblyApp.Entities.MemberBills(member.get("bills"));
            var billsListView = new View.Bills({
              collection: bills
            });

            var votes = new GeneralAssemblyApp.Entities.MemberVotes( member.get("member_votes") );
            var votesListView = new View.Votes({
              collection: votes
            });

            var district = new GeneralAssemblyApp.Entities.District( member.get("district") );
            console.log(district.attributes);
            var districtView = new View.District({
              model: district
            });

            memberShowLayout.on("show", function() {
              if (bills.length > 0) {
                memberShowLayout.billsListRegion.show(billsListView);
              }
              memberShowLayout.committeesRegion.show(committeesView);
              memberShowLayout.topContributorsRegion.show(topContributorsView);
              memberShowLayout.detailRegion.show(memberDetailView);
              memberShowLayout.votesRegion.show(votesListView);
              memberShowLayout.districtRegion.show(districtView);
              $(document).tooltip({
                predelay: 0,
                cancelDefault: true
              });
            });

            GeneralAssemblyApp.mainRegion.show(memberShowLayout);
          });
        });
      }
    };
  });
  return GeneralAssemblyApp.MembersApp.Show.Controller;
});
