(function () {

    $(document).ready(function() {
        $('div.altmetric-embed').on('altmetric:show', function () {
            $('.altmetric_wrapper').show();
        });

        (function () {
            // Open author affiliations when clicked on author footnote link
            // Solution -> click on accordion controller, when accordion dropdown is closed
            // Possible solution: rewrite accordion.js to contain public functions such as open/close, not only toggle

            $('.author-aff-link').on('click', function () {
                var $affiliationAccordionControl = $(this).closest('.citation').find('.article__author-affiliations .accordion__control');

                if(!$affiliationAccordionControl.hasClass('js--open')) {
                    $affiliationAccordionControl.click();
                }
            });
        })();

    });

    var altmetric = {
        init: function(){
            altmetric.get.altmetric();
            altmetric.control();
        },
        control: function () {
            $(".top-list__container").each(function () {
                var holder = $(this);

                if (holder.find('.altmetric-embed').length && holder.find('.altmetric-embed').html().length == 0) {
                    holder.addClass('without__cover__image');
                } else {
                    holder.removeClass('without__cover__image');
                }
            } );
            $(".top-list__container").bind("DOMSubtreeModified", function () {
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
                script.src = "http://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js";
                document.getElementsByTagName("head")[0].appendChild(script);
            }
        }
    };

    UX.loader.figures.accordion = function() {
        if (!$(UX.loader.tabFigure).find(UX.loader.figures.figcaption).hasClass(UX.loader.figures.accordionClass)) {
            UX.loader.figures.accordionTriggerCaption.appendTo(UX.loader.figures.accordionTrigger);
            UX.loader.figures.accordionTriggerIcon.appendTo(UX.loader.figures.accordionTrigger);
            if(!$(UX.loader.figures.figcaption).has('.accordion__control').length) {
                $(UX.loader.figures.figcaption + ':not(:has(>.accordion__control))').find(UX.loader.figures.figureCaption).before(UX.loader.figures.accordionTrigger);
                $(UX.loader.tabFigure).find(UX.loader.figures.figcaption).addClass(UX.loader.figures.accordionClass);
                $(UX.loader.figures.figcaption).find(UX.loader.figures.figureCaption).addClass(UX.loader.figures.accordionContent).hide();
            }
        }
    }
    UX.altmetric = altmetric;
})();