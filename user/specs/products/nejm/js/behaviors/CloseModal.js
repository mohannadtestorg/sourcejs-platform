A17.Behaviors.CloseModal = function(container) {

  function _handleClicks(event) {
    event.preventDefault();
    container.blur();
    min$(document).trigger('modal:hide');
    min$(document).trigger('trigger:decide');
  }

  function _init() {
    container.addEventListener('click', _handleClicks, false);
  }

  this.destroy = function() {
    // remove specific event handlers
    container.removeEventListener('click', _handleClicks);
    min$(document).trigger('trigger:decide');
    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
