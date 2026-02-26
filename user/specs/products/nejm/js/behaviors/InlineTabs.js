// Edited by Bill Pairaktaridis. DO NOT OVERRIDE.
A17.Behaviors.InlineTabs = function(container) {
  var budge = 0;


  function _updateBudge() {
    budge = (A17.currentMediaQuery.indexOf('large') > -1) ? 150 : 80;
  }
  function _handleClicks(event) {
    event.preventDefault();
    event.stopPropagation();
    var id = this.href.split('#')[1];
    if (id && !this.parentNode.classList.contains('s-active')) {
      _updateBudge();
      var target = document.getElementById(id);
      if (target && $("> #" + id, container).length > 0) {
        min$('[data-inline-tabs-links] li', container).each(function(){
          this.classList.remove('s-active');
          this.setAttribute('aria-expanded', 'false');
        });
        min$('[data-inline-tabs-tab]', container).each(function(){
          this.classList.remove('s-active');
          this.classList.add('s-inactive');
          target.setAttribute('aria-hidden', 'true');
        });
        min$('li > a[href="#' + id + '"]').each(function(){
          this.parentNode.classList.add('s-active');
        })
        this.setAttribute('aria-expanded', 'true');
        target.classList.remove('s-inactive');
        target.classList.add('s-active');
        target.setAttribute('aria-hidden', 'false');
        min$(target).trigger('collapsible:open');

        var offsetTarget = A17.Helpers.getOffset(target).top - budge;
        A17.Helpers.scrollToY({
          el: document,
          offset: offsetTarget,
          duration: 500,
          easing: 'easeInOut'
        });
      }
    }
  }

  function _checkIfWindowHash() {
    if (min$('[data-inline-tabs-link][href="'+ window.location.hash +'"]', container) || min$('[data-inline-tabs-link][href="'+ A17.windowHash +'"]', container)) {
      min$('[data-inline-tabs-link][href="'+ window.location.hash +'"]', container).trigger("click");
      min$('[data-inline-tabs-link][href="'+ A17.windowHash +'"]', container).trigger("click");
    }
  }

  function _init() {
    min$('[data-inline-tabs-link]', container).off('click', _handleClicks);
    min$('[data-inline-tabs-link]', container).on('click', _handleClicks);
    _checkIfWindowHash();
  }

  this.destroy = function() {
    // remove specific event handlers
    min$('[data-inline-tabs-link]', container).off('click', _handleClicks);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
