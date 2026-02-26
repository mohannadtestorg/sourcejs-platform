A17.Functions.modal = function() {

  var active = false;
  var dE = document.documentElement;

  var modalNode = document.querySelector('[data-modal]');
  var modalNodeScrollArea = document.querySelector('[data-modal-scroll-area]');
  var modalContentNode = document.querySelector('[data-modal-content]');

    var focusedElBeforeOpen = document.activeElement || document.body;
    var focusableEls = [];
    var firstFocusableEl = null;
    var lastFocusableEl = null;

  function _show() {
    if (!active) {

        focusableEls = modalNode.querySelectorAll('a[href], area[href], input:not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
        focusableEls = Array.prototype.slice.call(focusableEls);
        firstFocusableEl = focusableEls[0];
        lastFocusableEl = focusableEls[ focusableEls.length - 1 ];
        focusedElBeforeOpen = document.activeElement;
        firstFocusableEl.focus();

        modalNode.addEventListener('keydown', function(e) {
            _handleTabKeyDown(e);
        });

      active = true;
      min$(document).trigger('body:lock', {
        breakpoints: 'xsmall small medium large xlarge xxlarge'
      });
      dE.classList.add('s-modal-open');
      dE.classList.add('s-disable-touchmove');
      modalNodeScrollArea.scrollTop = 0;
      A17.Functions.setFocusOnTarget(modalContentNode);
      min$(document).trigger('page:updated');
    }
  }

  function _hide() {
    if (active) {
      active = false;
      dE.classList.remove('s-modal-open');
      dE.classList.remove('s-disable-touchmove');
      if (focusedElBeforeOpen.tagName === 'svg') {
          focusedElBeforeOpen.parentNode.focus();
      } else {
          focusedElBeforeOpen.focus();
      }
      min$(document).trigger('body:unlock', {
        breakpoints: 'xsmall small medium large xlarge xxlarge'
      });
      modalContentNode.innerHTML = '';
      min$(document).trigger('ajaxFormSubmit:aborted');
      min$(document).trigger('page:updated');
    }
  }
  function _handleTabKeyDown(e) {

      var KEY_TAB = 9;

      function handleBackwardTab() {
          if ( document.activeElement === firstFocusableEl ) {
              e.preventDefault();
              lastFocusableEl.focus();
          }
      }

      function handleForwardTab() {
          if ( document.activeElement === lastFocusableEl ) {
              e.preventDefault();
              firstFocusableEl.focus();
          }
      }

      switch(e.keyCode) {
          case KEY_TAB:
              if ( focusableEls.length === 1 ) {
                  e.preventDefault();
                  break;
              }
              e.shiftKey ? handleBackwardTab() : handleForwardTab();
              break;
          default:
              break;
      }
  }

  function _escape(event) {
    var isInput = (event.target.tagName === 'INPUT');
    if (active && event.keyCode === 27 && !isInput) {
      min$(document).trigger('modal:hide');
    }
  }

  document.addEventListener('modal:show', _show, false);
  document.addEventListener('modal:hide', _hide, false);
  window.addEventListener('keyup', _escape, false);
};
