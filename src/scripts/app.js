define(["marionette"], function(Marionette) {
  var GeneralAssemblyApp = new Marionette.Application();

  GeneralAssemblyApp.addRegions({
    mainRegion: "#main-region"
  });

  GeneralAssemblyApp.navigate = function(route, options) {
    options || (options = {});
    Backbone.history.navigate(route, options);
  };

  GeneralAssemblyApp.getCurrentRoute = function() {
    return Backbone.history.fragment;
  };

  GeneralAssemblyApp.on("initialize:after", function() {
    console.log("GeneralAssemblyApp has started");
    if (Backbone.history) {
      require(["apps/members/members_app","apps/watched_bills/watched_bills_app","apps/bills/bills_app","entities/common"], function() {
        Backbone.history.start();

        if (GeneralAssemblyApp.getCurrentRoute() === "") {
          GeneralAssemblyApp.trigger("watchedbills:categories:list");
          // GeneralAssemblyApp.trigger("members:list");
        }
      });
    }
  });

  return GeneralAssemblyApp;
});
