A17.Behaviors.NavPrimary = function(container) {

  var $container;
  var $hoverTriggers;
  var $touchTriggers;
  var $closeTriggers;
  var hoverTimer;
  var hoverable = false;
  var hoverIntentTime = 250;
  var compactMenu = false;
  var doubleTap = null;

  function _hideActive() {
    min$('.s-active',container).removeClass('s-active');
  }

  function _hoverIntent() {
    if (!compactMenu && A17.currentMediaQuery.indexOf('large') > -1) {
      hoverTimer = setTimeout(function(){
        hoverable = true;
      }, hoverIntentTime);
    }
  }

  function _noHoverIntent() {
    if (!compactMenu && A17.currentMediaQuery.indexOf('large') > -1) {
      try {
        clearTimeout(hoverTimer);
        hoverable = false;
        _hideActive();
        document.documentElement.classList.remove('s-menu-active');
      } catch(err) {}
    }
  }

  function _mouseover() {
    if (!compactMenu && A17.currentMediaQuery.indexOf('large') > -1) {
      if (hoverable) {
        _hideActive();
        this.classList.add('s-active');
        document.documentElement.classList.add('s-menu-active');
        min$(document).trigger('search:hide');
      } else {
        var el = this;
        setTimeout(function(){
          if (hoverable) {
            _hideActive();
            el.classList.add('s-active');
            document.documentElement.classList.add('s-menu-active');
            min$(document).trigger('search:hide');
          }
        },251);
      }
    }
  }

  function _mouseout() {
    if (!compactMenu && A17.currentMediaQuery.indexOf('large') > -1) {
      _hideActive();
    }
  }

  function _togglePrimaryClicks(event) {
    if (this.parentNode.classList.contains('s-active')) {
      this.parentNode.classList.remove('s-active');
    } else {
      event.preventDefault();
      _hideActive();
      this.parentNode.classList.add('s-active');
    }
  }

  function _togglePrimaryTouches(event) {
    event.preventDefault();
    if (doubleTap === null) {
      if (!this.parentNode.classList.contains('s-active')) {
        _hideActive();
        this.parentNode.classList.add('s-active');
      } else {
        _hideActive();
      }
      doubleTap = setTimeout(function(){
        doubleTap = null;
      }, 300);
    } else {
      _hideActive();
      clearTimeout(doubleTap);
      doubleTap = null;
      window.location.href = this.href;
    }

  }

  function _closeSecondary(event) {
    event.preventDefault();
    _hideActive();
  }

  function _hide() {
    _hideActive();
    document.documentElement.classList.remove('s-menu-active');
  }

  function _menuHidden() {
    setTimeout(function(){
      _hideActive();
    }, 250);
  }

  function _init() {
    compactMenu = document.documentElement.classList.contains('s-compact-menu');
    $container = min$(container);
    $hoverTriggers = min$('[data-navprimary-hover-trigger]',container);
    $touchTriggers = min$('[data-navprimary-touch-trigger]',container);
    $closeTriggers = min$('[data-navprimary-close-trigger]',container);

    min$(document).on('mediaQueryUpdated',_hide);
    min$(document).on('navPrimary:closeActive',_hideActive);
    min$(document).on('navPrimary:hide',_menuHidden);
    $container.on('mouseenter', _hoverIntent);
    $container.on('mouseleave', _noHoverIntent);
    $hoverTriggers.on('mouseenter', _mouseover);
    $hoverTriggers.on('mouseleave', _mouseout);
    $touchTriggers.on('click', _togglePrimaryClicks);
    $touchTriggers.on('touchend', _togglePrimaryTouches);
    $closeTriggers.on('click', _closeSecondary);
  }

  this.destroy = function() {
    // remove specific event handlers
    min$(document).off('mediaQueryUpdated',_hide);
    min$(document).off('navPrimary:closeActive',_hideActive);
    min$(document).off('navPrimary:hide',_menuHidden);
    $container.off('mouseenter', _hoverIntent);
    $container.off('mouseleave', _noHoverIntent);
    $hoverTriggers.off('mouseenter', _mouseover);
    $hoverTriggers.off('mouseleave', _mouseout);
    $touchTriggers.off('click', _togglePrimaryClicks);
    $touchTriggers.off('touchend', _togglePrimaryTouches);
    $closeTriggers.off('click', _closeSecondary);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
