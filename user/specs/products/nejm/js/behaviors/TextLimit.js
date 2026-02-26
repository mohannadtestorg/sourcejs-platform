A17.Behaviors.TextLimit = function(container) {

  var target = container.getAttribute('data-characters-remaining-target-id') || false;
  var limit = parseInt(container.getAttribute('maxlength')) || 1200;

  function _update() {
    var str = container.value;
    var length = str.length;
    var remaining = limit - length;
    if (length >= limit) {
      target.classList.add('s-limit-reached');
      if (!('maxLength' in container)) {
        return false;
      }
    } else {
      target.classList.remove('s-limit-reached');
    }
    target.textContent = remaining + ' characters remaining';
  }

  function _init() {
    if (target && (container.tagName === 'TEXTAREA' || container.getAttribute('type').toLowerCase() === 'text') && limit > 0) {
      target = document.querySelector('[data-characters-remaining-display-id="'+target+'"]');
      if (target) {
        _update();
        container.addEventListener('input', _update, false);
        container.addEventListener('propertychange', _update, false);
      }
    }
  }

  this.destroy = function() {
    // remove specific event handlers
    if (target) {
      container.removeEventListener('input', _update);
      container.removeEventListener('propertychange', _update);
    }
    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
