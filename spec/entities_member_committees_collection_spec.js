describe("MemberCommittees collection", function() {
  it("should have correct url", function() {
    var member_committees = new GeneralAssemblyApp.Entities.MemberCommittees(1);
    expect(member_committees.url).toMatch(/\/api\/members\/1\/committees$/);
  });

  it("should create a new Backbone.Collection object", function() {
    var member_committees = new GeneralAssemblyApp.Entities.MemberCommittees();
    expect(member_committees).toEqual(jasmine.any(Backbone.Collection));
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
