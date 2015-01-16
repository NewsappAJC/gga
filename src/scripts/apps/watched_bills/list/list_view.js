define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("WatchedBillsApp.List.View", function(View, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    View.CategoriesLayout = Marionette.Layout.extend({
      template: "#bill-category-layout",
      regions: {
        categoriesRegion: "#bill-category-region",
        eventsRegion: "#bill-event-region",
        billsCountRegion: "#bills-count-region"
      },
      events: {
        "submit form#bill-search": "showBill"
      },
      showBill: function(e) {
        e.preventDefault();
        e.stopPropagation();
        var doctype = $("#document-type").val();
        var number = $("#number").val();
        GeneralAssemblyApp.trigger("bills:show", doctype + '/' + number);
      },
      onShow: function() {
        $("li#default-tab a").click();
      }
    });

    View.CategoryView = Marionette.ItemView.extend({
      template: "#bill-category-template",
      className: "col-sm-3",
      events: {
        "click div.watched-bill": "showBillsCategory"
      },
      showBillsCategory: function(e) {
        e.preventDefault();
        e.stopPropagation();
        GeneralAssemblyApp.trigger("watchedbills:categories:show", this.model.get("name"))
      }
    });

    View.CategoriesView = Marionette.CollectionView.extend({
      itemView: View.CategoryView
      // className: "container"
    });

    View.DailyJournalLayout = Marionette.Layout.extend({
      template: "#daily_journal_layout",
      regions: {
        legislativeDayRegion: "#legislative-day-region",
        dailyVotesRegion: "#daily-votes-region",
        dailyEventsRegion: "#daily-events-region"
      }
    });

    View.LegislativeDayView = Marionette.ItemView.extend({
      template: "#legislative-day-template"
    });

    View.DailyVotesView = Marionette.ItemView.extend({
      template: "#daily-votes-template"
    });

    View.EventView = Marionette.ItemView.extend({
      template: "#event-template",
      tagName: "li"
    })

    View.DailyEventsView = Marionette.CompositeView.extend({
      itemView: View.EventView,
      template: "#daily-events-template",
      itemViewContainer: "#daily-events"
    });

  });
  return GeneralAssemblyApp.WatchedBillsApp.List.View;
});
