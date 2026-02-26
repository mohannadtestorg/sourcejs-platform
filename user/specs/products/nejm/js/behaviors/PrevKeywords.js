A17.Behaviors.PrevKeywords = function(container) {

  var $targetInput;

  function _handleClicks() {
    if ($targetInput) {
      var newVal = this.textContent;
      var $targetInputVal = $targetInput.value;
      if ($targetInputVal.search(newVal) < 0) {
        if ($targetInputVal === '') {
          $targetInput.value = newVal;
        } else {
          $targetInput.value += '; ' + newVal;
        }
      }
    }
  }

  function _init() {
    $targetInput = container.parentNode.querySelector('[data-input-keywords]');
    min$('em', container).on('click', _handleClicks);
  }

  this.destroy = function() {
    // remove specific event handlers
    min$('em', container).on('click', _handleClicks);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
