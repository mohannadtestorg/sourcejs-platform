A17.Behaviors.PopUpTip = function(container) {

  var open = false;
  var popuptipWidth = 300;
  var opener;
  var popupHTML = '';
  var budge = 12;
  var left = 0;
  var top = 0;

  function _grabContentAndPopulate() {
    var ids = opener.getAttribute('data-popup-content-ids');
    popupHTML = '';
    if (!ids) {
      ids = opener.href.split('#')[1];
      ids = document.getElementById(ids) ? ids : null;
    }
    if (ids) {
      ids = ids.split(',');

      for (var i = 0; i < ids.length; i++) {
        if (document.getElementById(ids[i])) {
          popupHTML += document.getElementById(ids[i]).innerHTML;
        }
      }

      popupHTML = popupHTML.replace(/f-body/igm,'f-body--xs');
      popupHTML = popupHTML.replace(/f-body--xs--sm/igm,'f-body--xs');
      popupHTML = popupHTML.replace(/f-body--xs--xs/igm,'f-body--xs');

      container.querySelector('[data-popup-tip-content]').innerHTML = popupHTML;
    }
  }

  function _position() {

    container.style.opacity = 0;
    container.style.display = 'block';

    var openerBoundingClientRect = opener.getBoundingClientRect();
    var containerBoundingClientRect = container.getBoundingClientRect();
    var sT = document.documentElement.scrollTop || document.body.scrollTop;

    left = Math.round(openerBoundingClientRect.left + (openerBoundingClientRect.width / 2) - (containerBoundingClientRect.width / 2));
    top = Math.round(openerBoundingClientRect.top - containerBoundingClientRect.height - budge + sT);

    if (sT > top ) {
      console.log('fixing top');
      top = Math.round(openerBoundingClientRect.top + openerBoundingClientRect.height + budge + sT);
    }

    if (left + containerBoundingClientRect.width + budge > window.innerWidth) {
      left = window.innerWidth - containerBoundingClientRect.width - budge;
    } else if (left < budge) {
      left = budge;
    }

    container.style.left = left + 'px';
    container.style.top = top + 'px';
    container.style.opacity = 1;

  }

  function _handleClicks(event) {
    event.stopPropagation();
  }

  function _open(event) {
    if (event) {
      opener = event.data.opener;
      if (opener) {

        _grabContentAndPopulate();

        if (popupHTML !== '') {
          _position();

          A17.Functions.setFocusOnTarget(container);
          open = true;
        }
      }
    }
  }

  function _close(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (open && opener) {
      container.style.opacity = 0;
        container.querySelector('[data-popup-tip-content]').scrollTop = 0;
        container.style.display = 'none';
        open = false;
    }
  }

  function _escape(event) {
    var isInput = (event.target.tagName === 'INPUT');
    if (open && event.keyCode === 27 && !isInput) {
      _close();
    }
  }

  function _clicksOutside(event) {
    if (open) {
      event.stopPropagation();
      if (!($(event.target).closest('.m-popup-tip').length)) {
        _close();
      }
    }
  }

  function _toggle(event) {
    if (open) {
      _close(event);
      _open(event);
    } else {
      _open(event);
    }
  }

  function _init() {
    window.addEventListener('keyup', _escape, false);
    document.addEventListener('click', _clicksOutside, false);
    document.addEventListener('resized', _close);
    document.addEventListener('page:updated', _close);
    container.addEventListener('click', _handleClicks, false);
    container.querySelector('[data-popup-close]').addEventListener('click', _close, false);
    document.addEventListener('popuptip:open', _open, false);
    document.addEventListener('popuptip:close', _close, false);
    document.addEventListener('popuptip:toggle', _toggle, false);
  }

  this.destroy = function() {
    // remove specific event handlers
    container.removeEventListener('click', _handleClicks);
    window.removeEventListener('keyup', _escape);
    container.removeEventListener('click', _handleClicks, false);
    container.querySelector('[data-popup-close]').removeEventListener('click', _close, false);
    document.removeEventListener('resized', _close);
    document.removeEventListener('page:updated', _close);
    document.removeEventListener('popuptip:open', _open);
    document.removeEventListener('popuptip:close', _close);
    document.removeEventListener('popuptip:toggle', _toggle);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
