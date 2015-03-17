define(["app","apps/bills/list/list_view"], function(GeneralAssemblyApp, View) {
  GeneralAssemblyApp.module("BillsApp.List", function(List, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    List.Controller = {
      ListBills: function(criterion) {
        require(["entities/bill"], function() {
        });
      },
      ListBillsByEvent: function(event) {
        headlines = {
          passed_house: "Bills Passed by the House",
          passed_senate: "Bills Passed by the Senate",
          sent_to_governor: "Bills Sent to the Governor",
          signed: "Bills Signed by the Governor",
          vetoed: "Vetoed Bills"
        }
        require(["entities/bill"], function() {
          var fetchingBills = GeneralAssemblyApp.request("bills:list:byevent", event);
          var headline = headlines[event];
          var billListLayout = new View.CompactLayout();
          var headlineView = new View.HeadlineView({
            model: new Backbone.Model({ category: headline })
          });

          $.when(fetchingBills).done(function(bills) {
            var billListView = new View.BillCompactListView({
              collection: bills
            });

            billListLayout.on("show", function() {
              billListLayout.headlineRegion.show(headlineView);
              billListLayout.billListRegion.show(billListView);
              $(document).tooltip({
                predelay: 0,
                cancelDefault: true
              });
            });
            GeneralAssemblyApp.mainRegion.show(billListLayout);
          });
        });
      }
    };
  });
  return GeneralAssemblyApp.BillsApp.List.Controller;
});
