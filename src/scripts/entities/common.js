define(["app"], function(GeneralAssemblyApp) {
  "use strict";

  GeneralAssemblyApp.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
    Entities.api_base = "http://ajcgga-api.herokuapp.com/api/";
    // Entities.api_base = "http://gga-api-staging.herokuapp.com/api/";
    // Entities.api_base = "http://localhost:3000/api/";
    Entities.FilteredCollection = function(options) {
      var original = options.collection;
      var filtered = new original.constructor();
      filtered.add(original.models);
      filtered.filterCriterion = options.filterCriterion || {};

      var applyFilter = function(filterCriterion, collection) {
        collection = collection || original;
        var criterion = filterCriterion;

        var items = _.isEmpty(criterion) ? collection.models : collection.where(criterion);
        return items;
      };

      filtered.filter = function(filterCriterion) {
        if (_.find(_.values(filterCriterion), function(str){return str.match(/all/);})) {
          delete filtered.filterCriterion[ _.keys(filterCriterion)[0] ];
        } else {
          $.extend(filtered.filterCriterion, filterCriterion);
        }
        var items = applyFilter(filtered.filterCriterion);
        filtered.reset(items);
      };

      return filtered;
    };
  });
});
