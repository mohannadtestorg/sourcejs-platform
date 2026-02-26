A17.Behaviors.TravelingHome = function(container) {

  var slider = false;
  var itemsInViewport = 1;
  var slideAmount = 0;
  var sliderInner;
  var paginator;
  var items;
  var itemWidth = 280 + 12; // width plus left margin

  function _initSlider() {
    paginator = container.querySelector('ul.o-traveling-home__pager');
    sliderInner = container.querySelector('ul.o-traveling-home__items');
    items = sliderInner.querySelectorAll('li');

    if (items.length * itemWidth > container.offsetWidth) {

      itemsInViewport = Math.floor(container.offsetWidth / itemWidth);
      slideAmount = itemsInViewport * itemWidth;

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
        budge: -5,
        blankClass: false,
        speed: 500,
      });

      container.classList.remove('s-no-paginator');
    } else {
      container.classList.add('s-no-paginator');
    }
  }

  function _handleResized() {
    if (slider && slider.destroy) {
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
