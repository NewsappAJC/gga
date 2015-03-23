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
      require(["apps/welcome/welcome_app","apps/members/members_app","apps/watched_bills/watched_bills_app","apps/bills/bills_app","apps/about/about_app","apps/map/map_app","entities/common","entities/legislative_days","common/views","common/app"], function() {
        Backbone.history.start();

        // if (GeneralAssemblyApp.getCurrentRoute() === "") {
        //   GeneralAssemblyApp.trigger("welcome:show");
        // }

        var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?key=0Ap9h1zLSgOWUdEhsQi1Yb0JZV3REUVExV1hqT2h6NHc&output=html';
        Tabletop.init({
          key: 'https://docs.google.com/spreadsheet/pub?key=0Ap9h1zLSgOWUdEhsQi1Yb0JZV3REUVExV1hqT2h6NHc&output=html',
          simpleSheet: true,
          proxie: 'https://s3.amazonaws.com/obscure-atoll-3469',
          callback: function(data, tabletop) {
            text = {};
            _.each(data, function(row) { text[row.id] = row.text });
            GeneralAssemblyApp.text = text;
          }
        });
      });
    }
  });
  return GeneralAssemblyApp;
});
