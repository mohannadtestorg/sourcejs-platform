A17.Behaviors.CommentFormShowHide = function(container) {

  var active = false;
  var dE = document.documentElement;

  function _show() {
    if (!active) {
      active = true;
      min$(document).trigger('body:lock', {
        breakpoints: 'xsmall small'
      });
      dE.classList.add('s-comments-form-open');
      dE.classList.add('s-disable-touchmove');
      min$(document).trigger('page:updated');
    }
  }

  function _hide() {
    if (active) {
      active = false;
      dE.classList.remove('s-comments-form-open');
      dE.classList.remove('s-disable-touchmove');
      min$(document).trigger('body:unlock');
      min$(document).trigger('page:updated');
    }
  }

  function _mediaQueryUpdated() {
    //if (A17.currentMediaQuery.indexOf('small') > -1) {
    //}
    _hide();
  }

  function _init() {
    container.querySelector('[data-comment-form-show]').addEventListener('click', _show, false);
    container.querySelector('[data-comment-form-hide]').addEventListener('click', _hide, false);
    document.addEventListener('mediaQueryUpdated', _mediaQueryUpdated);
  }

  this.destroy = function() {
    // remove specific event handlers
    container.querySelector('[data-comment-form-show]').removeEventListener('click', _show);
    container.querySelector('[data-comment-form-hide]').removeEventListener('click', _hide);
    document.removeEventListener('mediaQueryUpdated', _mediaQueryUpdated);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
