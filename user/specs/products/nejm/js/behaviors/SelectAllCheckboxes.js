A17.Behaviors.SelectAllCheckboxes = function(checkbox) {

  var name_checkboxes = checkbox.getAttribute("data-checkboxes");
  var connected_checkboxes = document.querySelectorAll('input[name="' + name_checkboxes + '"]');

  function _checkUncheck() {
    _forEach(connected_checkboxes, function(connected_checkbox, i) {
      connected_checkbox.checked = checkbox.checked;
    });
  }

  function _forEach(array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
      callback.call(scope, array[i], i);
    }
  }

  function _init() {
    checkbox.addEventListener('click', _checkUncheck, false);
  }



  this.destroy = function() {
    checkbox.removeEventListener('click', _checkUncheck);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };



  this.init = function() {
    _init();
  };
};
