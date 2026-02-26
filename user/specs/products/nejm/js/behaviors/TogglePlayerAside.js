A17.Behaviors.TogglePlayerAside = function(btn) {

    var klassActive = "s-aside-active";
    var aside = document.querySelector("[data-popup-aside]");
    var closeBtn = document.querySelector("[data-popup-aside-close]");

    function _handleClicks(e) {
        e.currentTarget.blur();

        if(aside.classList.contains(klassActive)) _hide();
        else aside.classList.add(klassActive);
    }

    function _hide() {
        aside.classList.remove(klassActive);
    }

    function _init() {
        btn.addEventListener('click', _handleClicks, false);
        closeBtn.addEventListener('click', _hide, false);
    }

    this.destroy = function() {
        // remove specific event handlers
        btn.removeEventListener('click', _handleClicks);

        // remove properties of this behavior
        A17.Helpers.purgeProperties(this);
    };

    this.init = function() {
        _init();
    };
};
