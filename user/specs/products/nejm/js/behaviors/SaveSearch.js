A17.Behaviors.SaveSearch = function(container) {

  function _handleClicks(event) {
    event.preventDefault();
    event.stopPropagation();
    min$(document).trigger('tooltip:hide');
    min$(document).trigger('ajax:getPage', {
      url: this.getAttribute('data-href'),
      type: 'modal',
      modalClass: 'g-modal--narrow',
      opener: container,
    });
    this.blur();
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
