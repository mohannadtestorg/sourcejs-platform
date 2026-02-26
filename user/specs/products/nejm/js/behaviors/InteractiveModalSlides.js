A17.Behaviors.InteractiveModalSlides = function(container) {

  var $slides;
  var $pager;
  var $stepperPrev;
  var $stepperNext;
  var $reset;
  var currentIndex = 0;
  var maxSlides;

  function _enableDisable() {
    if (currentIndex < 1) {
      currentIndex = 0;
      $stepperPrev[0].setAttribute('disabled','disabled');
    } else {
      $stepperPrev[0].removeAttribute('disabled');
    }

    if (currentIndex > (maxSlides - 2)) {
      currentIndex = maxSlides - 1;
      $stepperNext[0].setAttribute('disabled','disabled');
    } else {
      $stepperNext[0].removeAttribute('disabled');
    }
  }

  function _update(to) {
    var oldIndex = currentIndex;

    if (typeof to === 'number') {
      currentIndex = to;
    } else if (to === 'next') {
      currentIndex = currentIndex + 1;
    } else {
      currentIndex = currentIndex - 1;
    }

    if ($pager[currentIndex].parentNode.classList.contains('s-locked')) {
      currentIndex = oldIndex;
    } else {
      _enableDisable();
      min$('.s-active', container).removeClass('s-active');
      $slides[currentIndex].classList.add('s-active');
      $pager[currentIndex].parentNode.classList.remove('s-locked');
      $pager[currentIndex].parentNode.classList.add('s-active');
    }
  }

  function _reset(event) {
    event.preventDefault();
    this.blur();
    _update(0);
  }

  function _pagerClick(event) {
    event.preventDefault();
    this.blur();
    _update($pager.index(this));
    this.parentNode.classList.remove('s-hover');
  }

  function _prev(event) {
    event.preventDefault();
    this.blur();
    _update('prev');
  }

  function _next(event) {
    event.preventDefault();
    this.blur();
    _update('next');
  }

  function _pagerMouseover() {
    if (!this.parentNode.classList.contains('s-locked')) {
      this.parentNode.classList.add('s-hover');
    }
  }

  function _pagerMouseout() {
    this.parentNode.classList.remove('s-hover');
  }

  function _init() {
    //
    $slides = min$('[data-slides] li', container);
    $pager = min$('[data-stepper-pager] a', container);
    $stepperPrev = min$('[data-stepper-prev]', container);
    $stepperNext = min$('[data-stepper-next]', container);
    $reset = min$('[data-reset]', container);
    //
    maxSlides = $slides.length;
    currentIndex = $slides.index(container.querySelector('[data-slides] li.s-active'));
    _enableDisable();
    //
    $pager.on('mouseover', _pagerMouseover);
    $pager.on('mouseout', _pagerMouseout);
    $pager.on('click', _pagerClick);
    $stepperPrev.on('click', _prev);
    $stepperNext.on('click', _next);
    $reset.on('click', _reset);
  }

  this.destroy = function() {
    // remove specific event handlers
    $pager.off('mouseover', _pagerMouseover);
    $pager.off('mouseout', _pagerMouseout);
    $pager.off('click', _pagerClick);
    $stepperPrev.off('click', _prev);
    $stepperNext.off('click', _next);
    $reset.off('click', _reset);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
