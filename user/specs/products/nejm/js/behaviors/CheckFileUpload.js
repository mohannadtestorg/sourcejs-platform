A17.Behaviors.CheckFileUpload = function(container) {

  var file_field = container.querySelector("input");
  var file_label = file_field.nextElementSibling;
  var default_file_label_text = "";

  function _checkFile(e) {
      if(!file_field.files) return;

      var files = file_field.files;

      // If there is (at least) one file selected
      if (files.length > 0) {
         if (files[0].size > 5000 * 1024) { // Check the constraint
           file_field.setCustomValidity("The selected file must not be larger than 5 Mo");
           return;
         }

         label_text = e.target.value.split( '\\' ).pop();
      } else {
         label_text = default_file_label_text;
      }

      file_label.innerHTML = label_text;

      // No custom constraint violation
      file_field.setCustomValidity("");
  }

  function _init() {
    min$(file_field).on('change', _checkFile);
  }

  this.destroy = function() {
    // remove specific event handlers
    min$(file_field).off('change', _checkFile);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
