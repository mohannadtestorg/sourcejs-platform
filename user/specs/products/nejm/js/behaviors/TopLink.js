// Edited by Bill Pairaktaridis for MMSPB-3429
A17.Behaviors.TopLink = function(container) {

  function _handleClicks(event) {
    event.preventDefault();
    container.blur();
    A17.Helpers.scrollToY({
      el: document,
      offset: 0,
      duration: 250,
      easing: 'easeInOut',
      onComplete: function() {
        A17.Functions.setFocusOnTarget(document.getElementById('pb-page-content'));
      }
    });
    // window.location.hash = ' ';
  }

  function _init() {
    container.addEventListener('click', _handleClicks, false);
  }

  this.destroy = function() {
    // remove specific event handlers
    container.removeEventListener('click', _handleClicks);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
