(function () {
    var popover = {
        $body: $('body'),
        container: '.popover',
        trigger: '.popover-toggle',
        content: '.popover-content',
        close: '.popover-close',
        dataOpened: 'popover-open',

        init: function(){
            popover.on.accessible();
            popover.controller();
        },
        controller: function(){
            popover.$body.on('click',popover.trigger,function (e) {
                e.preventDefault();

                var isOpen = $(this).hasClass(popover.dataOpened);
                popover.on.closeAll();

                if (!isOpen) {
                    popover.on.open($(this));
                }
            });

            popover.$body.on('click',popover.close,function (e) {
                e.preventDefault();
                var $el = $(this).parents(popover.container).children(popover.trigger);
                popover.on.close($el);
            });

            popover.$body.on('click',function (e) {
                var $target = $(e.target),
                    shouldFocus = $target.parents(popover.container).length != 0;

                if (!shouldFocus){
                    popover.on.closeAll();
                }
            });
        },
        on: {
            accessible: function () {
                $(popover.trigger).each(function() {
                    var $el = $(this);
                    $el.attr('aria-haspopup',true);
                    $el.attr('aria-expanded',false);
                    $el.attr('tabindex',0);
                });
            },
            open: function ($el) {
                $el.attr('aria-expanded',true);
                $el.addClass(popover.dataOpened);

                $el.siblings(popover.content).focus();
            },
            close: function ($el) {
                $el.attr('aria-expanded',false);
                $el.removeClass(popover.dataOpened);
            },
            closeAll: function () {
                $(popover.trigger).each(function() {
                    var $el = $(this);
                    popover.on.close($el);
                });
            }
        }
    };

    UX.popover = popover; // add to global namespace
})();