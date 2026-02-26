A17.Functions.windowHashOnLoad = function() {

  if (A17.windowHash) {
    var $target = document.getElementById(A17.windowHash);
    if ($target) {

      if ($target.tagName.toLowerCase() === 'mark') {

        A17.Functions.setFocusOnTarget($target);

        min$(document).trigger('history:replacestate', {
          url: '#'+A17.windowHash
        });

        var budge = (A17.currentMediaQuery.indexOf('large') > -1) ? 79 : 10;
        var offsetTarget = A17.Helpers.getOffset($target).top - budge;

        window.scrollTo(0, offsetTarget);
        setTimeout(function(){
          window.scrollTo(0, offsetTarget);
        },16);

      }

    }
  }

};
