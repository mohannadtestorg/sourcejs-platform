(function () {
    var $window = $(window),
        $body = $('body');



    var slider = {
        $slider: null,
        options: {},
        vPort: "always", // default responsive break point
        isMobile: false,

        init: function () {
            slider.additionalInit();
            slider.on.build();
            slider.control();
            slider.additionalControls();

        },
        control: function(){
            $body.on('click', '.owl-play', function () {
                slider.$slider = $(this).closest('.owl-carousel');
                slider.$slider.data('owl.carousel').options.autoplay = true;
                slider.$slider.trigger('refresh.owl.carousel');
                //slider.$slider.trigger('play.owl.autoplay');

            });
            $body.on('click','.owl-pause', function () {
                slider.$slider = $(this).closest('.owl-carousel');
                slider.$slider.trigger('stop.owl.autoplay');
            });

            $body.on('touchend', '.owl-pause, .owl-play, .owl-prev, .owl-next' ,function () {
                $(this).css('background', '#d6d6d6');
            });

            $('body').on('touchstart', '.owl-pause, .owl-play, .owl-prev, .owl-next' ,function () {
                $(this).css('background', '#869791');
            });


            $('.owl-carousel').each(function () {
                var $element = $(this);
                if (typeof $element.closest('.viewport-slider').data("slider-vport") != 'undefined') {
                    slider.vPort = $element.closest('.viewport-slider').data("slider-vport");
                    $(document).on(slider.vPort + '-on',function(){ // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                        slider.isMobile = true;
                        slider.get.options($element, true);
                    });
                    $(document).on(slider.vPort + '-off',function(){ // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
                        slider.isMobile = false;
                        slider.on.destroy($element);
                    });
                }
            });

            if ($('.owl-item:not(.cloned)').first().hasClass('active')) {
                $('.owl-nav .owl-next').addClass('owl-nav-active');
            }


        },
        additionalInit:function () {

        },
        additionalControls: function () {

        },
        get: {
            options: function ($element, pass) {
                slider.$slider = $element;
                slider.speed = slider.$slider.data('speed');
                slider.autoplay = slider.$slider.data('autoplay');
                slider.animation = slider.$slider.data('animation');
                slider.autoWidth=slider.set.autoWidth();
                if (slider.animation === 'fade') {
                    slider.animation = 'fadeOut' ;
                }else if (slider.animation === 'slide') {
                    slider.animation = '';
                }else if (slider.animation === 'none') {
                    slider.animation = 'fadeOut';
                    slider.speed = 0;
                }
                slider.items = slider.$slider.data('items');
                slider.set.responsive();
                slider.indicators = slider.$slider.data('indicators');
                slider.arrow = slider.$slider.data('arrow');
                slider.controls = slider.$slider.data('controls');
                slider.stagePadding = slider.$slider.data('stagepadding');
                UX.slider.loop = UX.slider.$slider.data('loop');
                UX.slider.slideBy = UX.slider.$slider.data('slideby');

                slider.options = {
                    stagePadding: slider.stagePadding,
                    loop: UX.slider.loop,
                    items: slider.items,
                    responsive:  slider.responsive,
                    autoplay: slider.autoplay,
                    smartSpeed: slider.speed,
                    autoWidth:slider.autoWidth,
                    animateOut: slider.animation,
                    dots: slider.indicators,
                    nav: slider.arrow,
                    slideBy: UX.slider.slideBy,
                    autoHeight: true,
                    navText: ["<span class='hidden-xs'>prev</span><i class='icon-arrow_l visible-xs'></i>","<span class='hidden-xs'>next</span><i class='icon-arrow_r visible-xs'></i>"],
                    onInitialized : function() {

                        slider.$slider.find('.owl-item').attr('aria-selected','false');
                        slider.$slider.find('.owl-item.active').attr('aria-selected','true'); // let screen readers know an item is active

                        // apply meta info to next and previous buttons and make them focusable
                        slider.$slider.find('.owl-prev').attr('role','button').attr('title','Previous');
                        slider.$slider.find('.owl-next').attr('role','button').attr('title','Next');
                        slider.$slider.attr('tabindex','0');
                        $('.owl-prev, .owl-next').attr('tabindex','0');

                        // add instructions to keyboard users that are only visible when the carousel is focused
                        slider.$slider.find('.owl-wrapper-outer').append('');

                        // listen for keyboard input
                        $(document).on('keydown', function(e){

                            var $focusedElement = $(document.activeElement),
                                singleOwl = slider.$slider.data('owlCarousel'),
                                type = e.which == 39? 'next': null,
                                type = e.which == 37? 'prev': type,
                                type = e.which == 13? 'enter':type;

                            // if the carousel is focused, use left and right arrow keys to navigate
                            if ($focusedElement.parents().hasClass('owl-loaded')||$focusedElement.hasClass('owl-loaded')){
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
                        slider.$slider.find('.owl-item').attr('aria-selected','false');
                        slider.$slider.find('.owl-item.active').attr('aria-selected','true');
                        slider.$slider.find('.owl-item.active').first().addClass("first");

                        if(slider.$slider.closest('.equal-height-slides').length){
                            //make all slide same height if slide container contains ".equal-height-slides" class
                            var sliderHeight=slider.$slider.height();
                            if(sliderHeight>0)
                            {
                                slider.$slider.find('.owl-item','.slide-item').css('height',slider.$slider.height());
                                slider.$slider.find('.slide-item').css('height','100%');
                            }
                        }
                    }
                };

                slider.on.activate(slider.$slider, pass);

                if (slider.controls) {
                    slider.on.buildControls(slider.$slider);
                }
            },
            responsiveData:function () {

                if(slider.$slider.data('responsive')){
                    return slider.$slider.data('responsive');
                }
                else{
                    var responsiveData=slider.$slider.closest('.responsive-slider').data("responsive");
                    if(responsiveData){
                        return responsiveData;
                    }
                }
                return null;
            }
        },
        set:{
            responsive:function () {
                slider.responsive = slider.get.responsiveData();
                if (slider.responsive) {
                    for (var key in slider.responsive) {
                        switch(key) {
                            case "xsMin":
                                slider.responsive[0] = slider.responsive[key];
                                break;
                            case "smMin":
                                slider.responsive[UX.grid.screenXs] = slider.responsive[key];
                                break;
                            case "mdMin":
                                slider.responsive[UX.grid.screenSm] = slider.responsive[key];
                                break;
                            case "lgMin":
                                slider.responsive[UX.grid.screenMd] = slider.responsive[key];
                                break;
                        }

                        delete slider.responsive[key];
                    }
                }
            },
            autoWidth:function () {
                return false;
            }
        },
        on: {
            destroy: function ($element) {
                if(slider.vPort.length > 0){
                    if ( !$element.hasClass('slide-removal') ) {
                        $element.addClass('slide-removal').trigger('destroy.owl.carousel');
                        $element.find('.owl-stage-outer').children(':eq(0)').unwrap();
                    }
                }
            },
            activate: function ($element, pass) {
                if (pass ||  slider.vPort == "always") {
                    $element.owlCarousel(slider.options);
                    if ( $element.hasClass('slide-removal') ) {
                        $element.removeClass('slide-removal');
                    }
                } else {
                    if ( !$element.hasClass('slide-removal')) {
                        $element.addClass('slide-removal');
                    }
                }
            },
            build: function () {
                $('.owl-carousel').each(function (index) {
                    if (typeof $(this).closest('.viewport-slider').data("slider-vport") != 'undefined') {
                        slider.vPort = $(this).closest('.viewport-slider').data("slider-vport");
                    }
                    slider.get.options($(this), false);

                    $(this).on('changed.owl.carousel', function(e) {
                        slider.on.changedSlide($(this),e);
                    });

                    $(this).on('translated.owl.carousel', function(e) {
                        slider.on.translated($(this));
                    });


                });
            },
            translated:function ($slider) {
                $(this).find('.owl-item').removeClass('first');
                $(this).find('.owl-item.active').first().addClass('first');
            },
            changedSlide:function ($slider,e) {
                if ($('.owl-item:not(.cloned)').last().hasClass('active')) {
                    $('.owl-nav .owl-next').addClass('owl-nav-active');
                    $('.owl-nav .owl-prev').removeClass('owl-nav-active');
                } else if ($('.owl-item:not(.cloned)').first().hasClass('active')) {
                    $('.owl-nav .owl-prev').addClass('owl-nav-active');
                    $('.owl-nav .owl-next').removeClass('owl-nav-active');
                }

            }
            ,
            rebuild: {
                responsive: function () {
                }
            },
            buildControls: function (elem) {
                var $owlContainer = elem.find('.owl-stage-outer');
                if (elem.find('.owl-controls').length == 0) {
                    $owlContainer.after('<div class="owl-controls"><div class="owl-play">Play</div><div class="owl-pause">Pause</div></div>');
                }

            }

        }
    };

    UX.slider = slider; // add to global namespace

    /* if (window.PB && window.PB.$) {
     // make this module reinitializes in pageBuilder mode
     window.PB.$(document.documentElement).on("WidgetReinit.slider", slider.init);
     }*/

})();
