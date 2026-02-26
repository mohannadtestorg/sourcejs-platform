A17.Behaviors.NEJMGroupDDToggle = function(container) {
  var active = false;
  var dE = document.documentElement;
  var triggerHovered = false;
  var targetHovered = false;
  var hoverIntentTime = 250;
  var hoverTimer;
  var $container;
  var $target;

  function _hovered() {
    return (triggerHovered || targetHovered);
  }

  function _show() {
    if (!active) {
      active = true;
      dE.classList.add('s-nejm-group-dd');
    }
  }

  function _hide() {
    if (active) {
      active = false;
      dE.classList.remove('s-nejm-group-dd');
    }
  }

  function _triggerMouseEnter() {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
    }
    if (triggerHovered) {
      min$(document).trigger('NEJMGroupDDToggle:show');
    } else {
      hoverTimer = setTimeout(function(){
        triggerHovered = true;
        min$(document).trigger('NEJMGroupDDToggle:show');
      }, hoverIntentTime);
    }
  }

  function _triggerMouseLeave() {
    triggerHovered = false;
    if (hoverTimer) {
      clearTimeout(hoverTimer);
    }
    hoverTimer = setTimeout(function(){
      if (!targetHovered) {
        min$(document).trigger('NEJMGroupDDToggle:hide');
      }
    }, hoverIntentTime);
  }

  function _targetMouseEnter() {
    targetHovered = true;
    if (hoverTimer) {
      clearTimeout(hoverTimer);
    }
  }

  function _targetMouseLeave() {
    targetHovered = false;
    if (hoverTimer) {
      clearTimeout(hoverTimer);
    }
    hoverTimer = setTimeout(function(){
      if (!triggerHovered) {
        min$(document).trigger('NEJMGroupDDToggle:hide');
      }
    }, hoverIntentTime);
  }

  function _triggerTouches(event) {
    event.preventDefault();
    if (active) {
      min$(document).trigger('NEJMGroupDDToggle:hide');
    } else {
      min$(document).trigger('NEJMGroupDDToggle:show');
    }
  }

  function _targetMouseClick(event) {
    event.preventDefault();
    if (active) {
      _hide();
    } else {
      _show();
      triggerHovered = true;
      if (hoverTimer) {
        clearTimeout(hoverTimer);
      }
    }
  }


  function _init() {
    $container = min$(container);
    $target = min$('#NEJMGroup');

    $container.on('mouseenter', _triggerMouseEnter);
    $container.on('click', _targetMouseClick);
    $container.on('mouseleave', _triggerMouseLeave);
    $container.on('touchend', _triggerTouches);
    $target.on('mouseenter', _targetMouseEnter);
    $target.on('mouseleave', _targetMouseLeave);

    min$(document).on('NEJMGroupDDToggle:show',_show);
    min$(document).on('NEJMGroupDDToggle:hide',_hide);
    min$(document).on('NEJMGroupDDToggle:toggle',_toggle);
  }

  this.destroy = function() {
    // remove specific event handlers
    $container.off('mouseenter', _triggerMouseEnter);
    $container.off('click', _targetMouseClick);
    $container.off('mouseleave', _triggerMouseLeave);
    $container.off('touchend', _triggerTouches);
    $target.off('mouseenter', _targetMouseEnter);
    $target.off('mouseleave', _targetMouseLeave);

    min$(document).off('NEJMGroupDDToggle:show',_show);
    min$(document).off('NEJMGroupDDToggle:hide',_hide);
    min$(document).off('NEJMGroupDDToggle:toggle',_toggle);

    // remove properties of this behavior
    A17.Helpers.purgeProperties(this);
  };

  this.init = function() {
    _init();
  };
};
