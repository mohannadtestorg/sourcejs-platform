A17.Behaviors.AddRemoveDefListItem = function(container) {

  var items_container = container.querySelector("[data-items]");
  var items = container.querySelectorAll("[data-item]");
  var remove_btns = container.querySelectorAll("[data-remove]");
  var add_item = container.querySelector("[data-add]");
  var template = document.getElementById("template__IPAdress");
  var name_placeholder = container.getAttribute("data-placeholder-name");

  // Add a new item
  function _addItem(e) {
    e.preventDefault();

    var data = template.innerHTML;
    items_container.insertAdjacentHTML('beforeend', data);
    _callbackUpdate();
  }

  // Remove an item
  function _removeItem(e) {
    e.preventDefault();

    var btn = e.currentTarget;
    var id = btn.getAttribute("data-remove");

    _forEach(items, function(item, i) {
      var item_id = item.getAttribute('data-item');

      if(item_id === id) items_container.removeChild(item);
    });

    _callbackUpdate();
  }

  // Called each time a set of items is added or removed, it update the array indexes
  function _callbackUpdate() {
    items = container.querySelectorAll("[data-item]");

    _forEach(items, function(item, i) {
      item.setAttribute('data-item', i);
      var remove_btn = item.querySelector("[data-remove]");
      if(remove_btn) {
        remove_btn.setAttribute('data-remove', i);

        remove_btn.removeEventListener('click', _removeItem);
        remove_btn.addEventListener('click', _removeItem, false);
      }

      var fields = item.querySelectorAll("[data-type]");

      if(fields.length) {
        _forEach(fields, function(field, j) {
          var type = field.getAttribute('data-type');
          field.setAttribute('name', name_placeholder.replace(/{{id}}/g, i).replace(/{{type}}/g, type));
        });
      }
    });
  }

  function _forEach(array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
      callback.call(scope, array[i], i);
    }
  }

  function _init() {
    if(add_item) add_item.addEventListener('click', _addItem, false);

     _forEach(remove_btns, function(remove_btn, i) {
      remove_btn.addEventListener('click', _removeItem, false);
    });
  }



  this.destroy = function() {
    if(add_item) add_item.removeEventListener('click', _addItem);

     _forEach(remove_btns, function(remove_btn, i) {
      remove_btn.removeEventListener('click', _removeItem);
    });

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };



  this.init = function() {
    _init();
  };
};
