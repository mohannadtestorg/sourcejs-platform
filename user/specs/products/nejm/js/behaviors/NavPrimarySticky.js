A17.Behaviors.NavPrimarySticky = function(container){

  var position = 'default';
  var lockTop = 0;
  var topBudge = 0;
  var isSetUp = false;
  var dE = document.documentElement;
  var timer;

  function _posDefault() {
    dE.classList.remove('s-nav-sticky');
    position = 'default';
  }

  function _posFixed() {
    dE.classList.add('s-nav-sticky');
    position = 'fixed';
  }


  function _decidePos() {
    var sT = document.documentElement.scrollTop || document.body.scrollTop;
    if (sT >= lockTop && position !== 'fixed') {
      _posFixed();
    } else if (sT < lockTop && position !== 'default') {
      _posDefault();
    }
    timer = window.requestAnimationFrame(_decidePos);
  }

  function _resetPos() {
    _posDefault();
    _decidePos();
  }

  function _calcLockPositions(e) {
    var fixedBoundingClientRect = A17.Helpers.getOffset(container);
    lockTop = Math.round(fixedBoundingClientRect.top) - topBudge;
    _resetPos();
  }

  function _destroy() {
    if (isSetUp) {
      min$(window).off('load',_calcLockPositions);
      min$(window).off('resized',_calcLockPositions);
      min$(document).off('fonts:loaded',_calcLockPositions);
      min$(document).off('page:updated',_calcLockPositions);
      // min$('img').off('load',_calcLockPositions);
      isSetUp = false;
      cancelAnimationFrame(timer);
    }
  }

  function _setup() {
    if (!isSetUp) {
      min$(window).on('load',_calcLockPositions);
      min$(window).on('resized',_calcLockPositions);
      min$(document).on('fonts:loaded',_calcLockPositions);
      min$(document).on('page:updated',_calcLockPositions);

      // min$('img').on('load',_calcLockPositions).each(function(){
      //   try {
      //     if (this.complete) {
      //       this.load();
      //     }
      //   } catch(err) {}
      // });

      _calcLockPositions();
      _decidePos();
      isSetUp = true;
    }
  }

  function _decide() {
    _destroy();
    if (A17.currentMediaQuery.indexOf('large') > -1) {
      _setup();
    } else {
      _posDefault();
      // _resetPos();
    }
  }

  function _init() {
    _decide();
    min$(document).on('mediaQueryUpdated',_decide);
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
