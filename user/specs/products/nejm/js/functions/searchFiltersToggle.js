A17.Functions.searchFiltersToggle = function() {

  var active = false;
  var dE = document.documentElement;

  function _show() {
    if (!active) {
      active = true;
      min$(document).trigger('body:lock', {
        breakpoints: 'xsmall small'
      });
      dE.classList.add('s-search-filters-active');
      dE.classList.add('s-disable-touchmove');
    }
  }

  function _hide() {
    if (active) {
      active = false;
      dE.classList.remove('s-search-filters-active');
      dE.classList.remove('s-disable-touchmove');
      min$(document).trigger('body:unlock', {
        breakpoints: 'xsmall small'
      });
    }
  }

  function _toggle() {
    if (active) {
      min$(document).trigger('searchFilters:hide');
    } else {
      min$(document).trigger('searchFilters:show');
    }
  }

  function _escape(event) {
    var isInput = (event.target.tagName === 'INPUT');
    if (active && event.keyCode === 27 && !isInput) {
      min$(document).on('searchFilters:hide',_hide);
    }
  }

  function _showButton() {
    dE.classList.add('s-search-filters-button-show');
  }

  function _hideButton() {
    dE.classList.remove('s-search-filters-button-show');
  }

  min$(document).on('searchFilters:show',_show);
  min$(document).on('searchFilters:hide',_hide);
  min$(document).on('searchFilters:toggle',_toggle);
  min$(document).on('searchFilters:filterButton:show',_showButton);
  min$(document).on('searchFilters:filterButton:hide',_hideButton);
  min$(window).on('keyup',_escape);

};
