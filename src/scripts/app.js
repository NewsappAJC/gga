var GeneralAssemblyApp = new Marionette.Application();

GeneralAssemblyApp.addRegions({
  mainRegion: "#main-region"
});

GeneralAssemblyApp.navigate = function(route, options) {
  options || (options = {});
  console.log("route: " + route);
  Backbone.history.navigate(route, options);
};

GeneralAssemblyApp.getCurrentRoute = function() {
  return Backbone.history.fragment;
};

GeneralAssemblyApp.on("initialize:after", function() {
  if (Backbone.history) {
    Backbone.history.start();

    if (this.getCurrentRoute() === "") {
      GeneralAssemblyApp.trigger("members:list");
    }
  }
});
