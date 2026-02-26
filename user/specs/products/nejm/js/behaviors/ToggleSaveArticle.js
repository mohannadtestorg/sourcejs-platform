A17.Behaviors.ToggleSaveArticle = function(container) {

  /*
  Initial integration can't handle "saved" state,
  the JS/CSS is set up to handle that though,
  see notes inline in this file..
  */

  var labels = {
    saved: {
      tooltip: 'Remove',
      ariaLabel: 'Save to account toggle - click to remove',
    },
    unsaved: {
      tooltip: 'Save to account',
      ariaLabel: 'Save to account toggle - click to add',
    }
  };

  var ajaxing = false;
  var saved = (container.classList.contains('s-saved'));
  var saveHref = container.getAttribute('data-save-href');
  var deleteHref = container.getAttribute('data-delete-href');

  function _updateLabels() {
    if (saved) {
      container.setAttribute('data-tooltip', labels.saved.tooltip);
      container.setAttribute('aria-label', labels.saved.ariaLabel);
      container.classList.add('s-saved');
    } else {
      container.setAttribute('data-tooltip', labels.unsaved.tooltip);
      container.setAttribute('aria-label', labels.unsaved.ariaLabel);
      container.classList.remove('s-saved');
    }
  }

  function _doDeleteRequest() {
    A17.Helpers.ajaxRequest({
      url: deleteHref,
      type: 'PUT',
      onSuccess: function(data){
        container.classList.remove('s-loading');
        ajaxing = false;
      },
      onError: function(data){
        console.log(data);
        container.classList.remove('s-loading');
        ajaxing = false;
        // reset as ajax didn't work
        saved = true;
        _updateLabels();
        // inform
        window.alert('Unable to update article save settings, please reload the page and try again.');
      }
    });
  }

  function _handleClicks(event) {
    event.preventDefault();
    event.stopPropagation();
    container.blur();
    min$(document).trigger('tooltip:hide');
    if (!ajaxing) {
      ajaxing = true;
      container.classList.add('s-loading');

      /*
      initially the app cant handle "saved" display,
      so manually saving "saved" = false to force resaves
      */
      saved = false;
      /**/

      if (!saved) {
        // stop listening for ajax form submits
        min$(document).off('ajaxFormSubmit:success');
        min$(document).off('ajaxFormSubmit:aborted');
        // add a listener for ajax form submit abort (probably closed lightbox)
        min$(document).on('ajaxFormSubmit:aborted', function(){
          min$(document).off('ajaxFormSubmit:success');
          min$(document).off('ajaxFormSubmit:aborted');
          ajaxing = false;
          container.classList.remove('s-loading');
        });
        // add a listener for ajax form submit success
        min$(document).on('ajaxFormSubmit:success', function(){
          min$(document).off('ajaxFormSubmit:success');
          min$(document).off('ajaxFormSubmit:aborted');
          saved = true;
          /*
          initially the app cant handle "saved" display,
          so manually saving "saved" = false to force resaves
          */
          saved = false;
          /**/
          _updateLabels();
          ajaxing = false;
          container.classList.remove('s-loading');
        });
        // open a modal to do the ajax form
        min$(document).trigger('ajax:getPage', {
          url: saveHref,
          type: 'modal',
          modalClass: 'g-modal--narrow',
          opener: container,
        });
      } else {
        saved = false;
        _updateLabels();
        _doDeleteRequest();
      }
    }
  }

  function _init() {
    _updateLabels();
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
