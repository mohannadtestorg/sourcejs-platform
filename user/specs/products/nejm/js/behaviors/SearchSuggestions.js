// Edited by Bill Pairaktaridis. Line 92
A17.Behaviors.SearchSuggestions = function(form){

  var $form;
  var $input;
  var $button;
  var $searchSuggestions;
  var timer;
  var lastSearchTime;
  var action;
  var allow = true;

  function _hideSuggestions() {
    document.documentElement.classList.remove('s-search-suggestions-active');
    if ($searchSuggestions) {
      $searchSuggestions.parentNode.removeChild($searchSuggestions);
      $searchSuggestions = null;
    }
  }

  function _doAjax(){
    if ($input[0].value.length === 0 && $searchSuggestions) {
      _hideSuggestions();
    } else if (allow) {
      lastSearchTime = Date.now();
      var thisSearchTime = lastSearchTime;
      $button.addClass('s--loading');
      clearTimeout(timer);
      timer = setTimeout(function(){
        A17.Helpers.ajaxRequest({
          url: action,
          type: 'GET',
          data: A17.Helpers.objectifyForm(form),
          onSuccess: function(data){
            try {

              _hideSuggestions();

              if (thisSearchTime === lastSearchTime) {
                if (data.length > 0) {
                  $searchSuggestions = document.createElement('ul');
                  $searchSuggestions.className = 'm-search-suggestions';
                  $searchSuggestions.innerHTML = data;
                  $input[0].parentNode.appendChild($searchSuggestions);
                  document.documentElement.classList.add('s-search-suggestions-active');
                }

                $button.removeClass('js--loading');
              }
            } catch(err) {
              console.log(err);
            }
          },
          onError: function(data){
            console.log(data);
          }
        });
      }, 250);
    }
  }

  function _searchHide() {
    // $input[0].value = '';
    _hideSuggestions();
    $input[0].blur();
    allow = true;
  }

  function _searchShow() {
    setTimeout(function(){
      $input[0].focus();
    }, 250); // timeout to allow the searchToggle show() time to scroll page to 0
  }

  function _inputFocus() {
    min$(document).trigger('navPrimary:closeActive');
  }

  function _escape(event) {
    var isInput = (event.target.tagName === 'INPUT');
    if (event.keyCode === 27 && !isInput) {
      _hideSuggestions();
    }
  }

  function _init() {
    action = form.getAttribute('data-searchsuggestions-action');

    $form = min$(form);
    $input = min$('[data-gsearch-keyword-input]', form);
    $button = min$('[data-gsearch-submit]', form);
    if (action){
      $input.on('input', _doAjax);
      $input.on('propertychange', _doAjax);
    }
    $input.on('focus', _inputFocus);

    min$(document).on('search:hide', _searchHide);
    min$(document).on('search:show', _searchShow);

    window.addEventListener('keyup', _escape, false);
  }

  this.destroy = function() {
    _hideSuggestions();
    // remove specific event handlers
    $input.off('input', _doAjax);
    $input.off('propertychange', _doAjax);
    $input.off('focus', _inputFocus);

    min$(document).off('search:hide', _searchHide);
    min$(document).off('search:show', _searchShow);

    window.removeEventListener('keyup', _escape);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
