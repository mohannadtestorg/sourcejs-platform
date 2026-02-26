A17.Behaviors.CollapsibleArea = function(container) {

  var $target, $trigger, targetHeight;
  var collapsed = true;
  var budge = 0;
  var uniqueId = 'collapsible-' + Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1);

  function _updateBudge() {
    budge = (A17.currentMediaQuery.indexOf('large') > -1) ? 79 : 10;
  }

  function _checkIfOperable() {
    var smallScreen = (A17.currentMediaQuery.indexOf('small') > -1);
    var mediumPlusOpen = container.classList.contains('m-collapsible--open@medium+') || container.classList.contains('o-article-body__section--collapsible-open@medium+');
    return (smallScreen || (!smallScreen && !mediumPlusOpen));
  }

  function _getHeightAndSet() {
    targetHeight = $target.firstElementChild.offsetHeight;
    $target.style.height = targetHeight + 'px';
  }

  function _unsetAfterAnimation() {
    $target.removeAttribute('style');
    min$(document).trigger('page:updated');
  }

  function _scrollToContainer(time) {
    _updateBudge();
    var offsetTarget = A17.Helpers.getOffset(container).top - budge;
    A17.Helpers.scrollToY({
      el: document,
      offset: offsetTarget,
      duration: (time) ? time : 1000,
      easing: 'easeInOut',
      onComplete: function() {
        A17.Functions.setFocusOnTarget(container);
        window.location.hash = '#'+container.id;
        window.scrollTo(0, offsetTarget);
        min$(document).trigger('page:updated');
      }
    });
  }

  function _open(event) {
    if (event) {
      event.stopPropagation();
    }
    if (collapsed && _checkIfOperable()) {
      _getHeightAndSet();
      container.classList.add('s-open');
      $trigger.setAttribute('aria-expanded', 'true');
      $target.setAttribute('aria-hidden', 'false');
      _unsetAfterAnimation();
      collapsed = false;
    }
  }

  function _close(event) {
    if (event) {
      event.stopPropagation();
    }
    if (!collapsed && _checkIfOperable()) {
      if (event.type.toLowerCase() === 'click') {
        _scrollToContainer(250);
      }
      _getHeightAndSet();
      container.classList.remove('s-open');
      $trigger.setAttribute('aria-expanded', 'false');
      $target.setAttribute('aria-hidden', 'true');

      targetHeight = $target.offsetHeight; // layout thrash for anim
      $target.style.height = 0;
      _unsetAfterAnimation();
      collapsed = true;
    }
  }

  function _toggle() {
    $trigger.blur();
    if (collapsed) {
      min$(container).trigger('collapsible:open');
    } else {
      min$(container).trigger('collapsible:close');
    }
  }

  function _handleKeyPress(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      _toggle();
    }
  }

  function _handleClicks(event) {
    event.preventDefault();
    _toggle();
  }

  function _checkIfWindowHash() {
    if (window.location.hash === '#'+container.id || A17.windowHash === container.id) {
      min$(container).trigger('collapsible:open');
      setTimeout(function(){
        _scrollToContainer(0);
      },16);
    }
  }

  function _collapsibleContentUniqueId() {
    return $target.id || uniqueId;
  }

  function _init() {
    if(container.classList.contains('s-open')) collapsed = false;

    $trigger = container.querySelector('[data-collapsible-trigger]');
    $target = container.querySelector('[data-collapsible-block]');
    $trigger.addEventListener('click', _handleClicks, false);
    $trigger.addEventListener('keyup', _handleKeyPress, false);
    container.addEventListener('collapsible:open', _open, false);
    container.addEventListener('collapsible:close', _close, false);

    if (collapsed && _checkIfOperable()) {
      $target.setAttribute('id', _collapsibleContentUniqueId());
      $target.setAttribute('aria-hidden', 'true');
      $trigger.setAttribute('aria-controls', _collapsibleContentUniqueId());
      $trigger.setAttribute('aria-expanded', 'false');
    }
    min$('[data-collapsible-close]',container).on('click', _close);
    _checkIfWindowHash();
  }

  this.destroy = function() {
    // remove specific event handlers
    $trigger.removeEventListener('click', _handleClicks);
    $trigger.removeEventListener('keyup', _handleKeyPress);
    container.removeEventListener('collapsible:open', _open);
    container.removeEventListener('collapsible:close', _close);
    min$('[data-collapsible-close]',container).off('click', _close);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
