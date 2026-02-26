UX.loader.load.related=function(){

};
UX.loader.load.references=function(){

};

UX.loader.load.figures=function(){

};

UX.loader.getContentSuccess = function ($elem) {
    if ( $elem == 'related'){
        $('.delayLoad').show();
        $('.lazy-load').remove();
    }

};
UX.loader.additionalController = function () {

    UX.loader.abstractLangs();
    UX.loader.referencesHash();

    $(document).on('click', '[href="#citedby-section"]', function (e) {
        e.preventDefault();
        e.stopPropagation();
        UX.scroll.scrollToTarget(this, true);

        var $target = $('#citedby-section').closest('.accordion__control');
        if (!$target.hasClass('js--open')) {
            $target.click();
        }
    });
    $('body').on('click', '.related-tab', function (e) {


        if (UX.loader.related != undefined) { // check if related' service url has been defined
            UX.loader.element = UX.loader.related;
            UX.loader.target = UX.loader.tabRelated;
            if (UX.loader.check.empty()) {// check if figures panes is empty
                UX.loader.getContent('related'); // get references content

            }

        }

    });
    $('body').on('click', '.references-tab', function (e) {
        if (UX.loader.references != undefined) { // check if related' service url has been defined
            UX.loader.element = UX.loader.references;
            UX.loader.target = UX.loader.tabReferences;
            if (UX.loader.check.empty()) {// check if figures panes is empty
                UX.loader.getContent('references'); // get references content
            }
        }


    });
    $('body').on('click', '.figures-tab', function (e) {
        if (UX.loader.figure != undefined) { // check if related' service url has been defined
            UX.loader.element = UX.loader.figure;
            UX.loader.target = UX.loader.tabFigure;
            if (UX.loader.check.empty()) {// check if figures panes is empty
                UX.loader.getContent('figure'); // get references content
            }
        }


    });

        $(document).on('click', '#pane-pcw-relatedcon', function (e) {
            if (UX.loader.related === undefined) { // check if related' service url has been defined
                return false;
            }
            UX.loader.element = UX.loader.related;
            UX.loader.target = UX.loader.tabRelated;
            if (UX.loader.check.empty()) {// check if figures panes is empty
                UX.loader.getContent('related'); // get references content
            }
            $('.creative-work .meta').truncate({
                lines: 1
            });
        });

    $(document).on('click', '.abstract-group .article-section__abstract .lang', function (e) {
        e.preventDefault();

        $('.article-row-left').height('auto');

        var lang = $(this).data('lang-of');
        var langParent = $(this).closest('.abstract-group').find('[data-lang=' + lang + ']');
        $('.article-section__abstract:not(#abstract-graphical-)').hide();
        $('.lang').removeClass('active');
        langParent.find('[data-lang-of=' + lang + ']').addClass('active');
        langParent.show();

        if ($('.article-row-left').outerHeight() < $(window).outerHeight()) {
            $('.article-row-left').height($(window).outerHeight() - $('header').outerHeight() );
        }
    });

    $(document).on('click', '.figure-viewer .figureLink, .figure-viewer .bibLink', function () {
        $('.figure-viewer__ctrl__close').trigger('click');

    });

    $(window).on('load ', function () {
        if ($('.coolBar').length && $('.w-slide').length) {
            $('.w-slide').addClass('padding-top');
        }

        $('.hideOnJSLoad').remove();
        $('.showOnJSLoad').removeClass('showOnJSLoad');
        //LIT-188190
        $('.coolBar--accessDenail .accordion-tabbed__control').on('click', function(e) {
            if(!$(this).hasClass("external")) {
                e.preventDefault();
                e.stopPropagation();
                $(this).next(".accordion-tabbed__content").toggle();
                $(this).attr('aria-expanded', $(this).attr('aria-expanded') == 'true' ? 'false' : 'true');
                $(this).parent('.accordion-tabbed__tab').toggleClass('js--open');
            }
        });
    });

    $('.figures-tab').on("click", function() {
        UX.loader.captionTruncate('.tab__content figcaption.figure__caption .figure__caption', 5, 'show', 'hide');
    });

    $('body').on('click', '.more', function () {
        UX.loader.captionShowMore($(this));
        return false;
    });

    $('body').on('click', '.less', function () {
        UX.loader.captionShowLess($(this));
        return false;
    });

    if ($('.corrections-label').length > 0) {
        $('.corrections-body > ul').addClass('corrections-list');
        $('.corrections-label').addClass('w-slide__btn').attr({
            'data-slide-target': '.corrections-body',
            'data-label': 'Correction(s)'
        });
    }

};

UX.slide.setBackLabel = function () {
    if (UX.slide.$toggle != null) {
        if (UX.slide.$toggle.hasClass('article-row-right__tabLinks')){
            UX.slide.$back.html('<i class=" icon-arrow_l" aria-hidden="true"></i>About');
        }else {
            UX.slide.$back.html('<i class=" icon-arrow_l" aria-hidden="true"></i>Back');
        }
    }

};

UX.loader.abstractLangs = function () {
    var tmp = [];
    var ids = [];
    var $abs = $('.abstract-group .article-section__abstract');


    //$abs.addClass('active');
    $('.article-section__abstract:not(#abstract-graphical-)').hide();
    $abs.each(function () {

        if ($(this).find('.lang').length) {

            // check if we have tow abs with the same lang
            for (var i = 0; i <= tmp.length; i++) {
                if (tmp[i] == $(this).find('.lang').html()) {
                    $(this).show();
                    $(this).find('.lang').remove();
                    //return;
                }

            }

            tmp.push($(this).find('.lang').html());
            ids.push($(this).attr('id'));
            $(this).find('.lang').remove();
            $(this).find('.article-section__header').after("<div class='lang-container'></div>");


        }


    });

    if (tmp.length <= 1) {
        $('.lang-container').remove();
        $('.article-section__abstract').show();
    }

    var lanName;

    for (var i = 0; i < tmp.length; i++) {
        switch (tmp[i]) {
            case 'en':
                lanName = "english";
                break;
            case 'fr':
                lanName = "french";
                break;
            case 'es':
                lanName = "Spanish";
                break;
            case 'de':
                lanName = "deutsche";
        }

        $('.lang-container').append("<a class='lang' href='#"+ ids[i] +"' hreflang='" + tmp[i] + "' data-lang-of='" + tmp[i] + "'>" + tmp[i] + "<span>This link goes to a " + lanName + " section</span></a>");
    }


    $('.lang').show();
    $abs.find('.lang:first-child').addClass('active').show();
    $('.article-section__abstract[data-lang= ' + tmp[0] + ' ]').show();


};

UX.loader.referencesHash = function () {
    var hash = window.location.hash;
    if (hash == "#reference") {
        setTimeout(function () {
            $('.references-tab').click();
        }, 200);
    }
};


UX.loader.captionTruncate = function (elem, lineNumber, show_more, show_less) {

    $(elem).each(function () {
        var $caption = $(this);

        $caption.truncate({
            lines: lineNumber,
            seeMoreLink: true,
            seeMoreText: show_more,
            seeLessText: show_less
        });

        // apply mathjax formating in the tab
        if ( $(".mathStatement").length || $(".inline-equation").length && $caption.hasClass('figure__caption')) {
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        }
    });

};


UX.loader.get.mathjax = function () {


    if ( $(".mathStatement").length || $(".inline-equation").length) {

        var articleBodyWidth = $(".article__body").innerWidth();

        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = $('article').data('mathjax');


        var config = 'MathJax.Hub.Config({' +
            'displayAlign: "left", ' +
            '"HTML-CSS": { linebreaks: {automatic: true,width: "'+articleBodyWidth+'px"}, undefinedFamily: "STIXGeneral, Arial Unicode MS, icomoon, serif"},' +
            '"fast-preview": { disabled: true },' +
            'tex2jax: {inlineMath: [["$", "$"], ["\\\\(", "\\\\)"]],processEscapes: true},'+
            'styles: {' +
            '"span.MathJax": {' +
            '"padding-right": "2px"' +
            '}' +
            '}' +
            '});'+
            'MathJax.Hub.Startup.onload();';

        if (window.opera) {
            script.innerHTML = config
        }
        else {
            script.text = config
        }

        document.getElementsByTagName("head")[0].appendChild(script);
    }

};

UX.figureViewer.additionalBehaviorOnShow = function ($el) {

    if ($el.find('figcaption .figure__caption').data('originalContent') != undefined) {
        var content = $el.find('figcaption .figure__caption').data('originalContent')
    } else {
        var content = $el.find('figcaption, .figcaption').clone();
        content.find('strong').remove();
    }

    return content;

};

$(window).on('load resize orientationchange', function () {


    UX.loader.captionTruncate('.tab__content figcaption.figure__caption .figure__caption', 5, 'show', 'hide');
    UX.loader.captionTruncate('.disclosures', 2, 'show', 'hide');
    UX.loader.captionTruncate('.article-header__references-container', 1, 'More', 'Less');
    UX.loader.captionTruncate('.aboutThisBook .content', 6, 'More', 'Less');



    var toTrim = '.article-citation .loa-authors .accordion-tabbed';
    if (UX.loader.isMobile) {
        $(toTrim).truncate('destroy');
        UX.loader.rebuild.responsive();
        toTrim = '.article-citation .loa.mobile-authors';
        $(toTrim).truncate({
            lines: 2,
            type: 'list',
            seeMoreLink: true,
            seeMoreText: 'See all authors',
            seeLessText: 'See fewer authors',
            isMobile: true,
            mobileTarget: '#sb-1'
        });
    } else {
        $(toTrim).truncate({
            lines: 2,
            type: 'list',
            seeMoreLink: true,
            seeMoreText: 'See all authors',
            seeLessText: 'See fewer authors'
        });
    }


});