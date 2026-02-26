A17.Behaviors.MoreFromThisIssueSlider = function(container) {

  var slider = false;
  var itemsInViewport = 3;
  var slideAmount = 0;
  var sliderInner;
  var paginator;
  var items;

  function _initSlider() {
    paginator = container.querySelector('.o-listing-full-width__pager');
    sliderInner = container.querySelector('.o-listing-full-width__carousel > ul');

    switch (A17.currentMediaQuery) {
      case 'xsmall':
        itemsInViewport = 1;
        slideAmount = container.offsetWidth + 16;
        break;
      case 'small':
        itemsInViewport = 2;
        slideAmount = container.offsetWidth + 20;
        break;
      case 'medium':
        itemsInViewport = 2;
        slideAmount = container.offsetWidth + 30;
        break;
      case 'large':
        itemsInViewport = 3;
        slideAmount = container.offsetWidth + 30;
        break;
      case 'xlarge':
      case 'xxlarge':
        itemsInViewport = 3;
        slideAmount = container.offsetWidth + 40;
        break;
      default:
        itemsInViewport = 3;
        slideAmount = container.offsetWidth + 40;
    }

    slider = new A17Slider({
      sliderContainer: container,
      sliderInner: sliderInner,
      paginator: paginator,
      looping: true,
      quickLinks: false,
      keyControls: false,
      swipable: false,
      scrollBySet: true,
      itemsVisible: itemsInViewport,
      slideAmount: slideAmount,
      budge: 0,
      speed: 500,
    });

  }

  function _handleResized() {
    if (slider) {
      slider.destroy();
    }
    _initSlider();
  }

  function _init() {
    _initSlider();
    document.addEventListener('resized', _handleResized);
  }

  this.destroy = function() {
    // remove specific event handlers
    document.removeEventListener('resized', _handleResized);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
