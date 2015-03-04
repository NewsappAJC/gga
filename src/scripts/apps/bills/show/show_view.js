define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("BillsApp.Show.View", function(View, GeneralAssemblyApp, Backbone, Marionette, $, _) {
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
        // var crossover_status = this.model.get("passed_over");
        // var bar = $(".progress-bar");
        // var prog = bar.attr("aria-valuenow");
        // $(bar).addClass(function() {
        //   return prog <= 20 ? "progress-bar-danger" :
        //          prog < 80 ? "progress-bar-warning" :
        //          "progress-bar-success";
        // });

        // Code to style unpassed bills red after crossover day
        // if (crossover_status === -1) {
        //   var billnum = $(".billnumhed")
        //   $(billnum).addClass("red");
        // }

        var data = this.model.get("predictions_history");

        var margin = {top: 20, right: 20, bottom: 40, left: 50},
            width = $('#predictions-chart').width() - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

        var formatPercent = d3.format(".0%");

        var x = d3.scale.linear()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .ticks(3)
            .orient("left")
            .tickFormat(formatPercent);

        var line = d3.svg.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.close); });

        var svg = d3.select("#predictions-chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


          data.forEach(function(d) {
            d.date = +d.legislative_day;
            d.close = +d.prediction;
          });

          x.domain([1,40]);
          y.domain([0,1]);

          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

          svg.append("g")
              .attr("class", "y axis")
              .call(yAxis);

          svg.append("path")
              .datum(data)
              .attr("class", "line")
              .attr("d", line);

          svg.append("rect")
              .data(data)
              .attr('x', function(d) { // sets the x position of the bar
                return x(24)-(width/80);
              })
              .attr('y', 0)
              .attr("height", height)
              .attr("width", width/80)
              .style("fill","#fff");

          svg.append("line")
             .attr("y1", 0)
             .attr("y2", height)
             .attr("x1", x(24)-(width/160))
             .attr("x2", x(24)-(width/160))
             .attr("class","prediction-marker");


          svg.append("text")
              .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
              .attr("class","x-label")
              .text("Legislative session days");

          svg.append("g")
              .attr("transform", "translate(" + (x(24)-(width/80)) + " ," + -10 + ")")
              .attr("class","model-change-label")
              .append("text")
              .text('Model revised*');
              

      }
    });


    // Bill author views
    View.AuthorView = Marionette.ItemView.extend({
      tagName: "li",
      className: function() {
        return "media " + this.model.get("party")
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
