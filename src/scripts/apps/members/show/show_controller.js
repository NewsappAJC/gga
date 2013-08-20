GeneralAssemblyApp.module("MembersApp.Show", function(Show, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  Show.Controller = {
    showMember: function(id) {
      var fetchingTopContributors = GeneralAssemblyApp.request("member:top_contributors", id);
      var memberShowLayout = new Show.Layout();

      $.when(fetchingTopContributors).done(function(top_contributors) {
        var member = GeneralAssemblyApp.request("members:member", id);

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
