(function () {
    var loader = {
        element: "",
        target: "",
        $activator: "",
        doi: "",
        figure: "",
        references: "",
        related: "",
        details: "",
        tabFigure: "#pane-pcw-Figures , #pane-pcw-figures",
        tabReferences: "#pane-pcw-References, #pane-pcw-references",
        tabRelated: "#pane-pcw-Related, #pane-pcw-related",
        tabDetails: "#pane-pcw-Details, #pane-pcw-details",
        vPort: "screen-xs",
        isMobile: false,

        init: function(){
            // show spinner

            loader.get.figures();
            loader.get.references();
            loader.get.related();
            loader.get.details();
            /*if ($('article')) {
                loader.load.details();
            }*/
            loader.controller();
            loader.additionalController();
            loader.truncation.init();
        },
        controller: function(){

            $(window).on('load', function () {
                if ($('article')) {
                    loader.load.articleTabs();
                }
            });

           /* $('body').on('click','.figures-tab',function() {
                loader.load.figures();
            });
            $('body').on('click','.references-tab',function(){
                loader.load.references();
            });
            $('body').on('click','.related-tab',function(){
                loader.load.related();
            });
            $('body').on('click','.details-tab',function(){
                loader.load.details();
            });*/

            $('body').on('click','.boxed-text',function(e){
                e.preventDefault();

                var $el = $(this),
                    boxedContent = $el.attr('href'),
                    boxedHtml = $(boxedContent).html(),
                    $myModal = $('#myModal');

                if ($myModal.length === 0) {
                    var modal_start = '<div class="ux-modal-container"><div id="myModal" class="modal"><div class="modal__dialog  modal--large"><div class="modal-content">',
                        modal_header = '<div class="modal__header clearfix"><button type="button" data-dismiss="modal" class="close">X</button></div>',
                        modal_body = '<div class="modal__body"></div>',
                        modal_end = '</div></div></div></div>',
                        modal = modal_start + modal_header + modal_body + modal_end;
                    $('body').append(modal);
                }

                $myModal.find('.modal__body').html(boxedHtml);
                $myModal.modal('show');
            });

            $(document).on(loader.vPort + '-on',function(){ // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                loader.isMobile= true;
                if ($('article')) {
                    //loader.load.details();
                }
                loader.rebuild.responsive();
                loader.rebuild.extra();

                loader.figures.accordion();
            });

            $(document).on(loader.vPort + '-off',function(){ // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
                loader.isMobile= false;
                loader.rebuild.original();
                loader.figures.back();
            });



            if ($('.access-tab').length) {
                 $('.access-tab').trigger('click');

            } else {
                 $('.details-tab').trigger('click');
            }


            loader.get.mathjax();

        },
        additionalController: function () {

        },
        rebuild: {
            original: function(){ // return loi to be as default
                var $loaWrapper = $('.loa-wrapper');
                $loaWrapper.find('.accordion-tabbed__tab')
                    .removeClass('accordion-tabbed__tab')
                    .addClass('accordion-tabbed__tab-mobile');
                $loaWrapper.find('.delimiter').removeClass('hidden');
                var $author = $loaWrapper.find('.accordion-tabbed__control');
                $author.each(function () {
                    var id = $(this).attr('data-id');
                    $(this).attr('data-db-target-for', id);
                    $(this).next().attr('data-db-target-of', id).removeAttr('style')
                });
            },
            responsive: function(){ // rebuild loi to be in selected responsive mode
                var $loaWrapper = $('.loa-wrapper');
                $loaWrapper.find('.accordion-tabbed__tab-mobile')
                    .removeClass('accordion-tabbed__tab-mobile')
                    .addClass('accordion-tabbed__tab ')
                    .find('.accordion-tabbed__control').removeAttr('data-db-target-for');
                $loaWrapper.find('.loa-accordion').contents().map(function () {
                    if (this.nodeType === 3) { //Node.TEXT_NODE
                        $(this).wrap('<span class="delimiter hidden"></span>');
                    }
                    if ($(this).hasClass('delimiter')) {
                        $(this).addClass('hidden');
                    }
                });
                $loaWrapper.find('.accordion-tabbed__content').removeAttr('data-db-target-of').hide();
            },
            extra: function() {

            }

        },
        get: {
            figures: function(){// get current doi
                loader.figure = $('article').attr('data-figures');
            },
            references: function(){// get current doi
                loader.references = $('article').attr('data-references');
            },
            related: function(){// get current doi
                loader.related = $('article').attr('data-related');
                loader.truncation.creativeWorkMeta();

            },
            details: function(){// get current doi
                loader.details = $('article').attr('data-details');
            },
            mathjax: function () {
                if ( $("article").attr("data-enable-mathjax") == "true" && ($(".math-formula").length || $(".disp-formula").length || $(".inline-formula").length) ) {
                    var script = document.createElement("script");
                    script.type = "text/javascript";
                    script.src = "https:cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML";   // use the location of your MathJax

                    var config = 'MathJax.Hub.Config({' +
                        'CommonHTML: { linebreaks: { automatic: true } },' +
                        '"HTML-CSS": { linebreaks: {automatic: true}},' +
                        'SVG: { linebreaks: { automatic: true} },' +
                        '});';

                    if (window.opera) {
                        script.innerHTML = config
                    }
                    else {
                        script.text = config
                    }

                    document.getElementsByTagName("head")[0].appendChild(script);
                }
            }
        },

        load: {
            articleTabs: function () {
                loader.load.figures();
                var $articleReferences=$('.article__body .article__references');

                if($articleReferences.length){


                    if($('.article__body.show-references').length)
                    {
                        //copy past references
                        var articlesRefCopy=$articleReferences.clone();

                        articlesRefCopy.find('[id]').each(function() {//to remove dupliate Ids
                            this.id = this.id + "_copy";
                        });

                        articlesRefCopy.appendTo(loader.tabReferences);
                    }
                    else{
                        //cut past references
                        $articleReferences.appendTo(loader.tabReferences);
                        $articleReferences.show();
                    }

                    $(loader.tabReferences).removeClass("empty");
                }
                else{
                    loader.load.references();
                }

                loader.load.related();
                loader.load.details();
            },
            figures: function(){ // set figures pane as a target and set the requested html file
                if (loader.figure === undefined) { // check if figures' service url has been defined
                    return false;
                }
                loader.element = loader.figure;
                loader.target = loader.tabFigure;
                if (loader.check.empty()) {// check if figures panes is empty
                    loader.getContent('figure'); // get references content
                }
            },
            references: function(){ // set references pane as a target and set the requested html file
                if (loader.references === undefined) { // check if references' service url has been defined
                    return false;
                }
                loader.element = loader.references;
                loader.target = loader.tabReferences;
                if (loader.check.empty()) {// check if figures panes is empty
                    loader.getContent('references'); // get references content
                }
            },
            related: function(){ // set related pane as a target and set the requested html file

                if (loader.related === undefined) { // check if related' service url has been defined
                    return false;
                }
                loader.element = loader.related;
                loader.target = loader.tabRelated;
                if (loader.check.empty()) {// check if figures panes is empty
                    loader.getContent('related'); // get references content
                }
                loader.truncation.creativeWorkMeta();
            },
            details: function(){ // set details pane as a target and set the requested html file

                if (loader.details === undefined) { // check if details' service url has been defined
                    return false;
                }
                loader.element = loader.details;
                loader.target = loader.tabDetails;
                if (loader.check.empty()) {// check if figures panes is empty
                    loader.getContent('details'); // get references content
                }

            }
        },
        getContent: function($elem){ // get content using ajax request
            $('.tab__spinner').show(); // show spinner pane
            $(loader.target).load( loader.element, function( response, status, xhr ){
                if ( status === "error" ) {
                    var msg = "Sorry but there was an error: ";
                    console.log( msg + xhr.status + " " + xhr.statusText );
                    //return false; // abort
                }
                $('.tab__spinner').hide(); // hide spinner pane
                $(loader.target).removeClass("empty").trigger('content-loaded');
                loader.check.empty();
                loader.attach();

                var loaderTarget = $(this).attr('id'),
                    isFigures = loader.tabFigure.indexOf(loaderTarget) != -1;
                if (isFigures && loader.isMobile) {
                    loader.figures.accordion();
                }
                loader.getContentSuccess($elem);


            });
        },
        getContentSuccess: function ($elem) {

        },
        check: { // check if target pane is empty
            empty: function(){
                if( !$(loader.target).is(':empty')) {
                    return false; // abort
                } else {
                    $(loader.target).removeClass("empty");
                    return true;
                }
            }
        },
        attach: function () {
            UX.figureViewer.expand();
        },
        figures: {
            figcaption: "figcaption",
            figureTitle: ".figure__title",
            figureCaption: ".figure__caption",
            accordionClass: "accordion",
            accordionContent: "accordion__content",
            accordionTrigger: $('<button title="Toggle figure caption" class="accordion__control"/>'),
            accordionTriggerIcon: $('<i aria-hidden="true" class="icon-section_arrow_d"/>'),
            accordionTriggerCaption: $('<span>Caption</span>'),

            accordion: function(){ //turn figures caption into accordion on mobile
                if (!$(loader.tabFigure).find(loader.figures.figcaption).hasClass(loader.figures.accordionClass)) {
                    loader.figures.accordionTriggerCaption.appendTo(loader.figures.accordionTrigger);
                    loader.figures.accordionTriggerIcon.appendTo(loader.figures.accordionTrigger);
                    $(loader.figures.figcaption).find(loader.figures.figureCaption).before(loader.figures.accordionTrigger);
                    $(loader.tabFigure).find(loader.figures.figcaption).addClass(loader.figures.accordionClass);
                    $(loader.figures.figcaption).find(loader.figures.figureCaption).addClass(loader.figures.accordionContent).hide();
                }
            },
            back: function(){ // remove accordion features on desktop
                if ($(loader.tabFigure).find(loader.figures.figcaption).hasClass(loader.figures.accordionClass)) {
                    $(loader.tabFigure).find(".accordion__control").remove();
                    $(loader.tabFigure).find(loader.figures.figcaption).removeClass(loader.figures.accordionClass);
                    $(loader.figures.figcaption).find(loader.figures.figureCaption).removeClass(loader.figures.accordionContent).show();
                }
            }

        },

        truncation: {
            toTrunk8: '.loa-accordion',
            toTrunk8Mobile: '.loa.mobile-authors',
            linesToShow: 3,
            showMoreText: 'Show all Authors',
            showLessText: 'Show less Authors',

            init: function () {
                if (loader.isMobile) {
                    $(loader.truncation.toTrunk8Mobile).truncate({
                        lines: loader.truncation.linesToShow,
                        type: 'list',
                        seeMoreLink: true,
                        seeMoreText: loader.truncation.showMoreText,
                        seeLessText: loader.truncation.showLessText,
                        isMobile: true,
                        mobileTarget: '#sb-1'
                    });
                } else {
                    $(loader.truncation.toTrunk8).truncate({
                        lines: loader.truncation.linesToShow,
                        type: 'list',
                        seeMoreLink: true,
                        seeMoreText: loader.truncation.showMoreText,
                        seeLessText: loader.truncation.showLessText
                    });
                }

            },
            creativeWorkMeta:function () {
                $('.creative-work .meta').truncate({
                    lines: 1
                });
            }

        }
    };

    UX.loader = loader; // add to global namespace
})();