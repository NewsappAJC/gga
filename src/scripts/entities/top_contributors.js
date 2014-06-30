define(["app"], function(GeneralAssemblyApp) {
  "use strict";

  GeneralAssemblyApp.module("Entities", function(Entities, GeneralAssemblyApp, Backbone, Marionette, $){
    Entities.TopContributor = Backbone.Model.extend({});

    Entities.TopContributorsCollection = Backbone.Collection.extend({
      model: Entities.TopContributor,
      initialize: function(id) {
        this.url = Entities.members_url + id + '/top_contributors';
      },
      comparator: function(contributor) {
        return contributor.get("contribution_ranking");
      }
    });

    var API = {
      getTopContributors: function(id) {
        var defer = $.Deferred();
        Entities.top_contributors = new Entities.TopContributorsCollection(id);
        Entities.top_contributors.fetch({
          dataType: "jsonp",
          success: function(data) {
            defer.resolve(data);
          }
        });
        return defer.promise();
      }
    };

    GeneralAssemblyApp.reqres.setHandler("member:top_contributors", function(id) {
      return API.getTopContributors(id);
    });
  });

  return ;
});
