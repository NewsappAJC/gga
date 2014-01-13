define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("Common", function(Common, GeneralAssemblyApp, Backbone, Marionette, $, _) {
    Common.tweet = function(d, s, id){
      var s = typeof s !== "undefined" ? s : "script";
      var id = typeof id !== "undefined" ? id : "twitter-wjs";
      var js,
          fjs=d.getElementsByTagName(s)[0],
          p=/^http:/.test(d.location)?'http':'https';
      if (!d.getElementById(id)) {
        js=d.createElement(s);
        js.id=id;
        js.src=p+'://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js,fjs);
      }
    };
  });
  return GeneralAssemblyApp.Common
});
