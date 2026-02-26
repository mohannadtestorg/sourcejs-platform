// Edited by Bill Pairaktaridis for MMSPB-3483
A17.Behaviors.ShowPromptPopUp = function(container) {

  var $target = false;
  var timer;
  var budge = 12;
  var hovered = false;

  function _mouseEnter() {
    min$(document).trigger('promptPopup:hide');
    clearTimeout(timer);
    $target = document.querySelector('[data-prompt-popup="'+container.getAttribute('data-prompt-popup-target')+'"]');
    if ($target && $target.innerHTML.replace(/<!--[\s\S]+-->/g, '').trim() != '') {

      hovered = true;

      $target.classList.add('s-active');
      $target.style.visibility = 'hidden';

      var openerBoundingClientRect = container.getBoundingClientRect();
      var targetBoundingClientRect = $target.getBoundingClientRect();

      var top = Math.round(openerBoundingClientRect.top + openerBoundingClientRect.height + budge);
      var left = Math.round(openerBoundingClientRect.left + openerBoundingClientRect.width - targetBoundingClientRect.width);

      $target.style.left = left + 'px';
      $target.style.top = top + 'px';
      $target.style.visibility = 'visible';

    }
  }

  function _hide() {
    if ($target) {
      clearTimeout(timer);
      $target.classList.remove('s-active');
      $target = null;
    }
  }

  function _mouseLeave() {
    hovered = false;
    clearTimeout(timer);
    timer = window.setTimeout(_hide,333);
  }

  function _promptMouseEnter(event) {
    if (event.data.el === $target) {
      clearTimeout(timer);
      hovered = true;
    }
  }

  function _promptMouseLeave() {
    hovered = false;
    _hide();
  }

  function _init() {
    container.addEventListener('mouseenter', _mouseEnter, false);
    container.addEventListener('mouseleave', _mouseLeave, false);
    document.addEventListener('promptPopup:hide', _hide, false);
    document.addEventListener('promptPopup:mouseenter', _promptMouseEnter, false);
    document.addEventListener('promptPopup:mouseleave', _promptMouseLeave, false);
  }

  this.destroy = function() {
    // remove specific event handlers
    container.removeEventListener('mouseenter', _mouseEnter);
    container.removeEventListener('mouseleave', _mouseLeave);
    document.removeEventListener('promptPopup:hide', _hide);
    document.removeEventListener('promptPopup:mouseenter', _promptMouseEnter);
    document.removeEventListener('promptPopup:mouseleave', _promptMouseLeave);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
