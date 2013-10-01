GeneralAssemblyApp.module("MembersApp.Show", function(Show, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  Show.Controller = {
    showMember: function(id) {
      var fetchingTopContributors = GeneralAssemblyApp.request("member:top_contributors", id);
      var fetchingMembers = GeneralAssemblyApp.request("members:collection");
      var memberShowLayout = new Show.Layout();

      $.when(fetchingMembers, fetchingTopContributors).done(function(members, top_contributors) {
        var member = members.get(id);

        var memberDetailView = new Show.Detail({
          model: member
        });

        var topContributorsView = new Show.TopContributors({
          collection: top_contributors
        });

        memberShowLayout.on("show", function() {
          memberShowLayout.topContributorsRegion.show(topContributorsView);
          memberShowLayout.detailRegion.show(memberDetailView);
        });

        GeneralAssemblyApp.mainRegion.show(memberShowLayout);
      });
    }
  };
});
