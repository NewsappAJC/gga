GeneralAssemblyApp.module("Entities", function(Entities, GeneralAssemblyApp, Backbone, Marionette, $, _){
  Entities.TopContributor = Backbone.Model.extend({});

  Entities.TopContributorsCollection = Backbone.Collection.extend({
    model: Entities.TopContributor,
    initialize: function(id) {
      this.url = 'http://localhost:3000/api/members/' + id + '/top_contributors';
    }
  });

  var API = {
    getTopContributors: function(id) {
      console.log(id);
      var defer = $.Deferred();
      Entities.top_contributors = new Entities.TopContributorsCollection(id);
      Entities.top_contributors.fetch({
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
