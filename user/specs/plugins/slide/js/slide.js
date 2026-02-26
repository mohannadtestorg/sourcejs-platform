(function () {

    var $window = $(window),
        isMobile=  false,
        $body = $('body');

    var slide = {
        $slide: null,
        $target: null,
        $contents: null,
        $slideinfo: null,
        $toggle: null,
        prev: null,
        vPort: "screen-sm",
        back: false,
        nested: false,
        activeSlide: 0,
        oldInfo: [],
        off: null,
        clone: null,
        backLabel: 'back',
        $elements: null,

        init: function(){
            slide.$slide = '<div class="w-slide"><div class="w-slide_head"><a href="#" class="w-slide__back"><i class=" icon-arrow_l" aria-hidden="true"></i>'+slide.backLabel+'</a><span class="w-slide__title"></span></span></div><div class="w-slide__content"></div></div>';

            slide.$elements = $(slide.$slide);
            if ($("main").length > 0) {
                $('main').append(slide.$elements);
            } else {
                $('body').append(slide.$elements);
            }
            slide.$contents = slide.$elements.find('.w-slide__content');
            slide.$slideinfo = slide.$elements.find('.w-slide__title');
            slide.$back  = slide.$elements.find('.w-slide__back');


            slide.control();
            slide.addtionalControls();
        },
        control: function(){

            if ($('.journal-home').length ) {
                slide.vPort = "screen-md";
            }

            $(document).on(slide.vPort + '-on',function(){ // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                isMobile = true;
                slide.off = false;

            });

            $(document).on(slide.vPort + '-off',function(){ // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                isMobile = false;
                slide.off = true;
                slide.on.off();
            });

            $body.on('click', '.w-slide__btn', function(e) {


                if (isMobile) {
                    /*if ($(slide.$target).hasClass('tab__pane') && $(slide.$target).hasClass('empty')){
                        $(slide.$target).on('content-loaded', function () {
                            slide.on.show();
                        });
                    } else {
                        slide.on.show();
                    }*/

                    e.stopPropagation();
                    e.preventDefault();
                    $(".w-slide, .w-slide__content").css('transition', 'all 250ms');
                    slide.$toggle   = $(this);
                    slide.$target   = $( slide.$toggle.data('slide-target'));
                    slide.back = false;

                    slide.on.show();
                }
                $(".w-slide, .w-slide__content").css('transition', 'all 0ms');
            });


            $body.on('click', '.w-slide__back, .w-slide__hide', function(e) {
                if ($(this).hasClass("w-slide__back")){
                    e.preventDefault();
                }
                $(".w-slide, .w-slide__content").css('transition', 'all 250ms');
                slide.back = true;
                slide.on.hide();
                $(".w-slide, .w-slide__content").css('transition', 'all 0ms');
            });

            /*$(".w-slide__content").swipe( {
                swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                    if (direction) {
                        if (direction == 'right') {
                            UX.slide.back = true;
                            UX.slide.on.hide();
                        }
                    }

                },
                //Default is 75px, set to 0 for demo so any distance triggers swipe
                threshold:75,
                excludedElements:$.fn.swipe.defaults.excludedElements+", .loi__list"
            });*/
        },
        addtionalControls:function () {

        },
        setBackLabel:function () {
            slide.$back.html('<i class=" icon-arrow_l" aria-hidden="true"></i>'+slide.backLabel);
        },
        on: {
            show: function(){
                slide.backLabel = 'back';
                slide.setBackLabel();

                slide.$slideinfo.hide().removeClass('js--open');

                slide.nested = slide.$toggle.parents(".w-slide__content").length > 0;
                if (slide.nested) {
                    slide.activeSlide++;
                    slide.$contents.append('<div class="w-slide__content nested--'+ slide.activeSlide + '"></div>');
                    slide.$contents = $('.nested--'+ slide.activeSlide);
                }
                slide.$contents.attr('original-target', slide.$toggle.data('slide-target'));

                /*if (typeof(UX.controller) != "undefined"){
                    if ( $body.attr('data-active') !==  'dropBlock') { // keep drop block open in publication content widget
                        UX.controller.check();
                    }
                }*/

                if (slide.$target.hasClass('tab__pane')){
                    slide.$target.closest('.tab__content').find('.tab__pane').removeClass('active');
                    slide.$target.addClass('active');
                }

                if (slide.$toggle.is('[data-label]')) {
                    var label = slide.$toggle.data('label');
                }else {
                    var label = slide.$toggle.text();
                }

                //LIT-163835
                if (slide.$toggle.hasClass('loa') || slide.$toggle.parents('.loa.mobile-authors').length > 0){
                    label = "AUTHORS"
                }

                var clonedDiv = slide.$target.children();

                slide.on.destroyJcf(clonedDiv);


                if (slide.$toggle.is('[data-slide-clone]')) {
                    slide.clone = slide.$toggle.data('slide-clone');

                    if (slide.clone == 'self') {
                        var clonedDiv = slide.$target;
                    }

                } else {
                    slide.clone = "";
                }

                slide.oldInfo.push(label);
                slide.$slideinfo.html(label);

                var isLoi = slide.$target.find('.loi').length > 0;
                if (isLoi) {
                    slide.$contents.append(clonedDiv.html());
                    $('.dropBlock-loi__holder .loi').remove();
                    slide.$contents.find('.loi__list').each(function(){
                        UX.loi.on.recalculate($(this));
                    });

                } else {
                    if (slide.clone == 'self') {
                        if (slide.nested) {
                            slide.$target.after('<div class="returnNestedDataSlideHere"></div>');
                        } else {
                            slide.$target.after('<div class="returnDataSlideHere"></div>');
                        }

                    } else {
                        if (slide.nested) {
                            slide.$target.append('<div class="returnNestedDataSlideHere"></div>');
                        } else {
                            slide.$target.append('<div class="returnDataSlideHere"></div>');
                        }
                    }

                    slide.$contents.append(clonedDiv.clone());

                    if ((clonedDiv.hasClass('addthis_toolbox') || clonedDiv.find('.addthis_toolbox').length > 0) && addthis) { // re-init social links on mobile
                        addthis.toolbox('.addthis_toolbox');
                    }
                    slide.on.rebuildJcf(slide.$contents);

                    clonedDiv.remove();
                }


                $body.addClass('lock-screen').attr('data-active', 'slide');
                slide.$back.focus();
                $('.coolBar').addClass('slide');

                /*
                $('.w-slide__title').truncate({
                    lines: 1
                });
                */


                if (!slide.nested) {
                    $('.w-slide').css('transform', 'translateX(-100vw)');//.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
                       // if (!slide.back) {
                            slide.$slideinfo.show().addClass('js--open');

                       // }
                    //});
                }else {
                    slide.$contents.css('transform', 'translateX(-100vw)');//.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
                       // if (!slide.back) {
                            slide.$slideinfo.show().addClass('js--open');
                       // }
                    //});
                }

            },
            hide: function(){
                slide.$slideinfo.hide().removeClass('js--open');

                if (slide.back) {

                    slide.nested = true;

                    if (slide.activeSlide == 0 ) {
                        slide.nested = false;
                        slide.$contents = $('.w-slide').children('.w-slide__content');
                    }else {
                        slide.$contents = $('.nested--' + slide.activeSlide);
                    }
                    slide.on.destroyJcf(slide.$contents);

                    var originalTarget = $(slide.$contents.attr('original-target'));
                    if (!originalTarget) {
                        originalTarget = $body;
                    }

                    var isLoi = slide.$elements.find('.loi').length > 0;

                    if (isLoi) {

                        $('.dropBlock-loi__holder').append(slide.$contents.html());
                        $('.dropBlock-loi__holder').find('.loi__list').each(function(){
                            UX.loi.on.recalculate($(this));
                        });


                    }else {

                        if (slide.clone == 'self') {
                            if (slide.nested) {
                                $('.returnNestedDataSlideHere').after(slide.$contents.html());
                                $('.returnNestedDataSlideHere').remove();
                            } else {
                                $('.returnDataSlideHere').after(slide.$contents.html());
                                $('.returnDataSlideHere').remove();
                            }

                        }else {
                            if (slide.nested) {
                                $('.returnNestedDataSlideHere', originalTarget).after(slide.$contents.html());
                                $('.returnNestedDataSlideHere', originalTarget).remove()
                            } else {
                                $('.returnDataSlideHere', originalTarget).after(slide.$contents.html());
                                $('.returnDataSlideHere', originalTarget).remove()
                            }

                        }
                        slide.on.rebuildJcf(originalTarget);
                    }

                    slide.oldInfo.splice(slide.activeSlide, 1);
                    slide.$slideinfo.html(slide.oldInfo[slide.activeSlide - 1]);
                    if (slide.$toggle) {
                        slide.$toggle.focus();
                    }

                    if (!slide.nested) {
                        $body.removeClass('lock-screen').removeAttr('data-active');
                        $('.coolBar').removeClass('slide');
                        $('.w-slide').css('transform', 'translateX(0vw)')
                            .on('transitionend webkitTransitionEnd oTransitionEnd', function () {
                                if (slide.back && !slide.nested) {
                                    slide.$contents.empty();
                                }
                            });


                    }else {
                        slide.activeSlide--;
                        slide.$contents.css('transform', 'translateX(0vw)')
                            .on('transitionend webkitTransitionEnd oTransitionEnd', function () {
                                if (slide.back  && slide.nested) {
                                    $(this).remove();
                                }
                            });
                        slide.$contents = $('.nested--' + slide.activeSlide);
                        if (slide.activeSlide == 0) {
                            slide.$contents = $('.w-slide').children('.w-slide__content');
                        }

                    }
                    slide.$slideinfo.show().addClass('js--open');

                }
                slide.backLabel = 'back';
                slide.setBackLabel();

            },
            off: function(){
                slide.$slideinfo.hide().removeClass('js--open');

                var isLoi = $('.w-slide').find('.loi').length > 0;

                if (isLoi) {

                    slide.$contents = $('.loi').closest('.w-slide__content');

                    $('.dropBlock-loi__holder').append(slide.$contents.html());
                    $('.dropBlock-loi__holder').find('.loi__list').each(function(){
                        UX.loi.on.recalculate($(this));
                    });


                }

                $body.removeClass('lock-screen').removeAttr('data-active');
                $('.coolBar').removeClass('slide');

                slide.$contents = $('.w-slide').children('.w-slide__content');

                $('.w-slide').css('transform', 'translateX(0vw)')
                    .on('transitionend webkitTransitionEnd oTransitionEnd', function () {
                        if (slide.off) {
                            slide.$contents.empty();
                        }
                    });


            },
            destroyJcf: function ($el) {
                jcf.destroy($el.find('.jcf'));
            },
            rebuildJcf: function ($el) {
                jcf.replace($el.find('.jcf'));
            }
        }
    };

    UX.slide = slide; // add to global namespace
})();