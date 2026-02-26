A17.Behaviors.PromptPopup = function(container) {

  function _mouseEnter() {
    min$(document).trigger('promptPopup:mouseenter', {
      el: container
    });
  }

  function _mouseLeave() {
    min$(document).trigger('promptPopup:mouseleave', {
      el: container
    });
  }

  function _init() {
    container.addEventListener('mouseenter', _mouseEnter, false);
    container.addEventListener('mouseleave', _mouseLeave, false);
  }

  this.destroy = function() {
    // remove specific event handlers
    container.removeEventListener('mouseenter', _mouseEnter);
    container.removeEventListener('mouseleave', _mouseLeave);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
