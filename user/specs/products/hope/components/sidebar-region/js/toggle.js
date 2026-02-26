(function () {
    var $body = $('body'),
        $document = $(document);


    var sidebarToggle = {


        init: function () {

            sidebarToggle.on.build();
            sidebarToggle.control();
        },
        control: function () {
            $body.find('.sidebar-region__wrapper .show-more').off();
            $body.on('click', '.sidebar-region__wrapper .show-more', function (e) {
                e.preventDefault();
                sidebarToggle.on.sidebarToggle($(this));

            });
            $body.find('.sidebar-region .facet__list .dropdown__toggle').off();
            $body.on('click', '.sidebar-region .facet__list .dropdown__toggle', function (e) {
                e.preventDefault();
                sidebarToggle.on.toggleSidebar($(this));

            });
        },
        on: {
            build: function () {
                var $sidebarToggle = $('.sidebar-region__wrapper');
                $sidebarToggle.each(function () {
                    var $target = $(this).find('ul.sidebar-region__list');
                    var $lis = $target.children('li');

                    var $select = $(this).find('.sidebar-region__select ');
                    var $options = $select.children('option');

                    var lisNum = $lis.length;
                    var optionsNum = $options.length;
                    var isToggle=false;
                    var moreCount=-1;
                    var showedItems= $(this).find('.showed-items').val()

                    if(showedItems){
                         isToggle = lisNum > showedItems;
                         moreCount = optionsNum + lisNum - showedItems;
                    }

                    $target.closest('.sidebar-region__wrapper').attr('data-more-count', moreCount);

                    if (isToggle)
                        $target.after('<span href="#" class="show-more">More  <i class="icon-section_arrow_d" aria-hidden="true"> </i><span class="pull-right">'+ moreCount +'</span></a>');
                        $target.find('li:gt('+(showedItems-1)+')').addClass('js--toggle');

                    $select.each(function () {
                        var mis = $(this).magicSuggest({hideTrigger:'true',allowFreeEntries:'false', expandOnFocus: true, maxSelection:1, placeholder :$(this).data('placeholder')});
                        $(mis).on('selectionchange', function(e,m, selection){
                            if(selection != undefined){
                                window.location.href = selection[0].id;
                            }
                        });

                    })

                });
            },
            sidebarToggle: function (elem) {
                var $sidebarToggle = elem.closest('.sidebar-region__wrapper');
                var $target = $sidebarToggle.find('ul.sidebar-region__list');

                $target.find('.js--toggle').toggle();
                $sidebarToggle.find('.sidebar-region__select--hidden').toggle();


                elem.toggleClass('js--open');
                if (elem.hasClass('js--open')) {
                    elem.html('Less <i class="icon-section_arrow_u" aria-hidden="true"></i>');
                }else {
                    elem.html('More  <i class="icon-section_arrow_d" aria-hidden="true"></i><span class="pull-right">'+ $sidebarToggle.data('more-count')+'</span>');
                }

            },
            toggleSidebar: function (elem) {
                var $sidebarToggle = elem.closest('li');
                var $target = $sidebarToggle.children('ul.facet-dropdown__menu').toggle();

                elem.toggleClass('js--open');
                elem.find('i').toggleClass('icon-add_box icon-squared-minus');

                if (elem.hasClass('js--open')) {
                    $target.attr('aria-hidden', false);
                }else {
                    $target.attr('aria-hidden', true);
                }

            }
        }
    };

    UX.sidebarToggle = sidebarToggle; // add to global namespace
})();







