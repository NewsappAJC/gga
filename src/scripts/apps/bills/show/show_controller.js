define(["app","apps/bills/show/show_view"], function(GeneralAssemblyApp, View) {
  "use strict";

  GeneralAssemblyApp.module("BillsApp.Show", function(Show, GeneralAssemblyApp, Backbone, Marionette, $) {
    Show.Controller = {
      showBill: function(param) {
        // param is appended to the end of hte api request url -- it can be
        // either the bill id or a string with the doc type (i.e. HB) and
        // bill number separated by a '/'
        require(["entities/bill"], function() {
          var fetchingBill = GeneralAssemblyApp.request("bills:bill", param);
          var billLayout = new View.BillLayout();

          $.when(fetchingBill).done(function(bill) {
            window.bill = bill;
            var billView = new View.BillView({
              model: bill
            });

            var author = new GeneralAssemblyApp.Entities.BillAuthors( bill.get("author") );
            var authorView = new View.AuthorsView({ collection: author });

            var coauthors = new GeneralAssemblyApp.Entities.BillAuthors( bill.get("coauthors") );
            var coauthorsView = new View.AuthorsView({ collection: coauthors });

            var bill_status_listings = new GeneralAssemblyApp.Entities.BillStatusListings( bill.get("bill_status_listings" ) );
            var stausListingsView = new View.StatusListingsView({ collection: bill_status_listings });

            var bill_versions = new GeneralAssemblyApp.Entities.BillVersions( bill.get("versions") );
            var versionListingsView = new View.VersionsListingView({ collection: bill_versions });

            var bill_votes = new GeneralAssemblyApp.Entities.BillVotes( bill.get("votes") );
            var votesListingsView = new View.VotesListingView({ collection: bill_votes });

            billLayout.on("show", function() {
              billLayout.billRegion.show(billView);
              billLayout.authorRegion.show(authorView);
              billLayout.coauthorsRegion.show(coauthorsView);
              billLayout.statusRegion.show(stausListingsView);
              billLayout.versionRegion.show(versionListingsView);
              billLayout.voteRegion.show(votesListingsView);
            });

            GeneralAssemblyApp.mainRegion.show(billLayout);
          });
        });
      }
    };
  });
  return GeneralAssemblyApp.BillsApp.Show.Controller;
});
