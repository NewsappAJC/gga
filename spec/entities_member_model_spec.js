describe("Member model", function() {
  var member;
  beforeEach(function() {
    member = new GeneralAssemblyApp.Entities.Member();
  });

  it("should create a new Backbone.Model object", function() {
    expect(member).toEqual(jasmine.any(Backbone.Model));
  });

  it("should have a tooltip_info attribute", function() {
    expect(member.get("tooltip_info")).toBeDefined();
  });

  it("it should return tooltip_info with name, hometown", function() {
    var member_with_name_hometown = new GeneralAssemblyApp.Entities.Member({
      full_name: "George Washington",
      district_address_city: "Georgetown",
      title: ""
    });

    expect(member_with_name_hometown.get("tooltip_info")).toMatch("George Washington, Georgetown");
  });

  it("it should return tooltip_info with title if present", function() {
    var member_with_title = new GeneralAssemblyApp.Entities.Member({
      full_name: "George Washington",
      district_address_city: "Georgetown",
      title: "President"
    });

    expect(member_with_title.get("tooltip_info")).toMatch("George Washington, Georgetown, President");
  });
});