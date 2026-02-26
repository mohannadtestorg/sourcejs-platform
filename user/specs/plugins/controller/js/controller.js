(function () {
    var controller = {
        $body: $('body'),
        active: null,
        escape : 27,
        enabled: false,
        init: function () {
            controller.control();
            controller.check();
        },
        control: function () {
            $(document).on('keydown', function (e) { // hide / close when esc key is pressed
                if ((e.keyCode || e.which) === controller.escape) {
                    controller.check();
                }
            });
        },
        check: function () { // check if there is open / active component
            controller.active = controller.$body.attr('data-active');
            if (controller.active != null) {
                controller.disable();
            }
            controller.extra();
        },
        disable: function () { // hide / close active component
            eval("UX." + controller.active).on.hide();
        },
        extra:function() {
            controller.$body.on("click", function (e) { // hide / close opened components when click out side it
                controller.active = controller.$body.attr('data-active');
                if (typeof(eval("UX." + controller.active)) != "undefined"
                    && typeof(eval("UX." + controller.active).$section) != "undefined"
                    && typeof(eval("UX." + controller.active).$controller) != "undefined"){
                    var container = eval("UX." + controller.active).$section;
                    var target = eval("UX." + controller.active).$controller;
                    if (!container.is(e.target) // if the target of the click isn't the container...
                        && container.has(e.target).length === 0
                        && !target.is(e.target) // if the target of the click isn't the controller...
                        && target.has(e.target).length === 0) // ... nor a descendant of the controller
                    {
                        eval("UX." + controller.active).on.hide(e);
                    }
                }
            });
        }
    };

    UX.controller = controller; // add to global namespace
})();
