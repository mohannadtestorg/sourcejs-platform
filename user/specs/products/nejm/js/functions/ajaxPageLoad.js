A17.Functions.ajaxPageLoad = function() {

  var ajaxActive = true;
  var failSafe = false;
  var docContent;
  var documentContent;
  var docTitle;

  function defaultComplete(options,doc) {
    // replace content
    document.querySelector('[data-content]').innerHTML = doc.querySelector('[data-content]').innerHTML;
    // replace title
    docTitle = doc.title;
    document.title = docTitle;
    // scroll to top
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    // update history
    if (!options.popstate) {
      min$(document).trigger('history:pushstate', { url: options.href, type: options.type, title: docTitle });
    }
    // so we know what to do on replace states
    A17.previousAjaxPageLoadType = options.type;
  }

  function tabComplete(options,doc) {
    // replace content
    document.querySelector('[data-tab-content]').innerHTML = doc.querySelector('[data-tab-content]').innerHTML;
    // replace titles
    docTitle = doc.title;
    document.title = docTitle;
    // update history
    if (!options.popstate) {
      min$(document).trigger('history:pushstate', { url: options.href, type: options.type, title: docTitle });
    }
    // so we know what to do on replace states
    A17.previousAjaxPageLoadType = options.type;
  }

  function modalComplete(options,doc) {
    // replace content
    document.querySelector('[data-modal-content]').innerHTML = doc.querySelector('body').innerHTML;
    min$(document).trigger('modal:show');
  }

  function loadDocument(options) {

    if (!ajaxActive) {
      return false;
    }

    min$(document).trigger('modal:hide');
    min$(document).trigger('navPrimary:hide');

    docTitle = null;
    docContent = null;
    documentContent = null;

    min$(document).trigger('ajaxPageLoadMask:show');
    min$(document).trigger('loader:start');

    A17.Helpers.ajaxRequest({
      url: options.href,
      type: 'GET',
      requestHeaders: [
        {
          header: 'X-CSRF-Token',
          value: min$('meta[name="csrf-token"]').attr('content')
        }
      ],
      onSuccess: function(data){
        try {
          // parse returned page
          var parser = new DOMParser();
          var doc = parser.parseFromString(data, 'text/html');
          // do on complete func
          switch (options.type) {
            case 'tab':
              tabComplete(options,doc);
              break;
            case 'modal':
              modalComplete(options,doc);
              break;
            default:
              defaultComplete(options,doc);
          }
          // fix images
          picturefill();
          // tell the page and hide the loaders
          min$(document).trigger('page:updated');
          min$(document).trigger('loader:complete');
          min$(document).trigger('ajaxPageLoadMask:hide');
        } catch (err) {
          min$(document).trigger('loader:error');
          min$(document).trigger('ajaxPageLoadMask:hide');
          if (failSafe) {
            location.href = options.href;
          } else {
            console.log(err);
          }
        }
      },
      onError: function(data){
        min$(document).trigger('loader:error');
        min$(document).trigger('ajaxPageLoadMask:hide');
        if (failSafe) {
          location.href = options.href;
        } else {
          console.log(data);
        }
      }
    });
  }

  function popstate(event) {
    loadDocument({
      href: event.data.url,
      type: event.data.type,
      title: event.data.title,
      popstate: event
    });
  }

  function getPage(event) {
    if (event.data.url) {
      if (!history.state && (!event.data.type || (event.data.type && event.data.type !== 'modal'))) {
        min$(document).trigger('history:replacestate', {
          url: location.href,
          type: event.data.type || 'page',
        });
        A17.previousAjaxPageLoadType = event.data.type || 'page';
      }
      loadDocument({
        href: event.data.url,
        type: event.data.type || 'page',
        popstate: false
      });
    }
  }

  document.addEventListener('ajax:getPage', getPage);
  document.addEventListener('ajax:pageload:popstate', popstate);
};
