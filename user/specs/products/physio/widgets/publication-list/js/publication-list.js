(function () {
    var altmetric = {
        init: function(){
            altmetric.get.altmetric();
            altmetric.control();
        },
        control: function () {
            $(".top-list__container , .featured-articles-list .featured__container ").each(function () {
                var holder = $(this);
                if (holder.find('.altmetric-embed').length && holder.find('.altmetric-embed').html().length == 0) {
                    holder.addClass('without__cover__image');
                } else {
                    holder.removeClass('without__cover__image');
                }
            } );
            $(".top-list__container , .featured-articles-list .featured__container ").bind("DOMSubtreeModified", function () {
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
                script.src = window.location.protocol + "//d1bxh8uas1mnw7.cloudfront.net/assets/embed.js";
                document.getElementsByTagName("head")[0].appendChild(script);
            }
        }
    };


    var publication_list_slider = {
        holder: '',
        items: '',
        active_item: '',
        vPort: "screen-sm",
        isMobile: false,

        init: function () {
            publication_list_slider.control();
            publication_list_slider.on.ellipsis();
        },

        control: function () {
            if ($(window).width() >= parseInt(UX.grid.screenSm)) {
                publication_list_slider.isMobile = false;
                publication_list_slider.active_item = publication_list_slider.holder.firstElementChild;
                publication_list_slider.on.build();
            } else {
                publication_list_slider.isMobile = true;
            }

            $(document).on(publication_list_slider.vPort + '-off',function(){
                publication_list_slider.isMobile = false;
                publication_list_slider.on.build();
            });
            $(document).on(publication_list_slider.vPort + '-on',function(){
                publication_list_slider.isMobile = true;
                publication_list_slider.on.distroy();
            });

            $(document).on('click', '.publication_list_slider .tab__nav li', function (e) {
                publication_list_slider.on.distroy();
                publication_list_slider.on.build();
            });
        },

        on: {
            build: function(){
                publication_list_slider.holder= document.querySelector(".featured-articles-card li.tab__pane.active .featured__container").parentNode;
                publication_list_slider.items= document.querySelectorAll(".featured-articles-card li.tab__pane.active .featured__container");
                publication_list_slider.on.ellipsis();
                if (!publication_list_slider.active_item)
                    publication_list_slider.active_item = publication_list_slider.holder.firstElementChild;
                publication_list_slider.holder.prepend(publication_list_slider.active_item.cloneNode(true));
                if (publication_list_slider.holder.querySelector(".active"))
                    publication_list_slider.holder.querySelector(".active").classList.remove("active");
                publication_list_slider.active_item.classList.add("active");

                for (var i = 0; i < publication_list_slider.items.length; i++) {
                    publication_list_slider.items[i].classList.add("prevent_link");
                }

                $(".prevent_link").on("mouseover", function (e) {
                    if (!publication_list_slider.isMobile) {
                        publication_list_slider.active_item = this;
                        publication_list_slider.convert();
                        publication_list_slider.on.ellipsis();
                        return false;
                    }
                });
            },
            distroy: function() {
                publication_list_slider.holder= document.querySelector(".featured-articles-card li.tab__pane.active .featured__container").parentNode;
                publication_list_slider.items= document.querySelectorAll(".featured-articles-card li.tab__pane.active .featured__container");
                publication_list_slider.active_item= document.querySelector(".featured-articles-card li.tab__pane.active .featured__container.active");

                if (publication_list_slider.active_item) {
                    publication_list_slider.holder.removeChild(publication_list_slider.holder.firstElementChild);
                    publication_list_slider.active_item = '';
                }
                for (var i = 0; i < publication_list_slider.items.length; i++) {
                    publication_list_slider.items[i].classList.remove("prevent_link");
                }
            },
            ellipsis: function() {
                if($('.featured__abstract').length){
                    $('.featured__abstract').truncate({
                        lines: 5
                    });
                }
            }
        },

        convert: function () {
            publication_list_slider.holder.firstElementChild.replaceWith(publication_list_slider.active_item.cloneNode(true));
            if (publication_list_slider.holder.querySelector(".active"))
                publication_list_slider.holder.querySelector(".active").classList.remove("active");
            publication_list_slider.active_item.classList.add("active");
        }

    };

    UX.publication_list_slider = publication_list_slider; // add to global namespace

    UX.altmetric = altmetric;
})();