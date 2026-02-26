A17.Behaviors.NEJMGroupCarousel = function(container) {

  var slider = false;
  var itemsInViewport = 1;
  var slideAmount = 0;
  var sliderInner;
  var paginator;
  var items;
  var itemWidth = 280 + 12; // width plus left margin
  var doSetup = false;

  function _initSlider() {
    paginator = container.querySelector('ul.g-nejm-group-dd__pager');
    sliderInner = container.querySelector('ul.o-colset-2-4-6');
    items = sliderInner.querySelectorAll('li');

    container.classList.add('s-no-paginator');

    switch (A17.currentMediaQuery) {
      case 'xsmall':
      case 'small':
      case 'medium':
        doSetup = false;
        break;
      case 'large':
        doSetup = true;
        itemsInViewport = 6;
        slideAmount = container.offsetWidth - 30;
        break;
      case 'xlarge':
        doSetup = true;
        itemsInViewport = 6;
        slideAmount = container.offsetWidth - 40;
        break;
      case 'xxlarge':
        doSetup = true;
        itemsInViewport = Math.floor(container.offsetWidth / itemWidth);
        slideAmount = ((items[0].offsetWidth + 40) * itemsInViewport);
        break;
      default:
        doSetup = true;
        itemsInViewport = 6;
        slideAmount = container.offsetWidth - 40;
    }

    if (doSetup && items.length > 6) {
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
        blankClass: false,
        speed: 600,
      });
      container.classList.remove('s-no-paginator');
    }
  }

  function _handleShow() {
    if (slider) {
      slider.destroy();
      slider = false;
    }
    _initSlider();
  }

  function _handleResized() {
    if (slider) {
      slider.destroy();
      _initSlider();
    }
  }

  function _init() {
    _initSlider();
    document.addEventListener('resized', _handleResized);
    document.addEventListener('NEJMGroupDDToggle:show', _handleShow);
  }

  this.destroy = function() {
    // remove specific event handlers
    document.removeEventListener('resized', _handleResized);
    document.removeEventListener('NEJMGroupDDToggle:show', _handleShow);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
