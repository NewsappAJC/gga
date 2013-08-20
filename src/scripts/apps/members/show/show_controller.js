GeneralAssemblyApp.module("MembersApp.Show", function(Show, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  Show.Controller = {
    showMember: function(id) {
      var fetchingMembers = GeneralAssemblyApp.request("members:collection");
      var memberShowLayout = new Show.Layout();

      $.when(fetchingMembers).done(function(members) {
        var model = members.get(id);
        var memberDetailView = new Show.Detail({
          model: model
        });

        model = GeneralAssemblyApp.request("members:member", id);
        memberShowLayout.on("show", function() {
          memberShowLayout.detailRegion.show(memberDetailView)
        })
        GeneralAssemblyApp.mainRegion.show(memberShowLayout);
      });
    }
  };
});
