GeneralAssemblyApp.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
  Entities.FilteredCollection = function(options) {
    var original = options.collection;
    var filtered = new original.constructor();
    filtered.add(original.models);
    filtered.filterCriterion = options.filterCriterion;

    var applyFilter = function(filterCriterion, collection) {
      var collection = collection || original;
      var criterion = filterCriterion;

      var items = [];
      if (criterion) {
        items = collection.where(criterion);
      } else {
        items = collection.models;
      }
      filtered._currentCriterion = criterion;
      return items;
    };

    filtered.filter = function(filterCriterion) {
      filtered._currentFilter = "filter";
      var items = applyFilter(filterCriterion, "filter");
      filtered.reset(items);
    };

    filtered.where = function(filterCriterion) {
      filtered._currentFilter = "where";
      var items = applyFilter(filterCriterion, "where");
      filtered.reset(items);
    };

    original.on("reset", function() {
      var items = applyFilter(filtered._currentCriterion);
      filtered.reset(items);
    });

    original.on("add", function(models) {
      var coll = new original.contructor();
      coll.add(models);
      var items = applyFilter(filtered._currentCriterion, filtered._currentFilter, coll);
      filtered.add(item);
    });

    return filtered;
  };
});