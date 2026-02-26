A17.Behaviors.ShowFiguresModal = function(container) {

  function _handleClicks(event) {
    event.preventDefault();
    min$(document).trigger('figuresModal:show', { id: container.getAttribute('data-figure-id'), opener: container });
  }

  function _init() {
    container.setAttribute('tabindex','-1');
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
