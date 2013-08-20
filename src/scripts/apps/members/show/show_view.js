GeneralAssemblyApp.module("MembersApp.Show", function(Show, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  Show.Layout = Marionette.Layout.extend({
    template: "#member-show-layout",
    regions: {
      detailRegion: "#detail-region",
      topContributorsRegion: "#top-contributors-region"
    }
  });

  Show.Detail = Marionette.ItemView.extend({
    template: "#member-detail-template"
  });

  Show.TopContributor = Marionette.ItemView.extend({
    tagName: 'tr',
    template: "#top-contributor-template"
  });

  Show.TopContributors = Marionette.CompositeView.extend({
    tagName: 'table',
    className: "table table-hover",
    itemView: Show.TopContributor,
    template: "#top-contributors-table-template",
    itemViewContainer: "tbody"
  });
});
