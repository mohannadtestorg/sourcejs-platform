A17.Behaviors.ShowHideConnectSelector = function(select) {
  var selectors = document.querySelectorAll("[data-select-id]");
  var klassHidden = "s-hidden";

  function _showHide(e) {
    var currentValue = e.target.value;

    for (var i = 0; i < selectors.length; i++) {
      var selector = selectors[i];

      // reset value
      selector.querySelector('select').value = "";

      if(selector.getAttribute("data-select-id") === currentValue) selector.classList.remove(klassHidden);
      else {
        selector.classList.add(klassHidden);
      }
    }
  }

  function _init() {
    select.value = "";
    select.addEventListener('change', _showHide, false);
  }

  this.destroy = function() {
    select.removeEventListener('click', _showHide);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
