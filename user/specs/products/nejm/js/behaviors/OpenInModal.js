A17.Behaviors.OpenInModal = function(container) {

  var onLoad = false;
  var href = false;
  var modalClass = 'g-modal--generic';

  function _launchModal() {
    if (href && href.length > 1) {
      min$(document).trigger('ajax:getPage', {
        url: href,
        type: 'modal',
        modalClass: modalClass,
        opener: container,
      });
      min$(document).trigger('articleTools:subnav:close');
    }
  }

  function _handleClicks(event) {
    event.preventDefault();
    _launchModal();
  }

  function _init() {
    onLoad = (container.getAttribute('data-modal-on-load') === 'true');

    if (container.getAttribute('data-modal-class')) {
      var modalClasses = container.getAttribute('data-modal-class').split(',');
      modalClass = '';
      for (var i = 0; i < modalClasses.length; i++) {
        modalClass += ' g-modal--' + modalClasses[i];
      }
    }

    if (onLoad) {
      href = container.getAttribute('data-modal-href');
      _launchModal();
    } else {
      href = container.getAttribute('data-modal-href') || container.href;
      container.addEventListener('click', _handleClicks, false);
    }
  }

  this.destroy = function() {
    // remove specific event handlers
    if (!onLoad) {
      container.removeEventListener('click', _handleClicks);
    }

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};



