(function () {
    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $body = $html.find('body'),
        $topNav = $body.find('#top-nav'),
        $searchButton = $topNav.find('a.search-button'),
        $searchForm = $body.find('form.search'),
        $searchFormInput = $searchForm.find('input'),
        $pageBody = $body.find('div.pageBody'),
        $footer = $body.find('footer'),
        disqus_identifier = $('.doi').data('doi'),
        disqus_title=$('h1').val(),
        click_scrolling = true,
        $clicked_link = null;

    var figureViewer = {
        figures: null,
        $summary: null,
        $summaryList: null,
        $viewer: null,
        $viewerFrames: null,
        $viewerFrameList: null,
        $viewerCaption: null,
        $viewerCaptionText: null,
        $viewerThumbstripList: null,
        $previousFrameButton: null,
        $nextFrameButton: null,
        $previousThumbstripButton: null,
        $nextThumbstripButton: null,
        $download: null,
        frameCount: null,
        frameIndex: null,
        frameHeight: null,
        frameWidth: null,
        thumbnailWidth: null,
        thumbstripOffsets: null,
        thumbstripOffsetIndex: null,
        captionsLinks: null,
        $ourFirst: null,
        //those variables are needed for zoom in funct
        scale : 1,
        counter : 1,
        x : null,
        y: null,
        scaled:false,
        mouseDownVal:false,
        clickCounter: 0,
        captionControllTextShow: "Show full caption",
        captionControllTextHide: "Hide caption",

        init: function () {
            figureViewer.figures = $('figure'),
            figureViewer.$summary = $('<section><h2 id="figures">Figures</h2></section>'),
            figureViewer.$summaryList = $('<ul class="figures rlist"></ul>').appendTo(figureViewer.$summary),
            figureViewer.$viewer = $('#figure-viewer'),
            figureViewer.$viewerFrames = figureViewer.$viewer.find('div.frames'),
            figureViewer.$viewerFrameList = figureViewer.$viewerFrames.find('ul'),
            figureViewer.$viewerCaption = figureViewer.$viewer.find('div.caption'),
            figureViewer.$viewerCaptionText = figureViewer.$viewerCaption.find('div'),
            figureViewer.$viewerThumbstripList = figureViewer.$viewer.find('div.thumbstrip > div > ul'),
            figureViewer.$previousFrameButton =  figureViewer.$viewerFrames.find('a.previousFrameButton'),
            figureViewer.$nextFrameButton =  figureViewer.$viewerFrames.find('a.nextFrameButton'),
            figureViewer.$previousThumbstripButton = figureViewer.$viewer.find('div.thumbstrip > a.previousThumbstripButton'),
            figureViewer.$nextThumbstripButton = figureViewer.$viewer.find('div.thumbstrip > a.nextThumbstripButton'),
            figureViewer.$download = figureViewer.$viewer.find('div.download'),
            figureViewer.frameCount = figureViewer.figures.length,
            figureViewer.captionsLinks= $(".caption__link"),
            figureViewer.figureViewerframeIndex = 0,
            figureViewer.thumbnailWidth = 140,
            figureViewer.captionControls = $(".figure__caption__body .accordion__control");

            figureViewer.captionControls.on('click', function (e) { // caption inline links controllers
                console.log("figureViewer.captionControls.on(click)");
                console.log("this: ");
                console.log(this);
                var textContainer = $(this).find("span");
                $(this).attr("aria-expanded") == "false" ? textContainer.text(figureViewer.captionControllTextHide) : textContainer.text(figureViewer.captionControllTextShow);

            });

            figureViewer.captionsLinks.on('click', function (e) { // caption inline links controllers
                if ($(this).closest(".figure-viewer").length )
                    if ($(this).hasClass("figure-link")){
                        e.preventDefault();
                        var traget= $(this).attr('data-locator');
                        $('.thumbstrip__wrapper img[data-locator="'+traget+'"]').trigger( 'click' ); // got to target figure
                    } else {
                        e.preventDefault();
                        figureViewer.closeViewer(); // prevent default scrolling
                        var url = $(this).attr("href");
                        setTimeout(function() { // give time to figureViewer to close before scrolling
                            window.location = url;
                        }, 300);
                    }

            });

            figureViewer.figures.each(function(index) {
                var $image = $(this).find('img:not(.inline-image)'),
                    $frame = $('<div class="thumbnail__image"></div>').append($image.clone(true)),
                    $label = $('<div class="thumbnail__label"></div>').append($(this).find('.figure__label').data("fv-label")),
                    $thumbnail = $('<div class="thumbnail"></div>').append($frame.clone(true)),
                    $caption = $('<p class="caption"></p>').append($(this).find('.figure__caption__body').clone(true)),
                    $openlink = $(this).find(".figure__open__ctrl");

                $('<li></li>').append($frame).appendTo(figureViewer.$viewerFrameList);
                $('<li></li>').append($thumbnail.clone(true)).append($caption).appendTo(figureViewer.$summaryList);
                $('<li></li>').append($label.clone(true)).append($thumbnail).appendTo(figureViewer.$viewerThumbstripList);
                $image.click(function() {
                    figureViewer.openViewer(); figureViewer.move(index);
                    figureViewer.fillLinks(index);
                });
                $openlink.on("click",function (e) {
                    e.preventDefault();
                    figureViewer.openViewer(); figureViewer.move(index); figureViewer.fillLinks(index);
                });
            });

            //this is needed for zoom functionality
            figureViewer.$viewerFrameList.find('img').each(function(){
                $(this).draggable({
                    start: function(event, ui){
                        $(this).data('dragging', true);
                        $(this).attr("position" , "relative");
                    },
                    scroll:false,
                    stop: function(event, ui){
                        setTimeout(function(){
                            $(event.target).data('dragging', false);
                        }, 1);
                    }
                });
            });

            figureViewer.clickCounter = 0;
            figureViewer.$viewerFrameList.find('img').each(function(){
                var fig = this;
                $(fig).parent().click(function(e){
                    e.preventDefault();
                    figureViewer.activate(e,fig);
                });
                if(figureViewer.isMobile()){
                    $(fig).parent().swipe( {
                        swipeStatus:function(event, phase, direction, distance , duration , fingerCount) {
                            // $(this).find('#swipe_text').text("swiped " + distance + ' px');
                            if(phase === $.fn.swipe.phases.PHASE_END || phase === $.fn.swipe.phases.PHASE_CANCEL) {
                                // event.preventDefault();
                                if(direction == null) {

                                } else if(direction =="right") {
                                    if (figureViewer.frameIndex > 0 && !figureViewer.scaled) {
                                        figureViewer.movePrevious();
                                    }
                                } else if (direction == "left") {
                                    if (figureViewer.frameIndex < figureViewer.frameCount - 1 && !figureViewer.scaled) {
                                        figureViewer.moveNext();
                                    }
                                }
                            }
                        },
                        fingers:$.fn.swipe.fingers.ALL
                    });
                }
            });

            $body.mousedown(function(){
                figureViewer.mouseDownVal=true;
            });

            $body.mouseup(function(){
                setTimeout(function(){
                    figureViewer.mouseDownVal=false;
                }, 1);
            });

            $('div.figures-placeholder').replaceWith(figureViewer.$summary);
            figureViewer.$viewer.find('.figure-viewer__title').text($('h1').text());
            figureViewer.resize();

            //Event binding
            $(".js--openFigureViewer").on("click",function (e) {
                e.preventDefault();
                figureViewer.openViewer();
            });
            figureViewer.$viewer.find('a.figure-viewer__close').click(function(event) {
                event.preventDefault();
                figureViewer.closeViewer();
            });

            $(".figure-viewer__see-figure__ctrl").on("click",function () {
                if (figureViewer.$ourFirst.length) {
                    figureViewer.closeViewer();
                }
            });

            figureViewer.$summaryList.find('img').each(function(index) {
                $(this).click(function() {
                    figureViewer.openViewer(); figureViewer.move(index); figureViewer.fillLinks(index);
                });
            });
            figureViewer.$viewerThumbstripList.find('img').each(function(index) {
                $(this).click(function() {
                    figureViewer.move(index);
                    figureViewer.fillLinks(index);
                });
            });

            /*detect key down event*/
            $window.keydown(function(e) {
                switch(e.which) {
                    case 27:
                            figureViewer.closeViewer();
                        break;
                    case 37:
                        if(figureViewer.frameIndex > 0) {
                            figureViewer.movePrevious();
                        }
                        break;
                    case 38:
                        figureViewer.move(0);
                        figureViewer.fillLinks(0);
                        break;
                    case 39:
                        if(figureViewer.frameIndex != figureViewer.frameCount-1 ){
                            figureViewer.moveNext();
                        }
                        break;
                    case 40:
                        figureViewer.move(figureViewer.frameCount-1);
                        figureViewer.fillLinks(figureViewer.frameCount-1);
                        break;

                    default: return; // exit this handler for other keys
                }
                e.preventDefault(); // prevent the default action (scroll / move caret)
            });

            figureViewer.$previousFrameButton.click(function(e) {
                e.preventDefault();
                figureViewer.movePrevious();
            });
            figureViewer.$nextFrameButton.click(function(e) {
                e.preventDefault();
                figureViewer.moveNext();
            });
            figureViewer.$previousThumbstripButton.click(function() {
                figureViewer.thumbstripMovePrevious();
            });
            figureViewer.$nextThumbstripButton.click(function() {
                figureViewer.thumbstripMoveNext();
            });
            figureViewer.$viewer.on("click", "div > div > span.Figcontent a", function(){
                $(this).removeAttr("href");figureViewer.closeViewer();
            });
            figureViewer.$viewer.find('div.toolbar > a.toggle-caption-button').click(function() {
                figureViewer.toggleViewerCaption();
            });
            figureViewer.$viewer.find('a.download-options-button').click(function(event) {
                event.stopPropagation();
                if(!figureViewer.$download.hasClass('open')){
                    figureViewer.$download.addClass('open');
                } else{
                    figureViewer.$download.removeClass('open');
                }
            });


            figureViewer.$viewer.find('div.thumbstrip > a.toggleButton').click(function() {
                figureViewer.toggleViewerThumbstrip();
            });
            figureViewer.$viewer.click(function() {
                figureViewer.$download.removeClass('open');
            });


            figureViewer.updateDownloadFigureLink(0);

            $window.resize(function() { figureViewer.resize(); });

        },
        fillLinks: function (index) {
            var elementId = figureViewer.figures.eq(index).attr("id");
            $("#linkThis").attr("id","");
            figureViewer.$ourFirst = $('a[href="#'+elementId+'"]').first().attr("id","linkThis");
            if (!figureViewer.$ourFirst.length) {
                $(".figure-viewer__see-figure__ctrl").hide();
            } else {
                $(".figure-viewer__see-figure__ctrl").show();
            }
        },
        activate: function (e,fig) {
            figureViewer.clickCounter++;
            if(figureViewer.scaled || figureViewer.clickCounter == 1){
                $(fig).draggable('enable');
            }else{
                $(fig).draggable('disable');
            }
            if($(fig).data('dragging') && figureViewer.mouseDownVal) return;
            var offset = $(fig).parent().offset();
            var width = fig.width;
            var height =fig.height;
            x = e.pageX;
            y = e.pageY;
            figureViewer.scale += 0.5;
            console.log(figureViewer.clickCounter);
            if(figureViewer.clickCounter < 3){
                x= ((x-offset.left) / width) * 100;
                y= ((y-offset.top) / height) * 100;
                figureViewer.zoom.in(fig , x , y,figureViewer.scale);
                figureViewer.counter++;
            }else {
                figureViewer.zoom.reset(fig);
                figureViewer.counter = 1;
                figureViewer.clickCounter=0;
                figureViewer.scale = 1;
            }
        },
        layoutViewer: function () {
            figureViewer.$viewer.removeClass('landscape portrait');
            if (figureViewer.$viewer.height() < figureViewer.$viewer.width() || !figureViewer.isMobile()) {
                figureViewer.$viewer.addClass('landscape');
                figureViewer.frameHeight = figureViewer.$viewer.height() - 65;
                figureViewer.frameWidth = figureViewer.$viewer.hasClass('showCaption') ? figureViewer.$viewer.width() * 0.7 : figureViewer.$viewer.width() - 75;
                figureViewer.$viewerCaption.css({'left': figureViewer.frameWidth, 'top': 0});
                // figureViewer.$viewerFrames.find('a.frameButton').css({'top':"50%"});
            } else {
                figureViewer.$viewer.addClass('portrait');
                figureViewer.frameHeight = (figureViewer.$viewer.height() * 0.5) - 65;
                figureViewer.frameWidth = figureViewer.$viewer.width();
                figureViewer.$viewerCaption.css({'left': 0, 'top': figureViewer.frameHeight + 65});
                // figureViewer.$viewerFrames.find('a.frameButton').css({'top':"50%"});
            }
            figureViewer.$viewerFrames
                .css({'height': figureViewer.frameHeight, 'top': 65, 'width': figureViewer.frameWidth});


            figureViewer.$viewerFrameList
                .css({'left': -(figureViewer.frameWidth * figureViewer.frameIndex), 'width': figureViewer.frameWidth * figureViewer.frameCount})
                .find('li').each(function(index) { figureViewer.layoutFrame($(this), index); });

            figureViewer.$previousFrameButton.css({'left': 0});
            figureViewer.$nextFrameButton.css({'right': 0});

            figureViewer.thumbstripOffsets = figureViewer.getThumbstripOffsets();
            figureViewer.$viewerThumbstripList.css('width', figureViewer.thumbnailWidth * figureViewer.frameCount);
            figureViewer.thumbstripMove(0);

            figureViewer.$download.removeClass('open');

        },
        move: function(index) {
            figureViewer.frameIndex = index;
            figureViewer.$viewerFrameList.addClass('transition').css('left', -(figureViewer.frameWidth * figureViewer.frameIndex));
            figureViewer.$previousFrameButton.css('visibility', figureViewer.frameIndex == 0 ? 'hidden' : 'visible');
            figureViewer.$nextFrameButton.css('visibility', figureViewer.frameIndex == figureViewer.frameCount - 1 ? 'hidden' : 'visible');
            figureViewer.$viewer.find('div.toolbar > span').text((figureViewer.frameIndex + 1) + '/' + figureViewer.frameCount);
            figureViewer.$viewerCaptionText.empty().append(figureViewer.figures.eq(figureViewer.frameIndex).find('.figure__caption__body').find(".figure__title").clone(true, true));
            figureViewer.$viewerCaptionText.append(figureViewer.figures.eq(figureViewer.frameIndex).find('.figure__caption__body').find(".accordion__content").children().clone(true, true));
            UX.abood = figureViewer.figures.eq(figureViewer.frameIndex).find('.figure__caption__body').find(".figure__title").clone(true);
            figureViewer.$viewerThumbstripList.find('li').removeClass('current').eq(figureViewer.frameIndex).addClass('current');
            setTimeout(function() { figureViewer.$viewerFrameList.removeClass('transition'); }, 500);
            figureViewer.updateDownloadFigureLink(index);
            figureViewer.zoom.reset(figureViewer.$viewer.find('img:eq(' + figureViewer.frameIndex + ')'));
        },
        getThumbstripOffsets: function () {
            var availableWidth = figureViewer.$viewer.width() - 90,
                thumbnailsPerPage = Math.floor(availableWidth / figureViewer.thumbnailWidth),
                pageCount = Math.ceil(figureViewer.frameCount / thumbnailsPerPage),
                pageWidth = thumbnailsPerPage * figureViewer.thumbnailWidth,
                offsets = [0];

            for	(var i = 1; i < pageCount - 1; i++) { offsets[i] = i * pageWidth; }
            if (pageCount > 1) { offsets[pageCount - 1] = figureViewer.thumbnailWidth * figureViewer.frameCount - availableWidth; }

            return offsets;
        },
        layoutFrame: function (frame, index) {
            var availableWidth = figureViewer.frameWidth - 60,
                availableHeight = figureViewer.frameHeight - 60,
                matteWidth = figureViewer.figures.eq(index).data('std-width') + 10,
                matteHeight = figureViewer.figures.eq(index).data('std-height') + 10,
                aspectRatio = matteWidth / matteHeight,
                height, width, top, left;

            if (aspectRatio > (availableWidth / availableHeight)) {
                width = (matteWidth < availableWidth) ? matteWidth : availableWidth;
                height = width / aspectRatio;
            } else {
                height = (matteHeight < availableHeight) ? matteHeight : availableHeight;
                width = height * aspectRatio;
            }
            top = (figureViewer.frameHeight - height) / 2;
            left = (figureViewer.frameWidth - width) / 2;

            frame
                .css({'height': figureViewer.frameHeight, 'left': figureViewer.frameWidth * index, 'width': figureViewer.frameWidth})
                .find('div')
                .css({'height': height, 'left': left, 'top': top, 'width': width});
        },
        moveNext: function () {
            figureViewer.move(figureViewer.frameIndex + 1);
            figureViewer.fillLinks(figureViewer.frameIndex);
        },
        movePrevious: function () {
            figureViewer.move(figureViewer.frameIndex - 1);
            figureViewer.fillLinks(figureViewer.frameIndex);
        },
        openViewer: function () {
            if ( $(window).width() <= 414) {
                $('html, body').toggleClass('no-scroll');}
            $body.css("overflow","hidden");
            $body.addClass('modal-open');
            figureViewer.$viewer.addClass('open');
            figureViewer.layoutViewer();
            setTimeout(function() { figureViewer.toggleViewerThumbstrip(); }, 2000);
        },
        closeViewer: function () {
            $('html, body').removeClass('no-scroll');
            $body.css("overflow","auto");
            $body.removeClass('modal-open');
            figureViewer.$viewer.removeClass('open').addClass('showThumbstrip');
        },
        thumbstripMove: function (index) {
            figureViewer.thumbstripOffsetIndex = index;
            figureViewer.$viewerThumbstripList.css('left', -figureViewer.thumbstripOffsets[figureViewer.thumbstripOffsetIndex]);
            figureViewer.$previousThumbstripButton.css('visibility', figureViewer.thumbstripOffsetIndex == 0 ? 'hidden' : 'visible');
            figureViewer.$nextThumbstripButton.css('visibility', figureViewer.thumbstripOffsetIndex == figureViewer.thumbstripOffsets.length - 1 ? 'hidden' : 'visible');
        },
        thumbstripMoveNext: function () {
            figureViewer.thumbstripMove(figureViewer.thumbstripOffsetIndex + 1);
        },
        thumbstripMovePrevious :function () {
            figureViewer.thumbstripMove(figureViewer.thumbstripOffsetIndex - 1);
        },
        resize: function () {
            var contentWidth = $('h1').width();

            figureViewer.figures.each(function() {
                var $figure = $(this),
                    $image = $figure.find('img:not(.inline-image)'),
                    availableHeight = $window.height() - 100,
                    standardWidth = $figure.data('std-width'),
                    standardHeight = $figure.data('std-height'),
                    aspectRatio = standardWidth / standardHeight,
                    width = "100%",
                    height = "auto";
                if ($figure.closest(".figure-viewer").length) {
                    width = $figure.data('ds-width') * 1.25,
                        height = width / aspectRatio;
                }

                if ($window.width() >= 992) {
                    availableHeight = (availableHeight > 500) ? availableHeight : 500;
                    width = (height > availableHeight) ? availableHeight * aspectRatio : width;
                }
                width = (width > contentWidth) ? contentWidth : width;

                $image.css('width', width);
            });
            figureViewer.layoutViewer();
        },
        toggleViewerCaption: function () {
            var $label = figureViewer.$viewer.find('div.toolbar > a.toggle-caption-button > span.label');
            figureViewer.$viewerCaption.addClass('transition');
            if (figureViewer.$viewer.hasClass('showCaption')) {
                $label.text('Show Caption');
                figureViewer.$viewerFrameList.find('li').eq(figureViewer.frameIndex).css('width', figureViewer.$viewer.width() - 75);
                figureViewer.$viewerCaption.css('left', figureViewer.$viewer.width() - 75);
            } else {
                $label.text('Hide Caption');
                figureViewer.$viewerCaption.css('left',figureViewer.$viewer.width() * 0.7);
            }
            figureViewer.$viewer.toggleClass('showCaption');
            setTimeout(function() { figureViewer.$viewerCaption.removeClass('transition'); figureViewer.layoutViewer(); }, 200);
        },
        toggleViewerThumbstrip: function () {
            figureViewer.$viewer.toggleClass('showThumbstrip');
        },
        updateDownloadFigureLink: function (index) {
            var $downloadThisFig = figureViewer.$download.find('.downloadThisButton');
            var locator= figureViewer.$viewer.find('img:eq(' + index + ')').data('high-res');
            $downloadThisFig.prop('href', locator);
        },
        getDownloadFigUrl: function (locator) {
            var articleNumber = $("article").data('articlenumber');
            return "/action/downloadFigures?articleNumber=" + articleNumber + "&locator=" + locator;
        },
        isMobile: function () {
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                return true;
            }
            return false;
        },
        zoom: {
            in: function (fig , x ,y , scale) {
                fig.style.transform = "scale("+scale+")";
                fig.style.position = "relative";
                $(fig).css("transform-origin", x+"% "+y+"%");
                figureViewer.scaled =true;
            },
            reset:function (fig) {
                $(fig).removeAttr("style");
                figureViewer.scaled =false;
            }
        }
    };


    UX.figureViewer = figureViewer; // add to global namespace

})();
