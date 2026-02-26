
(function () {
    var $body = $('body');


    var homepage = {
        $homeSlider:$('.homepage__slider'),

        init: function ()
        {
            if(homepage.$homeSlider.length){
              var dotsWidth=  homepage.$homeSlider.find('.owl-dots').width();
                homepage.$homeSlider.find('.owl-prev').css('right',50+dotsWidth);

            }

        }
    }

    UX.homepage = homepage; // add to global namespace
})();
