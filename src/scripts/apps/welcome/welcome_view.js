define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("WelcomeApp.View", function(View, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    View.WelcomeLayout = Marionette.Layout.extend({
      template: "#welcome-layout",
      regions: {
        billsCountRegion: "#bill-count-region"
      },
      events: {
        "click #bills": "showWatchedBills",
        "click #members": "showMembers"
      },
      showWatchedBills: function(e) {
        e.preventDefault();
        e.stopPropagation();
        GeneralAssemblyApp.trigger("watchedbills:categories:list");
      },
      showMembers: function(e) {
        e.preventDefault();
        e.stopPropagation();
        GeneralAssemblyApp.trigger("members:list");
      },
      onShow: function() {
        console.log("fired")
        var feed = new google.feeds.Feed("http://www.myajc.com/list/rss/news/state-regional-govt-politics/georgia-politics-news/aKdb/");
        feed.load(function(result) {
          if (!result.error) {
            var container = $("#news-feeds");
            for (var i = 0; i < result.feed.entries.length; i++) {
              var entry = result.feed.entries[i];
              container.append('<p><a calss="news-link" href="' + entry.link + '">' + entry.title + '</a></p>');
            }
          }
        });
      }
    });
  });
  return GeneralAssemblyApp.WelcomeApp.View;
});
