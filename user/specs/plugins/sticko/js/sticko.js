(function () {
    var isMobile = false; // variable use to determine if responsive mode is on or off


    var sticko = {
        $parent: $("body"),
        $elements: "",
        $element: "",
        $child: "",
        pOffset: "",
        pWidth: "",
        eTop: "auto",
        startPoint: "",
        newHeight: 0,
        vPort: "screen-sm",
        originalHeight: "",
        forceDisableMobileSticky:false,

        init: function () {
            sticko.control();
            sticko.launch();
            sticko.ctrl.check();
        },

        launch: function () {
            sticko.$elements = $(".sticko, .sticko__md"); // get sticky elements
            if (isMobile && sticko.$element.length) {
                sticko.$elements.each(function () {
                    $(this).attr('style', '');
                    if(sticko.forceDisableMobileSticky){
                        $(this).find('.sticko__child').attr('style', '');
                    }
                    if ($(this).hasClass("sticko__md")) {
                        $(this).removeClass("js--sticko");
                    }
                });
                return;
            }
            sticko.$elements.each(function () { //go over sticky elements
                sticko.$element = $(this); // get current element
                if (sticko.$element.hasClass("sticko__md") && isMobile) { // check if we are in responsive view port and we have responsive element
                    return; // skip responsive sticky element
                }
                sticko.$element.addClass("js--sticko"); // add class that make elements stikcy
                if (sticko.$element.closest(".sticko__parent").length) { // get parent element if exist
                    sticko.$parent = sticko.$element.closest(".sticko__parent");
                } else {
                    sticko.$parent = $("body"); // set body as prent element if parent element doesn't exist
                }
                sticko.define(); // get parents offsets and apply those dimensions
                if (sticko.$element.find(".sticko__child").length) {
                    sticko.$child = sticko.$element.find(".sticko__child");
                    sticko.get.height();
                }
                sticko.ads();

                if (sticko.$element.length && sticko.$element.find( ".sticko__child" ).length) { // check of we have sticko element and it has sticko child
                    var val = 0;
                    sticko.originalHeight= sticko.newHeight;
                    sticko.set.height(val , sticko.originalHeight);
                    sticko.ctrl.scrolla();
                }
            });

        },
        control: function () {
            $(document).on(sticko.vPort + '-on', function () { // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                isMobile = true;

            });

            $(document).on(sticko.vPort + '-off', function () { // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
                isMobile = false;
            });

            $(document).on('smartResize', function () { // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
                var hHeight = sticko.get.fixedpageElementsHeight();

                var styles = {
                    top: hHeight + 10 // modify the element top
                };
                sticko.apply(sticko.$element, styles);
            });
        },
        define: function () {
            sticko.pOffset = sticko.$parent.offset(); // get parent offset
            sticko.pLeft= sticko.pOffset.left + parseInt(sticko.$parent.css("padding-left"));// get prent's left offset
            sticko.pWidth= sticko.$parent.width(); // get parent width

            var styles = {
                width: sticko.pWidth, // store prent width to  be added to sticky element styles
                top: sticko.$element.css("top") // modify the element top
            };
            sticko.apply(sticko.$element, styles); // apply styles after extraction from parent element
        },
        apply: function (element, styles) { // apply styles after extraction from parent element
            element.css(styles);
        },
        ads: function () {

        },
        get: {
            height: function () {
                var childHeight = 0;
                sticko.$element.children(":not(.sticko__child)").each(function () { // get elements height (except sticko child)
                    childHeight = childHeight + $(this).outerHeight();
                });
                sticko.newHeight = $(window).outerHeight() - (childHeight + sticko.pOffset.top);

                if ($('body').outerHeight() <= $(window).outerHeight()) {
                    sticko.newHeight = sticko.newHeight - $('.page-footer').outerHeight();
                }

                var styles = {
                    height: sticko.newHeight,
                    'overflow-y': "auto"
                };
                sticko.apply(sticko.$child, styles);
            },
            fixedpageElementsHeight:function () {
                var elementsHeight= $('header, .pageHeader').outerHeight();

                if(!elementsHeight){
                    elementsHeight=0;
                }

                if($('.fixed-element').length){
                    $.each($('.fixed-element'), function( index, value ) {
                        if($(value).outerHeight()){
                            elementsHeight+=$(value).outerHeight();
                        }
                    });
                }
                return elementsHeight;
            }
        },
        set : {
            height: function(val , originalHeight){
                var offestYTop = window.pageYOffset; // get windows y-top offset
                var offsetBottom = offestYTop + $(window).outerHeight(); // get windows y-bottom offset

                var tabsHeight =  sticko.set.variables();
                var fixedArea = $(document).outerHeight() - $("footer").outerHeight() - tabsHeight; // get break point for stickiness

                var styles= {}; // define styles varibale
                if (offsetBottom >= fixedArea) { // check of we reached break point
                    val = offsetBottom - fixedArea; // get new height
                    sticko.newHeight = originalHeight - val;
                    styles = {
                        height: sticko.newHeight // store new height
                    };
                } else {
                    styles = {
                        height: originalHeight // reset original height
                    };
                }
                sticko.apply(sticko.$child,styles); // apply new height

                var hHeight =  sticko.get.fixedpageElementsHeight();

                if ($('.article-row-left').outerHeight() < $(window).outerHeight()) {

                    if (!UX.accordion.isArticleAccordion) {
                        $('.article-row-left').height($(window).outerHeight() - hHeight );
                    }
                }

                if ($('.sticko__side-content').outerHeight() < $(window).outerHeight()) {
                    $('.sticko__side-content').height($(window).outerHeight() - hHeight);
                }

                if($('.dynamic-sticko').length) {
                    $('.dynamic-sticko').each(function () {
                        var dynamicStickyElement = $(this);
                        dynamicStickyElement.css('position', 'static');

                        dynamicScrollTop = $(window).scrollTop() + hHeight;
                        dynamicHeight = $(window).outerHeight() -hHeight;

                        if (dynamicStickyElement.find('.tab__nav').length) {

                            dynamicHeight -= dynamicStickyElement.find('.tab__nav').outerHeight();
                        }


                        if (offsetBottom >= fixedArea) { // check of we reached break point
                            val = offsetBottom - fixedArea; // get new height
                            dynamicStickyElement.css('height', dynamicHeight - val);
                            $('.sticko__child').css('height', dynamicHeight - val);

                        } else {
                            dynamicStickyElement.css('height', dynamicHeight);
                            $('.sticko__child').css('height', dynamicHeight);
                        }


                        if( dynamicScrollTop >= dynamicStickyElement.offset().top ) {
                            dynamicStickyElement.css('position', 'fixed');
                            dynamicStickyElement.css('top',hHeight);
                        }
                    });

                }

            },
            variables: function () {
                var extraMargin = 0;
                return extraMargin;
            },

            forceDisableMobileSticky:function () {
                sticko.forceDisableMobileSticky=false;
            }

        },
        ctrl: {
            check: function () { //check certain for action
                $(window).resize(function(){
                    sticko.ctrl.resize();
                });
                $(document).on('smartResize', function () { // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                    sticko.ctrl.resize();
                });
            },
            resize: function () {
                sticko.launch();
            },
            scrolla: function () { // get the new height of sticko child when scroll to avoid overlaping the footer region
                var val = 0;
                $(window).scroll(function () {
                    if (!(isMobile && sticko.forceDisableMobileSticky)){
                        sticko.set.height(val, sticko.originalHeight);
                    }
                })
            }
        }
    };

    UX.sticko = sticko; // add to global namespace

})();