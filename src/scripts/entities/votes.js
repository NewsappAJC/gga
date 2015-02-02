define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("Entities", function(Entities, GeneralAssemblyApp, Backbone, Marionette, $, _){

    Entities.vote_url = Entities.api_base + 'votes/on_date/';
    Entities.Vote = Backbone.Model.extend();
    Entities.Votes = Backbone.Collection.extend({
      model: Entities.Vote,
      initialize: function(date) {
        this.url = Entities.vote_url + date;
      }
    });

    var API = {
      getVotes: function(date) {
        var d = $.Deferred();
        Entities.votes = new Entities.Votes(date);
        Entities.votes.fetch({
          dataType: "jsonp",
          success: function(data) {
            d.resolve(data);
          }
        });

        return d.promise();
      }
    };

    GeneralAssemblyApp.reqres.setHandler("daily:votes", function(date) {
      return API.getVotes(date);
    });
  });

  return ;
});
