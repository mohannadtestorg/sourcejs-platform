$(window).on('load', function () {
    $('.article-sections a').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

            var scrollTop = 0;
            if ($("nav.stickybar.coolBar").length > 0) {
                var scrollTop = target.offset().top - $("header.header").height() - $("nav.stickybar.coolBar>div.stickybar__wrapper").height();
            } else {
                var scrollTop = target.offset().top - $("header.header").height();
            }
            if (target.length) {
                $('html,body').animate({
                    scrollTop: scrollTop
                }, 500);
                return false;
            }
        }
    });

    if ( $('.to-section').length ) {
        var scrollPoints = [];
        $('.sections__drop').html('');
        $('.to-section').each(function () {
            var section = $(this).text();
            var id = $(this).attr("id");
            if ($(this).hasClass('to-section-collapse')) {
                $('<li role="menuitem"><div class="accordion"><a href="#" title="' + section + '" aria-expanded="false" aria-controls="' + id + '" class="accordion__control w-slide__hide"><span>'+section+'</span> <i aria-hidden="true" class="icon-section_arrow_d"></i></a><div id="' + id + '" class="accordion__content" style="display: none;"><ul class="rlist"></ul></div></div></li>').appendTo('.sections__drop');
            } else if($(this).data('main-section')) {
                var parent_collapse = $(this).data("main-section")
                $(parent_collapse).find("ul").append($('<li role="menuitem"><a class="w-slide__hide" href="#'+ id +'"><span>'+section+'</span></a></li>'));
            } else {
                $('<li role="menuitem"><a class="w-slide__hide" href="#'+ id +'"><span>'+section+'</span></a></li>').appendTo('.sections__drop');
            }

            if ($(this).hasClass('to-section-collapse') == false) {
                scrollPoints.push($(this));
            }

        });

        $(window).scroll(function () {
            $.each(scrollPoints, function( index, value ) {

                if ($(window).scrollTop() >= value.offset().top - 18) {
                    var id = value.attr('id');
                    $('.sections__drop a.active').removeClass("active");
                    $('.sections__drop a[href="#' + id + '"]').addClass("active");
                }
            });

        });
    }else {
        $('.toc-go-section').remove();
    }
});