A17.Behaviors.ColumnNav = function(container) {

  function _toggle(event) {
    event.preventDefault();
    this.blur();
    if (container.classList.contains('s-show-column-nav')) {
      container.classList.remove('s-show-column-nav');
    } else {
      container.classList.add('s-show-column-nav');
    }
  }

  function _mediaQueryUpdated() {
    container.classList.remove('s-show-column-nav');
  }

  function _init() {
    container.querySelector('[data-column-nav-reveal-trigger]').addEventListener('click', _toggle, false);
    document.addEventListener('mediaQueryUpdated', _mediaQueryUpdated);
  }

  this.destroy = function() {
    // remove specific event handlers
    container.querySelector('[data-column-nav-reveal-trigger]').removeEventListener('click', _toggle);
    document.removeEventListener('mediaQueryUpdated', _mediaQueryUpdated);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
