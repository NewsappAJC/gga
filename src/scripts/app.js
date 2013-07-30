var GeneralAssemblyApp = new Marionette.Application();

GeneralAssemblyApp.addRegions({
  mainRegion: "#main-region",
  memberDetailRegion: "#member-detail-region"
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
    Backbone.history.start();

    if (this.getCurrentRoute() === "") {
      GeneralAssemblyApp.trigger("members:list");
    }
  }
});

$(document).tooltip({
  items: "div.member",
  predelay: 0,
  cancelDefault: true,
  position: {
    my: "center bottom",
    at: "center top",
    collision: "flipfit"
  }
});
