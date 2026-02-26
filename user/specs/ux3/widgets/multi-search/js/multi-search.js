(function() {

    var $body = $('body'),
        $dropblock__holder,
        $multi_search;


    // get the 'data-widget-id' attribute from the current generated widget
    function getWidgetId(elem) {
        var widgetEl = elem.parents('[data-widget-id]')[0];
        var widgetId = widgetEl ? $(widgetEl).data('widget-id') : '';

        return widgetId;
    }

    // get The content attribute from the meta tag in the head
    function getPbContext() {
        var pbContext = $('[name="pbContext"]').attr('content');
        return pbContext ? pbContext : '';
    }

    var multiSearch = {
        init: function () {
            $dropblock__holder = $('.multi-search__dropblock__holder');
            //$multi_search = $('.multi-search');

            multiSearch.constrol();
        },
        constrol: function() {
            $body.on('click', '.multi-search__dropblock__holder a', function() {
                var el = $(this);

                multiSearch.set.parent(el);
                multiSearch.on.select.dropdown(el);
            });

            $body.on('click', 'a.remove-topic', function() {
                var el = $(this);
                var widgetID = getWidgetId(el);

                multiSearch.set.parent(el);
                multiSearch.topic.remove(widgetID);
            });
        },
        on: {
            select: {
               dropdown: function(elem) {
                  var tagLabel = elem.data('label');
                  var tagId = elem.data('value');
                  var widgetID = getWidgetId(elem);

                  multiSearch.topic.add(tagLabel, tagId, widgetID);
               }
            }
        },
        topic: {
            add: function(label, id, widgetID) {
                var params = {
                    'multiSearchAction': 'applyTopic',
                    'tagId': id,
                    'tagLabel': label,
                    'widgetId': widgetID
                };

                multiSearch.ajax(params);
            },
            remove: function(widgetID) {
                var params = {
                    'multiSearchAction': 'removeTopic',
                    'widgetId': widgetID
                };

                multiSearch.ajax(params);
            },
            lazyload: function() {
                $('.delayLoad').show();
                $('.lazy-load').remove();

                $('.creative-work .loa').truncate({
                    lines: 2,
                    type: 'list',
                    addClass: 'loa-height'
                });

                $('.card .creative-work .loa').truncate({
                    lines: 1,
                    type: 'list',
                    addClass: 'loa-height'
                });
            }
        },
        set: {
            parent: function(elem) {
                $multi_search = $(elem.parents('.multi-search')[0]);
            }
        },
        ajax: function(params) {
            params['pbContext'] = getPbContext();

            $.ajax({
                type: 'GET',
                url: '/pb/widgets/multiSearch/updateTopic',
                dataType: 'html',
                data: params,
                async: true,
                success: function (html) {
                    multiSearch.render(html);
                    multiSearch.topic.lazyload();
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        render: function(html) {
            $multi_search.html('');
            $multi_search.replaceWith(html);
        }
    };

    UX.multiSearch = multiSearch;

})();