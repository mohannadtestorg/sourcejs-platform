A17.Functions.searchToggle = function() {

  var active = false;
  var dE = document.documentElement;

  function _mediaQueryUpdated() {
    if (A17.currentMediaQuery.indexOf('large') < 0) {
      min$(document).trigger('search:hide');
    }
  }

  function _show() {
    if (!active) {
      active = true;
      min$(document).trigger('navPrimary:hide');
      min$(document).trigger('NEJMGroupDDToggle:hide');
      min$(document).trigger('search:shown');
      dE.classList.add('s-search-active');
    }
  }

  function _hide() {
    if (active) {
      active = false;
      min$(document).trigger('search:hidden');
      dE.classList.remove('s-search-active');
      dE.classList.remove('s-search-advanced-active');
      dE.classList.remove('s-search-active-init');
    }
  }

  function _toggle() {
    if (active) {
      min$(document).trigger('search:hide');
    } else {
      min$(document).trigger('search:show');
    }
  }

  if (dE.classList.contains('s-search-active-init')) {
    active = true;
    dE.classList.add('s-search-active');
  }

  min$(document).on('mediaQueryUpdated',_mediaQueryUpdated);
  min$(document).on('search:show',_show);
  min$(document).on('search:hide',_hide);
  min$(document).on('search:toggle',_toggle);

};
