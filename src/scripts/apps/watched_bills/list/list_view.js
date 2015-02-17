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
        "submit form#bill-search": "showBill",
        "click #bill-text-search-go": "getSearchResults"
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
      },

      getSearchResults: function() {
        // This is code provided by The Dude to implement bill text search
        that = this;
        var z = $('#bill-text-search-input').val();
        var x = $.trim(z);
        x = x.replace(/ /g, '+');
        $.ajax({
            type: "GET",
            cache: false,
            url: 'https://www.documentcloud.org/api/search.json?mentions=10&q=projectid%3A17285+' + x
        })
        .done(function(res) {
            y = res;
            that.renderSearchResults(y,z);

        });
      },

      renderSearchResults: function(x,y) {
        // This is code provided by The Dude to implement bill text search
        for(var i=0;i<x.documents.length;i++){
            var thisstring = '<div id="' + x.documents[i].title + '" class="docitem"><div><div><img class="doc" src="' + x.documents[i].resources.thumbnail + '" /></div><div class="topinfo"><a href="' + x.documents[i].resources.pdf + '" target="_blank">' + x.documents[i].title + '</a><br><span>' + x.documents[i].pages + ' page(s) - Source: ' + x.documents[i].source + ' - Uploaded: ' + x.documents[i].updated_at + '</span><br><span>' + x.documents[i].description + '</span></div></div></div>';
            $s = $(thisstring);
            var nextstring = '<div class="subdiv"><div class="doc-pageinfo"><span>' + x.documents[i].mentions.length + ' page(s) mentioning &ldquo;' + y + '&rdquo;</span></div></div>';
            $t = $(nextstring);

            for(var j=0;j<x.documents[i].mentions.length;j++){
                var pagelink = x.documents[i].resources.page.image;
                pagelink = pagelink.replace("{page}",x.documents[i].mentions[j].page);
                pagelink = pagelink.replace("{size}","thumbnail");
                var istring = '<div class="subitem"><a href="https://www.documentcloud.org/documents/' + x.documents[i].id + '.html#search/p' + x.documents[i].mentions[j].page + '/' + encodeURI(y) + '" alt="Go To Page" target="_blank"><img class="docsub" src="' + pagelink + '" /></a><div><span>' + x.documents[i].mentions[j].text + '</span></div></div>'
                $u = $(istring);
                $t.append($u);
            }

            $s.append($t);
            $('#doclist').append($s);
        }
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
      template: "#legislative-day-template",
      tagName: "li",
      className: "day-item"
    });

    View.LegislativeDaysListView = Marionette.CompositeView.extend({
      itemView: View.LegislativeDayView,
      template: "#legislative_day_list_template",
      className: "center",
      itemViewContainer: "#days",
      events: {
        "click #events-previous" : "showPreviousEvent",
        "click #events-next"     : "showNextEvent"
      },

      initialize: function() {
        this.index = this.collection.length - 1;
      },

      showPreviousEvent: function() {
        if (this.index > 0) {
          this.index = this.index - 1;
          GeneralAssemblyApp.trigger("daily:events:list", this.index);

          // Change display date
          $("ul.days-list li").removeClass("current");
          $($("ul.days-list li")[this.index]).addClass("current");
        }
      },

      showNextEvent: function() {
        if (this.index < this.collection.length - 1) {
          this.index = this.index + 1;
          GeneralAssemblyApp.trigger("daily:events:list", this.index);

          // Change display date
          $("ul.days-list li").removeClass("current");
          $($("ul.days-list li")[this.index]).addClass("current");
        }
      }
    });

    View.VoteView = Marionette.ItemView.extend({
      template: "#vote-template",
      tagName: "tr"
    });

    View.EmptyVotesView = Marionette.ItemView.extend({
      template: "#empty-votes-template"
    });

    View.DailyVotesView = Marionette.CompositeView.extend({
      itemView: View.VoteView,
      template: "#daily-votes-template",
      itemViewContainer: "#daily-votes",
      emptyView: View.EmptyVotesView,

      initialize: function () {
        var view = this;
        this.listenTo(GeneralAssemblyApp, "daily:events:list", function(index) {
          var date = GeneralAssemblyApp.Entities.days.models[index].get("legislative_day_date");
          var fetchingVotes = GeneralAssemblyApp.request("daily:votes", date);

          $.when(fetchingVotes).done(function(votes) {
            view.collection = votes;
            view.render();
          });
        });
      }

    });

    View.EventView = Marionette.ItemView.extend({
      template: "#event-template",
      tagName: "li"
    })

    View.EmptyEventsView = Marionette.ItemView.extend({
      template: "#empty-events-template"
    });

    View.DailyEventsView = Marionette.CompositeView.extend({
      itemView: View.EventView,
      template: "#daily-events-template",
      itemViewContainer: "#daily-events",
      emptyView: View.EmptyEventsView,

      initialize: function () {
        var view = this;
        this.listenTo(GeneralAssemblyApp, "daily:events:list", function(index) {
          var date = GeneralAssemblyApp.Entities.days.models[index].get("legislative_day_date");
          var fetchingEvents = GeneralAssemblyApp.request("daily:events", date);

          $.when(fetchingEvents).done(function(events) {
            view.collection = events;
            view.render();
          });
        });
      }
    });

  });
  return GeneralAssemblyApp.WatchedBillsApp.List.View;
});
