GeneralAssemblyApp.module("MembersApp.List", function(List, GeneralAssemblyApp, Backbone, Marionette, $, _) {
  List.Layout = Marionette.Layout.extend({
    template: "#member-list-layout",
    regions: {
      panelRegion: "#panel-region",
      membersRegion: "#members-region"
    }
  });

  List.Panel = Marionette.ItemView.extend({
    template: "#member-list-panel",
    className: "container"
  })

  List.Member = Marionette.ItemView.extend({
    template: "#member-icon-template",
    events: {
      "click div.js-show-member-detail": "showMemberDetail"
    },

    showMemberDetail: function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.trigger("member:show", this.model);
    }
  });

  List.Members = Marionette.CollectionView.extend({
    itemView: List.Member
    // template: "#member-list-template",
    // itemViewContainer: "#members-container"
  });
});