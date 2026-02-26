A17.Behaviors.FormBySteps = function(form) {

  var previousBtn = form.querySelector("[data-prev-step]");
  var nextBtn = form.querySelector("[data-next-step]");
  var currentStep = document.querySelector("[data-form-currentStep]");
  var current = form.getAttribute("data-form-steps");

  function _previousStep() {
    current--;

    _updateStep();
  }

  function _nextStep() {
    current++;

    _updateStep();
  }

  function _updateStep() {
    form.setAttribute("data-form-steps", current);
    if(currentStep) currentStep.textContent = current + 1;
  }

  function _init() {
    previousBtn.addEventListener('click', _previousStep);
    nextBtn.addEventListener('click', _nextStep);
  }

  this.destroy = function() {
    // remove specific event handlers
    nextBtn.removeEventListener('click', _handleResized);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
