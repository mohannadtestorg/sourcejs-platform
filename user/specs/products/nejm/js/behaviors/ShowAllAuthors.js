A17.Behaviors.ShowAllAuthors = function(container) {

  function _handleClicks(event) {
    event.preventDefault();
    container.blur();
    container.parentNode.parentNode.classList.add('s-show-all');
    min$(document).trigger('page:updated');
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
