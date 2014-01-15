define(["app","apps/bills/show/show_view"], function(GeneralAssemblyApp, View) {
  GeneralAssemblyApp.module("BillsApp.Show", function(Show, GeneralAssemblyApp, Backbone, Marionette, $, _) {
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
            billView = new View.BillView({
              model: bill
            });

            author = new GeneralAssemblyApp.Entities.BillAuthors( bill.get("author") );
            authorView = new View.AuthorsView({ collection: author });

            coauthors = new GeneralAssemblyApp.Entities.BillAuthors( bill.get("coauthors") );
            coauthorsView = new View.AuthorsView({ collection: coauthors });

            bill_status_listings = new GeneralAssemblyApp.Entities.BillStatusListings( bill.get("bill_status_listings" ) );
            stausListingsView = new View.StatusListingsView({ collection: bill_status_listings });

            bill_versions = new GeneralAssemblyApp.Entities.BillVersions( bill.get("versions") );
            versionListingsView = new View.VersionsListingView({ collection: bill_versions });

            bill_votes = new GeneralAssemblyApp.Entities.BillVotes( bill.get("votes") );
            votesListingsView = new View.VotesListingView({ collection: bill_votes });

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
