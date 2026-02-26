A17.Behaviors.DummyBehavior = function(container) {

  function _handleClicks() {
    // action
  }

  function _handleResized() {
    // action
  }

  function _init() {
    container.addEventListener('click', _handleClicks, false);
    document.addEventListener('resized', _handleResized);
  }

  this.destroy = function() {
    // remove specific event handlers
    container.removeEventListener('click', _handleClicks);
    document.removeEventListener('resized', _handleResized);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
