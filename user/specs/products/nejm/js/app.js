/*

  A17

  Doc: // Doc: https://code.area17.com/a17/fe-boilerplate/wikis/js-app

*/

// set up a master object
var A17 = window.A17 || {};

// HTML4 browser?
if (!A17.browserSpec || A17.browserSpec === 'html4') {
  // lets kill further JS execution of A17 js here
  throw new Error('HTML4');
}

// set up some objects within the master one, to hold my Helpers and behaviors
A17.Behaviors = {};
A17.Helpers = {};
A17.Functions = {};
A17.currentMediaQuery = 'large';
A17.activeBehaviors = {};
A17.previousAjaxPageLoadType = null;
A17.windowHash = (window.location.hash) ? window.location.hash.replace('#', '') : null;
//window.location.hash = "";

// set up and trigger looking for the behaviors on DOM ready
A17.onReady = function(){

  // sort out which media query we're using
  A17.currentMediaQuery = A17.Helpers.getCurrentMediaQuery();

  // on resize, check
  A17.Helpers.resized();

  // window hash onload?
  A17.Functions.windowHashOnLoad();

  // listen for main menu, search open/close
  A17.Functions.navPrimaryToggle();
  A17.Functions.searchToggle();
  A17.Functions.searchFiltersToggle();

  // listen for requests to lock the body (useful for modals etc)
  A17.Functions.lockBody();

  // Internal window.history checking
  A17.Functions.history();

  // Ajax page load function
  A17.Functions.ajaxPageLoad();

  // Ajax progress bar and page mask
  A17.Functions.loadProgressBar();
  A17.Functions.ajaxPageLoadMaskToggle();

  // Listen for modals being opened
  A17.Functions.modal();

  // Toggle leaderboard based on Ad displayed or not
  A17.Functions.leaderBoard();

  // https://github.com/bfred-it/object-fit-images
  objectFitImages();

  // go go go
  A17.Helpers.manageBehaviors();
};

document.addEventListener('DOMContentLoaded', function(){
  A17.onReady();
});

// make console.log safe
if (typeof console === 'undefined') {
  window.console = {
    log: function () {
      return;
    }
  };
}
