describe("WatchedBill model", function() {
  var watched_bill
  beforeEach(function() {
    watched_bill = new GeneralAssemblyApp.Entities.WatchedBill();
  });

  it("should create a new Backbone.Model object", function() {
    expect(watched_bill).toEqual(jasmine.any(Backbone.Model));
  });
});
