A17.Behaviors.ShowPopupTip = function(container) {

  function _handleClicks(event) {
    event.preventDefault();
    event.stopPropagation();
    min$(document).trigger('popuptip:toggle', {
      opener: container,
    });
  }

  function _handleKeyPress(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      min$(document).trigger('popuptip:toggle', {
        opener: container,
      });
    }
  }

  function _init() {
    container.addEventListener('click', _handleClicks, false);
    container.addEventListener('keyup', _handleKeyPress, false);
  }

  this.destroy = function() {
    // remove specific event handlers
    container.removeEventListener('click', _handleClicks);
    container.removeEventListener('keyup', _handleKeyPress);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
