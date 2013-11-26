GeneralAssemblyApp.module("BillsApp.Show", function(Show, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  Show.Controller = {
    showBill: function(id) {
      var fetchingBill = GeneralAssemblyApp.request("bills:bill", id);
      var billLayout = new Show.BillLayout();

      $.when(fetchingBill).done(function(bill) {
        window.bill = bill;
        billView = new Show.BillView({
          model: bill
        });

        author = new GeneralAssemblyApp.Entities.BillAuthors( bill.get("author") );
        authorView = new Show.AuthorsView({ collection: author });

        coauthors = new GeneralAssemblyApp.Entities.BillAuthors( bill.get("coauthors") );
        coauthorsView = new Show.AuthorsView({ collection: coauthors });

        bill_status_listings = new GeneralAssemblyApp.Entities.BillStatusListings( bill.get("bill_status_listings" ) );
        stausListingsView = new Show.StatusListingsView({ collection: bill_status_listings });

        bill_versions = new GeneralAssemblyApp.Entities.BillVersions( bill.get("versions") );
        versionListingsView = new Show.VersionsListingView({ collection: bill_versions });

        billLayout.on("show", function() {
          billLayout.billRegion.show(billView);
          billLayout.authorRegion.show(authorView);
          billLayout.coauthorsRegion.show(coauthorsView);
          billLayout.statusRegion.show(stausListingsView);
          billLayout.versionRegion.show(versionListingsView);
        });

        GeneralAssemblyApp.mainRegion.show(billLayout);
      });
    }
  };
});