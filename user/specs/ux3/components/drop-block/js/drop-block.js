(function () {
    var $window = $(window),
        isMobile = false,
        $body = $('body');

    var dropBlock = {

        $controllers: $("[data-db-target-for]"),
        $controller: null, // Current drop down controller
        $target: null, // Current target down controller element
        $targets: null, // Holds all targets in Dom
        $parent: null, // Current parent element
        $parents: null, // Hodls all parents in Dom
        escape : 27,
        $container: $(".container"),
        switchVal: null,
        $section: $(".dropBlock__holder"),
        vPort: "screen-sm",

        init: function() {
            dropBlock.control();
        },

        control: function(){

            $body.on('click', '[data-db-target-for]', function(e) {
                e.preventDefault();

                var attr = $(this).is('[data-slide-target]');

                if (typeof attr !== typeof undefined && attr !== false && isMobile) {
                    return;
                }else {
                    dropBlock.$controller   = $(this);
                    dropBlock.find.target();
                }
            });

            $body.on('click', '.coolBar:not(.loi__banner) [data-db-target-of] a:not([data-slide-target])', function(event) {
                dropBlock.on.hide();
            });

            $body.on('click', '.js--open[data-db-target-for]', function(event) {
                dropBlock.on.hide();
            });

            $window.resize(function(){
                if (dropBlock.$parent != null) {
                    dropBlock.find.dimensions();
                }
            });
            $(document).on(dropBlock.vPort + '-on',function(){ // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                isMobile = true;

            });

            $(document).on(dropBlock.vPort + '-off',function(){ // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
                isMobile = false;
            });
        },
        on: {
            show:  function(){ // show  target element
                if (!dropBlock.$controller.closest(".dropBlock__holder").length) {
                    if (typeof(UX.controller) != "undefined"){
                        UX.controller.check();
                    }
                }
                if (dropBlock.$target) {
                    dropBlock.$target.addClass("js--open");
                    dropBlock.$controller.addClass("js--open");
                    $body.attr('data-active', 'dropBlock');
                    dropBlock.$target.closest("[class*='sticko']").addClass("js--open");
                    dropBlock.switch.icon();
                    setTimeout(function () {
                        dropBlock.setFocus();
                    }, 250);
                    $(function() {
                        $(document).on('keydown', '.quick-search :tabbable:not([readonly])', function(e) {
                            var loop = $(this).closest('.quick-search');
                            var firstTabbable = loop.find(':tabbable:not([readonly])').first();
                            var lastTabbable = loop.find(':tabbable:not([readonly])').last();
                            // Leaving the first element with Tab : focus the last one
                            if (firstTabbable.is(e.target) && e.shiftKey == true) {
                                e.preventDefault();
                                lastTabbable.focus();
                            }
                            // Leaving the last element with Tab : focus the first one
                            if (lastTabbable.is(e.target) && e.shiftKey == false) {
                                if(e.which == 13) {
                                    dropBlock.on.hide();
                                }
                                e.preventDefault();
                                firstTabbable.focus();
                            }
                        });
                    });
                    var isLoi = dropBlock.$target.find('.loi').length > 0;

                    if (isLoi) {
                        dropBlock.$target.find('.loi__list').each(function () {
                            UX.loi.on.recalculate($(this));
                        });

                    }
                }

            },
            hide:  function(e){ // hide target element
                if (dropBlock.$targets) {
                    var resetComponent = true;
                    dropBlock.$targets.each(function(){
                        var targetId = $(this).attr("data-db-target-of"); // get this dropblock holder controller
                        var thisClicked = e && $(this).is($(e.target).closest('.accordion-tabbed__content'));

                        if (!(dropBlock.$controller.closest($(this)).length > 0) && $(this).hasClass("js--open")) { //check if this is not nested drop-block
                            if (!e || !thisClicked) {
                                $(this).removeClass("js--open"); // close this dropblock holder
                                $('[data-db-target-for=' + targetId + ']').removeClass("js--open"); // remove class from this holder
                            } else {
                                resetComponent = false;
                            }
                        } else {
                            return;
                        }
                    });
                    if (resetComponent) {
                        dropBlock.$controllers = $("[data-db-target-for]");
                        //dropBlock.$controllers.removeClass("js--open");
                        if ($body.attr('data-active')== "dropBlock") {
                            $body.removeAttr('data-active');
                            $('body, html').removeClass('lock-screen');
                        }
                        dropBlock.$target.closest("[class*='sticko']").removeClass("js--open");
                        dropBlock.switch.back();
                    }
                }
            },
            escape: function(){ // hide target if user clicks escape key
                if (dropBlock.$target != null ) {
                    dropBlock.on.hide();
                }

            }
        },
        setFocus: function() {
            $(".header__quick-menu .quick-search-pane__anywhere .ui-autocomplete-input").focus();
        },
        find: {
            target: function(){ // get the target element if existed
                if ($("[data-db-target-of]").length) {
                    dropBlock.$targets = $("[data-db-target-of]");
                    // dropBlock.$targets.each(function(){
                    //     var temp = $(this).attr("data-db-target-of");
                    //     var temp2 = dropBlock.$controller.attr("data-db-target-for");
                    //     if( temp == dropBlock.$controller.attr("data-db-target-for") ) {
                    //         dropBlock.$target = $(this);
                    //     }
                    // });

                    dropBlock.$target = $("[data-db-target-of="+dropBlock.$controller.attr("data-db-target-for")+"]");
                    dropBlock.find.parent();
                    dropBlock.on.show();
                }
            },
            parent: function(){ // get the parent element if existed
                dropBlock.$parent = null;
                if ($("[data-db-parent-of]").length) {
                    dropBlock.$parents = $("[data-db-parent-of]");
                    // dropBlock.$parents.each(function(){
                    //     var temp = $(this).attr("data-db-parent-of");
                    //     var temp2 = dropBlock.$controller.attr("data-db-target-for");
                    //     if( temp == temp2 ) {
                    //         dropBlock.$parent = $(this);
                    //     }
                    // });
                    if ($("[data-db-parent-of="+dropBlock.$controller.attr("data-db-target-for")+"]").length) {
                        dropBlock.$parent = $("[data-db-parent-of="+dropBlock.$controller.attr("data-db-target-for")+"]");
                    }
                    if (dropBlock.$parent != null) {
                        dropBlock.find.dimensions();
                        dropBlock.find.ifContaind();
                    }
                }
            },
            ifContaind: function(){ // check if it parent or target has container element
                if (dropBlock.$parent.find(".container").length &&  !(dropBlock.$target.find(".container").length)){
                    dropBlock.$target.wrapInner("<div class='container'></div>");
                }
            },
            dimensions: function(){ // count the top and left position of the target element based on teh parent element

                var nHeight = dropBlock.$parent.outerHeight(),
                    pOffset = dropBlock.$parent.offset(),
                    pLeft =  pOffset.left,
                    nWidth = dropBlock.$parent.innerWidth(),
                    styles = {};
                dropBlock.$container= $(".container");
                var container_offset = pOffset;
                if (dropBlock.$container.length) {
                     container_offset = dropBlock.$container.offset();
                }
                var container_left = container_offset.left;
                var conteiner_base = container_left + dropBlock.$container.width();
                var parent_base = nWidth + pLeft;

                if( dropBlock.$parent.find(".scrollThenFix").length) {
                    nHeight = dropBlock.$parent.find(".scrollThenFix").outerHeight();
                }

                if (dropBlock.$parent.innerWidth() == dropBlock.$controller.innerWidth()) {
                    nWidth = "auto";
                    if(isMobile) {
                        nWidth = "100%";
                    }
                }

                if (parent_base > conteiner_base) {
                    styles = {
                        top: nHeight,
                        right: "0px",
                        width: nWidth
                    };
                } else {
                    styles = {
                        top: nHeight,
                        left: "0px",
                        width: nWidth
                    };
                }
                dropBlock.$target.css(styles);
            }
        },
        switch: {
            icon: function(){
                dropBlock.switchVal = dropBlock.$controller.attr("data-db-switch");
                switch(dropBlock.switchVal) {
                    case "none":
                        break;
                    case "rotate":
                        dropBlock.$controller.find("i").addClass("js--rotated");
                        break;
                    default:
                        dropBlock.$controller.find("i").addClass(dropBlock.switchVal);
                }
            },
            back: function() {
                dropBlock.$controllers.each(function () {
                    var temp = $(this).attr("data-db-switch");
                    switch(temp) {
                        case "none":
                            break;
                        case "rotate":
                            $(this).find("i").removeClass("js--rotated");
                            break;
                        default:
                            $(this).find("i").removeClass(temp);
                    }
                })
            }

        }
    };
    UX.dropBlock = dropBlock; // add to global namespace
})();