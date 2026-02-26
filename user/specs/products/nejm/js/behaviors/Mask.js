A17.Behaviors.Mask = function(container) {

  function _handleClicks() {
    min$(document).trigger('navPrimary:hide');
    min$(document).trigger('search:hide');
    min$(document).trigger('modal:hide');
    min$(document).trigger('NEJMGroupDDToggle:hide');
  }

  function _init() {
    container.addEventListener('touchend', _handleClicks, false);
    container.addEventListener('click', _handleClicks, false);
  }

  this.destroy = function() {
    // remove specific event handlers
    container.removeEventListener('touchend', _handleClicks);
    container.removeEventListener('click', _handleClicks);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
