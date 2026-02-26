(function () {
    var $section = $('.table-viewer'),
        $window = $(window),
        $document = $(document),
        $body = $('body');

    var tableViewer = {
        $topRegHeight : $('.table-viewer__reg__top').innerHeight(),
        vPort: "screen-md",
        $tables: $(document).find('.article-table-content'),
        $tableWidth: null,
        $currentIndex: null,
        $focusedElementBeforeOpened: null,
        $section: $section,
        $holder: $section.find('.table-viewer__hold__tbl'),
        $captionHolder: $section.find('.table-viewer__hold__tblcap'),
        $lister: $section.find('.table-viewer__hold__list'),
        $captionRegion: $section.find('.table-viewer__caption_area'),
        $contentRegion: $section.find('.table-viewer__cent__left'),
        $tableNav: $section.find('.table-viewer__ctrl__next, .table-viewer__ctrl__prev'),
        $zoominbtn: $section.find('.zoom-in'),
        $zoomoutbtn: $section.find('.zoom-out'),
        $zoomrange: $section.find('.zoom-range'),
        $zoomreset: $section.find('.reset'),
        $tbl: $section.find('div.holder'),
        $browsebtn: $('.table-viewer__ctrl__browse'),
        $returnbtn: $('.table-viewer__ctrl__return'),
        isMobile: false,
        islocked: false,
        offsetY: window.pageYOffset,
        $hideList: $('.tblZoomSlider, .table-viewer__label__zoom'),
        expand: function () {
            tableViewer.$tables = $document.find('.article-table-content'),
                tableViewer.$tables.each(function (index) {
                    var $this = $(this);
                    $this.on({
                        click: function (event) {
                            event.preventDefault();
                            if (!$this.hasClass('ui-disabled') && !$this.closest('.table-viewer__hold__tbl').length && $('.table-viewer').length) {
                                tableViewer.on.show($this, index);
                            }
                        }
                    });
                });
        },
        control: function () {

            $(document).on(tableViewer.vPort + '-on',function(){ // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                tableViewer.isMobile = true;
            });

            $(document).on(tableViewer.vPort + '-off',function(){ // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
                tableViewer.isMobile = false;
            });

            var $tableViewer = $body.find('.table-viewer');
            var $controllerElement = $tableViewer.find('a, button');

            $controllerElement.each(function () {
                var $this = $(this);
                $this.on({
                    click: function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        if ($this.hasClass('table-viewer__ctrl__close')) { // close button
                            tableViewer.on.hide();
                        } else if ($this.hasClass('table-viewer__ctrl__next')) { // Next button
                            tableViewer.next();
                        } else if ($this.hasClass('table-viewer__ctrl__prev')) { // Prev Button
                            tableViewer.prev();
                        } else if ($this.hasClass('table-viewer__ctrl__caption')) { // open / close caption Button
                            tableViewer.toggle($( '.table-viewer__caption_area'));
                            tableViewer.toggle($('.table-viewer__reg__top'));
                            tableViewer.toggle($('.table-viewer__cent__left'));
                            $(".table-viewer__ctrl__caption").not('.reversed').toggleClass('js-open');
                        } else if ($this.hasClass('table-viewer__ctrl__browse')) { // browse all figures
                            tableViewer.browse($(this));
                        } else if ($this.hasClass('table-viewer__ctrl__return')) { // browse all figures
                            tableViewer.return($(this));
                        }
                    }
                });
            });

            $(".article-table-content a").click(function(e){
              var $img = $(this).find("img");
              shouldDefault = $(this).hasClass('linkBehavior');
              if (!shouldDefault || $img.length !== 0) {
                  e.preventDefault();
                  $img.trigger("click");
              }
            });



            $('body').keydown(function (event) {
                if (event.keyCode === 37) { // left
                    tableViewer.prev();
                } else if (event.keyCode === 39) { // right
                    tableViewer.next();
                }
            });

            tableViewer.$tbl.on('click',function (e) {
                var tbl_clicked = $(e.target).is( ".article-table-content" );
                if(!tbl_clicked) {
                    tableViewer.on.hide();
                }
            });

            tableViewer.resize();
            $(window).resize(function () {
                tableViewer.resize();
            });

            if ( tableViewer.$tables.length == 1) {
                tableViewer.$tableNav.hide();
            }

            $(".table-viewer__ctrl__caption").focusout(function(){
                $('.table-viewer__ctrl__close').focus();
            });
        },
        next: function () {
            if (tableViewer.$currentIndex < tableViewer.$tables.length - 1) {
                if (!tableViewer.$tables.eq(tableViewer.$currentIndex + 1).closest('.table-viewer').length) {
                    tableViewer.$currentIndex++;
                    var $next = tableViewer.$tables.eq(tableViewer.$currentIndex);
                    tableViewer.replace($next);
                    tableViewer.zoom.reset();
                }
            } else {
                tableViewer.$currentIndex = 0;
                var $next = tableViewer.$tables.eq(tableViewer.$currentIndex);
                tableViewer.replace($next);
                tableViewer.zoom.reset();
            }
        },
        prev: function () {
            if (tableViewer.$currentIndex >= 1) {
                if (!tableViewer.$tables.eq(tableViewer.$currentIndex - 1).closest('.table-viewer').length) {
                    tableViewer.$currentIndex--;
                    var $prev = tableViewer.$tables.eq(tableViewer.$currentIndex);
                    tableViewer.replace($prev);
                    tableViewer.zoom.reset();
                }
            } else {
                tableViewer.$currentIndex = tableViewer.$tables.length - 1;
                var $prev = tableViewer.$tables.eq(tableViewer.$currentIndex);
                tableViewer.replace($prev);
                tableViewer.zoom.reset();
            }
        },
        replace: function (element) {
            var $table = element.clone();
            var $caption = element.prev('header').clone();
            var $title = $caption.find('.table-caption__label').remove();
            $('.table-viewer__title__text').text($title.text());
            tableViewer.$holder.find('.article-table-content').remove();
            tableViewer.$holder.find('div.holder').append($table);
            tableViewer.$captionHolder.empty();
            tableViewer.$captionHolder.append($caption);
            tableViewer.$tableWidth = tableViewer.$holder.find('div.holder').width();
            tableViewer.zoom.check();
        },
        browse: function (element) {
            tableViewer.$holder.addClass('is-hidden');
            tableViewer.$tableNav.addClass('is-hidden');
            tableViewer.$browsebtn.addClass('is-hidden');
            tableViewer.$returnbtn.removeClass('is-hidden');
            tableViewer.$captionRegion.removeClass('js-open');
            tableViewer.$contentRegion.removeClass('js-open');
            tableViewer.$captionRegion.addClass('is-hidden');
            tableViewer.$hideList.each(function(){$(this).addClass('is-hidden');});
            tableViewer.$lister.removeClass('is-hidden');

            $('.table-viewer__hold__list').empty();
            tableViewer.$tables.each(function () {
                if ($(this).hasClass('article-table-content')) {
                    var $tbl = $(this).clone(true);

                    var $tableExtra = $tbl.find(".table-extra");

                    if($tableExtra.length) {
                        $tableExtra.remove();
                    }

                    $('.table-viewer__hold__list').append($tbl);
                }
            });
        },
        return: function(){
            tableViewer.$holder.removeClass('is-hidden');
            tableViewer.$tableNav.removeClass('is-hidden');
            tableViewer.$browsebtn.removeClass('is-hidden');
            tableViewer.$returnbtn.addClass('is-hidden');
            //tableViewer.$contentRegion.addClass('js-open');
            tableViewer.$captionRegion.removeClass('is-hidden');
            tableViewer.$hideList.each(function(){$(this).removeClass('is-hidden');});
            tableViewer.$lister.addClass('is-hidden');
            $('.table-viewer__hold__list').empty();
        },
        height: function (element) {
            var $windowsHeight = $(window).innerHeight();
            tableViewer.$topRegHeight = $('.table-viewer__reg__top').innerHeight();
            var $height = $windowsHeight - tableViewer.$topRegHeight - $('.table-viewer__caption__label').innerHeight();
            $('.table-viewer__cent__left').find('div.holder').height($height);
        },
        toggle: function (element) {
            element.toggleClass('js-open');
            tableViewer.tblcaptionSize(); //LIT-161818
        },
        on: {
            show: function ($this, index) {
                tableViewer.offsetY = $body.data('yoffset') || window.pageYOffset;
                $body.data('yoffset', tableViewer.offsetY);
                if (typeof(UX.controller) !== 'undefined') {
                    if ( $body.attr('data-active') !==  'slide') { // keep drop block open in publication content widget
                        UX.controller.check();
                    }
                }
                $body.attr('data-active', 'tableViewer');
                tableViewer.islocked = true;
                tableViewer.$currentIndex = index;
                tableViewer.replace($this);
                tableViewer.$focusedElementBeforeOpened = document.activeElement;
                $('.table-viewer').show();
                $body.css('overflow', 'hidden'); // LIT-152707
                tableViewer.height();
                tableViewer.zoom.check();
                tableViewer.$holder.removeClass('is-hidden');
                tableViewer.$captionRegion.removeClass('is-hidden');
                tableViewer.$browsebtn.removeClass('is-hidden');
                tableViewer.$returnbtn.addClass('is-hidden');
                tableViewer.$tableNav.removeClass('is-hidden');
                tableViewer.$hideList.each(function(){$(this).removeClass('is-hidden');});
                tableViewer.$lister.addClass('is-hidden');
                $('.table-viewer__ctrl__close').focus();

            },
            hide:function () {
                if (tableViewer.islocked) {
                    $body.removeAttr('data-active');
                } else {
                    $body.removeClass('lock-screen').removeAttr('data-active');
                }
                tableViewer.zoom.reset();
                $('.table-viewer').hide();
                tableViewer.$focusedElementBeforeOpened.focus();
                $body.css('overflow', '');// LIT-152707
                $(window).scrollTop(tableViewer.offsetY);
                $body.removeData('yoffset');
            }
        },
        zoom: {
            /*init: function (element) {
             var tableViewer.$section = $('.table-viewer');
             },*/
            reset: function(){
                $elem = $('.table-viewer').find('div.holder');
                $elem.panzoom('reset');
            },
            check: function(){
                tableViewer.zoom.panzoom.init();
                if ($window.width() < 992) {
                    tableViewer.zoom.swap();
                }
            },
            panzoom: { // zoom in functionality
                init: function () {
                    if (typeof($.fn.panzoom) != 'undefined'){
                        tableViewer.$tbl.panzoom({
                            $zoomIn: tableViewer.$zoominbtn,
                            $zoomOut: tableViewer.$zoomoutbtn,
                            $zoomRange: tableViewer.$zoomrange,
                            $reset: tableViewer.$zoomreset,
                            panOnlyWhenZoomed: true,
                            minScale: 1
                        });

                        tableViewer.$tbl.on('panzoomchange', function (e) {
                            if(tableViewer.$zoomrange.val() === '1' ) {
                                tableViewer.$tbl.css('transform', 'matrix(1, 0, 0, 1, 0, 0)');
                                $(this).removeClass('zoomed');
                            } else {
                                $(this).addClass('zoomed');
                            }
                        });
                    }
                }
            },
            swap: function () { // swap functionality for mobile devices
                tableViewer.$section.find('img').swipe({
                    //Generic swipe handler for all directions
                    swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                        if (direction === 'left' && !tableViewer.$section.find('.article-table-content').hasClass('zoomed')) {
                            tableViewer.next();
                        } else if ( direction === 'right' && !tableViewer.$section.find('.article-table-content').hasClass('zoomed')) {
                            tableViewer.prev();
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
            if (tableViewer.isMobile) {
                $('.table-viewer__reg__center').css('height', wHeight);
            } else {
                $('.table-viewer__reg__center').css('height', '100%');
            }
        },
        tblcaptionSize: function (){
            var $tblcaption = $('.table-viewer__hold__tblcap').find('tblcaption'),
                table_area_height = $('.table-viewer__reg__center').height(),
                table_title_height = $('.table-viewer__title').height() + 30,
                padding = 30;

            $tblcaption.css('max-height',table_area_height - 2*padding - table_title_height);
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
            tableViewer.expand();
            tableViewer.control();
            tableViewer.doubleTap();
            $('body').nodoubletapzoom();
        }
    };


    UX.tableViewer = tableViewer; // add to global namespace

})();
