(function () {
    var article = {
        body: $("body"),
        upperWrapper : $(".article__tos__upper"),
        bottomWrapper: $(".article__tos__bottom"),
        topSectrions: $("article section > h2.top"),
        BottomSectrions: $("article section > h2.bottom"),
        ismobile: false,
        tosAnchors: null,
        articleTos: null,
        adPlaceholders: null,
        space: 20,
        tOffset: 350,
        scrollToOffset: 300,
        headerHeight: null,
        articleToolsHeight: null,


        init: function () {
            this.articleTos = document.querySelector(".article__tos");
            this.adPlaceholders = document.querySelector(".adplaceholders");
            article.fill.top();
            article.fill.bottom();
            this.headerHeight= $(".header").outerHeight() || 0;
            this.articleToolsHeight = $(".article-tools.sticky .article-tools__wrapper").outerHeight() || 0;

            article.tosHeight();
            article.control();
            article.check();
        },
        control: function () {
            $(window).on("scroll", article.on.scroll);

            if (article.tosAnchors != null) {
                article.tosAnchors.each(function () {
                    $(this).on('click', function (e) {
                        e.preventDefault();
                        article.scroll($(this), this.hash);
                    });
                })
            }

        },
        tosHeight: function() {
            $( article.articleTos ).css("height", $(window).height() - article.headerHeight - article.articleToolsHeight - 40);
        },
        fill: {
            top: function () {
                if (article.upperWrapper.length && article.topSectrions.length) {
                    article.topSectrions.each(function () {
                        var $this = $(this);
                        var li = $('<li/>')
                            .attr('role', 'menuitem')
                            .appendTo(article.upperWrapper);
                        var link = $('<a class="w-slide__hide"/>')
                            .attr('href',"#" + $this.attr('id'))
                            .appendTo(li);
                        var spaner = $('<span/>')
                            .text($(this).text())
                            .appendTo(link);
                    });
                    article.upperWrapper.removeClass("hidden");
                    article.tosAnchors = $(".article__tos a");
                }
            },
            bottom: function () {
                if (article.bottomWrapper.length && article.BottomSectrions.length) {
                    article.BottomSectrions.each(function () {
                        var $this = $(this);
                        var li = $('<li/>')
                            .attr('role', 'menuitem')
                            .appendTo(article.bottomWrapper);
                        var link = $('<a class="w-slide__hide"/>')
                            .attr('href',"#" + $this.attr('id'))
                            .appendTo(li);
                        var spaner = $('<span/>')
                            .text($(this).text())
                            .appendTo(link);
                    });
                    article.bottomWrapper.removeClass("hidden");
                    article.tosAnchors = $(".article__tos a");
                }
            }
        },
        check: function () {
            var scrollPos = $(document).scrollTop();
            if (article.tosAnchors != null) {
                article.tosAnchors.each(function () {
                    var currLink = $(this);
                    var refElement = $(currLink.attr("href"));
                    if (typeof refElement === 'undefined' || refElement === null) {
                        var refElementPos = refElement.position();
                        if (refElementPos.top <= scrollPos - article.tOffset && refElement.position().top + refElement.parent().outerHeight(true) > scrollPos - article.tOffset) {
                            $('#menu-center ul li a').removeClass("js--active");
                            currLink.addClass("js--active");
                        }
                        else{
                            currLink.removeClass("js--active");
                        }
                    }
                });
            }
        },
        scroll: function ($this,hash) {
            $(document).off("scroll");
            if (article.tosAnchors != null) {
                article.tosAnchors.each(function () {
                    $this.removeClass('active');
                })
            }
            $this.addClass('active');

            var target = hash,
                menu = target;
            $target = $(target);
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - article.scrollToOffset
            }, 500, 'swing', function () {
                addHashToUrl(target)
            });
        },
        on: {
            scroll: function() {
                article.check();

                article.headerHeight = $(".header").outerHeight() || 0;
                article.articleToolsHeight = $(".article-tools.sticky .article-tools__wrapper").outerHeight() || 0;
                var scrollTop = $(window).scrollTop();
                var articleHeaderTop =  $(".article-header").position() ? $(".article-header").position().top : 0;
                var articleHeaderHeight = $(".article-header").outerHeight(true) || 0;
                var stickypoint = articleHeaderTop + articleHeaderHeight - article.headerHeight - article.articleToolsHeight;

                var footerTop = $(".footer").offset().top;
                var windowHeight = $(window).height();
                var windowBottom = scrollTop + windowHeight;

                if (scrollTop > stickypoint) {
                    if (article.articleTos) {
                        article.articleTos.classList.add("js--sticky");
                        if (windowBottom < footerTop ) {
                            article.articleTos.style.position = 'fixed';
                            article.articleTos.style.top = (article.headerHeight + article.articleToolsHeight + article.space) + "px";
                            article.articleTos.style.bottom = 'auto';
                        }
                        else {
                            article.articleTos.style.position = 'absolute';
                            article.articleTos.style.top = 'auto';
                            article.articleTos.style.bottom = (article.space) + "px";
                        }
                        article.tosHeight();                        
                    }
                    if (article.adPlaceholders) {
                        article.adPlaceholders.classList.add("js--sticky");
                        if (windowBottom < footerTop ) {
                            article.adPlaceholders.style.position = 'fixed';
                            article.adPlaceholders.style.top = (article.headerHeight + article.articleToolsHeight) + "px";
                            article.adPlaceholders.style.bottom = 'auto';
                        }
                        else {
                            article.adPlaceholders.style.position = 'absolute';
                            article.adPlaceholders.style.top = 'auto';
                            article.adPlaceholders.style.bottom = (article.space) + "px";
                        }
                    }
                }
                else {
                    if (article.articleTos) {
                        article.articleTos.classList.remove("js--sticky");
                        article.articleTos.style.position = 'absolute';
                        article.articleTos.style.top = 0;
                        article.articleTos.style.botom = 'auto';
                        article.tosHeight();
                    }
                    if (article.adPlaceholders) {
                        article.adPlaceholders.classList.remove("js--sticky");
                        article.adPlaceholders.style.position = 'absolute';
                        article.adPlaceholders.style.top = 0;
                        article.adPlaceholders.style.bottom = 'auto';
                    }
                }
            }
        }
    };

    /**
     * Add hash to url without scrolling
     *
     * @param String $url - it could be hash or url with hash
     *
     * @return void
     */
    function addHashToUrl($url)
    {
        if ('' == $url || undefined == $url) {
            $url = '_'; // it is empty hash because if put empty string here then browser will scroll to top of page
        }
        $hash = $url.replace(/^.*#/, '');
        var $fx, $node = jQuery('#' + $hash);
        if ($node.length) {
            $fx = jQuery('<div></div>')
                .css({
                    position:'absolute',
                    visibility:'hidden',
                    top: jQuery(window).scrollTop() + 'px'
                })
                .attr('id', $hash)
                .appendTo(document.body);
            $node.attr('id', '');
        }
        document.location.hash = $hash;
        if ($node.length) {
            $fx.remove();
            $node.attr('id', $hash);
        }
    }

    UX.article = article; // add to global namespace

})();

