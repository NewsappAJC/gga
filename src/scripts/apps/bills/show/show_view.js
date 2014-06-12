define(["app"], function(GeneralAssemblyApp) {
  "use strict";

  GeneralAssemblyApp.module("BillsApp.Show.View", function(View, GeneralAssemblyApp, Backbone, Marionette, $) {
    View.BillLayout = Marionette.Layout.extend({
      template: "#bill-detail-layout",
      className: "container",
      regions: {
        billRegion: "#bill-region",
        authorRegion: "#author-region",
        coauthorsRegion: "#coauthors-region",
        statusRegion: "#status-region",
        versionRegion: "#version-region",
        voteRegion: "#vote-region"
      },
      onShow: function() {
        $(document).tooltip({
          predelay: 0,
          cancelDefault: true
        });
      }
    });

    View.BillView = Marionette.ItemView.extend({
      template: "#bill-detail-template",
      className: "panel panel-default",

      onShow: function() {
        var crossover_status = this.model.get("passed_over");
        var bar = $(".progress-bar");
        var prog = bar.attr("aria-valuenow");
        $(bar).addClass(function() {
          return prog <= 20 ? "progress-bar-danger" :
                 prog < 80 ? "progress-bar-warning" :
                 "progress-bar-success";
        });

        if (crossover_status === -1) {
          var billnum = $(".billnumhed");
          $(billnum).addClass("red");
        }
      }
    });

    // Bill author views
    View.AuthorView = Marionette.ItemView.extend({
      tagName: "li",
      className: function() {
        return "media " + this.model.get("party");
      },
      template: "#bill-author-template"
    });
    View.AuthorsView = Marionette.CompositeView.extend({
      itemView: View.AuthorView,
      template: "#bill-author-list",
      itemViewContainer: "#bill-authors"
    });

    // Bill status views
    View.StatusView = Marionette.ItemView.extend({
      tagName: "li",
      className: "list-group-item",
      template: "#bill-status-template"
    });
    View.StatusListingsView = Marionette.CollectionView.extend({
      itemView: View.StatusView,
      tagName: "ul",
      className: "list-group"
    });

    // Bill version views
    View.VersionView = Marionette.ItemView.extend({
      tagName: "li",
      className: "list-group-item",
      template: "#bill-version-template"
    });
    View.VersionsListingView = Marionette.CollectionView.extend({
      itemView: View.VersionView,
      tagName: "ul",
      className: "list-group"
    });

    // Bill vote views
    View.VoteView = Marionette.ItemView.extend({
      tagName: "tr",
      template: "#bill-vote-template"
    });
    View.VotesListingView = Marionette.CompositeView.extend({
      itemView: View.VoteView,
      template: "#bill-votes-listing-template",
      tagName: "table",
      className: "table table-hover table-condensed table-bordered",
      itemViewContainer: "tbody"
    });
  });
  return GeneralAssemblyApp.BillsApp.Show.View;
});
