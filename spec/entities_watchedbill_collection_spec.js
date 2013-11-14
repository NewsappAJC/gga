describe("WatchedBills collection", function() {
  it("should create a new Backbone.Collection object", function() {
    watchedbills_collection = new GeneralAssemblyApp.Entities.WatchedBills();
    expect(watchedbills_collection).toEqual(jasmine.any(Backbone.Collection));
  });

  it("should contain WatchedBill models", function() {
    watchedbills_collection = new GeneralAssemblyApp.Entities.WatchedBills([{number:'HB1', description:'A House bill'}]);
    expect(watchedbills_collection.models[0]).toEqual(jasmine.any(GeneralAssemblyApp.Entities.WatchedBill))
  });
});
