A17.Behaviors.StickyTabs = function(container){

  var position = 'default';
  var lockTop = 0;
  var lockBottom = 0;
  var topBudge = 0;
  var dE = document.documentElement;

  function _posDefault() {
    dE.classList.remove('s-m-tabs-sticky');
    position = 'default';
  }

  function _posFixed() {
    dE.classList.add('s-m-tabs-sticky');
    position = 'fixed';
  }

  function _posBottom() {
    dE.classList.remove('s-m-tabs-sticky');
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
    window.requestAnimationFrame(_decidePos);
  }

  function _resetPos() {
    _posDefault();
    _decidePos();
  }

  function _calcLockPositions() {
    var fixedBoundingClientRect = A17.Helpers.getOffset(container);
    lockTop = Math.round(fixedBoundingClientRect.top) - topBudge;
    lockBottom = lockTop + Math.round(fixedBoundingClientRect.height);
    _resetPos();
  }

  function _destroy() {
    min$(window).off('load',_calcLockPositions);
    min$(window).off('resized',_calcLockPositions);
    min$(document).off('fonts:loaded',_calcLockPositions);
    min$(document).off('page:updated',_calcLockPositions);
    min$('img').off('load',_calcLockPositions);
  }

  function _setup() {
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

  function _init() {
    _setup();
  }

  this.destroy = function() {
    _destroy();

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
