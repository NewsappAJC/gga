require.config({
  // enforceDefine: true,
  baseUrl: "scripts",
  paths: {
    async: "lib/async",
    propertyParser: "lib/propertyParser",
    goog: "lib/goog",
    undescore: "lib/underscore",
    jquery: "lib/jquery-1.10.2",
    "jquery-ui": "lib/jquery-ui-1.10.3.custom",
    "jquery-scrolltofixed": "lib/jquery-scrolltofixed-min",
    "jquery-datatables": "lib/jquery.dataTables",
    json2: "lib/json2",
    "underscore.string": "lib/underscore.string.min",
    backbone: "lib/backbone",
    marionette: "lib/backbone.marionette",
    datejs: "lib/date",
    spin: "lib/spin",
    "spin.jquery": "lib/spin.jquery",
    tabletop: "lib/tabletop"
  },

  shim: {
    google: {
      deps: ["jquery"],
      exports: "google"
    },
    underscore: {
      exports: "_"
    },
    json2: ["jquery"],
    backbone: {
      deps: ["jquery","underscore","json2"],
      exports: "Backbone"
    },
    marionette: {
      deps: ["backbone"],
      exports: "Marionette"
    },
    "jquery-ui": ["jquery"],
    "jquery-scrolltofixed": ["jquery"],
    "jquery-datatables": ["jquery"],
    "underscore.string": ["underscore"],
    datejs: {
      deps: [],
      exports: "Date"
    },
    "spin": ["jquery"],
    "spin.jquery": ["spin"],
    tabletop: ["jquery"]
  }
});

require(["app","jquery-ui","jquery-scrolltofixed","jquery-datatables","datejs","underscore.string", "spin","spin.jquery","tabletop","goog"],
  function(GeneralAssemblyApp) {
    "use strict";

    GeneralAssemblyApp.start();
  }
);

