define(["app"], function(GeneralAssemblyApp) {
  GeneralAssemblyApp.module("Common", function(Common, GeneralAssemblyApp, Backbone, Marionette, $, _) {

    Common.updatePanel = function(){
      var $updateBox = $("#updateBox");
      var timeout = setTimeout(function(){ $updateBox.collapse('show'); clearTimeout(timeout);}, 1000);

      var closeTimeout = setTimeout(function(){
        $updateBox.collapse('hide');
        toggleArrow();
        clearTimeout(closeTimeout);
      },5000);

      $('#closeUpdate').on("click", function(){
        $updateBox.collapse('hide');
        toggleArrow();
      });

      $("#whatsNew").on("click", toggleArrow);

      function toggleArrow(){
        $("#updatesArrow").toggleClass("fa-sort-desc fa-sort-asc");
      }
    }

    /*removed social toolbar for now
    Common.tweet = function(d, s, id){
      var s = typeof s !== "undefined" ? s : "script";
      var id = typeof id !== "undefined" ? id : "twitter-wjs";

      var js,
          fjs=d.getElementsByTagName(s)[1],
          p=/^http:/.test(d.location)?'http':'https';
      console.log(fjs);
      if (!d.getElementById(id)) {
        js=d.createElement(s);
        js.id=id;
        js.src=p+'://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js,fjs);
      }
    };

    Common.facebook = function(d, s, id) {
      var s = typeof s !== "undefined" ? s : 'script';
      var id = typeof id !== "undefined" ? id : 'facebook-jssdk';

      var js, fjs = d.getElementsByTagName(s)[0];
      console.log(fjs);
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "http://connect.facebook.net/en_US/all.js#xfbml=1&appId=1446015978947149";
      fjs.parentNode.insertBefore(js, fjs);
    }*/
  });
  return GeneralAssemblyApp.Common
});
