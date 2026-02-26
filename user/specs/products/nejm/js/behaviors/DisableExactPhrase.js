A17.Behaviors.DisableExactPhrase = function(container) {

  function _change() {
    if (container.options[container.selectedIndex].text !== 'Full text') {
      min$('[data-input-exact-phrase]').each(function(){
        this.disabled = 'true';
        this.parentNode.style.display = 'none';
      });
    } else {
      min$('[data-input-exact-phrase]').each(function(){
        this.removeAttribute('disabled');
        this.parentNode.style.display = '';
      });
    }
  }

  function _init() {
    container.addEventListener('change', _change, false);
    _change();
  }

  this.destroy = function() {
    // remove specific event handlers
    container.removeEventListener('change', _change);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
