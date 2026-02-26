(function () {

    var $window = $(window),
        $body = $('body');

    $(document).ready(function(){
        $(".tab").each(function() { //the rest of this code doesnt seem to support multiple tabs on the page.. but this does
            var activeTab = $(this).find(".tab__nav").find("li.active a").attr("href");

            if (!activeTab && sessionStorage.activeTab) { // check "sessionStorage.activeTab" is solution for LIT-189292
                activeTab = sessionStorage.getItem("activeTab");
            }

            if ($(this).find(activeTab).length == 0) {
                activeTab = null;
            }
            else{
                sessionStorage.setItem("activeTab","");
            }

            if (!activeTab) activeTab = $(this).find(".tab__nav").find("li:first-of-type a").attr("href");

            $('[href="' + activeTab + '"]').click();
            $(this).find(activeTab).addClass("active");
        });
    });

    var tab = {
        $target:null,
        $toggle:null,
        $li:null,
        $ul:$('.tab__nav'),
        $previous:null,
        $content:null,
        isTouched: false,
        //$controls: null,
        pointerPosition: 0.0,
        cumulativeShift: 0.0,
        vPort: "screen-sm", // default responsive break point
        isSlide: false,
        isMobile : false, // variable use to determine if responsive mode is on or off

        init: function(){
            tab.isSlide = $('.tab').hasClass("tab--slide");
            tab.check.viewPort();// get current view port activator break point
            //tab.$controls  = '<div class="swipe__controls"><span class="swipe__btn--prev"><i class="icon-arrow_l"></i></span><span class="swipe__btn--next"><i class="icon-arrow_r"></i></span></div>';
            tab.on.build();
            tab.control();
            tab.check.empty();
        },
        control: function() {
            $body.on('click', '.tab-link', function(e) {
                e.preventDefault();
                tab.on.select.external($(this));
            });

            $body.on('click', '[data-mobile-toggle="dropdown"] a, .dropblock--tab a', function(e) {
                tab.on.select.dropdown($(this));

                if ($('.js--open[data-db-target-for]').length)
                    UX.dropBlock.on.hide();

            });

            $(document).on(tab.vPort + '-on',function(){ // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                tab.isMobile = true;
                $('*[data-slide-target]').addClass('w-slide__btn');

                //UX.slide.init()

                $('.tab').addClass("tab--res"); // class will be used in our scss (to replace media queries)
                tab.additionalControl();
                tab.on.rebuild.responsive(); // rebuild tabs to be responsive
            });

            $(document).on(tab.vPort + '-off',function(){ // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
                tab.isMobile = false;
                $('*[data-slide-target]').removeClass('w-slide__btn');
                $('.tab').removeClass("tab--res");
                tab.on.rebuild.original(); // return tabs as default
            });
        },
        additionalControl: function() {

        },
        animate: {
            scroll: function($content, $target){
                $content.animate({
                    scrollTop: $content.scrollTop() + $target.position().top - 40
                }, 600);

            }
        },
        set: {
            target: function($content, target, temp){
                if (!$content.find(target).length)
                {
                    tab.$target = $content.find("[data-figure-id='"+ temp +"']");
                } else {
                    tab.$target = $content.find(target);
                }
            }
        },
        on: {
            select:{
                external: function(elem) {
                    var target = elem.attr('href'); // get target id

                    target = target.split(" ")[0]; //LIT-162636

                    tab.$toggle   = '#' + elem.data('tab'); //get target pane
                    tab.$li       = $('.tab__nav [href="' + tab.$toggle + '"]'); // get target tabs nav
                    var temp = target.split("#")[1];
                    var animateScroll = function() {
                        tab.$content = $(tab.$toggle).parents(".tab__content");

                        if(tab.isMobile) {
                            //UX.slide.$toggle = $(this);
                            if (tab.isSlide) {
                                tab.set.target($(".w-slide__content"), target, temp);
                                if (tab.$target.length) {
                                    tab.animate.scroll($(".w-slide__content"), tab.$target );
                                    tab.$target.attr("tab-index","1");
                                    tab.$target.focus();
                                }
                            }
                        } else {
                            tab.set.target(tab.$content, target, temp);
                            tab.animate.scroll(tab.$content, tab.$target );
                            //tab.$target.wrap('<a class="accessibility-target" href="#" id="target" aria-disabled="true"></a>' );
                            //tab.$target.attr("tab-index","1");
                            //$("#target").after('<a class="accessibility-back" href="#" id="back" title="back to content"></a>');
                            //$("#target").focus();
                        }
                    };

                    if ($(tab.$toggle).is(":visible")) {
                        tab.$li.click(); // open target tab
                        animateScroll();
                    } else {
                        if ($(tab.$toggle).hasClass('empty')) {
                            $(tab.$toggle).on('content-loaded', function () {
                                animateScroll();
                            });
                            tab.$li.click(); // open target tab
                        } else {
                            tab.$li.click(); // open target tab
                            animateScroll();
                        }
                    }
                },
                dropdown: function(elem) {
                    var dataAttr = elem.closest('ul').data('mobile-toggle');
                    if (dataAttr === 'dropdown' || elem.closest('ul').hasClass('dropblock--tab')) {
                        var dropdownContainer = elem.closest('.dropBlock');
                        dropdownContainer.children('a').find('span').text(elem.text());
                    }


                }
            },
            build: function() {

                //setTimeout(function() {
                tab.$ul.each(function(index){
                    if ($(this).is('.swipe__list')) {
                        tab.on.swipeBuild($(this));
                    }
                    if ($(this).is('.dropblock--tab')) {
                        tab.on.dropdownBuild($(this), index);
                    }
                });
                //}, 200);

            },
            calculate: function(elem) {
                var elemParent = elem.parent();
                var tabNavWidth = 25;
                elem.find('li').each(function(index){
                    tabNavWidth += $(this).innerWidth();
                });
                var elemParentWidth = elemParent.width();
                if (elemParentWidth < tabNavWidth) {
                    if (!elem.parent().is('.scroll')) {
                        tab.on.swipeBuild(elem);
                    }
                } else {
                    tab.on.swipeDestroy(elem);
                }

            },
            swipeBuild: function(elem) { // rebuild tabs to swipe

                var tabNavWidth = 25;
                elem.find('li').each(function(index){
                    tabNavWidth += $(this).innerWidth();

                });

                elem.width(tabNavWidth);
                elem.wrap('<div class="swipe__wrapper"><div class="scroll"></div></div>');

            },
            swipeDestroy: function(elem) { // return tabs to default

                elem.removeAttr('style');
                elem.unwrap('.scroll').unwrap('.swipe__wrapper');
            },
            dropdownBuild: function(elem, index) { // rebuild tabs to be as drop down
                UX.dropBlock.init();
               elem.wrap('<div class="dropBlock" data-db-parent-of="dbTab-'+index+'"></div>');

                var $dropdownContainer = elem.closest('.dropBlock');
                var $activeTab = elem.find('.active a');

                $dropdownContainer.prepend('<a href="#"class="dropBlock__link" data-db-target-for="dbTab-'+index+'"><span>'+ $activeTab.text() +'</span><i class="icon-arrow_d_n" aria-hidden="true"></i></a>')
                elem.attr('data-db-target-of', 'dbTab-'+index);
            },
            dropdownDestroy: function(elem) { // return tabs to default

                var dropdownContainer = elem.closest('.dropBlock');
                dropdownContainer.children('a').remove();
                elem.removeAttr('data-db-target-of')
                    .removeClass('js--open')
                    .removeAttr('style')
                    .unwrap('.dropBlock');
            },
            accordionBuild: function(elem) { // rebuild tabs to be as accordion

                var $accourdionElem = elem.next('.tab__content');
                $accourdionElem.addClass('accordion-tabbed')
                    .wrap('<div class="accordion"></div>');

                elem.find('a').each(function(index){
                    var $lidiv = $(this);
                    var liController = $lidiv.attr('href');

                    $(liController).addClass('accordion-tabbed__tab') // transform tabs structure to accordion structure
                        .removeClass('tab__pane')
                        .wrapInner('<div class="accordion-tabbed__content"></div>');

                    var accordionContrl = $lidiv.clone().prependTo(liController).addClass('accordion-tabbed__control');  // clone tabs controller as accordion controller

                });

                elem.hide();
                UX.accordion.init();

                $('.tab__content.accordion-tabbed .accordion-tabbed__tab').removeClass('js--open').find('.accordion-tabbed__content').hide();
                $('.tab__content.accordion-tabbed .accordion-tabbed__tab.active').addClass('js--open').find('.accordion-tabbed__content').show();

            },
            accordionDestroy: function(elem) { // return tabs to default
                elem.next('.accordion').find('.tab__content')
                    .removeClass('accordion-tabbed')
                    .unwrap('.accordion')
                    .find('.accordion-tabbed__tab')
                    .each(function(index){
                        var $liDiv = $(this);
                        $liDiv
                            .addClass('tab__pane')
                            .removeClass('accordion-tabbed__tab js--open');
                        var content = $liDiv.find('.accordion-tabbed__content').text();
                        $liDiv.html(content);
                        elem.show();
                    });
                var activeTap = elem.next('.tab__content').find('.active').attr('id');

                elem.find('.active').removeClass('active');

                $('[href="#' + activeTap + '"]').closest('li').addClass('active');
            },
            rebuild: {
                original: function(){ // return tabs to be as default
                    $('*[data-slide-target]').removeClass('w-slide__btn');
                    tab.$ul = $(".tab__nav");
                    tab.$ul.each(function(index){
                        switch ($(this).data('mobile-toggle')) {
                            case 'swipe':
                                tab.on.swipeDestroy($(this));
                                break;
                            case 'dropdown':
                                tab.on.dropdownDestroy($(this));
                                break;
                            case 'accordion':
                                tab.on.accordionDestroy($(this));
                                break;
                            case 'slide': // rebuild tabs be as accordion

                                break;
                            default:
                                /*if ( $(this).closest('.tab').hasClass('tab--flex') ||  $(this).closest('.tab').hasClass('loi') ||  $(this).hasClass('dropblock--tab') || $(this).closest(".advancedSearch__tabs").length ) {
                                    return;
                                }else {
                                    tab.on.calculate($(this));
                                }
*/
                        }

                    });
                },
                responsive: function(){ // rebuild tabs to be in selected responsive mode
                    $('*[data-slide-target]').addClass('w-slide__btn');

                    tab.$ul = $(".tab__nav");
                    tab.$ul.each(function(index){
                        switch ($(this).data('mobile-toggle')) {
                            case 'swipe': // rebuild tabs to swipe
                                if (!$(this).parent().is('.scroll')){
                                    tab.on.swipeBuild($(this));
                                }
                                break;
                            case 'dropdown': // rebuild tabs be as dropdown
                                if (!$(this).parent().is('.dropBlock')) {
                                    tab.on.dropdownBuild($(this), index);
                                }
                                break;
                            case 'accordion': // rebuild tabs be as accordion
                                if (!$(this).next().hasClass('accordion')) {
                                    tab.on.accordionBuild($(this));
                                }
                                break;
                            case 'slide': // rebuild tabs be as accordion

                                break;
                            default: // rebuild tabs to flex
                                /*if ( $(this).closest('.tab').hasClass('tab--flex') ||  $(this).closest('.tab').hasClass('loi') ||  $(this).hasClass('dropblock--tab') || $(this).closest(".advancedSearch__tabs").length  ) {
                                    return;
                                }else {
                                    tab.on.calculate($(this));
                                }*/

                        }
                    });
                }
            }
        },
        check: {
            empty: function(){ // check if tab pane is empty and hide it
                $('.tab__nav a').each(function(){ // go through all tab nav items
                    var pane = $(this).attr('href'); // get it's related pane
                    if($(this).is('a:not([href^="#"])') && !$(this).hasClass('external')) {
                        return;
                    }
                    if( !$(this).hasClass('external') && $(pane).length && $(pane).is(':empty')) { // if tab nav item is not an external link and check if pane is empty
                        $(pane).addClass("empty"); // add class to empty pane
                        $(this).addClass("empty"); // add class to empty nav item
                    }
                })
            },
            viewPort: function(){
                $('.tab').each(function(){
                    if ($(this).attr('data-ctrl-res')) {
                        tab.vPort = $(this).attr('data-ctrl-res');
                    };
                });
            }
        }
    };
    UX.tab = tab; // add to global namespace
})();