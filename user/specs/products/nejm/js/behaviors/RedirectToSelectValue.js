A17.Behaviors.RedirectToSelectValue = function(select) {

  function _redirect(e) {
    var newUrl = e.target.value;
    if(newUrl != "") window.location.href = newUrl;
  }

  function _init() {
    select.addEventListener('change', _redirect, false);
  }

  this.destroy = function() {
    select.removeEventListener('click', _redirect);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
