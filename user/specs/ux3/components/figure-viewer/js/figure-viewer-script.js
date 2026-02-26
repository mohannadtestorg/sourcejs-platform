(function () {
    var $section = $('.figure-viewer'),
        $window = $(window),
        $document = $(document),
        $body = $('body');

    var figureViewer = {
        options: {
            /*
            * false|classCombination|className|dataRel
            * */
            filter: false,
            filterClass: 'article__tabFigure'
        },
        $topRegHeight : $('.figure-viewer__reg__top').innerHeight(),
        vPort: "screen-md",
        $figures: null,
        $figuresToShow: null,
        $figureWidth: null,
        $currentIndex: null,
        $focusedElementBeforeOpened: null,
        $section: $section,
        $holder: $section.find('.figure-viewer__hold__fig'),
        $captionHolder: $section.find('.figure-viewer__hold__figcap'),
        $lister: $section.find('.figure-viewer__hold__list'),
        $captionRegion: $section.find('.figure-viewer__cent__right'),
        $contentRegion: $section.find('.figure-viewer__cent__left'),
        $figureNav: $section.find('.figure-viewer__ctrl__next, .figure-viewer__ctrl__prev'),
        $zoominbtn: $section.find('.zoom-in'),
        $zoomoutbtn: $section.find('.zoom-out'),
        $zoomrange: $section.find('.zoom-range'),
        $zoomreset: $section.find('.reset'),
        $image: $section.find('figure'),
        $browsebtn: $('.figure-viewer__ctrl__browse'),
        $returnbtn: $('.figure-viewer__ctrl__return'),
        isMobile: false,
        islocked: false,
        offsetY: window.pageYOffset,
        $hideList: $('.zoomSlider, .figure-viewer__label__zoom'),
        expand: function () {
            // preserve backward compatibility with previous buggy version - it can be removed if filterContexts would become default behavior
            if (figureViewer.options.filter) {
                figureViewer.$figures = $document.find(':not(.figure-viewer__hold__list) > figure:not(.holder), :not(.figure-viewer__hold__list) > .figure:not(.holder)');
            } else {
                figureViewer.$figures = $document.find('figure:not(.holder), .figure:not(.holder)');
            }

            figureViewer.$figures.each(function (index) {
                var $this = $(this);
                if (figureViewer.options.filter) {
                    $this.addClass('figure'); // add class to be sure, that correct grid styling will be there
                    if (figureViewer.options.filter === 'dataRel') {
                        // move data-rel to container from child
                        var dataRelElement = $this.find('[data-rel]');
                        if (dataRelElement.length > 0 && dataRelElement.data().rel) {
                            $this.attr('data-rel', dataRelElement.data().rel);
                        }
                    }
                }

                $this.find('.figure__image, .open-figure-link').on({
                    click: function (event) {
                        event.preventDefault();
                        if (!$this.hasClass('ui-disabled') && !$this.closest('.figure-viewer__hold__fig').length && $('.figure-viewer').length) {
                            figureViewer.on.show($this, index);
                        }
                    }
                });
            });
        },
        /*
        * Filter grid view and navigation based on item opened and option provided by figureViewer.options.filter
        * */
        filter: function ($this) {
            if (figureViewer.options.filter === 'classCombination') {
                var className = $this.attr('class');
                figureViewer.$figuresToShow = figureViewer.$figures.filter('[class="'+className+'"]');
            } else if (figureViewer.options.filter === 'className') {
                figureViewer.$figuresToShow = figureViewer.$figures.filter('.'+figureViewer.options.filterClass);
            } else if (figureViewer.options.filter === 'dataRel') {
                var dataRel = $this.data('rel');
                if (dataRel) {
                    figureViewer.$figuresToShow = figureViewer.$figures.filter('[data-rel="'+dataRel+'"]');
                } else {
                    figureViewer.$figuresToShow = figureViewer.$figures;
                }
            } else {
                figureViewer.$figuresToShow = figureViewer.$figures;
            }

            figureViewer.$currentIndex = figureViewer.$figuresToShow.index($this);
        },
        control: function () {

            $(document).on(figureViewer.vPort + '-on',function(){ // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                figureViewer.isMobile = true;
            });

            $(document).on(figureViewer.vPort + '-off',function(){ // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
                figureViewer.isMobile = false;
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
                            figureViewer.on.hide();
                        } else if ($this.hasClass('figure-viewer__ctrl__next')) { // Next button
                            figureViewer.next();
                        } else if ($this.hasClass('figure-viewer__ctrl__prev')) { // Prev Button
                            figureViewer.prev();
                        } else if ($this.hasClass('figure-viewer__ctrl__caption')) { // open / close caption Button
                            figureViewer.toggle($this.closest( '.figure-viewer__cent__right'));
                            figureViewer.toggle($('.figure-viewer__cent__left'));
                            $this.toggleClass('js-open');
                        } else if ($this.hasClass('figure-viewer__ctrl__browse')) { // browse all figures
                            figureViewer.browse($(this));
                        } else if ($this.hasClass('figure-viewer__ctrl__return')) { // browse all figures
                            figureViewer.return($(this));
                        }
                    }
                });
            });

            // preserve backward compatibility with previous buggy version - it can be removed if filterContexts would become default behavior
            if (figureViewer.options.filter) {
                $(".figure a:not(.open-figure-link)").click(function(e){
                    var $img = $(this).find("img");
                    shouldDefault = $(this).hasClass('linkBehavior');
                    if (!shouldDefault || $img.length !== 0) {
                        e.preventDefault();
                        $img.trigger("click");
                    }
                });

                $(".figure a:not(.open-figure-link) img").click(function(e){
                    e.stopPropagation();
                });
            } else {
                $(".figure a:not('.ppt-figure-link')").click(function(e){
                    var $img = $(this).find("img");
                    shouldDefault = $(this).hasClass('linkBehavior');
                    if (!shouldDefault || $img.length !== 0) {
                        e.preventDefault();
                        $img.trigger("click");
                    }
                });

                $(".figure a img").click(function(e){
                    e.stopPropagation();
                });
            }

            $('body').keydown(function (event) {
                if (event.keyCode === 37) { // left
                    figureViewer.prev();
                } else if (event.keyCode === 39) { // right
                    figureViewer.next();
                }
            });

            figureViewer.$image.on('click',function (e) {
                var img_clicked = $(e.target).is( "img" );
                if (!img_clicked) {
                    figureViewer.on.hide();
                }
            });

            figureViewer.resize();
            $(window).resize(function () {
                figureViewer.resize();
            });

            if ( figureViewer.$figures.length == 1) {
                figureViewer.$figureNav.hide();
            }

            $(".figure-viewer__ctrl__caption").focusout(function(){
                $('.figure-viewer__ctrl__close').focus();
            });
        },
        next: function () {
            // preserve backward compatibility with previous buggy version - it can be removed if filterContexts would become default behavior
            if (!figureViewer.options.filter) {
                figureViewer.$figuresToShow = figureViewer.$figures;
            }

            if (figureViewer.$currentIndex < figureViewer.$figuresToShow.length - 1) {
                if (!figureViewer.$figuresToShow.eq(figureViewer.$currentIndex + 1).closest('.figure-viewer').length) {
                    figureViewer.$currentIndex++;
                    var $next = figureViewer.$figuresToShow.eq(figureViewer.$currentIndex);
                    figureViewer.replace($next);
                    figureViewer.zoom.reset();
                }
            } else {
                figureViewer.$currentIndex = 0;
                var $next = figureViewer.$figuresToShow.eq(figureViewer.$currentIndex);
                figureViewer.replace($next);
                figureViewer.zoom.reset();
            }
        },
        prev: function () {
            // preserve backward compatibility with previous buggy version - it can be removed if filterContexts would become default behavior
            if (!figureViewer.options.filter) {
                figureViewer.$figuresToShow = figureViewer.$figures;
            }

            if (figureViewer.$currentIndex >= 1) {
                if (!figureViewer.$figuresToShow.eq(figureViewer.$currentIndex - 1).closest('.figure-viewer').length) {
                    figureViewer.$currentIndex--;
                    var $prev = figureViewer.$figuresToShow.eq(figureViewer.$currentIndex);
                    figureViewer.replace($prev);
                    figureViewer.zoom.reset();
                }
            } else {
                figureViewer.$currentIndex = figureViewer.$figuresToShow.length - 1;
                var $prev = figureViewer.$figuresToShow.eq(figureViewer.$currentIndex);
                figureViewer.replace($prev);
                figureViewer.zoom.reset();
            }
        },
        replace: function (element) {
            var $figure = element.find('img').clone();
            $figure.attr("src",$figure.attr("data-lg-src"));
            var $caption = element.find('figcaption, .figcaption').clone();
            var $title = $caption.find('strong').remove();
            $('.figure-viewer__title__text').text($title.text());
            figureViewer.$holder.find('img').remove();
            figureViewer.$holder.find('figure').append($figure);
            figureViewer.$captionHolder.empty();
            $caption = figureViewer.additionalBehaviorOnShow(element);
            figureViewer.$captionHolder.append($caption);
            figureViewer.$figureWidth = figureViewer.$holder.find('img').width();
            figureViewer.zoom.check();
        },
        browse: function (element) {
            figureViewer.$holder.addClass('is-hidden');
            figureViewer.$figureNav.addClass('is-hidden');
            figureViewer.$browsebtn.addClass('is-hidden');
            figureViewer.$returnbtn.removeClass('is-hidden');
            figureViewer.$captionRegion.removeClass('js-open');
            figureViewer.$contentRegion.removeClass('js-open');
            figureViewer.$captionRegion.addClass('is-hidden');
            figureViewer.$hideList.each(function(){$(this).addClass('is-hidden');});
            figureViewer.$lister.removeClass('is-hidden');

            $('.figure-viewer__hold__list').empty();
            // preserve backward compatibility with previous buggy version - it can be removed if filter would become default behavior
            if (figureViewer.options.filter) {
                figureViewer.$figuresToShow.each(function () {
                    var $fig = $(this).clone(true);
                    var $figureExtra = $fig.find(".figure-extra");

                    if($figureExtra.length) {
                        $figureExtra.remove();
                    }
                    $('.figure-viewer__hold__list').append($fig);
                });
            } else {
                figureViewer.$figures.each(function () {
                    if ($(this).hasClass('article__tabFigure')) {
                        var $fig = $(this).clone(true);
                        var $figureLinks = $fig.find(".figure-links");

                        if($figureLinks.length) {
                            $figureLinks.remove();
                        }
                        $('.figure-viewer__hold__list').append($fig);
                    }
                });
            }
        },
        return: function(){
            figureViewer.$holder.removeClass('is-hidden');
            figureViewer.$figureNav.removeClass('is-hidden');
            figureViewer.$browsebtn.removeClass('is-hidden');
            figureViewer.$returnbtn.addClass('is-hidden');
            //figureViewer.$contentRegion.addClass('js-open');
            figureViewer.$captionRegion.removeClass('is-hidden');
            figureViewer.$hideList.each(function(){$(this).removeClass('is-hidden');});
            figureViewer.$lister.addClass('is-hidden');
            $('.figure-viewer__hold__list').empty();
        },
        height: function (element) {
            var $windowsHeight = $(window).innerHeight();
            figureViewer.$topRegHeight = $('.figure-viewer__reg__top').innerHeight();
            var $height = $windowsHeight - figureViewer.$topRegHeight - $('.figure-viewer__caption__label').innerHeight();
            $('.figure-viewer__cent__left').find('figure').height($height);
        },
        toggle: function (element) {
            element.toggleClass('js-open');
            figureViewer.figcaptionSize(); //LIT-161818
        },
        on: {
            show: function ($this, index) {
                figureViewer.offsetY = $body.data('yoffset') || window.pageYOffset;
                $body.data('yoffset', figureViewer.offsetY);
                if (typeof(UX.controller) !== 'undefined') {
                    if ( $body.attr('data-active') !==  'slide') { // keep drop block open in publication content widget
                        UX.controller.check();
                    }
                }
                $body.attr('data-active', 'figureViewer');
                figureViewer.islocked = true;
                figureViewer.$currentIndex = index;
                figureViewer.replace($this);
                figureViewer.$focusedElementBeforeOpened = document.activeElement;
                $('.figure-viewer').show();
                $body.css('overflow', 'hidden'); // LIT-152707
                figureViewer.height();
                figureViewer.zoom.check();
                figureViewer.$holder.removeClass('is-hidden');
                figureViewer.$captionRegion.removeClass('is-hidden');
                figureViewer.$browsebtn.removeClass('is-hidden');
                figureViewer.$returnbtn.addClass('is-hidden');
                figureViewer.$figureNav.removeClass('is-hidden');
                figureViewer.$hideList.each(function(){$(this).removeClass('is-hidden');});
                figureViewer.$lister.addClass('is-hidden');
                $('.figure-viewer__ctrl__close').focus();
                if (figureViewer.options.filter) {
                    figureViewer.filter($this);
                }
            },
            hide:function () {
                if (figureViewer.islocked) {
                    $body.removeAttr('data-active');
                } else {
                    $body.removeClass('lock-screen').removeAttr('data-active');
                }
                figureViewer.zoom.reset();
                $('.figure-viewer').hide();
                figureViewer.$focusedElementBeforeOpened.focus();
                $body.css('overflow', '');// LIT-152707
                $(window).scrollTop(figureViewer.offsetY);
                $body.removeData('yoffset');
            }
        },
        additionalBehaviorOnShow: function ($el) {
            return $el.find('figcaption, .figcaption').clone();
        },
        zoom: {
            /*init: function (element) {
             var figureViewer.$section = $('.figure-viewer');
             },*/
            reset: function(){
                $elem = $('.figure-viewer').find('figure');
                $elem.panzoom('reset');
            },
            check: function(){
                figureViewer.zoom.panzoom.init();
                if ($window.width() < 992) {
                    figureViewer.zoom.swap();
                }
            },
            panzoom: { // zoom in functionality
                init: function () {
                    if (typeof($.fn.panzoom) != 'undefined'){
                        figureViewer.$image.panzoom({
                            $zoomIn: figureViewer.$zoominbtn,
                            $zoomOut: figureViewer.$zoomoutbtn,
                            $zoomRange: figureViewer.$zoomrange,
                            $reset: figureViewer.$zoomreset,
                            panOnlyWhenZoomed: true,
                            minScale: 1
                        });

                        figureViewer.$image.on('panzoomchange', function (e) {
                            if (figureViewer.$zoomrange.val() === '1' ) {
                                figureViewer.$image.css('transform', 'matrix(1, 0, 0, 1, 0, 0)');
                                $(this).removeClass('zoomed');
                            } else {
                                $(this).addClass('zoomed');
                            }
                        });
                    }
                }
            },
            swap: function () { // swap functionality for mobile devices
                figureViewer.$section.find('img').swipe({
                    //Generic swipe handler for all directions
                    swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                        if (direction === 'left' && !figureViewer.$section.find('figure').hasClass('zoomed')) {
                            figureViewer.next();
                        } else if ( direction === 'right' && !figureViewer.$section.find('figure').hasClass('zoomed')) {
                            figureViewer.prev();
                        }
                    }
                });
            }
        },
        slide: function () {
            var $target = $body.find('div.ux3-in-slide');
            $body.removeAttr('data-ux3-show');
            setTimeout(function () {
                $target.append($slide.children('div'));
                $target.removeClass('ux3-in-slide');
            }, 250);
        },
        resize: function () {
            var wHeight=  $window.innerHeight();
            if (figureViewer.isMobile) {
                $('.figure-viewer__reg__center').css('height', wHeight);
            } else {
                $('.figure-viewer__reg__center').css('height', '100%');
            }
        },
        figcaptionSize: function (){
            var $figcaption = $('.figure-viewer__hold__figcap').find('figcaption'),
                figure_area_height = $('.figure-viewer__reg__center').height(),
                figure_title_height = $('.figure-viewer__title').height() + 30,
                padding = 30;

            $figcaption.css('max-height',figure_area_height - 2*padding - figure_title_height);
        },
        doubleTap: function () { // disable double tap zooming functionality on mobile devices
            (function ($) {
                $.fn.nodoubletapzoom = function () {
                    $(this).bind('touchstart', function preventZoom(e) {
                        var t2 = e.timeStamp;
                        var t1 = $(this).data('lastTouch') || t2;
                        var dt = t2 - t1;
                        var fingers = e.originalEvent.touches.length;
                        $(this).data('lastTouch', t2);
                        if (!dt || dt > 500 || fingers > 1) {
                            return; // not double-tap
                        }
                        e.preventDefault(); // double tap - prevent the zoom
                        // also synthesize click events we just swallowed up
                        $(e.target).trigger('click');
                    });
                };
            })(jQuery);
        },
        init: function () {
            figureViewer.expand();
            figureViewer.control();
            figureViewer.doubleTap();
            $('body').nodoubletapzoom();
        }
    };


    UX.figureViewer = figureViewer; // add to global namespace

})();
