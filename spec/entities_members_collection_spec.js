describe("Members collection", function() {
  it("should be a function", function() {
    expect(typeof(GeneralAssemblyApp.Entities.MembersCollection)).toEqual("function");
  });

  it("should create a new collection object", function() {
    members_collection = new GeneralAssemblyApp.Entities.MembersCollection();
    expect(typeof(members_collection)).toEqual("object");
    expect(Array.isArray(members_collection.models)).toEqual(true);
  });

  it("should have correct url", function() {
    members_collection = new GeneralAssemblyApp.Entities.MembersCollection();
    expect(members_collection.url).toMatch(/\/api\/members/);
  });

  it("should order members by chamber, district", function() {
    var models = [];
    models.push(new GeneralAssemblyApp.Entities.Member({
        district_type: "Senate",
        district_number: 1,
        expected_index: 2
      }));
      models.push(new GeneralAssemblyApp.Entities.Member({
        district_type: "House",
        district_number: 3,
        expected_index: 1
      }));
      models.push(new GeneralAssemblyApp.Entities.Member({
        district_type: "House",
        district_number: 2,
        expected_index: 0
      }));

      member_collection = new GeneralAssemblyApp.Entities.MembersCollection(models);

      for(var i = 0; i < members_collection.length; i++) {
        expect(member_collection.mmodels[i].get("expected_index")).toEqual(i);
      }
  });

  describe("Request Handlers", function() {
    var server;
    beforeEach(function() {
      server = sinon.fakeServer.create();
      GeneralAssemblyApp.Entities.members = new GeneralAssemblyApp.Entities.MembersCollection();
    });
    afterEach(function() {
      server.restore();
    });
    describe("member:collection request", function() {
      beforeEach(function() {
        GeneralAssemblyApp.Entities.members = new GeneralAssemblyApp.Entities.MembersCollection();
      });

      it("should returm members collection in response to 'members:collection' request", function() {
        member = new GeneralAssemblyApp.Entities.Member({id: 1});
        GeneralAssemblyApp.Entities.members.add(member);
        response = GeneralAssemblyApp.request("members:collection");

        expect(response).toEqual(GeneralAssemblyApp.Entities.members);
      });

      it("should trigger an ajax data request in response to 'members:collection' request", function() {
        GeneralAssemblyApp.request("members:collection");
        expect(server.requests.length).toEqual(1);
      });

      it("should not trigger an ajax request in response to 'members:collection' request if collection is not empty", function() {
        member = new GeneralAssemblyApp.Entities.Member({id: 1});
        GeneralAssemblyApp.Entities.members.add(member);
        GeneralAssemblyApp.request("members:collection");

        expect(server.requests.length).toEqual(0);
      });
    });

    describe("members:member request", function() {
      xit("should return specified member", function() {
        var models = [];
        models.push(new GeneralAssemblyApp.Entities.Member({id:1}));
        models.push(new GeneralAssemblyApp.Entities.Member({id:3}));
        models.push(new GeneralAssemblyApp.Entities.Member({id:2}));
        var member_collection = new GeneralAssemblyApp.Entities.MembersCollection(models);

        response = GeneralAssemblyApp.request("members:member", 1);
        expect(response).toEqual(GeneralAssemblyApp.Entities.members.where({id:1})[0]);
      })
    });
  });
});
