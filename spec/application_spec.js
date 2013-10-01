describe("GeneralAssemblyApp", function() {
  it("should be an object", function() {
    expect(typeof(GeneralAssemblyApp)).toEqual("object");
  });

  describe("GeneralAssemblyApp.navigate function", function() {
    it("should navigate to new route", function() {
      Backbone.history.start();
      GeneralAssemblyApp.navigate("test_route1");

      expect(Backbone.history.fragment).toEqual("test_route1");

      Backbone.history.stop();
    });
  });

  describe("GeneralAssemblyApp.getCurrentRoute", function() {
    it("should return current route fragment", function() {
      Backbone.history.start();
      Backbone.history.navigate("test_route2");
      console.log(GeneralAssemblyApp.getCurrentRoute());

      expect(GeneralAssemblyApp.getCurrentRoute()).toEqual(Backbone.history.fragment);

      Backbone.history.stop();
    });
  });

  // describe("Initialize", function() {
  //   it("should start Backbone.history", function() {
  //     loadFixtures("main-region.html");
  //     Backbone.history.started = null;
  //     Backbone.history.stop();
  //     var spy = sinon.spy(Backbone.history, "start");
  //     GeneralAssemblyApp.start();

  //     expect(Backbone.history.start).toHaveBeenCalled();

  //     Backbone.history.start.restore();
  //   });
  // });
});
