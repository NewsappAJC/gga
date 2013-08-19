GeneralAssemblyApp.module("MembersApp.Show", function(Show, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  Show.Controller = {
    showMember: function(id) {
      var fetchingMembers = GeneralAssemblyApp.request("members:collection");
      $.when(fetchingMembers).done(function(members) {
        var model = members.get(id);
        var memberView = new Show.Member({
          model: model
        });

        model = GeneralAssemblyApp.request("members:member", id);
        GeneralAssemblyApp.mainRegion.show(memberView);
      });
    }
  };
});
