A17.Behaviors.TeaserReveal = function(container) {

  var $btn;
  var $hidden;
  var revealed = false;

  function _handleClicks(event) {
    event.stopPropagation();
    event.preventDefault();
    this.blur();
    if (!revealed) {
      container.classList.add('s-reveal');
      $hidden.setAttribute('aria-hidden','false');
      revealed = true;
    } else {
      container.classList.remove('s-reveal');
      $hidden.setAttribute('aria-hidden','true');
      revealed = false;
    }
  }

  function _init() {
    $btn = container.querySelector('[data-teaser-reveal]');
    $hidden = container.querySelector('[data-teaser-hidden]');
    if ($btn) {
      $btn.addEventListener('click', _handleClicks, false);
      $btn.addEventListener('touchend', _handleClicks, false);
    }
  }

  this.destroy = function() {
    // remove specific event handlers
    if ($btn) {
      $btn.removeEventListener('click', _handleClicks);
      $btn.removeEventListener('touchend', _handleClicks);
    }

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
