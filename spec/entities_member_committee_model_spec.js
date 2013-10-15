describe("MemberCommittee model", function() {
  var member;
  beforeEach(function() {
    member = new GeneralAssemblyApp.Entities.MemberCommittee();
  });

  it("Should be a function", function() {
    expect(typeof(GeneralAssemblyApp.Entities.MemberCommittee)).toEqual("function");
  });
});
