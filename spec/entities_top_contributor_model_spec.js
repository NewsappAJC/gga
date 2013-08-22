describe("TopContributor model", function() {
  it("should be a function", function() {
    expect(typeof(GeneralAssemblyApp.Entities.TopContributor)).toEqual("function");
  });

  it("should create a new model", function() {
    top_contributor = new GeneralAssemblyApp.Entities.TopContributor();
    expect(top_contributor.cid).toBeDefined();
  })
});