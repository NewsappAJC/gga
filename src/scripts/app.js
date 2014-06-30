define(["marionette"], function(Marionette) {
  "use strict";

  var GeneralAssemblyApp = new Marionette.Application();

  GeneralAssemblyApp.addRegions({
    mainRegion: "#main-region"
  });

  GeneralAssemblyApp.navigate = function(route, options) {
    options  = options || {};
    Backbone.history.navigate(route, options);
  };

  GeneralAssemblyApp.getCurrentRoute = function() {
    return Backbone.history.fragment;
  };

  GeneralAssemblyApp.on("initialize:after", function() {
    if (Backbone.history) {
      require(["apps/welcome/welcome_app","apps/members/members_app","apps/watched_bills/watched_bills_app","apps/bills/bills_app","apps/about/about_app","entities/common","common/views","common/app"], function() {
        Backbone.history.start();

        // if (GeneralAssemblyApp.getCurrentRoute() === "") {
        //   GeneralAssemblyApp.trigger("welcome:show");
        // }

        Tabletop.init({
          key: 'https://docs.google.com/spreadsheet/pub?key=0Ap9h1zLSgOWUdEhsQi1Yb0JZV3REUVExV1hqT2h6NHc&output=html',
          simpleSheet: true,
          proxie: 'https://s3.amazonaws.com/obscure-atoll-3469',
          callback: function(data) {
            var text = {};
            _.each(data, function(row) { text[row.id] = row.text; });
            GeneralAssemblyApp.text = text;
          }
        });
      });
    }
  });

  return GeneralAssemblyApp;
});
