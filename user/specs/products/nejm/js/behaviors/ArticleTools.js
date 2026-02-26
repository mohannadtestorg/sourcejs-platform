A17.Behaviors.ArticleTools = function(container) {

  var isASubNavOpen = false;

  function _closeSubnav() {
    min$('.m-article-tools__nav-item.s-active',container).removeClass('s-active');
    isASubNavOpen = false;
    min$(document).trigger('articleTools:subnav:closed');
  }

  function _openSubnav(el) {
    min$('.m-article-tools__nav-item.s-active',container).removeClass('s-active');
    el.parentNode.classList.add('s-active');
    isASubNavOpen = true;
    min$(document).trigger('tooltip:hide');
    min$(document).trigger('articleTools:subnav:opened');
  }

  function _toggleSubnav(event) {
    event.preventDefault();
    event.stopPropagation();
    this.blur();
    if (this.parentNode.classList.contains('s-active')) {
      _closeSubnav();
    } else {
      _openSubnav(this);
    }
  }

  function _keyPress(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      _toggleSubnav();
    }
  }

  function _escape(event) {
    var isInput = (event.target.tagName === 'INPUT');
    if (isASubNavOpen && event.keyCode === 27 && !isInput) {
      _closeSubnav();
    }
  }

  function _clicksOutside(event) {
    if (isASubNavOpen && document.activeElement !== container && !container.contains(document.activeElement)) {
      event.preventDefault();
      event.stopPropagation();
      _closeSubnav();
    }
  }

  function _clicksInside(event) {
    event.stopPropagation();
  }

  function _init() {
    min$(document).on('click', _clicksOutside);
    min$(document).on('touchstart', _clicksOutside);
    min$(document).on('articleTools:subnav:close', _closeSubnav);
    min$('[data-article-tool-subnav-toggle]', container).on('click', _toggleSubnav);
    min$('[data-article-tool-subnav-toggle]', container).on('click', _keyPress);

    min$('[data-article-tool-subnav-toggle]', container).on('touchstart', _toggleSubnav);
    min$('[data-article-tool-subnav-toggle]', container).on('touchstart', _keyPress);

    min$('.m-article-tools__subnav a', container).on('click', _clicksInside);
    min$('.m-article-tools__subnav a', container).on('touchstart', _clicksInside);
    min$(window).on('keyup', _escape);
  }

  this.destroy = function() {
    // remove specific event handlers
    min$(document).off('click', _clicksOutside);
    min$(document).off('touchstart', _clicksOutside);
    min$(document).off('articleTools:subnav:close', _closeSubnav);
    min$('[data-article-tool-subnav-toggle]', container).off('click', _toggleSubnav);
    min$('[data-article-tool-subnav-toggle]', container).off('click', _keyPress);

    min$('[data-article-tool-subnav-toggle]', container).off('touchstart', _toggleSubnav);
    min$('[data-article-tool-subnav-toggle]', container).off('touchstart', _keyPress); 

    min$('.m-article-tools__subnav a', container).off('click', _clicksInside);
    min$('.m-article-tools__subnav a', container).off('touchstart', _clicksInside);
    min$(window).off('keyup', _escape);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
