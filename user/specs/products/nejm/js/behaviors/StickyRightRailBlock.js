A17.Behaviors.StickyRightRailBlock = function(container){
  /*
    # StickyRightRailBlock

    ## description
    Sticky bar sticky on scroll

    ## parameters

    ## what happens
  */

  var position = 'default';
  var lockTop = 0;
  var lockBottom = 0;
  var topBudge = 80;
  var isSetUp = false;
  var tallEnough = false;

  function _posDefault() {
    container.classList.remove('s-sticky-bottom');
    container.classList.remove('s-sticky-fixed');
    position = 'default';
  }

  function _posFixed() {
    container.classList.remove('s-sticky-bottom');
    container.classList.add('s-sticky-fixed');
    position = 'fixed';
  }

  function _posBottom() {
    container.classList.add('s-sticky-bottom');
    container.classList.remove('s-sticky-fixed');
    position = 'bottom';
  }

  function _decidePos() {
    if (tallEnough) {
      var sT = document.documentElement.scrollTop || document.body.scrollTop;
      if (sT >= lockBottom && position !== 'bottom') {
        _posBottom();
      } else if (sT >= lockTop && sT < lockBottom && position !== 'fixed') {
        _posFixed();
      } else if (sT < lockTop && position !== 'default') {
        _posDefault();
      }
    }
    window.requestAnimationFrame(_decidePos);
  }

  function _resetPos() {
    _posDefault();
    _decidePos();
  }

  function _getOffset(node) {
    var rect = node.getBoundingClientRect();
    return {
      top: rect.top + (document.documentElement.scrollTop || document.body.scrollTop),
      left: rect.left + (document.documentElement.scrollLeft || document.body.scrollLeft),
      bottom: rect.bottom + (document.documentElement.scrollTop || document.body.scrollTop),
      right: rect.right + (document.documentElement.scrollLeft || document.body.scrollLeft),
      width: rect.width,
      height: rect.height
    };
  }

  function _calcLockPositions(){
    var fixedBoundingClientRect = A17.Helpers.getOffset(container);
    if (container.firstElementChild){
      if (fixedBoundingClientRect.height > container.firstElementChild.offsetHeight) {
        lockTop = Math.round(fixedBoundingClientRect.top) - topBudge;
        lockBottom = lockTop + Math.round(fixedBoundingClientRect.height) - container.firstElementChild.offsetHeight;
        tallEnough = true;
      } else {
        tallEnough = false;
      }
      _resetPos();
    }
  }

  function _destroy() {
    if (isSetUp) {
      min$(window).off('load',_calcLockPositions);
      min$(window).off('resized',_calcLockPositions);
      min$(document).off('fonts:loaded',_calcLockPositions);
      min$(document).off('page:updated',_calcLockPositions);
      min$('img').off('load',_calcLockPositions);
      isSetUp = false;
    }
  }

  function _setup() {
    if (!isSetUp) {
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
      isSetUp = true;
    }
  }

  function _decide() {
    _destroy();
    if (A17.currentMediaQuery.indexOf('large') > -1) {
      _setup();
    }
  }

  function _init() {
    _decide();
    min$(document).on('mediaQueryUpdated',_decide);
    min$(document).on('trigger:decide',_decide);
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
