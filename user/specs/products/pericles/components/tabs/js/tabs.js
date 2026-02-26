

UX.tab.set.target = function($content, target, temp){
    target = target.replace(".","\\.");

    if (!$content.find(target).length)
    {
        UX.tab.$target = $content.find("[data-figure-id='"+ temp +"']");
    } else {
        UX.tab.$target = $content.find(target);
    }


    if ($(target).parents('.accordion').length) {

        $(target).parents('.accordion').each(function(){
            var control = $(this).find('.accordion-tabbed__control');

            if (control.attr('aria-expanded') == 'false')
                control.click();

        });


    }
};

UX.tab.on.select.external = function(elem) {
    var target = elem.attr('href'); // get target id
    if (typeof target == 'undefined') {
        target = elem.children('a').attr('href');
    }

    // if it still is undefined output a console error
    if (typeof target != 'undefined') {
        target = target.split(" ")[0];
        UX.tab.$toggle = '#' + elem.data('tab');
        UX.tab.$li = $('.tab__nav [href="' + UX.tab.$toggle + '"]');

        UX.tab.$li.click();


        var animateScroll = function () {
            var temp = target.split("#")[1];
            UX.tab.$content = $(UX.tab.$toggle).parents(".tab__content");

            if (UX.tab.isMobile) {
                if (UX.tab.isSlide) {
                    UX.tab.set.target($(".w-slide__content"), target, temp);
                    if (UX.tab.$target.length) {
                        UX.tab.animate.scroll($(".w-slide__content"), UX.tab.$target);
                        UX.tab.$target.attr("tab-index", "1");
                        UX.tab.$target.focus();
                    }
                }
            } else {
                UX.tab.set.target(UX.tab.$content, target, temp);
                UX.tab.animate.scroll(UX.tab.$content, UX.tab.$target);
            }
        };

        if ($(UX.tab.$toggle).hasClass('empty')) {
            $(UX.tab.$toggle).on('content-loaded', function () {
                animateScroll();
            });
        } else {
            animateScroll();
        }
    } else {
        console.error('No valid href found');
    }
};

UX.tab.animate.scroll = function($content, $target){
    var contentTop = $content.scrollTop();

    if ($content.hasClass('tab__content')){
        contentTop = 0;
    }

    if (UX.tab.isMobile) {
        var marginTopnValue = $('.w-slide_head').outerHeight();
    }else {
        var marginTopnValue = 0
    }

    $content.animate({
        scrollTop:contentTop + $target.position().top - marginTopnValue
    }, 600);
};