A17.Behaviors.CopyUrl = function(container) {

  function _handleClicks(event) {
    event.preventDefault();
    event.stopPropagation();
    min$(document).trigger('articleTools:subnav:close');
    min$("[data-behavior='Dropdown ToolTip']").trigger("dropdown:close");
    var $this = $(this),
        urlToCopy = $this.data('url') ? $this.data('url') : window.location.href;
    A17.Functions.copyTextToClipboard(urlToCopy, 'URL copied to your clipboard');
  }

  function _init() {
    container.addEventListener('click', _handleClicks, false);
  }

  this.destroy = function() {
    // remove specific event handlers
    container.removeEventListener('click', _handleClicks);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
