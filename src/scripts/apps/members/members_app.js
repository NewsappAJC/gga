define(["app"], function(GeneralAssemblyApp) {
  "use strict";

  GeneralAssemblyApp.module("MembersApp", function(MembersApp, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    MembersApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "members(?:query)": "listMembers",
        "members/:id": "showMember"
      }
    });

    var API = {
      listMembers: function(query) {
        require(["apps/members/list/list_controller"], function(ListController) {
          var criterion;
          // turn url query string into a filter criterion object
          if (query) {
            criterion = _.object(_.map(query.split(";"), function(str) {
              return str.split("=");
            }));
          } else {
            criterion = {};
          }

          ListController.listMembers(criterion);
        });
      },
      showMember: function(id) {
        require(["apps/members/show/show_controller"], function(ShowController) {
          ShowController.showMember(id);
        });
      }
    };

    GeneralAssemblyApp.on("members:list", function() {
      GeneralAssemblyApp.navigate("members");
      API.listMembers();
    });

    GeneralAssemblyApp.on("member:show", function(id) {
      GeneralAssemblyApp.navigate("members/" + id);
      API.showMember(id);
    });

    GeneralAssemblyApp.on("members:filter", function(criterion) {
      if (_.isEmpty(criterion)) {
        GeneralAssemblyApp.navigate("members");
      } else {
        var queryString = _.map(_.pairs(criterion), function(pair) {
          return pair.join("=");
        }).join(";");
        GeneralAssemblyApp.navigate("members?" + queryString);
      }
    });

    GeneralAssemblyApp.addInitializer(function() {
      new MembersApp.Router({
        controller: API
      });
    });
  });
});
