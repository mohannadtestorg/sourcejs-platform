(function () {
    var $window = $(window),
        $body = $('body');



    var slider = {
        $slider: null,
        options: {},
        vPort: "screen-xs", // default responsive break point
        isMobile: false,

        init: function () {
            slider.on.build();
            slider.control();

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


            $(document).on(slider.vPort + '-on',function(){ // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                slider.isMobile = true;
                slider.on.rebuild.responsive();

            });

            $(document).on(slider.vPort + '-off',function(){ // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
                slider.isMobile = false;
                slider.on.rebuild.responsive();
            });


        },
        on: {
            build: function () {
                $('.owl-carousel').each(function (index) {
                    slider.$slider = $(this);

                    slider.speed = slider.$slider.data('speed');
                    slider.autoplay = slider.$slider.data('autoplay');
                    slider.animation = slider.$slider.data('animation');
                    if (slider.animation === 'fade') {
                        slider.animation = 'fadeOut' ;
                    }else if (slider.animation === 'slide') {
                        slider.animation = '';
                    }else if (slider.animation === 'none') {
                        slider.animation = 'fadeOut';
                        slider.speed = 0;
                    }

                    slider.items = slider.$slider.data('items');
                    slider.indicators = slider.$slider.data('indicators');
                    slider.arrow = slider.$slider.data('arrow');
                    slider.controls = slider.$slider.data('controls');

                    slider.options = {
                        loop: true,
                        items: slider.items,
                        autoplay: slider.autoplay,
                        smartSpeed: slider.speed,
                        animateOut: slider.animation,
                        dots: slider.indicators,
                        nav: slider.arrow,
                        navText: ["<i class='icon-arrow-left visible-xs'></i>","<i class='icon-arrow-right visible-xs'></i>"],
                        onTranslate: function(event) {
                            slider.$slider.find('.owl-item').attr('aria-selected','false');
                            slider.$slider.find('.owl-item.active').attr('aria-selected','true');
                            slider.$slider.find('.owl-nav .current').text(event.item.index-1==0?event.item.count:event.item.index-1);
                            slider.$slider.find('.owl-nav .count').text(event.item.count);
                        },
                        onInitialize: function(event) {

                        },
                        onInitialized : function(event) {
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

                            if (slider.arrow) {
                                slider.on.buildInformation(slider.$slider);
                            }

                            slider.$slider.find('.owl-item').attr('aria-selected','false');
                            slider.$slider.find('.owl-item.active').attr('aria-selected','true');

                            slider.$slider.find('.owl-nav .current').text(event.item.index-1);
                            slider.$slider.find('.owl-nav .count').text(event.item.count);
                        }
                    };

                    slider.$slider.owlCarousel(slider.options);

                    if (slider.controls) {
                        slider.on.buildControls(slider.$slider);
                    }
                });
            },
            rebuild: {
                responsive: function () {

                }
            },

            buildControls: function (elem) {
                var $owlContainer = elem.find('.owl-stage-outer');
                if (elem.find('.owl-controls').length == 0) {
                    $owlContainer.after('<div class="owl-controls"><div class="owl-play">Play</div><div class="owl-pause">Pause</div></div>');
                }
            },
            buildInformation: function(elem) {
                if (elem.find('.owl-nav') && elem.find('.owl-information').length == 0) {
                    var $owlPre = elem.find('.owl-prev');
                    $owlPre.after('<div class="owl-information"><span class="current"></span> / <span class="count"></span></div>');
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
