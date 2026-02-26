A17.Behaviors.ToggleSearchFilters = function(container) {

  function _handleClicks(event) {
    event.preventDefault();
    this.blur();
    min$(document).trigger('searchFilters:toggle');
  }

  var position = 'default';
  var lockTop = 0;
  var lockBottom = 0;
  var isSetUp = false;
  var dE = document.documentElement;

  function _posDefault() {
    min$(document).trigger('searchFilters:filterButton:hide');
    position = 'default';
  }

  function _posFixed() {
    min$(document).trigger('searchFilters:filterButton:show');
    position = 'fixed';
  }

  function _posBottom() {
    min$(document).trigger('searchFilters:filterButton:hide');
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
    var fixedBoundingClientRect = A17.Helpers.getOffset(container.parentNode);
    var windowH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    lockTop = Math.round(fixedBoundingClientRect.top) - (windowH/2);
    lockBottom = lockTop + Math.round(fixedBoundingClientRect.height);
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

  function _decideIfSmall() {
    _destroy();
    if (A17.currentMediaQuery.indexOf('small') > -1) {
      _setup();
    }
  }

  function _init() {
    _decideIfSmall();
    min$(document).on('mediaQueryUpdated',_decideIfSmall);
    min$('[data-search-filters-toggle]',container).on('click', _handleClicks);
  }

  this.destroy = function() {
    // remove specific event handlers
    min$('[data-search-filters-toggle]',container).off('click', _handleClicks);
    _destroy();

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };

};
