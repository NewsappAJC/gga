define(["app","apps/watched_bills/list/list_view"], function(GeneralAssemblyApp, View) {
  GeneralAssemblyApp.module("WatchedBillsApp.List", function(List, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    List.Controller = {
      listCategories: function() {
        require(["entities/watched_bill","entities/bill","entities/events","entities/votes"], function() {
          var fetchingWatchedBills = GeneralAssemblyApp.request("watched_bills:collection");
          var fetchingBillsCount = GeneralAssemblyApp.request("bills:count");
          var fetchingDays = GeneralAssemblyApp.request("days");
          var categories_layout = new View.CategoriesLayout();
          var daily_journal_layout = new View.DailyJournalLayout()

          $.when(fetchingWatchedBills, fetchingBillsCount, fetchingDays).done(function(watched_bills, bills_count, days) {
            category_model_data = _.chain(watched_bills.models)
              .countBy(function(model) { return model.get("category") })
              .pairs()
              .map(function(model) { return {name: model[0], count: model[1]}; })
              .value();

            var categories = new GeneralAssemblyApp.Entities.BillCategories( category_model_data );

            var categories_view = new View.CategoriesView({
              collection: categories
            });

            var bills_count_view = new GeneralAssemblyApp.Common.View.BillsCountView({
              model: bills_count,
              className: "jumbotron"
            });

            var legislative_day_view = new View.LegislativeDaysListView({
              collection: days
            });

            var yesterday = days.last();
            var fetchingEvents = GeneralAssemblyApp.request("bill:events", yesterday.get('legislative_day_date'));
            var fetchingVotes = GeneralAssemblyApp.request("daily:votes", yesterday.get('legislative_day_date'));

            $.when(fetchingEvents, fetchingVotes).done(function(events, votes) {
              var daily_votes_view = new View.DailyVotesView({collection: votes});
              var daily_events_view = new View.DailyEventsView({collection: events});

              daily_journal_layout.on("show", function() {
                daily_journal_layout.legislativeDayRegion.show(legislative_day_view);
                daily_journal_layout.dailyVotesRegion.show(daily_votes_view);
                daily_journal_layout.dailyEventsRegion.show(daily_events_view);
              });

              categories_layout.on("show", function() {
                categories_layout.billsCountRegion.show(bills_count_view);
                categories_layout.categoriesRegion.show(categories_view);
                categories_layout.eventsRegion.show(daily_journal_layout);
              });

              GeneralAssemblyApp.mainRegion.show(categories_layout);
            })

          });
        });
      },
      listWatchedBills: function(category) {
      }
    }
  });
  return GeneralAssemblyApp.WatchedBillsApp.List.Controller;
});
