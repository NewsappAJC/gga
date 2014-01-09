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
    if (Backbone.history) {
      require(["apps/welcome/welcome_app","apps/members/members_app","apps/watched_bills/watched_bills_app","apps/bills/bills_app","apps/about/about_app","entities/common","common/views"], function() {
        Backbone.history.start();

        if (GeneralAssemblyApp.getCurrentRoute() === "") {
          GeneralAssemblyApp.trigger("welcome:show");
        }
      });
    }
  });

  return GeneralAssemblyApp;
});
