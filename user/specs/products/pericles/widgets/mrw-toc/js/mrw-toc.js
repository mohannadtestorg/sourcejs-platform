
(function () {
    var $body = $('body');

    var mrw = {
        $mrwInfo: null,
        $mrwContent: null,
        ajaxUrl: null,
        doiValue: null,
        widgetIdValue: null,
        pbContextValue: null,
        sectionHeadingValue: null,

        init: function () {
            mrw.$mrwInfo = $(".mrw-toc-meta__info");
            mrw.ajaxUrl = mrw.$mrwInfo.data('url');
            mrw.doiValue = mrw.$mrwInfo.data('doi');
            mrw.widgetIdValue = mrw.$mrwInfo.data('widgetid');
            mrw.pbContextValue = mrw.$mrwInfo.data('pbcontext');
            mrw.control();
        },

        control: function () {

            if ( $( "#nonGroupedMRWToc" ).length ) {
                var sectionHeadingValue = "";
                mrw.$mrwContent = $( "#nonGroupedMRWToc" );
                mrw.getContent(mrw.$mrwContent, sectionHeadingValue, 0);
            }


            if ( $( "#nonGroupedChapters" ).length ) {
                var sectionHeadingValue = $('#nonGroupedChapters').attr('data-sectionheading')
                mrw.$mrwContent = $( "#nonGroupedChapters" );
                mrw.getContent(mrw.$mrwContent, sectionHeadingValue, 0);
            }

            $body.on('click', '.accordion__control', function(){

                mrw.$mrwContent = $('#'+ $(this).attr('aria-controls'));

                if (!$(this).hasClass('clicked')) {
                    $(this).addClass('clicked');
                    mrw.$mrwContent = $('#'+ $(this).attr('aria-controls'));

                    if ( mrw.ajaxUrl !== 'undefined') {
                        var sectionHeadingValue = $(this).data('sectionheading');
                        mrw.getContent(mrw.$mrwContent, sectionHeadingValue, 0);
                    }
                }

            });

            $body.on('click', '.pagination a', function(e){
                var headingSectionHeight = $(this).closest('.accordion__content').prev('.accordion__control').outerHeight();
                $('body, html').animate({scrollTop:  $(this).closest('.accordion__content').offset().top -  (129 + headingSectionHeight) },300);

                if ($(this).closest('.accordion__content').length) {
                    mrw.$mrwContent = $(this).closest('.accordion__content');
                    var sectionHeadingValue = $('[aria-controls='+mrw.$mrwContent.attr('id')+']').data('sectionheading');
                } else {
                    mrw.$mrwContent = $(this).closest('#nonGroupedMRWToc');
                    var sectionHeadingValue = "";
                }


                var strtPage;

                if ( $(this).is(':empty') && $(this).hasClass( "pagination__btn--next" ) ) {
                    strtPage = (parseInt($('.pagination a.active').attr('title')) - 1 ) + 1;
                } else if ( $(this).is(':empty') && $(this).hasClass( "pagination__btn--prev" ) ) {
                    strtPage = (parseInt($('.pagination a.active').attr('title')) - 1 ) - 1;
                } else {
                    strtPage = parseInt($(this).html()) - 1;
                }

                if (mrw.ajaxUrl !== 'undefined') {
                    mrw.getContent(mrw.$mrwContent, sectionHeadingValue, strtPage);
                }

            });

        },

        getContent: function ($elem, headingValueParam, strtPage) {
            $elem.children('.inner-result-list').empty(); // Empty the div content
            $elem.children('.mrw-spinner').show(); // show spinner
            $.ajax({
                url: mrw.ajaxUrl,
                data: {
                    "doi": mrw.doiValue,
                    "widgetId": mrw.widgetIdValue,
                    "pbContext": mrw.pbContextValue,
                    "sectionHeading": headingValueParam,
                    "startPage": strtPage
                },
                type: "GET",
                success: function(data) {
                    //var data = {startPage: 0, pageSize: 20, hitsLength: 200};
                    
                    var jsonData =JSON.parse(data).search;
                    mrw.build.count($elem, jsonData);
                    $elem.children('.inner-result-list').html(jsonData.xslt);
                    mrw.build.pager($elem, jsonData);
                },
                complete: function(){
                    $('.mrw-spinner').hide(); // hide spinner
                }
            });
        },

        build: {
            count: function ($elem, data) {
                var resultFrom = 1 + (data.startPage) * (data.pageSize);
                var resultTo = data.hitsLength < resultFrom + data.pageSize -1 ? data.hitsLength : resultFrom + data.pageSize -1;
                if (data.hitsLength > data.pageSize) {
                    $elem.find('.inner-result-count').html('<div class="mrw-toc-meta__info"><span class="result__current"><b>' + resultFrom + '-' + resultTo + '</b></span><span class="result__sep"> of </span><span class="result__count"><b>' + data.hitsLength + '</b> articles</span></div>');
                }
            },

            pager: function ($elem, data) {
                if (data.hitsLength > data.pageSize){
                    var nextPageId = data.startPage +1;
                    var prevPageId = data.startPage -1;
                    var pages = parseInt(data.hitsLength / data.pageSize);

                    if (data.hitsLength % data.pageSize > 0) {
                        pages++;
                    }

                    $elem.find('.inner-result-pagination').html('<div class="pagination"></div>');

                    var $pager =  $elem.find('.pagination');

                    if (prevPageId >= 0) {
                        $pager.append('<span><a class="pagination__btn--prev" href="#"  title="Previous Page" aria-label="Previous page link"></a></span>');
                    }

                    $pager.append('<ul class="rlist--inline pagination__list"></ul>');

                    var i = 1;

                    if (pages > 1) {

                        var className = (i == data.startPage + 1 ? "active" : "");

                        $pager.find('.pagination__list').append('<li><a href="#" title=' +i + '  class=' +className + '>' + i + '</a></li>');



                        if (data.startPage >= 4 && data.startPage <= (pages - 4)) {
                            $pager.find('.pagination__list').append('<li><a> ... </a></li>');
                        }

                        i = data.startPage - 4;
                        if (i < 2) {
                            i = 2;
                        }

                        for(var r = i; r < (data.startPage + 7); r++ ){

                            var n = 6 - data.startPage;
                            var m = data.startPage - (pages - 5);

                            if (i < pages) {
                                if (data.startPage < 4) {

                                    if (i >= (data.startPage - 1) && i <= (data.startPage + n)) {
                                        className = (i == data.startPage + 1 ? "active" : "");
                                        $pager.find('.pagination__list').append('<li><a href="#" title=' + i + '  class=' + className + '>' + i + '</a></li>');
                                    }

                                } else if (data.startPage > (pages - 4)) {
                                    if (i >= (data.startPage - m) && i <= pages) {
                                        className = (i == data.startPage + 1 ? "active" : "");
                                        $pager.find('.pagination__list').append('<li><a href="#" title=' + i + '  class=' + className + '>' + i + '</a></li>');
                                        m++;
                                    }
                                } else {
                                    if (i >= data.startPage && i <= (data.startPage + 2)) {
                                        className = (i == data.startPage + 1 ? "active" : "");
                                        $pager.find('.pagination__list').append('<li><a href="#" title=' + i + '  class=' + className + '>' + i + '</a></li>');

                                    }
                                }
                                i++;
                            }

                        }

                        if (data.startPage >= 4 && data.startPage <= (pages - 4)) {
                            $pager.find('.pagination__list').append('<li><a> ... </a></li>');
                        }

                        //i = i > pages? pages : i
                        className = (i == data.startPage + 1 ? "active" : "");

                        $pager.find('.pagination__list').append('<li><a href="#" title=' +i + '  class=' +className + '>' + pages + '</a></li>');


                    }

                    if (nextPageId < pages) {
                        $pager.append('<span><a href="#" title="Next page" aria-label="Next page link" class="pagination__btn--next"></a></span>');
                    }
                }

            }
        }

    };

    UX.mrw = mrw; // add to global namespace


})();