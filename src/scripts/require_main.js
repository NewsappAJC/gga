requirejs.config({
  // enforceDefine: true,
  baseUrl: "scripts",
  paths: {
    undescore: "lib/underscore",
    jquery: "lib/jquery",
    "jquery-ui": "lib/jquery-ui-1.10.3.custom",
    "jquery-scrolltofixed": "lib/jquery-scrolltofixed-min",
    "jquery-datatables": "lib/jquery.dataTables",
    json2: "lib/json2",
    "underscore.string": "lib/underscore.string.min",
    backbone: "lib/backbone",
    marionette: "lib/backbone.marionette",
    datejs: "lib/date"
  },

  shim: {
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
  }
});

require(["app","jquery-ui","jquery-scrolltofixed","jquery-datatables","datejs","underscore.string"],
  function(GeneralAssemblyApp) {
    GeneralAssemblyApp.start();
});

