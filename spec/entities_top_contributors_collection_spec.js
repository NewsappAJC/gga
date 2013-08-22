describe("TopContributors collection", function() {
  describe("Contructor", function() {
    it("should be a function", function() {
      expect(typeof(GeneralAssemblyApp.Entities.TopContributorsCollection)).toEqual("function");
    });

    it("should create a new collection object", function() {
      var top_contributors = new GeneralAssemblyApp.Entities.TopContributorsCollection();
      expect(typeof(top_contributors)).toEqual("object");
      expect(Array.isArray(top_contributors.models)).toEqual(true);
    });
  });

  it("should have correct url", function() {
    var top_contributors = new GeneralAssemblyApp.Entities.TopContributorsCollection(1);
    expect(top_contributors.url).toMatch(/\/api\/members\/1\/top_contributors$/);
  });

  it("should order contributos by contribution_ranking", function() {
    contributors = [];
    contributors.push(new GeneralAssemblyApp.Entities.TopContributor({
      contribution_ranking: 3
    }));
    contributors.push(new GeneralAssemblyApp.Entities.TopContributor({
      contribution_ranking: 2
    }));
    contributors.push(new GeneralAssemblyApp.Entities.TopContributor({
      contribution_ranking: 1
    }));

    var top_contributors = new GeneralAssemblyApp.Entities.TopContributorsCollection(contributors);
    expect(top_contributors.models[0].get("contribution_ranking")).toEqual(1);
    expect(top_contributors.models[1].get("contribution_ranking")).toEqual(2);
    expect(top_contributors.models[2].get("contribution_ranking")).toEqual(3);
  });

  describe("member:top_contributors request handlers", function() {
    var server;
    beforeEach(function() {
      server = sinon.fakeServer.create();
    });
    afterEach(function() {
      server.restore();
    });

    it("should trigger and ajax request", function(){
      expect(server.requests.length).toEqual(0)
      GeneralAssemblyApp.request("member:top_contributors");
      expect(server.requests.length).toEqual(1)
    });

    it("should use correct url", function() {
      GeneralAssemblyApp.request("member:top_contributors", 1);
      expect(server.requests[0].url).toMatch(/\/api\/members\/1\/top_contributors$/);
    });
  });
});
