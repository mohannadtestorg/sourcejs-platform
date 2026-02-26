(function () {
    var articleTools = {
        elm: null,
        articleNav: null,
        elmWrapper: null,

        init: function () {
            this.elm = document.querySelector(".article-tools");
            this.articleNav=  document.querySelector(".content-navigation");
            this.elmWrapper = document.querySelector(".article-tools__wrapper");
            articleTools.control();
        },
        control: function () {
            $(".article-tools__header").append($("h1").text());
            $(window).on('scroll', articleTools.on.scroll);

            $(".back-to-top").click(function(e){
                e.preventDefault();
                $('html,body').animate({
                    scrollTop: 0
                }, 700);
            })

            $('a.mendeley').on("click",function(){
                document.body.appendChild(document.createElement('script')).setAttribute('src','https://www.mendeley.com/minified/bookmarklet.js');
            });
        },
        on :{
            scroll: function(e) {
                var scrollTop = $(window).scrollTop();
                var headerHeight = $("header").outerHeight() || 0;
                var articleHeaderHeight = $(".article-header").outerHeight() || 0;
                var stickypoint =  articleHeaderHeight;

                if (scrollTop > stickypoint) {
                    if (articleTools.elm) {
                        articleTools.elm.classList.add("sticky");
                    }
                    if (articleTools.elmWrapper) {
                        articleTools.elmWrapper.style.top = (headerHeight - 1) +"px";
                    }
                    if (articleTools.articleNav) {
                        articleTools.articleNav.classList.add("js--sticky");
                    }
                }
                else {
                    if (articleTools.elm) {
                        articleTools.elm.classList.remove("sticky");
                        if (UX.dropBlock && $(".article-tools__holder").find(".js--open").length) {
                            UX.dropBlock.on.hide();
                        }
                    }
                    if (articleTools.elmWrapper) {
                        articleTools.elmWrapper.style.top = 0;
                    }
                    if (articleTools.articleNav) {
                        articleTools.articleNav.classList.remove("js--sticky");
                    }
                }
            }
        }
    };

    UX.articleTools= articleTools;
})();