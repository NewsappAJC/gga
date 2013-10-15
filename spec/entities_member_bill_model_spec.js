describe("MemberBill model", function() {
  var member;
  beforeEach(function() {
    member = new GeneralAssemblyApp.Entities.MemberBill();
  });

  it("Should be a function", function() {
    expect(typeof(GeneralAssemblyApp.Entities.MemberBill)).toEqual("function");
  });
});
