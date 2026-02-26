A17.Behaviors.AnchorBannerHide = function(container) {

  function _init() {
    document.documentElement.classList.add('s-anchor-banner-visible');
    window.setTimeout(function(){
      document.documentElement.classList.remove('s-anchor-banner-visible');
      setTimeout(function(){
        container.parentNode.removeChild(container);
      }, 251);
    }, (parseInt(container.getAttribute('data-anchorBannerHide-time')*1000) || 6000));
  }

  this.destroy = function() {
    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
