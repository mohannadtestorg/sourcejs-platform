(function () {
    UX.toggle.on.build = function(){
        var $toggle = $('.facet');
        $toggle.each(function () {
            var $target = $(this).find('ul.facet__list');
            var $lis = $target.children('li');

            var $select = $(this).find('.facet__select ');
            var $options = $select.children('option');

            var lisNum = $lis.length;
            var optionsNum = $options.length;
            var isToggle = lisNum > 5;

            var moreCount = optionsNum + lisNum - 5;
            $target.closest('.facet').attr('data-more-count', moreCount);

            if (isToggle)
                $target.after('<a href="#" class="show-more">More  <i class="icon-section_arrow_d" aria-hidden="true"></i><span class="pull-right">'+ moreCount +'</span></span></a>');


            $select.each(function () {
                var mis = $(this).magicSuggest({hideTrigger:'true',allowFreeEntries:'false', expandOnFocus: true, maxSelection:1, placeholder :$(this).data('placeholder')});
                $(mis).on('selectionchange', function(e,m, selection){
                    if(selection != undefined){
                        window.location.href = selection[0].id;
                    }
                });

            })

        });
    };
    UX.toggle.on.toggle = function (elem) {
        var $toggle = elem.closest('.facet');
        var $target = $toggle.find('ul.facet__list');

        if($toggle.hasClass("Ppub-facet")) {
            if($target.hasClass('expanded')) {
                $target.scrollTop(0);
                $target.find('.js--toggle').slideUp('normal', function () {
                    $target.removeClass("expanded");
                });
            }
            else {
                $target.addClass("expanded");
                $target.find('.js--toggle').slideDown();
            }
        } else {
            $target.find('.js--toggle').slideToggle();
        }

        $toggle.find('.facet__content > .facet__select--hidden').toggle();


        elem.toggleClass('js--open');
        if (elem.hasClass('js--open')) {
            elem.html('Less <i class="icon-section_arrow_u" aria-hidden="true"></i>');
        }else {
            elem.html('More  <i class="icon-section_arrow_d" aria-hidden="true"></i><span class="pull-right">'+ $toggle.data('more-count') +'</span>');
        }

    };

})();
