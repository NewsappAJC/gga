define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("Entities", function(Entities, GeneralAssemblyApp, Backbone, Marionette, $, _){
    // Bills
    Entities.bills_url = Entities.api_base + 'bills/';

    Entities.Bill = Backbone.Model.extend({
      initialize: function(id) {
        this.url = Entities.bills_url + id;
      }
    });
    Entities.Bills = Backbone.Collection.extend({
      model: Entities.Bill,
      url: Entities.bills_url
    });

    // BillsCount
    Entities.BillsCount = Backbone.Model.extend({
      url: Entities.bills_url + "count/"
    });

    // BillAuthors
    Entities.BillAuthor = Backbone.Model.extend({
      initialize: function() {
        var full_name = this.get("name_first") + " ";
        if ( ! _.isNull(this.get("name_middle")) ) {
          full_name += this.get("name_middle") + " ";
        }
        if ( ! _.isNull(this.get("name_nickname")) ) {
          full_name += "'" + this.get("name_nickname") + "' ";
        }

        full_name += this.get("name_last");
        this.set("full_name", full_name);
      }
    });
    Entities.BillAuthors = Backbone.Collection.extend({
      model: Entities.BillAuthor
    });

    // BillStatusListings
    Entities.BillStatusListing = Backbone.Model.extend({
      initialize: function() {
        this.set("status_date", new Date(this.get("status_date")));
      }
    });
    Entities.BillStatusListings = Backbone.Collection.extend({
      model: Entities.BillStatusListing
    });

    // BillVersions
    Entities.BillVersion = Backbone.Model.extend();
    Entities.BillVersions = Backbone.Collection.extend({
      model: Entities.BillVersion
    });

    // BillVotes
    Entities.BillVote = Backbone.Model.extend({
      initialize: function() {
        this.set("vote_date", new Date(this.get("vote_date")));
      }
    });
    Entities.BillVotes = Backbone.Collection.extend({
      model: Entities.BillVote
    });

    var API = {
      getBillsCount: function() {
        var defer = $.Deferred();
        Entities.bills_count = new Entities.BillsCount();
        Entities.bills_count.fetch({
          dataType: "jsonp",
          success: function(data) {
            defer.resolve(data);
          }
        });
        return defer.promise();
      },

      getBill: function(param) {
        // param is appended to the end of hte api request url -- it can be
        // either the bill id or a string with the doc type (i.e. HB) and
        // bill number separated by a '/'
        var defer = $.Deferred();
        var bill = new Entities.Bill(param);
        bill.fetch({
          dataType: "jsonp",
          success: function(data) {
            defer.resolve(data);
          }
        });
        return defer.promise();
      },

      getBills: function() {
        var defer = $.Deferred();
        var bills = new Entities.Bills();
        bills.fetch({
          dataType: "jsonp",
          success: function() {
            // TODO: Ensure this is not dead code and resolve with data
            defer.resolve();
          }
        });
        return defer.promise();
      }
    };

    GeneralAssemblyApp.reqres.setHandler("bills:count", function() {
      return API.getBillsCount();
    });

    GeneralAssemblyApp.reqres.setHandler("bills:bill", function(param) {
      // param is appended to the end of hte api request url -- it can be
      // either the bill id or a string with the doc type (i.e. HB) and
      // bill number separated by a '/'
      return API.getBill(param);
    });

    GeneralAssemblyApp.reqres.setHandler("bills:bill:bynumber", function(doctype, number) {
      return API.getBillByNumber(doctype, number);
    });

    GeneralAssemblyApp.reqres.setHandler("bills:list", function() {
      return API.getBills();
    });
  });
  return GeneralAssemblyApp.Entities.Bill;
});
