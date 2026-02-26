(function () {
    var $section = $('.figure-viewer'),
        $window = $(window),
        $document = $(document),
        $body = $('body');
    UX.figureViewer.$figures = $(document).find('figure:not(.holder), .figure:not(.holder)');
    UX.figureViewer.$captionRegion = UX.figureViewer.$section.find('.figure-viewer__caption_area');
    UX.figureViewer.expand = function () {
        UX.figureViewer.$figures = $document.find('figure:not(.holder), .figure:not(.holder)'),
            UX.figureViewer.$figures.each(function (index) {
                var $this = $(this);
                $this.find('.figure__image, .open-figure-link').on({
                    click: function (event) {
                        event.preventDefault();
                        if (!$this.hasClass('ui-disabled') && !$this.closest('.figure-viewer__hold__fig').length && $('.figure-viewer').length) {
                            UX.figureViewer.on.show($this, index);
                        }
                    }
                });
            });
    };
    UX.figureViewer.control = function () {

        $(document).on(UX.figureViewer.vPort + '-on',function(){ // Waiting for custom event that will be triggered by controller.js to activate responsive effects
            UX.figureViewer.isMobile = true;
        });

        $(document).on(UX.figureViewer.vPort + '-off',function(){ // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
            UX.figureViewer.isMobile = false;
        });

        var $figureViewer = $body.find('.figure-viewer');
        var $controllerElement = $figureViewer.find('a, button');

        $controllerElement.each(function () {
            var $this = $(this);
            $this.on({
                click: function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    if ($this.hasClass('figure-viewer__ctrl__close')) { // close button
                        UX.figureViewer.on.hide();
                    } else if ($this.hasClass('figure-viewer__ctrl__next')) { // Next button
                        UX.figureViewer.next();
                    } else if ($this.hasClass('figure-viewer__ctrl__prev')) { // Prev Button
                        UX.figureViewer.prev();
                    } else if ($this.hasClass('figure-viewer__ctrl__caption')) { // open / close caption Button
                        UX.figureViewer.toggle($( '.figure-viewer__caption_area'));
                        UX.figureViewer.toggle($('.figure-viewer__reg__top'));
                        UX.figureViewer.toggle($('.figure-viewer__cent__left'));
                        $(".figure-viewer__ctrl__caption").not('.reversed').toggleClass('js-open');
                    } else if ($this.hasClass('figure-viewer__ctrl__browse')) { // browse all figures
                        UX.figureViewer.browse($(this));
                    } else if ($this.hasClass('figure-viewer__ctrl__return')) { // browse all figures
                        UX.figureViewer.return($(this));
                    }
                }
            });
        });

        $(".figure a").click(function(e){
            var $img = $(this).find("img");
            UX.figureViewer.shouldDefault = $(this).hasClass('linkBehavior');
            if (!shouldDefault || $img.length !== 0) {
                e.preventDefault();
                $img.trigger("click");
            }
        });

        $(".figure a img").click(function(e){
            e.stopPropagation();
        });

        $('body').keydown(function (event) {
            if (event.keyCode === 37) { // left
                UX.figureViewer.prev();
            } else if (event.keyCode === 39) { // right
                UX.figureViewer.next();
            }
        });

        UX.figureViewer.$image.on('click',function (e) {
            var img_clicked = $(e.target).is( "img" );
            if(!img_clicked) {
                UX.figureViewer.on.hide();
            }
        });

        UX.figureViewer.resize();
        $(window).resize(function () {
            UX.figureViewer.resize();
        });

        if ( UX.figureViewer.$figures.length == 1) {
            UX.figureViewer.$figureNav.hide();
        }

        $(".figure-viewer__ctrl__caption").focusout(function(){
            $('.figure-viewer__ctrl__close').focus();
        });
    };

    UX.figureViewer.next = function () {
        if (UX.figureViewer.$currentIndex < UX.figureViewer.$figures.length - 1) {
            if (!UX.figureViewer.$figures.eq(UX.figureViewer.$currentIndex + 1).closest('.figure-viewer').length) {
                UX.figureViewer.$currentIndex++;
                var $next = UX.figureViewer.$figures.eq(UX.figureViewer.$currentIndex);
                UX.figureViewer.replace($next);
                UX.figureViewer.zoom.reset();
            }
        } else {
            UX.figureViewer.$currentIndex = 0;
            var $next = UX.figureViewer.$figures.eq(UX.figureViewer.$currentIndex);
            UX.figureViewer.replace($next);
            UX.figureViewer.zoom.reset();
        }
    };
    UX.figureViewer.prev = function () {
        if (UX.figureViewer.$currentIndex >= 1) {
            if (!UX.figureViewer.$figures.eq(UX.figureViewer.$currentIndex - 1).closest('.figure-viewer').length) {
                UX.figureViewer.$currentIndex--;
                var $prev = UX.figureViewer.$figures.eq(UX.figureViewer.$currentIndex);
                UX.figureViewer.replace($prev);
                UX.figureViewer.zoom.reset();
            }
        } else {
            UX.figureViewer.$currentIndex = UX.figureViewer.$figures.length - 1;
            var $prev = UX.figureViewer.$figures.eq(UX.figureViewer.$currentIndex);
            UX.figureViewer.replace($prev);
            UX.figureViewer.zoom.reset();
        }
    };

    UX.figureViewer.browse = function (element) {
        UX.figureViewer.$holder.addClass('is-hidden');
        UX.figureViewer.$figureNav.addClass('is-hidden');
        UX.figureViewer.$browsebtn.addClass('is-hidden');
        UX.figureViewer.$returnbtn.removeClass('is-hidden');
        UX.figureViewer.$captionRegion.removeClass('js-open');
        UX.figureViewer.$contentRegion.removeClass('js-open');
        UX.figureViewer.$captionRegion.addClass('is-hidden');
        UX.figureViewer.$hideList.each(function(){$(this).addClass('is-hidden');});
        UX.figureViewer.$lister.removeClass('is-hidden');

        $('.figure-viewer__hold__list').empty();
        UX.figureViewer.$figures.each(function () {
            if ($(this).hasClass('article__tabFigure')) {
                var $fig = $(this).clone(true);

                var $figureExtra = $fig.find(".figure-extra");

                if($figureExtra.length) {
                    $figureExtra.remove();
                }

                $('.figure-viewer__hold__list').append($fig);
            }
        });
    }

})();
