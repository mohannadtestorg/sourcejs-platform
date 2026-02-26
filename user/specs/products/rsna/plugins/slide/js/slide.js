(function () {

    var $window = $(window),
    isMobile=  false,
    $body = $('body');

    UX.slide.on.show = function() {
        var slide = UX.slide;
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

        if (slide.$target.hasClass('tab__pane')){
            slide.$target.closest('.tab__content').find('.tab__pane').removeClass('active');
            slide.$target.addClass('active');
        }

        if (slide.$toggle.is('[data-label]')) {
            var label = slide.$toggle.data('label');
        }else {
            var label = slide.$toggle.text();
        }

        if (slide.$toggle.hasClass('loa') || slide.$toggle.parents('.loa.mobile-authors').length > 0){
            label = "Authors";
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

    }

})();