(function () {
    //document.activeElement

    var $body = $('body'),
        $window = $(window);

    var loi = {
        $wrapper: null,
        $list: null,
        $loiHolder: null,
        $controls: null,
        $nextBtn: null,
        $prevBtn: null,
        $listItem: null,
        revers: false,
        isTouched: false,
        pointerPosition: 0.0,
        cumulativeShift: 0.0,
        isMobile: false,
        vPort: "screen-sm", // default responsive break point
        year: null, // holds active year
        widgetId: null, // holds widget ID
        pagecontext: null, // holds page context
        doi: null, // holds DOI
        decade: null, // holds decade range
        wrapper: $(".loi-wrapper"),
        targetPane: null,
        url: "/specs/products/physio/widgets/list-of-issues/templates/list-of-issues/ajax/2009.html",

        init: function () {
            loi.$wrapper = $('.swipe__wrapper');
            loi.$list = $('.loi__list');
            loi.$loiHolder = $('.dropBlock-loi__holder');
            loi.$controls = '<div class="loi-list__controls"><span class="loi__btn--prev"><i class="icon-arrow_l" aria-hidden="true"></i></span><span class="loi__btn--next"><i class="icon-arrow_r" aria-hidden="true"></i></span></div>';

            loi.on.build();
            loi.control();
            loi.addtionalControls();

            $window.resize(function () {
                loi.on.rebuild();
            });

            loi.on.pageLoad();

            if ($('[data-issues-group-by]').length) {
                loi.on.groupIssues();
            }

        },
        control: function () {
            loi.$list.on('click', 'a', function (e) {
                loi.$listItem = $(this);
                if (loi.$listItem.closest('.swipe__wrapper').find('.loi-list__controls').length > 0) {
                    loi.on.select();
                }
            });

            $body.on('click', '.loi__btn--prev', function () {
                loi.$prevBtn = $(this);
                loi.on.prev();
            });

            $body.on('click', '.loi__btn--next', function () {
                loi.$nextBtn = $(this);
                loi.on.next();
            });



            $body.on('click', '.tab__nav a', function () {
                var paneSlected = $(this).attr('href');
                if ($(paneSlected).hasClass('nested-tab') || true) {
                    setTimeout(function () {
                        loi.on.recalculate($(paneSlected).find('.tab__nav'));
                    }, 50);
                }
            });


            $body.on('load', function () {
                var elem = $(".loi-list__wrapper .tab__nav .active a");
                var paneSlected = elem.attr('href');
                if ($(paneSlected).hasClass('nested-tab') || true) {
                    setTimeout(function () {
                        loi.on.recalculate($(paneSlected).find('.tab__nav'));
                    }, 50);
                }
            });

            $body.on('touchmove', function (e) {
                loi.on.touch.move(e);
            });

            $(document).on(loi.vPort + '-on', function () { // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                loi.isMobile = true;
                $('.loi').addClass("loi--res"); // class will be used in our scss (to replace media queries)
                $('.loi__banner').addClass("loi--res"); // class will be used in our scss (to replace media queries)

                if ($('.corrections-container__label').length > 0) {
                    $('.corrections-container__label').addClass('w-slide__btn');
                }
            });

            $(document).on(loi.vPort + '-off', function () { // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
                loi.isMobile = false;
                $('.loi').removeClass("loi--res");
                $('.loi__banner').removeClass("loi--res");

                if ($('.corrections-container__label').length > 0) {
                    $('.corrections-container__label').removeClass('w-slide__btn');
                }
            });

            $body.on('click', '.loi__list a', function () {
                if ($(this).closest(".tab__pane").length) {
                    loi.get.activeDecade($(this));
                    loi.get.year($(this));
                } else {
                    loi.get.decade($(this));
                    loi.get.activeYear($(this));
                }
                loi.get.doi();
                loi.get.pagecontext();
                loi.get.url();
                var type = loi.wrapper.find(".dropBlock-loi__holder").attr("data-grouptype");
                if (type == "decade") {
                    if (loi.year && loi.decade && loi.pagecontext && loi.doi) {
                        loi.load.ajax();
                    }
                }
                // loi.on.groupIssues();
            })
        },
        addtionalControls:function () {

        },
        on: {
            select: function () {
                loi.$list = loi.$listItem.closest('.swipe__wrapper').find('.loi__list');
                loi.$nextBtn = loi.$listItem.closest('.swipe__wrapper').find('.loi__btn--next');
                loi.$prevBtn = loi.$listItem.closest('.swipe__wrapper').find('.loi__btn--prev');
                loi.$scroll = loi.$list.closest('.scroll');

                var thisLinkPosition = loi.$listItem.offset().left;
                var nextButtonPosition = loi.$nextBtn.offset().left;
                var prevButtonPosition = loi.$prevBtn.offset().left;

                if (thisLinkPosition > (nextButtonPosition - loi.$listItem.outerWidth())) {
                    loi.$scroll.stop().animate({
                        scrollLeft: '+=' + loi.$listItem.outerWidth()
                    }, 500, 'linear', function () {
                        loi.on.activeArrows();
                    });

                } else if (thisLinkPosition < (prevButtonPosition + loi.$prevBtn.outerWidth())) {
                    loi.$scroll.stop().animate({
                        scrollLeft: '-=' + loi.$listItem.outerWidth()
                    }, 500, 'linear', function () {
                        loi.on.activeArrows();
                    });
                }

            },
            next: function () {
                loi.$list = loi.$nextBtn.closest('.swipe__wrapper').find('.loi__list');
                loi.$prevBtn = loi.$list.closest('.loi-list__wrapper').find('.loi__btn--prev');
                loi.$scroll = loi.$list.closest('.scroll');

                var screenSize = loi.$scroll.width();
                var shiftSize = screenSize - 20; /// 3;

                if (!loi.$nextBtn.hasClass('inactive')) {
                    loi.$scroll.stop().animate({
                        scrollLeft: '+=' + shiftSize
                    }, 500, 'linear', function () {
                        loi.on.activeArrows();
                    });
                }
            },
            prev: function () {
                loi.$list = loi.$prevBtn.closest('.swipe__wrapper').find('.loi__list');
                loi.$nextBtn = loi.$list.closest('.loi-list__wrapper').find('.loi__btn--next');
                loi.$scroll = loi.$list.closest('.scroll');

                var screenSize = loi.$scroll.width();
                var shiftSize = screenSize - 20; /// 3;

                loi.$scroll.stop().animate({
                    scrollLeft: '-=' + shiftSize
                }, 500, 'linear', function () {
                    loi.on.activeArrows();
                });
            },
            touch: {
                move: function (e) {
                    if ($(e.target).closest('.loi__list').length || $(e.target).hasClass('loi__list')) {
                        loi.$list = $(e.target).closest('.loi__list');
                        loi.$wrapper = $(e.target).closest('.loi-list__wrapper');
                        loi.$nextBtn = $(e.target).closest('.loi-list__wrapper').find('.loi__btn--next');
                        loi.$prevBtn = $(e.target).closest('.loi-list__wrapper').find('.loi__btn--prev');

                        loi.on.activeArrows();
                    }
                }
            },
            escape: function () {

            },
            tab: function () {

            },
            tabRevers: function () {

            },
            activeArrows: function () {
                loi.$scroll = loi.$list.closest('.scroll');

                if (parseInt(loi.$scroll.scrollLeft()) > 0) {
                    loi.$prevBtn.removeClass('inactive');
                } else {
                    loi.$prevBtn.addClass('inactive');
                }

                var sliderSize = loi.$list.width();
                var wrapperSize = loi.$wrapper.width() + 10;

                if (parseInt(loi.$scroll.scrollLeft()) > parseInt((sliderSize - wrapperSize ))) {
                    loi.$nextBtn.addClass('inactive');
                } else {
                    loi.$nextBtn.removeClass('inactive');
                }
            },
            build: function () {
                //setTimeout(function () {
                loi.$wrapper = loi.$list.closest('.swipe__wrapper');
                loi.$wrapper.addClass('loi-list__wrapper');
                loi.$list.each(function (index) {
                    var loiListWidth = $(this).width();
                    if (loiListWidth > loi.$wrapper.width()) {
                        $(this).closest('.swipe__wrapper').prepend(loi.$controls);
                    }
                    $('.loi__btn--prev').addClass('inactive');
                });
                //}, 250);

                loi.$nextBtn = $('.loi__btn--next');
                loi.$prevBtn = $('.loi__btn--prev');

                if ($('.journal-home').length) {
                    loi.vPort = "screen-md";
                }
            },
            rebuild: function () {
                $('.loi-list__controls').remove();
                loi.$list = $('.loi__list');
                loi.$list.each(function (index) {
                    var loiListWidth = $(this).width();

                    if (loiListWidth > loi.$wrapper.width()) {
                        $(this).closest('.swipe__wrapper').prepend(loi.$controls);
                        $('.loi__btn--prev').addClass('inactive');
                    } else {
                        $(this).closest('.swipe__wrapper').find('.loi-list__controls').remove();
                    }
                });
            },
            recalculate: function (elem) {
                elem.each(function () {
                    var tabNavWidth = 0;
                    $(this).find('li').each(function (index) {
                        tabNavWidth += $(this).width();
                    });
                    $(this).width(tabNavWidth);
                    loi.$wrapper = $(this).closest('.swipe__wrapper').addClass('loi-list__wrapper');

                    if (tabNavWidth > loi.$wrapper.width()) {
                        // elem.closest('.swipe__wrapper').prepend(loi.$controls);
                        // $('.loi__btn--prev').addClass('inactive');
                        elem.closest('.loi__btn--prev').addClass('inactive');
                    } else {
                        elem.closest('.swipe__wrapper').find('.loi-list__controls').remove();
                    }
                });

            },

            pageLoad: function () {
                var qs = window.location.search.substr(1);
                var qsParams = {};
                qs.split('&').map(function (param) {
                    var keyVal = param.split('=');
                    qsParams[keyVal[0]] = keyVal[1];
                });

                loi.$loiHolder.each(function (index, elem) {
                    var groupType = $(elem).attr('data-grouptype');
                    var $loiBanner = $(elem).prev('.loi__banner-list');

                    if (qsParams.year) {
                        if (groupType === 'decade') {
                            var $yearElem = $('[data-expand=' + qsParams.year + ']', elem);
                            if ($yearElem.length) {
                                var decadeElemId = $yearElem.closest('li[role=tabpanel]').attr('id');
                                var $decadeElem = $('a[href$=#' + decadeElemId + ']', elem);
                                $('.loi__archive', $loiBanner).trigger('click');
                                if ($decadeElem.length) {
                                    $decadeElem.trigger('focus').trigger('click');
                                }
                                setTimeout(function () {
                                    $yearElem.trigger('focus').trigger('click');
                                }, 100);
                            }
                        } else if (groupType === 'year') {
                            $('.loi__archive', $loiBanner).trigger('click');
                            $('[data-expand=' + qsParams.year + ']', elem).trigger('focus').trigger('click');
                        }
                    }

                    if (qsParams.volume) {
                        if (groupType === 'volume') {
                            $('.loi__archive', $loiBanner).trigger('click');
                            $('[data-expand=' + qsParams.volume + ']', elem).trigger('click');
                        }
                    }
                });


            },

            groupIssues: function () {
                var issuesGroups = $('ul[data-issues-group-by]');
                issuesGroups.each(function () {
                    var issuesGroup = $(this);
                    issuesGroup.find("li[data-cover-date]").each(function () {
                        var issue = $(this);
                        var coverDate = issue.data("cover-date");

                        if (!issuesGroup.find(".parent__group__container").length)
                            var parent = $( "<li class='parent__group__container'></li>" ).appendTo( issuesGroup );

                        if (!$( "ul[data-month-group='"+coverDate+"']" ).length)
                            $( "<ul class='col-xs-12 col-sm-12 col-md-6 col-lg-4' data-month-group='"+coverDate+"'><li><p class='tab__item__title'>"+coverDate+"</p></li></ul>" ).appendTo( issuesGroup.find(".parent__group__container") );

                        if (!$( "ul[data-month-group='"+coverDate+"'] li[data-cover-date='"+coverDate+"']" ).length)
                            $(issue).appendTo( $("ul[data-month-group='"+coverDate+"']") );
                    });
                });
            }


        },
        load: {
            ajax: function () {
                if ($(loi.targetPane).is(':empty') || $(loi.targetPane).children("ul").is(':empty')) {
                    $(loi.targetPane).addClass("loading");
                    $(loi.targetPane).load(loi.url, function (response, status, xhr) {
                        if (status == "error") {
                            var msg = "Sorry but there was an error: ";
                            console.log(msg + xhr.status + " " + xhr.statusText + "==========" + loi.url);
                        }
                        $(loi.targetPane).removeClass("loading");
                    });
                }
            }
        },
        get: {
            year: function (element) { // get year from selected
                loi.year = element.find("span").text();
                loi.targetPane = element.attr("href");
            },
            activeDecade: function (element) { // get active decade based on selected element
                var parent = element.closest(".tab__pane").attr("aria-labelledby");
                loi.decade = $("#" + parent).find("span").text();
            },
            decade: function (element) { // get decade from selected
                loi.decade = element.find("span").text();
            },
            activeYear: function (element) { // get active year based in selected element
                var child = element.attr("href");
                loi.year = $(child).find(".loi__list").find(".active").find("span").text();
                loi.targetPane = $(child).find(".loi__list").find(".active").find("a").attr("href");
            },
            url: function () {
                loi.widgetId = $(".loi-wrapper").attr("data-db-parent-of"), //get widget ID
                    loi.url = "/pb/widgets/loi/loiAjax?widgetId=" + loi.widgetId + "&pbContext=" + loi.pagecontext + "&doi=" + loi.doi + "&decadeRange=" + loi.decade + "&yearParam=" + loi.year; // group all needed parameters
            },
            doi: function () {
                loi.doi = loi.wrapper.attr("data-journal-doi");
            },
            pagecontext: function () {
                loi.pagecontext = encodeURI($("[name='pbContext']").attr("content")); // get page context
            }
        },
        check: {

            viewPort: function () {
                $('.loi').each(function () {
                    if ($(this).attr('data-ctrl-res')) {
                        loi.vPort = $(this).attr('data-ctrl-res');
                    }
                });
            }
        }
    }

    UX.loi = loi; // add to global namespace
})();
