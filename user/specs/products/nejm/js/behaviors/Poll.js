A17.Behaviors.Poll = function(container) {

  var action = container.action;
  var classSubmitted = 's-submitted';
  var classResults = 's-results';
  var classCorrect = 's-correct';
  var classIncorrect = 's-incorrect';
  var multiTry = container.getAttribute('data-poll-multi-try') === 'true' ? true : false;
  var submitted = container.classList.contains(classSubmitted);
  var results = container.classList.contains(classResults);
  var correct = container.classList.contains(classCorrect);
  var pollID = container.querySelector('[name=pollID]').value;
  var key;

  function _enableRadios() {
    min$('input[type=radio]', container).each(function(){
      this.removeAttribute('disabled');
    });
  }

  function _disableRadios() {
    min$('input[type=radio]', container).each(function(){
      this.setAttribute('disabled', 'disabled');
    });
  }

  function _updateAriaHidden(item,value) {
    try {
      min$(item, container).attr('aria-hidden', value);
    } catch (err) {}
  }

  function _updatePercentage(id,data) {
    var $label = container.querySelector('label[for="poll_' + pollID + '_' + id + '"]');
    if ($label) {
      try {
        $label.querySelector('[data-poll-percentage]').textContent = data.percentage + '%';
      } catch(err){}
      try {
        $label.querySelector('[data-poll-bar]').style.width = data.percentage + '%';
      } catch(err){}
    }
  }

  function _loopData(data) {
    for (key in data) {
      if (!data.hasOwnProperty(key)) {
        continue;
      }
      if (key === 'submitted' && data[key] === true) {
        submitted = true;
        container.classList.add(classSubmitted);
      }
      if (key === 'correct' && multiTry) {
        if (data[key] === true) {
          correct = true;
          container.classList.remove(classIncorrect);
          container.classList.add(classCorrect);
        } else {
          correct = false;
          container.classList.add(classIncorrect);
        }
      }
      if (key === 'responses') {
        min$('[data-poll-responses]', container).each(function(){
          this.textContent = data[key] + ' Total Responses';
        });
      }
    }
    for (key in data) {
      if (!data.hasOwnProperty(key)) {
        continue;
      }
      if (data[key].percentage !== undefined) {
        _updatePercentage(key,data[key]);
      }
    }
    container.classList.add(classResults);
    _disableRadios();
    //
    _updateAriaHidden('[data-poll-init]','false');
    if (submitted) {
      _updateAriaHidden('[data-poll-question]','false');
      if (correct) {
        _updateAriaHidden('[data-poll-correct]','false');
      } else {
        _updateAriaHidden('[data-poll-incorrect]','false');
      }
    } else {
      _updateAriaHidden('[data-poll-how-others-chose]','false');
    }
  }

  function _submit(event) {
    event.preventDefault();
  }

  function _getResults(event) {
    if (event) {
      event.preventDefault();
    }
    if (submitted && correct) {
      return;
    }
    var submitClick = this.getAttribute('data-poll-submit') !== null ? true : false;
    var viewClick = this.getAttribute('data-poll-view') !== null ? true : false;
    var dataObj = A17.Helpers.objectifyForm(container);
    dataObj.initialSubmit = submitted ? false : true;
    container.style.minHeight = container.offsetHeight + 'px';
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
      data: submitClick ? dataObj : {},
      onSuccess: function(data){
        try {
          data = JSON.parse(data);
          _loopData(data);
        } catch(err) {}
      },
      onError: function(data){
        try {
          data = JSON.parse(data);
          console.log(data);
        } catch(err) {}
      }
    });
  }

  function _backToPoll(event) {
    event.preventDefault();
    container.classList.remove(classResults);
    container.classList.remove(classSubmitted);
    container.classList.remove(classCorrect);
    container.classList.remove(classIncorrect);
    _enableRadios();
    _updateAriaHidden('[data-poll-question]','false');
    _updateAriaHidden('[data-poll-init]','false');
    _updateAriaHidden('[data-poll-how-others-chose]','true');
    _updateAriaHidden('[data-poll-correct]','true');
    _updateAriaHidden('[data-poll-incorrect]','true');
  }

  function _handleResized() {
    container.style.minHeight = '0px';
  }

  function _init() {
    _updateAriaHidden('[data-poll-question]','false');
    _updateAriaHidden('[data-poll-init]','false');
    _updateAriaHidden('[data-poll-how-others-chose]','true');
    _updateAriaHidden('[data-poll-correct]','true');
    _updateAriaHidden('[data-poll-incorrect]','true');
    if (submitted) {
      _disableRadios();
    }
    document.addEventListener('resized', _handleResized);
    container.removeEventListener('submit', _submit, false);
    container.querySelector('[data-poll-submit]').addEventListener('click', _getResults, false);
    container.querySelector('[data-poll-view]').addEventListener('click', _getResults, false);
    container.querySelector('[data-poll-back]').addEventListener('click', _backToPoll, false);
    container.querySelector('[data-try-again]').addEventListener('click', _backToPoll, false);
    if (results) {
      container.querySelector('[data-poll-view]').click();
    }
  }

  this.destroy = function() {
    // remove specific event handlers
    document.removeEventListener('resized', _handleResized);
    container.removeEventListener('submit', _submit);
    container.querySelector('[data-poll-submit]').removeEventListener('click', _getResults);
    container.querySelector('[data-poll-view]').removeEventListener('click', _getResults);
    container.querySelector('[data-poll-back]').removeEventListener('click', _backToPoll);
    container.querySelector('[data-try-again]').removeEventListener('click', _backToPoll);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
