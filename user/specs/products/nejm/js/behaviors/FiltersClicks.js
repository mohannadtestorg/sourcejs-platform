A17.Behaviors.FiltersClicks = function(container) {

  function _handleClicks(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.href.indexOf('#') === -1) {
      min$(document).trigger('ajax:getPage', {
        url: this.href,
        type: 'tab',
      });
    }
    this.blur();
  }

  function _handleFormsWithinFilters(event) {
    // used for date range and search within
    event.preventDefault();
    event.stopPropagation();
    var actionObj = A17.Helpers.turnQueryStringToObject(this.action);
    var formObj = A17.Helpers.objectifyForm(this);
    var combinedObj = A17.Helpers.extend(actionObj,formObj);
    var actionSearchHref = this.action.split('?')[0];
    var newSearchHref = actionSearchHref + A17.Helpers.turnObjectToQueryString(combinedObj);
    min$(document).trigger('ajax:getPage', {
      url: newSearchHref,
      type: 'tab',
    });
    this.blur();
  }

  function _init() {
    min$('a',container).on('click', _handleClicks);
    min$('form',container).on('submit',_handleFormsWithinFilters);
  }

  this.destroy = function() {
    // remove specific event handlers
    min$('a',container).off('click', _handleClicks);
    min$('form',container).off('submit',_handleFormsWithinFilters);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
