(function () {


    UX.slider.additionalInit=function () {
        var $owlCarouselAttr;
        if($('.move-slider-by-page').length)
            $('.move-slider-by-page').each(function(){
                $owlCarouselAttr=$(this).find('.owl-carousel');
                $owlCarouselAttr.attr('data-slideBy',4);
            });
        if($('.books-main-slider').length)
            $('.books-main-slider').find('.owl-carousel').attr('data-loop','true');
    }

    UX.slider.get.responsiveData=function () {
       var itemsNumer= UX.slider.$slider.data("items");
       var isResponsive421=UX.slider.$slider.closest('.responsiveSlider4-2-1');
       var isResponsive311=UX.slider.$slider.closest('.responsiveSlider3-1-1');
       var isResponsive431=UX.slider.$slider.closest('.responsiveSlider4-3-1');

       if(isResponsive421.length >0 ){
           return  {"xsMin":{"items":1},"smMin":{"items":2},"mdMin":{"items":2},"lgMin":{"items":4}};
       }
       else if(isResponsive311.length >0 ){

           return  {"xsMin":{"items":1},"smMin":{"items":1},"mdMin":{"items":1},"lgMin":{"items":3}};
       }
       else if(isResponsive431.length >0 ){

           return  {"xsMin":{"items":1},"smMin":{"items":3},"mdMin":{"items":3},"lgMin":{"items":4}};
       }

       return null;

    }


    UX.slider.set.responsive=function () {

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
    }

    UX.slider.on.translated=function($slider){
        $slider.find('.owl-item').removeClass('first');
        $slider.find('.owl-item.active').first().addClass('first');
        $slider.find('.owl-item .slide-item').removeClass('slide--transparent');
    }

    UX.slider.on.changedSlide=function ($slider,e) {

        var current = (e.item.index + 1) - e.relatedTarget._clones.length / 2;
        var allItems = e.item.count;
        if (current > allItems || current == 0) {
            current = allItems - (current % allItems);
        }



        var isBooksMainSlider=$slider.closest('.books-main-slider').length >0;

        if(isBooksMainSlider){
            $slider.find(".owl-item:not(.cloned) .slide-item").filter(
                function(i){
                    return (i+1) == current;
                }

            ).addClass('slide--transparent');

        }




        $slider.find('.owl-item').removeClass('first');
        $slider.find(".owl-item:not(.cloned)").filter(
            function(i){
                return (i+1) == current;
            }

        ).addClass('first');
    }

})();
