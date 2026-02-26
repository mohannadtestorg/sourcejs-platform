A17.Behaviors.HandleAnchorLinks = function(container) {

  var budge = 0;
  var offsetTarget;

  function _updateBudge() {
    budge = (A17.currentMediaQuery.indexOf('large') > -1) ? 79 : 10;
  }

  function _handleClicks(event) {
    event.preventDefault();
    var targetID = this.href.split('#')[1];
    if (targetID && targetID !== '#' && !this.getAttribute('data-behavior')) {
      _updateBudge();
      var $target = document.getElementById(targetID);
      if ($target) {
        if (this.getAttribute('data-inline-tabs-link') !== '') {
          min$(document).trigger('history:replacestate', {
            url: '#'+targetID
          });
          offsetTarget = A17.Helpers.getOffset($target).top - budge;
        } else {
          offsetTarget = A17.Helpers.getOffset(this).top - budge;
        }
        A17.Helpers.scrollToY({
          el: document,
          offset: offsetTarget,
          duration: 1000,
          easing: 'easeInOut',
          onComplete: function() {
            A17.Functions.setFocusOnTarget($target);
            window.scrollTo(0, offsetTarget);
            min$(document).trigger('page:updated');
          }
        });
        min$(document).trigger('articleTools:subnav:close');
        min$($target).trigger('collapsible:open');
      }
    }
  }

  function _init() {
    min$('a[href^="#"]', container).on('click', _handleClicks);
  }

  this.destroy = function() {
    // remove specific event handlers
    min$('a[href^="#"]', container).off('click', _handleClicks);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
