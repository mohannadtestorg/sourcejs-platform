(function () {

    // get parent
    var slider = UX.slider;


    slider.get.responsiveData=function () {
        var itemsNumer= slider.$slider.data("items");
        var isResponsive421=slider.$slider.closest('.responsiveSlider4-2-1');
        var isResponsive311=slider.$slider.closest('.responsiveSlider3-1-1');
        var isResponsive5321=slider.$slider.closest('.responsiveSlider5-3-2-1');

        if(isResponsive421.length >0 ){
            return  {"xsMin":{"items":1},"smMin":{"items":2},"mdMin":{"items":2},"lgMin":{"items":4}};
        }
        else if(isResponsive311.length >0 ){

            return  {"xsMin":{"items":1},"smMin":{"items":1},"mdMin":{"items":1},"lgMin":{"items":3}};
        }
        else if(isResponsive5321.length >0 ){

            return  {"xsMin":{"items":1},"smMin":{"items":2},"mdMin":{"items":3},"lgMin":{"items":5}};
        }

        return null;

    };


    slider.set.responsive=function () {

        UX.slider.responsive = UX.slider.get.responsiveData();
        if (UX.slider.responsive) {
            for (var key in UX.slider.responsive) {
                switch(key) {
                    case "xsMin":
                        UX.slider.responsive[0] = UX.slider.responsive[key];
                        break;
                    case "smMin":
                        UX.slider.responsive[UX.grid.screenXs] = UX.slider.responsive[key];
                        break;
                    case "mdMin":
                        UX.slider.responsive[UX.grid.screenSm] = UX.slider.responsive[key];
                        break;
                    case "lgMin":
                        UX.slider.responsive[UX.grid.screenLg] = UX.slider.responsive[key];
                        break;
                }

                delete UX.slider.responsive[key];
            }
        }
    };

    // override get.options()
    slider.get.options = function ($element, pass) {
        slider.$slider = $element;
        slider.speed = slider.$slider.data('speed');
        slider.autoplay = slider.$slider.data('autoplay');
        slider.animation = slider.$slider.data('animation');
        slider.autoWidth = slider.set.autoWidth();
        if (slider.animation === 'fade') {
            slider.animation = 'fadeOut';
        } else if (slider.animation === 'slide') {
            slider.animation = '';
        } else if (slider.animation === 'none') {
            slider.animation = 'fadeOut';
            slider.speed = 0;
        }
        slider.items = slider.$slider.data('items');
        slider.set.responsive();
        slider.indicators = slider.$slider.data('indicators');
        slider.arrow = slider.$slider.data('arrow');
        slider.controls = slider.$slider.data('controls');
        UX.slider.loop = UX.slider.$slider.data('loop');
        UX.slider.slideBy = UX.slider.$slider.data('slideby');

        slider.options = {
            loop: UX.slider.loop,
            items: slider.items,
            responsive: slider.responsive,
            autoplay: slider.autoplay,
            smartSpeed: slider.speed,
            autoWidth: slider.autoWidth,
            animateOut: slider.animation,
            dots: slider.indicators,
            nav: slider.arrow,
            slideBy: UX.slider.slideBy,
            navText: ["<span class='sr-only'>prev</span><i class='icon-arrow_l'></i>", "<span class='sr-only'>next</span><i class='icon-arrow_r'></i>"],
            onInitialized: function () {

                slider.$slider.find('.owl-item').attr('aria-selected', 'false');
                slider.$slider.find('.owl-item.active').attr('aria-selected', 'true'); // let screen readers know an item is active

                // apply meta info to next and previous buttons and make them focusable
                slider.$slider.find('.owl-prev').attr('role', 'button').attr('title', 'Previous');
                slider.$slider.find('.owl-next').attr('role', 'button').attr('title', 'Next');
                slider.$slider.attr('tabindex', '0');
                $('.owl-prev, .owl-next').attr('tabindex', '0');

                // add instructions to keyboard users that are only visible when the carousel is focused
                slider.$slider.find('.owl-wrapper-outer').append('');

                // listen for keyboard input
                $(document).on('keydown', function (e) {

                    var $focusedElement = $(document.activeElement),
                        singleOwl = slider.$slider.data('owlCarousel'),
                        type = e.which == 39 ? 'next' : null,
                        type = e.which == 37 ? 'prev' : type,
                        type = e.which == 13 ? 'enter' : type;

                    // if the carousel is focused, use left and right arrow keys to navigate
                    if ($focusedElement.parents().hasClass('owl-loaded') || $focusedElement.hasClass('owl-loaded')) {
                        if (type == 'next') {
                            slider.$slider.trigger('next.owl.carousel');
                        } else if (type == 'prev') {
                            slider.$slider.trigger('prev.owl.carousel');
                        }

                        // if the prev and next buttons are focused, catch "Enter" and navigate in the right direction
                    } else if (type == 'enter') {
                        if ($focusedElement.hasClass('owl-next')) {
                            slider.$slider.trigger('next.owl.carousel');
                        } else if ($focusedElement.hasClass('owl-prev')) {
                            slider.$slider.trigger('prev.owl.carousel');
                        }
                    }
                });
                slider.$slider.find('.owl-item').attr('aria-selected', 'false');
                slider.$slider.find('.owl-item.active').attr('aria-selected', 'true');
                slider.$slider.find('.owl-item.active').first().addClass("first");
            }
        };

        slider.on.activate(slider.$slider, pass);

        if (slider.controls) {
            slider.on.buildControls(slider.$slider);
        }
    };

    // save override
    UX.slider = slider;

})();