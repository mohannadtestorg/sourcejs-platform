A17.Functions.ajaxPageLoadMaskToggle = function() {

  var active = false;
  var dE = document.documentElement;

  function _show() {
    if (!active) {
      active = true;
      dE.classList.add('s-ajaxPageLoadMask');
    }
  }

  function _hide() {
    if (active) {
      active = false;
      dE.classList.remove('s-ajaxPageLoadMask');
    }
  }

  min$(document).on('ajaxPageLoadMask:show',_show);
  min$(document).on('ajaxPageLoadMask:hide',_hide);
};
