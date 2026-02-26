(function () {
    var $window = $(window);

    var altmetric = {
        init: function(){
            altmetric.get.altmetric();
            altmetric.control();
        },
        control: function () {
            $(".top-list__container , .featured-articles-list .featured__container ").each(function () {
                var holder = $(this);
                if (holder.find('.altmetric-embed').length && holder.find('.altmetric-embed').html().length == 0) {
                    holder.addClass('without__cover__image');
                } else {
                    holder.removeClass('without__cover__image');
                }
            } );
            $(".top-list__container , .featured-articles-list .featured__container ").bind("DOMSubtreeModified", function () {
                var holder = $(this);
                if (holder.find('.altmetric-embed').length && holder.find('.altmetric-embed').html().length == 0) {
                    holder.addClass('without__cover__image');
                } else {
                    holder.removeClass('without__cover__image');
                }
            });
        },
        get: {
            altmetric: function () {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = window.location.protocol +"//d1bxh8uas1mnw7.cloudfront.net/assets/embed.js";
                document.getElementsByTagName("head")[0].appendChild(script);
            }
        }
    };

    var section_sticky = {
        holder: $('.article-sections:visible'),
        scrollValue: 0,
        translateValue: 0,
        headerHeight: 0,
        init: function () {
            section_sticky.translateValue = section_sticky.holder.offset().top;
            console.log(section_sticky.translateValue);
            section_sticky.scrollSec();
            section_sticky.sticky();
            if ($("header").css("position") === "fixed") {
                section_sticky.headerHeight = $("header").height();
            }
        },
        sticky: function () {
            section_sticky.scrollValue = $window.scrollTop();

            if (section_sticky.scrollValue >= (section_sticky.translateValue)) {
                if ($(".pagination").length > 0
                    && ( section_sticky.scrollValue + section_sticky.holder.height() ) >= $(".pagination").offset().top) {
                    section_sticky.holder.css({
                        "top": $(".pagination").offset().top - section_sticky.scrollValue - section_sticky.holder.height()
                    });
                } else if (( section_sticky.scrollValue + section_sticky.holder.height() ) >= $("footer").offset().top) {
                    console.log(section_sticky.scrollValue + section_sticky.holder.height());
                    section_sticky.holder.css({
                        "top": $("footer").offset().top - section_sticky.scrollValue - section_sticky.holder.height()
                    });
                } else {
                    section_sticky.holder.addClass("makeSticky").css({
                        "top": section_sticky.headerHeight
                    });
                }
            } else {
                if (!section_sticky.holder.hasClass("makeSticky"))
                    return;
                section_sticky.holder.removeClass("makeSticky").css({
                    "bottom": "initial",
                    "top": "initial"
                });
            }

        },
        scrollSec: function () { // call sticky on scroll
            $window.on("scroll", section_sticky.sticky);
        }
    };

    var scrollo = {

        init: function () {

            $(".anchor-spacer").remove();
            scrollo.control();
        },
        adjustAnchor: function (target) {
            var $anchor = $(target);
            var $headerHeight = 16;
            if ($("header").css("position") === "fixed") {
                var $headerHeight = $('header').outerHeight();
            }
            $(document).scrollTop($anchor.offset().top - $headerHeight);
        },
        control: function () {
            $(document).on("click", "a[href^='#']", function (e) {
                if ($(this).attr("href") != "#" && ($(".article__body " + $(this).attr("href")).length > 0 || $(".toc_content " + $(this).attr("href")).length > 0) ) {
                    e.preventDefault();
                    scrollo.adjustAnchor($(this).attr("href"));
                    return false;
                }
            });
        }

    };


    var altmetricsArea = {
        holder: $("#doi_altmetric_drawer_area"),
        init: function () {
            altmetricsArea.control()
        },
        control: function () {
            if (altmetricsArea.holder.find(".altmetric-embed").length && altmetricsArea.holder.find(".altmetric-embed").html().length) {
                altmetricsArea.holder.show();
            } else {
                altmetricsArea.holder.hide();
            }
            altmetricsArea.holder.bind("DOMSubtreeModified", altmetricsArea.control);
        }
    };


    UX.altmetric = altmetric;
    UX.altmetricsArea = altmetricsArea; // add to global namespace
    UX.scrollo = scrollo; // add to global namespace
    UX.section_sticky = section_sticky; // add to global namespace

})();