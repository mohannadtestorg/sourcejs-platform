A17.Behaviors.NavAlphabet = function(container) {

  var position = 'default';
  var lockTop = 0;
  var lockBottom = 0;
  var isSetUp = false;
  var dE = document.documentElement;

  function _shouldCheck() {
    return A17.currentMediaQuery.indexOf('large') < 0;
  }

  function _posDefault() {
    dE.classList.remove('s-alphabet-nav-visible');
    position = 'default';
  }

  function _posFixed() {
    dE.classList.add('s-alphabet-nav-visible');
    position = 'fixed';
  }

  function _posBottom() {
    dE.classList.remove('s-alphabet-nav-visible');
    position = 'bottom';
  }

  function _decidePos() {
    var sT = document.documentElement.scrollTop || document.body.scrollTop;
    if (sT >= lockBottom && position !== 'bottom') {
      _posBottom();
    } else if (sT >= lockTop && sT < lockBottom && position !== 'fixed') {
      _posFixed();
    } else if (sT < lockTop && position !== 'default') {
      _posDefault();
    }
    if (_shouldCheck()) {
      window.requestAnimationFrame(_decidePos);
    }
  }

  function _resetPos() {
    _posDefault();
    _decidePos();
  }

  function _calcLockPositions() {
    var fixedBoundingClientRect = A17.Helpers.getOffset(container);
    var windowH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    lockTop = Math.round(fixedBoundingClientRect.top) - (windowH/2);
    lockBottom = lockTop + Math.round(fixedBoundingClientRect.height) - (windowH/4);
    _resetPos();
  }

  function _destroyShowHide() {
    if (isSetUp) {
      isSetUp = false;
      _posDefault();
      min$(window).off('load',_calcLockPositions);
      min$(window).off('resized',_calcLockPositions);
      min$(document).off('fonts:loaded',_calcLockPositions);
      min$(document).off('page:updated',_calcLockPositions);
      min$('img').off('load',_calcLockPositions);
    }
  }

  function _setupShowHide() {
    if (!isSetUp) {
      isSetUp = true;
      min$(window).on('load',_calcLockPositions);
      min$(window).on('resized',_calcLockPositions);
      min$(document).on('fonts:loaded',_calcLockPositions);
      min$(document).on('page:updated',_calcLockPositions);

      min$('img').on('load',_calcLockPositions).each(function(){
        try {
          if (this.complete) {
            this.load();
          }
        } catch(err) {}
      });

      _calcLockPositions();
      _decidePos();
    }
  }

  function _decideShowHide() {
    _destroyShowHide();
    if (_shouldCheck()) {
      _setupShowHide();
    }
  }

  function _handleTouchEnter(e) {
    event.preventDefault();
    var el = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
    if (el && container.contains(el) && el.href) {
      window.location.hash = el.href.split('#')[1];
    }
  }

  function _init() {
    _decideShowHide();
    min$(document).on('mediaQueryUpdated',_decideShowHide);
    min$(container).on('touchmove',_handleTouchEnter);
  }

  this.destroy = function() {
    // remove specific event handlers

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
