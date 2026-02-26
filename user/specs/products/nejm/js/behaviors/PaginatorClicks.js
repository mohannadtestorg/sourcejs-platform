A17.Behaviors.PaginatorClicks = function(container) {

  function _handleClicks(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.href.indexOf('#') === -1) {
      min$(document).trigger('ajax:getPage', {
        url: this.href,
        type: 'tab',
      });
    }
    this.blur();
  }

  function _init() {
    min$('a',container).on('click', _handleClicks);
  }

  this.destroy = function() {
    // remove specific event handlers
    min$('a',container).off('click', _handleClicks);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
