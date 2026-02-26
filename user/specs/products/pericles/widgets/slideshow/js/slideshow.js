UX.slider.on.rebuild.responsive = function () {
    if ($('.slideshow--full-width-image').length) {


        if (UX.slider.isMobile) {
            $('.slideshow-caption').each(function () {

                var $sliderCaption = $(this);

                if ($sliderCaption.outerHeight() > 132) {
                    $sliderCaption.outerHeight(132);
                    $sliderCaption.find('.read-more-link').css('display', 'block');
                }
            });
        }else {
            $('.read-more-link').css('display', 'none');
        }
    }

};


UX.slider.additionalControls = function () {
    $('body').on('click', '.read-more-link', function () {
        var $sliderCaption = $(this).closest('.slideshow-caption');
        $sliderCaption.toggleClass('js--open');

        var heightVal = ($sliderCaption.outerHeight() == 132 ? 'auto' : 132);
        $sliderCaption.css('height', heightVal);

        var text = $(this).text() == 'read less' ? 'read more' : 'read less';
        $(this).text(text)
    });


    $('body').on('click', '.owl-prev, .owl-next, .owl-dot', function () {
        UX.slider.$slider = $(this).closest('.owl-carousel');
        UX.slider.$slider.trigger('stop.owl.autoplay');
    })


};
