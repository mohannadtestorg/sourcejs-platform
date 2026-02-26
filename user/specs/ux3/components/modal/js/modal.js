(function () {
    var $body = $('body'),
        $window = $(window),
        tabKey = 9,
        shift = 16;

    var modal = {
        $toggle: $('[data-toggle="modal"]'),
        $target: null,
        revers: false,
        lastItem: null,
        items: null,
        $close: null,

        init: function () {
            modal.$target  = $(modal.$toggle.data('target'));
            modal.control();
        },
        control: function () {
            $body.on('click', '[data-toggle="modal"]', function (e) {
                e.preventDefault();
                modal.$toggle = $(this);
                modal.$target = $(modal.$toggle.data('target'));
                modal.$close = modal.$target.find('.close');
                modal.items = modal.$target.find('a, button, input');
                modal.items.each(function (index) {
                    if (index === modal.items.length - 1) {
                        modal.lastItem = $(this);
                    }
                });
                modal.on.show();
            });

            $body.on('click', '.modal', function (e) {

                var target = $(e.target);
                if(!target.is('.modal__dialog') && !target.closest('.modal__dialog').length > 0) {
                    //e.preventDefault();
                    modal.on.hide();
                }

            });

            $body.on('click', '[data-dismiss="modal"]', function (e) {
                modal.on.hide();
            });

            $('.modal').on('keydown', function (e) {
                if (e.keyCode === shift) {
                    modal.revers = true;
                }

                if ((e.keyCode || e.which) === tabKey) {
                    if (!modal.revers) {
                        modal.on.tab();
                    } else {
                        modal.on.tabRevers();
                    }
                }
            });

            $window.on('keyup',function (e) {
                if(e.keyCode === shift){
                    modal.revers = false;
                }
            });
        },
        on: {
            show: function (e) {
                if (typeof(UX.controller) !== "undefined"){
                    UX.controller.check();
                }
                setTimeout(function () {
                    $body.attr('data-active', 'modal');
                    var $autofocus = modal.$target.find('[autofocus]');
                    if($autofocus.length)
                        $autofocus.focus();
                    else
                        modal.$close.focus();
                }, 250);
                modal.$target.closest("[class*='sticko']").addClass("js--open");
            },
            hide:  function () {
                $body.removeAttr('data-active');
                modal.$target.closest("[class*='sticko']").removeClass("js--open");
            },
            tab: function () {
                modal.$close.off();
                modal.lastItem.on('focusout', function () {
                    modal.$close.focus();
                });
            },
            tabRevers: function () {
                modal.lastItem.off();
                modal.$close.on('focusout', function () {
                    modal.lastItem.focus();
                });
            }
        }
    };

    UX.modal = modal; // add to global namespace
})();
