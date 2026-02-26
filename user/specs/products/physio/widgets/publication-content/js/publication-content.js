(function () {
    var $window = $(window);
    UX.sticko.set.variables = function () {
        var extraMargin = $("article .tab--flex .tab__nav").length > 0 ? $("article .tab--flex .tab__nav").height() : 0;
        return extraMargin;
    };

    var section_sticky = {
        holder: $('.article-sections'),
        fragTopPos: 0,
        scrollValue: 0,
        stickyElmsBefore: 0,
        init: function () {
            section_sticky.stickyElmsBefore = $("header").height()
                + ( $('.stickybar.coolBar.trans').length > 0 ? $('.stickybar.coolBar.trans').height() : 0 );
            section_sticky.fragTopPos = section_sticky.holder.offset().top - section_sticky.stickyElmsBefore;
            section_sticky.scrollSec();
            section_sticky.sticky();
        },
        sticky: function () {
            section_sticky.stickyElmsBefore = $("header").height()
                + ( $('.stickybar.coolBar.trans').length > 0 ? $('.stickybar.coolBar.trans').height() : 0 );
            section_sticky.scrollValue = $window.scrollTop();

            if (section_sticky.scrollValue >= (section_sticky.fragTopPos)) {
                if ($(".content-navigation").length > 0
                    && ( section_sticky.scrollValue + section_sticky.holder.height()
                    + section_sticky.stickyElmsBefore ) >= $(".content-navigation").offset().top) {
                    section_sticky.holder.css({
                        "top": $(".content-navigation").offset().top - section_sticky.scrollValue - section_sticky.holder.height()
                    });
                } else {
                    section_sticky.holder.addClass("makeSticky").css({
                        "top": section_sticky.stickyElmsBefore
                    });
                }
            } else {
                section_sticky.holder.removeClass("makeSticky").css({
                    "bottom": "initial",
                    "top": "initial"
                });
            }

            $('.article-sections a').each(function () {
                var currLink = $(this);
                var refElement = $(currLink.attr("href"));
                if (refElement.offset().top <= (section_sticky.scrollValue + section_sticky.stickyElmsBefore)) {
                    $('.article-sections ul li').removeClass("active");
                    currLink.parent('li').addClass("active");
                } else {
                    currLink.parent('li').removeClass("active");
                }
            });

        },
        scrollSec: function () { // call sticky on scroll
            var val = 0;
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
            var $headerHeight = $('header').outerHeight();

            if ($(".coolBar.stickybar").length)
                $headerHeight += $(".coolBar.stickybar").outerHeight();
            $(document).scrollTop($anchor.offset().top - $headerHeight);
        },
        control: function () {
            $(document).on("click", "a[href^='#']", function (e) {
                if ($(this).attr("href") != "#" && $(".article__body " + $(this).attr("href")).length > 0) {
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


    var tableViewer = {
        holder: $('.article-sections'),
        tables: '',

        init: function () {
            tableViewer.tables = $(".article-table-content");
            tableViewer.control();
        },
        control: function () {
            tableViewer.tables.each(function () {
                var table = $(this);
                var ViewerOpener = '<div class="table__viewer__opener" id="' + table.attr("id") + '">' +
                    '<a href="#"><i class="icon-table" aria-hidden="true"></i></a>' +
                    '<div>' +
                    table.find("caption").find("strong").html() +
                    '<a href="#">Enlarge table</a>' +
                    '</div>' +
                    '</div>';
                $(this).after(ViewerOpener);
                table.removeAttr("id")
                table.find("caption").append("<a href='#' class='table__viewer__closer'><i class='icon-close_thin'></i></a>");
            });


            $(document).on("click", ".table__viewer__opener a", function (e) {
                e.preventDefault();
                $(this).parents(".table__viewer__opener").prev(".article-table-content").addClass("table__viewer in");
                if ($('.article-table-content.in').length) {
                    $('.table-fn').click(function () {
                        var href = $(this).attr('href');
                        $(this).closest('.article-table-content.in').animate({
                            scrollTop: parseInt($(href).offset().top)
                        });
                    });
                }
            });

            $(document).on("click", ".table__viewer__closer", function (e) {
                e.preventDefault();
                $(this).parents(".table__viewer.in").removeClass("table__viewer in").css("top", "initial");
            });
        }
    };


    UX.tableViewer = tableViewer;
    // UX.sticko = sticko; // add to global namespace
    UX.altmetricsArea = altmetricsArea; // add to global namespace
    UX.scrollo = scrollo; // add to global namespace
    UX.section_sticky = section_sticky; // add to global namespace
    UX.loader.truncation.linesToShow = 1; // override authors lines number

    UX.loader.truncation.creativeWorkMeta=function () {
    }

})();