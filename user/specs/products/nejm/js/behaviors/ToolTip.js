A17.Behaviors.ToolTip = function(container) {

  var tooltip;
  var budge = 12;
  var left, top;
  var allow = true;

  function _showtip() {
    if (!allow) {
      return;
    }

    var el = this;
    var breakpoints = el.getAttribute('data-tooltip-breakpoints') || 'medium large xlarge xxlarge';
    var direction = el.getAttribute('data-tooltip-direction') || 'top';
    var type = el.getAttribute('data-tooltip-type') || null;

    if (breakpoints.indexOf(A17.currentMediaQuery) > -1 && !el.parentNode.classList.contains('s-active')) {
      var boundingClientRect = el.getBoundingClientRect();

      tooltip = document.createElement('span');
      tooltip.className = 'a-tooltip';
      tooltip.textContent = el.getAttribute('data-tooltip');
      tooltip.style.opacity = 0;
      document.body.appendChild(tooltip);

      if(type) {
        tooltip.className += ' a-tooltip--'+type;
      }

      if (direction === 'top') {
        left = Math.round(boundingClientRect.left + (boundingClientRect.width / 2) - (tooltip.offsetWidth / 2));
        top = Math.round(boundingClientRect.top - tooltip.offsetHeight - budge);

        if (left < 10) {
          left = 10;
        }

        if (top < 0) {
          top = Math.round(boundingClientRect.top + boundingClientRect.height + budge);
          tooltip.className += ' a-tooltip--bottom';
        }
      }

      if (direction === 'top-right') {
        left = Math.round(boundingClientRect.left);
        top = Math.round(boundingClientRect.top - tooltip.offsetHeight - budge);

        if (top < 0) {
          top = Math.round(boundingClientRect.top + boundingClientRect.height + budge);
          tooltip.className += ' a-tooltip--bottom';
        }
      }

      if (direction === 'bottom') {
        left = Math.round(boundingClientRect.left + (boundingClientRect.width / 2) - (tooltip.offsetWidth / 2));
        top = Math.round(boundingClientRect.top + boundingClientRect.height + budge);
        tooltip.className += ' a-tooltip--bottom';
      }

      if (direction === 'right') {
        left = Math.round(boundingClientRect.left + boundingClientRect.width + budge);
        top = Math.round(boundingClientRect.top + (boundingClientRect.height / 2) - (tooltip.offsetHeight / 2));
        tooltip.className += ' a-tooltip--right';
      }

      if (direction === 'left') {
        left = Math.round(boundingClientRect.left  - tooltip.offsetWidth - budge);
        top = Math.round(boundingClientRect.top + (boundingClientRect.height / 2) - (tooltip.offsetHeight / 2));

        if (left < 0) {
          left = Math.round(boundingClientRect.left + boundingClientRect.width + budge);
          tooltip.className += ' a-tooltip--right';
        } else {
          tooltip.className += ' a-tooltip--left';
        }
      }

      tooltip.style.left = left + 'px';
      tooltip.style.top = top + 'px';
      tooltip.style.opacity = 1;
    }
  }

  function _hidetip() {
    if (tooltip) {
      tooltip.parentNode.removeChild(tooltip);
      tooltip = null;
    }
  }

  function _disallow(event) {
    if (event && event.data.el === container) {
      allow = false;
    }
  }

  function _allow(event) {
    if (event && event.data.el === container) {
      allow = true;
    }
  }

  function _touchstart(event) {
    allow = false;
  }

  function _touchend(event) {
    setTimeout(function(){
      allow = true;
    }, 300);
  }

  function _init() {
    container.addEventListener('mouseenter', _showtip, false);
    container.addEventListener('mouseleave', _hidetip, false);
    container.addEventListener('touchstart', _touchstart, false);
    container.addEventListener('touchend', _touchend, false);
    document.addEventListener('tooltip:hide', _hidetip, false);
    document.addEventListener('tooltip:allow', _allow, false);
    document.addEventListener('tooltip:disallow', _disallow, false);
  }

  this.destroy = function() {
    // remove specific event handlers
    _hidetip();
    container.removeEventListener('mouseenter', _showtip);
    container.removeEventListener('mouseleave', _hidetip);
    document.removeEventListener('tooltip:hide', _hidetip);
    document.removeEventListener('tooltip:allow', _allow);
    document.removeEventListener('tooltip:disallow', _disallow);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
