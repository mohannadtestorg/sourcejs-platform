A17.Behaviors.StickyArticleComponents = function(container){
  /*
    # StickyArticleComponents

    ## description
    Sticky article components on scroll

    ## parameters

    ## what happens
  */

  var position = 'default';
  var lockTop = 0;
  var lockBottom = 0;
  var topBudge = 80;
  var $articleTools = container.querySelector('[data-article-tools]');
  var isSetUp = false;
  var lastScrollTop = 0;
  var scrollDirection = false;
  var dE = document.documentElement;
  var tallEnough = false;

  function _updateTopBudge() {
    topBudge = (A17.currentMediaQuery.indexOf('large') > -1) ? 80 : 100;
  }

  function _posDefault() {
    dE.classList.remove('s-article-sticky-bottom');
    dE.classList.remove('s-article-sticky-fixed');
    position = 'default';
  }

  function _posFixed() {
    dE.classList.remove('s-article-sticky-bottom');
    dE.classList.add('s-article-sticky-fixed');
    position = 'fixed';
  }

  function _posBottom() {
    dE.classList.add('s-article-sticky-bottom');
    dE.classList.remove('s-article-sticky-fixed');
    position = 'bottom';
  }

  function _decidePos() {
    var sT = document.documentElement.scrollTop || document.body.scrollTop;
    if (tallEnough) {
      if (sT >= lockBottom && position !== 'bottom') {
        _posBottom();
      } else if (sT >= lockTop && sT < lockBottom && position !== 'fixed') {
        _posFixed();
      } else if (sT < lockTop && position !== 'default') {
        _posDefault();
      }
    }
    if (sT !== lastScrollTop) {
      if (sT > lastScrollTop && scrollDirection !== 'down') {
        scrollDirection = 'down';
        dE.classList.remove('s-scroll-direction-up');
        dE.classList.add('s-scroll-direction-down');
      } else if (sT < lastScrollTop && scrollDirection !== 'up') {
        scrollDirection = 'up';
        dE.classList.remove('s-scroll-direction-down');
        dE.classList.add('s-scroll-direction-up');
      }
    }
    lastScrollTop = sT;
    window.requestAnimationFrame(_decidePos);
  }

  function _resetPos() {
    _posDefault();
    _decidePos();
  }

  function _calcLockPositions() {
    container.style.minHeight = 0;
    _updateTopBudge();
    var fixedBoundingClientRect = A17.Helpers.getOffset(container);
    var articleToolsH = $articleTools.offsetHeight;
    if (fixedBoundingClientRect.height > articleToolsH) {
      lockTop = Math.round(fixedBoundingClientRect.top) - topBudge;
      lockBottom = lockTop + Math.round(fixedBoundingClientRect.height) - articleToolsH;
      tallEnough = true;
    } else {
      container.style.minHeight = articleToolsH + 'px';
      tallEnough = false;
    }
    _resetPos();
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
    _setup();
  }

  function _init() {
    _decide();
    min$(document).on('resized', _decide);
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
