A17.Behaviors.CollapseInPlace = function(container) {

  var manuallyOpened = false;

  function _update() {
    if (A17.currentMediaQuery.indexOf('xsmall') > -1) {
      if (manuallyOpened) {
        _open();
      } else {
        _close();
      }
    } else {
      _open();
    }
  }

  function _open() {
    container.classList.add('s-open');
  }

  function _close() {
    container.classList.remove('s-open');
  }

  function _onClick() {
    manuallyOpened = true;
    _update();
  }

  this.destroy = function() {
    container.querySelector('[data-collapse-in-place-button]').removeEventListener('click', _onClick);
    window.removeEventListener('resized', _update);
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _update();
    container.querySelector('[data-collapse-in-place-button]').addEventListener('click', _onClick);
    window.addEventListener('resized', _update);
  };
};
