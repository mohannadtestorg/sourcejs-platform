A17.Behaviors.AjaxFormSubmit = function(container) {

  var action = container.action;
  var ajaxing = false;

  function _removeErrors() {
    min$('.a-error-msg',container).each(function(){
      this.parentNode.removeChild(this);
    });
    min$('.s-error',container).removeClass('s-error');
    ajaxing = false;
  }

  function _insertError(name,msg) {
    min$('input[name*='+name+']').each(function(){
      var p = document.createElement('span');
      p.className = 'a-error-msg';
      p.innerHTML = '<svg class="icon--alert" aria-hidden="true"><use xlink:href="#icon--alert" /></svg>';
      p.innerHTML += msg;

      var legend = container.querySelector('legend');
      legend.parentNode.insertBefore(p, legend.nextSibling);
      this.parentNode.className += ' s-error';
    });
  }

  function _parseErrors(errors) {
    min$('.a-btn',container).removeClass('a-loader');
    for (var key in errors) {
      if (!errors.hasOwnProperty(key)) {
        continue;
      }
      _insertError(key,errors[key]);
    }
  }

  function _success(msg) {
    min$('.a-btn',container).removeClass('a-loader');
    ajaxing = false;

    var legend = container.querySelector('legend');

    if(legend) legend.textContent = msg;
    container.classList.add('s-success');

    setTimeout(function(){
      min$(document).trigger('modal:hide');
    }, 3000);

    min$(document).trigger('ajaxFormSubmit:success');
  }

  function _submit(event) {
    event.preventDefault();
    if (ajaxing) {
      return;
    }
    ajaxing = true;
    min$('.a-btn[type=submit]',container).addClass('a-loader');
    _removeErrors();
    // do an ajax request
    A17.Helpers.ajaxRequest({
      url: action,
      type: 'POST',
      requestHeaders: [
        {
          header: 'X-CSRF-Token',
          value: min$('meta[name=\'csrf-token\']').attr('content')
        }
      ],
      data: A17.Helpers.objectifyForm(container),
      onSuccess: function(data){
        try {
          data = JSON.parse(data);
          _success(data.successMessage);
        } catch(err) {}
      },
      onError: function(data){
        try {
          data = JSON.parse(data);
          _parseErrors(data);
        } catch(err) {
          min$(document).trigger('modal:hide');
        }
      }
    });
  }

  function _init() {
    container.addEventListener('submit', _submit, false);
  }

  this.destroy = function() {
    // remove specific event handlers
    container.removeEventListener('submit', _submit);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
