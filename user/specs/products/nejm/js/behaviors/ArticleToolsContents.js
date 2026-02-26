// Edited by Bill Pairaktaridis for MMSPB-2335
A17.Behaviors.ArticleToolsContents = function(container) {

  var articleSections = {};
  var linksHtml = '\n';
  var budge = 0;
  var fixedBoundingClientRect = {};
  var throttle = 0;
  var scrollTop = 0;
  var lastScrollTop = -1;
  var visiblePos = 0.16;
  var checkInViewport = false;

  function _updateBudge() {
    budge = (A17.currentMediaQuery.indexOf('large') > -1) ? 79 : 10;
  }

  function _generateLinks() {
    for (var item in articleSections) {
      if (articleSections.hasOwnProperty(item)) {
        linksHtml += '  <li><a href="#'+item+'" data-target-id="'+item+'" ';
        if (articleSections[item].interaction)
          linksHtml += ' data-interactionType="' + articleSections[item].interaction + '"';
        if (articleSections[item].tabName)
          linksHtml += ' data-tabName="' + articleSections[item].tabName + '"';
        linksHtml += '>'+articleSections[item].titleText+'</a></li>\n';
      }
    }
  }

  function _insertLinks() {
    container.innerHTML = linksHtml;
  }

  function _gather() {
    min$('[data-article-section-title]').each(function(el){
      fixedBoundingClientRect = A17.Helpers.getOffset(el);
      articleSections[el.id] = {};
      articleSections[el.id].el = el;
      articleSections[el.id].titleText = el.getAttribute('data-article-section-title');
      articleSections[el.id].top = fixedBoundingClientRect.top;
      articleSections[el.id].bottom = fixedBoundingClientRect.bottom;
      articleSections[el.id].inViewport = false;
      if (min$('h2', el) && min$('h2', el)[0]){
        articleSections[el.id].interaction = min$('h2', el)[0].getAttribute('data-interactionType');
        articleSections[el.id].tabName = min$('h2', el)[0].getAttribute('data-tabName');
      }
    });
  }

  function _updateTopBottomValues() {
    _updateBudge();
    for (var item in articleSections) {
      if (articleSections.hasOwnProperty(item)) {
        fixedBoundingClientRect = A17.Helpers.getOffset(articleSections[item].el);
        articleSections[item].top = fixedBoundingClientRect.top;
        articleSections[item].bottom = fixedBoundingClientRect.bottom;
      }
    }
  }

  function _handleClicks(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    var targetID = this.getAttribute('data-target-id');
    var $target = document.getElementById(targetID);
    min$(document).trigger('history:replacestate', {
      url: '#'+targetID
    });
    var offsetTarget = A17.Helpers.getOffset($target).top - budge;
    A17.Helpers.scrollToY({
      el: document,
      offset: offsetTarget,
      duration: 1000,
      easing: 'easeInOut',
      onComplete: function() {
        A17.Functions.setFocusOnTarget($target);
        window.scrollTo(0, offsetTarget);
        min$(document).trigger('page:updated');
      }
    });
    min$(document).trigger('articleTools:subnav:close');
    min$($target).trigger('collapsible:open');
  }

  function _startCheckingInViewport() {
    lastScrollTop--;
    checkInViewport = true;
  }

  function _stopCheckingInViewport() {
    checkInViewport = false;
  }

  function _findVisible() {
    var scrollPos = scrollTop + (window.innerHeight * visiblePos);
    for (var item in articleSections) {
      if (articleSections.hasOwnProperty(item)) {
        if (scrollPos >= articleSections[item].top && scrollPos <= articleSections[item].bottom) {
          if (!articleSections[item].inViewport) {
            // entered viewport
            articleSections[item].inViewport = true;
            container.querySelector('[data-target-id='+item+']').classList.add('s-in-viewport');
          }
        } else {
          if (articleSections[item].inViewport) {
            // left viewport
            articleSections[item].inViewport = false;
            container.querySelector('[data-target-id='+item+']').classList.remove('s-in-viewport');
          }
        }
      }
    }
  }

  function _onScroll() {
    if (checkInViewport && throttle === 0) {
      scrollTop = window.pageYOffset;
      if (scrollTop !== lastScrollTop) {
        _findVisible();
        lastScrollTop = scrollTop;
      }
    }
    throttle = (throttle > 4) ? 0 : throttle + 1;
    window.requestAnimationFrame(_onScroll);
  }

  function _init() {
    _gather();
    _generateLinks();
    _insertLinks();
    min$('a',container).on('click', _handleClicks);
    min$('a',container).on('touchstart', _handleClicks);
    min$('a',container).on('touchstend', _handleClicks);

    min$(document).on('page:updated',_updateTopBottomValues);
    min$(window).on('load',_updateTopBottomValues);
    min$(window).on('resized',_updateTopBottomValues);
    min$(document).on('page:updated',_updateTopBottomValues);

    min$(document).on('articleTools:subnav:opened', _startCheckingInViewport);
    min$(document).on('articleTools:subnav:closed', _stopCheckingInViewport);

    min$('img').on('load',_updateTopBottomValues).each(function(){
      try {
        if (this.complete) {
          this.load();
        }
      } catch(err) {}
    });

    _updateTopBottomValues();

    window.requestAnimationFrame(_onScroll);
  }

  this.destroy = function() {
    articleSections = [];
    linksHtml = '';
    // remove specific event handlers
    min$('a',container).off('click', _handleClicks);
    min$('a',container).off('touchstart', _handleClicks);
    min$('a',container).off('touchend', _handleClicks);
    min$(document).off('page:updated',_updateTopBottomValues);
    min$(window).off('load',_updateTopBottomValues);
    min$(window).off('resized',_updateTopBottomValues);
    min$(document).off('page:updated',_updateTopBottomValues);
    min$('img').off('load',_updateTopBottomValues);
    min$(document).off('articleTools:subnav:opened', _startCheckingInViewport);
    min$(document).off('articleTools:subnav:closed', _stopCheckingInViewport);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
