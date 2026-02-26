(function () {
    var royalSlider = {
        init: function(){
            $('.royalSlider').royalSlider({
                navigateByClick:false,
                arrowsNav: false,
                fadeinLoadedSlide: true,
                controlNavigationSpacing: 0,
                controlNavigation: 'thumbnails',
                autoPlay: {
                    // autoplay options go gere
                    enabled: true,
                    pauseOnHover: true,
                    delay: 3000,
                },

                thumbs: {
                    autoCenter: false,
                    fitInViewport: true,
                    orientation: 'vertical',
                    spacing: 0,
                    paddingBottom: 0
                },
                keyboardNavEnabled: true,
                imageScaleMode: 'fill',
                imageAlignCenter:true,
                slidesSpacing: 0,
                loop: false,
                loopRewind: true,
                numImagesToPreload: 3,
                autoScaleSlider: true,
                autoScaleSliderWidth: 960,
                autoScaleSliderHeight: 450,
            });
            royalSlider.control();
        },
        control: function () {
            $(".rsNavItem").mouseover(function() {
                $('.royalSlider').royalSlider('goTo', $(this).index() );
            });
        }
    };
    UX.royalSlider = royalSlider; // add to global namespace
})();











