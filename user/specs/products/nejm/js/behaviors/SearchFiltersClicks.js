A17.Behaviors.SearchFiltersClicks = function(container) {

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

  function _handleLabelClicks(event) {
    event.stopPropagation();
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

  function _dropdownClosed(event) {
    if (container.contains(event.data.el)) {
      min$(document).trigger('history:replacestate', {
        url: A17.Functions.updateQueryStringParameter(window.location.href,'openFilterDropdown','')
      });
    }
  }

  function _init() {
    min$('[data-filter-link]',container).on('click', _handleClicks);
    min$('[data-filter-links] a',container).on('click', _handleClicks);
    min$('[data-dateRange-custom]',container).on('click',_handleLabelClicks);
    min$('[data-dateRange-dateList]',container).on('click',_handleLabelClicks);
    min$('[data-dateRange-custom] form',container).on('submit',_handleFormsWithinFilters);
    min$('[data-search-within] form',container).on('submit',_handleFormsWithinFilters);
    min$(document).on('dropdown:closed',_dropdownClosed);
    min$('[data-filter-link]',container).on('focus', _handleFocus);
  }

  this.destroy = function() {
    // remove specific event handlers
    min$('[data-filter-link]',container).off('click', _handleClicks);
    min$('[data-filter-links] a',container).off('click', _handleClicks);
    min$('[data-dateRange-custom]',container).off('click',_handleLabelClicks);
    min$('[data-dateRange-dateList]',container).off('click',_handleLabelClicks);
    min$('[data-dateRange-custom] form',container).off('submit',_handleFormsWithinFilters);
    min$('[data-search-within] form',container).off('submit',_handleFormsWithinFilters);
    min$(document).off('dropdown:closed',_dropdownClosed);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
