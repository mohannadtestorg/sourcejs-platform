(function () {
    var $window = $(window),
        $body = $('body');

    var slider = UX.slider;

    //slider.options.navText = ["<i class='icon-arrow_l visible'></i>","<i class='icon-arrow_r visible'></i>"];
    // @fixme on project level, we need to change options only like on line above
    // for now it is overriden by CSS

    slider.on.build = function () {
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

            if ($(this).parents(".has-numeric-pagination").length) {
                var pagination_size = $(this).find(".owl-dots .owl-dot").length;
                if (pagination_size > 5) {
                    $(this).find(".owl-dots").before("<div class='owl-pagination-prev' style='display: none'><i class='icon-arrow_l visible'></i></div>");
                    $(this).find(".owl-dots").after("<div class='owl-pagination-next'><i class='icon-arrow_r visible'></i></div>");
                }

                $(".has-numeric-pagination").delegate( ".owl-pagination-next", "click", function() {
                    var dots = $(this).prev(".owl-dots");
                    var count_showed_items = 0;
                    var last_visible = dots.find(".owl-dot.visible:last").index();

                    dots.find(".owl-dot").filter(function() {
                        if ($(this).css('visibility')  == 'hidden' && count_showed_items < 5 &&  $(this).index() > last_visible) {
                            count_showed_items++;
                            $(this).removeClass("invisible").addClass("visible");
                            if ( dots.find(".owl-dot").length == ($(this).index() + 1)) {
                                dots.next(".owl-pagination-next").hide();
                            } else {
                                dots.next(".owl-pagination-next").show();
                            }
                        } else if ( dots.find(".owl-dot").length - $(this).index() > 5 ){
                            if ($(this).index() > 0) {
                                dots.prev(".owl-pagination-prev").show();
                            } else {
                                dots.prev(".owl-pagination-prev").hide();
                            }
                            $(this).removeClass("visible").addClass("invisible");
                        }
                    });
                });

                $(".has-numeric-pagination").delegate( ".owl-pagination-prev", "click", function() {
                    var dots = $(this).next(".owl-dots");
                    var first_visible = dots.find(".owl-dot.visible:first").index();
                    dots.find(".owl-dot").filter(function() {
                        if ( first_visible - $(this).index() < 6 && $(this).index() < first_visible) {
                            $(this).removeClass("invisible").addClass("visible");
                            if ( $(this).index() == 0 ) {
                                dots.prev(".owl-pagination-prev").hide();
                            }
                            dots.next(".owl-pagination-next").show();
                        } else if ($(this).index() >= 5) {
                            $(this).removeClass("visible").addClass("invisible");
                        }
                    });
                });
            }

            if ($(this).parent(".slideShow").siblings(".owl-dots-reflection").length) {
                var coversSlider = $(this);
                var dot_item = $(this).parent(".slideShow").siblings(".owl-dots-reflection").data("dot-item");
                $(this).parent(".slideShow").siblings(".owl-dots-reflection").delegate(dot_item , "click", function() {
                    var slide_index = $(this).index();
                    coversSlider.trigger('to.owl.carousel', slide_index);
                    return false;
                });
            }

        });

    };

})();
