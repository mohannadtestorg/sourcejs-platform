UX.controller.extra = function () {
    UX.controller.$body.on("click", function (e) { // hide / close opened components when click out side it
        UX.controller.active = UX.controller.$body.attr('data-active');
        if (typeof(eval("UX." + UX.controller.active)) != "undefined"
            && typeof(eval("UX." + UX.controller.active).$section) != "undefined"
            && typeof(eval("UX." + UX.controller.active).$controller) != "undefined") {
            var container = eval("UX." + UX.controller.active).$section;
            var target = eval("UX." + UX.controller.active).$controller;
            if (!container.is(e.target) // if the target of the click isn't the container...
                && container.has(e.target).length === 0
                && !target.is(e.target) // if the target of the click isn't the controller...
                && target.has(e.target).length === 0
                && !$(e.target).hasClass('jcf-option-inDropblock')) // ... nor a descendant of the controller
            {
                eval("UX." + UX.controller.active).on.hide(e);
            }
        }
    });
}