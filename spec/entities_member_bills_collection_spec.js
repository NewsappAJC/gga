describe("MemberBills collection", function() {
  it("should have correct url", function() {
    var member_bills = new GeneralAssemblyApp.Entities.MemberBills(1);
    expect(member_bills.url).toMatch(/\/api\/members\/1\/bills$/);
  });

  describe("Constructor", function() {
    it("should be a function", function() {
      expect(typeof(GeneralAssemblyApp.Entities.MemberBills)).toEqual("function");
    });

    it("should create a new collection object", function() {
      var member_bills = new GeneralAssemblyApp.Entities.MemberBills();
      expect(typeof(member_bills)).toEqual("object");
      expect(Array.isArray(member_bills.models)).toEqual(true);
    });
  });

  describe("member:bills request handler", function() {
    var server;
    beforeEach(function() {
      server = sinon.fakeServer.create();
    });
    afterEach(function() {
      server.restore();
    });

    it("should trigger and ajax request", function(){
      expect(server.requests.length).toEqual(0)
      GeneralAssemblyApp.request("member:bills");
      expect(server.requests.length).toEqual(1)
    });

    it("should use correct url", function() {
      GeneralAssemblyApp.request("member:bills", 1);
      expect(server.requests[0].url).toMatch(/\/api\/members\/1\/bills$/);
    });
  });
});
