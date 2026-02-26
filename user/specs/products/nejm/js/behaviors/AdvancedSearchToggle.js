A17.Behaviors.AdvancedSearchToggle = function(container) {

  function _handleClicks(event) {
    event.preventDefault();
    container.blur();
    min$(document).trigger('search:advanced:toggle');
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
