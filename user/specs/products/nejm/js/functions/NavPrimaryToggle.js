// Edited by Bill Pairaktaridis. Do not override
A17.Functions.navPrimaryToggle = function() {

  var active = false;
  var dE = document.documentElement;
  var isCompactMenu;
  function _show() {
    if (!active) {
      active = true;
      if (A17.currentMediaQuery.indexOf('small') > -1) {
        window.scrollTo(0, 0);
      }
      min$(document).trigger('search:hide');
      min$(document).trigger('NEJMGroupDDToggle:hide');
      dE.classList.add('s-menu-active');
      dE.classList.add('s-disable-touchmove');
      isCompactMenu = (dE.classList.contains('s-compact-menu'));
      min$(document).trigger('body:lock', {
        breakpoints: ['xsmall','small','medium',(isCompactMenu) ? 'large' : '',(isCompactMenu) ? 'xlarge' : '',(isCompactMenu) ? 'xxlarge' : '',].join(' ')
      });
      if (!A17.currentMediaQuery.match(/(xsmall|small|medium)/)) {
        A17.Functions.setFocusOnTarget(document.getElementById('nav'));
      }
    }
  }

  function _hide() {
    if (active) {
      active = false;
      dE.classList.remove('s-menu-active');
      dE.classList.remove('s-disable-touchmove');
      isCompactMenu = (dE.classList.contains('s-compact-menu'));
      min$(document).trigger('body:unlock', {
        breakpoints: ['xsmall','small','medium',(isCompactMenu) ? 'large' : '',(isCompactMenu) ? 'xlarge' : '',(isCompactMenu) ? 'xxlarge' : '',].join(' ')
      });
      if (!A17.currentMediaQuery.match(/(xsmall|small|medium)/)) {
        A17.Functions.setFocusOnTarget(document.getElementById('nav'));
      }
    }
  }

  function _toggle() {
    if (active) {
      min$(document).trigger('navPrimary:hide');
    } else {
      min$(document).trigger('navPrimary:show');
    }
  }

  function _escape(event) {
    var isInput = (event.target.tagName === 'INPUT');
    if (active && event.keyCode === 27 && !isInput) {
      min$(document).trigger('navPrimary:hide');
    }
  }

  min$(document).on('mediaQueryUpdated',_hide);
  min$(document).on('navPrimary:show',_show);
  min$(document).on('navPrimary:hide',_hide);
  min$(document).on('navPrimary:toggle',_toggle);
  min$(window).on('keyup',_escape);
};
