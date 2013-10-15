describe("MemberCommittees collection", function() {
  it("should have correct url", function() {
    var member_committees = new GeneralAssemblyApp.Entities.MemberCommittees(1);
    expect(member_committees.url).toMatch(/\/api\/members\/1\/committees$/);
  });

  describe("Constructor", function() {
    it("should be a function", function() {
      expect(typeof(GeneralAssemblyApp.Entities.MemberCommittees)).toEqual("function");
    });

    it("should create a new collection object", function() {
      var member_committees = new GeneralAssemblyApp.Entities.MemberCommittees();
      expect(typeof(member_committees)).toEqual("object");
      expect(Array.isArray(member_committees.models)).toEqual(true);
    });
  });

  describe("member:committees request handler", function() {
    var server;
    beforeEach(function() {
      server = sinon.fakeServer.create();
    });
    afterEach(function() {
      server.restore();
    });

    it("should trigger and ajax request", function(){
      expect(server.requests.length).toEqual(0)
      GeneralAssemblyApp.request("member:committees");
      expect(server.requests.length).toEqual(1)
    });

    it("should use correct url", function() {
      GeneralAssemblyApp.request("member:committees", 1);
      expect(server.requests[0].url).toMatch(/\/api\/members\/1\/committees$/);
    });
  });
});
