GeneralAssemblyApp.module("MembersApp.List", function(List, GeneralAssemblyApp, Backbone, Marionette, $, _) {
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

  List.Members = Marionette.CompositeView.extend({
    itemView: List.Member,
    template: "#member-list-template",
    itemViewContainer: "#members-container"
  });
})