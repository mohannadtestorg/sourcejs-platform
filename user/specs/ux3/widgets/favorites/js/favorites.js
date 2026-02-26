(function () {

    var favorites = {
        actions_select: ".favoritePublicationsOptions",
        sort_select: ".sortOptions",
        actions_activator: ".js__favActions",
        sort_activator: ".js__favSort",
        tabs_nav: '.account-tab__nav a',
        $body: $('body'),
        lastModfied: '',
        vPort: '',
        type: 'Article',


        init: function(){
            favorites.controller();
            favorites.manipulateUrl();

            favorites.additionalController();
        },
        controller: function(){
            $(favorites.actions_select).change(function() {
              favorites.fav_actions(this);
            });
            favorites.$body.on('click', favorites.actions_activator , function () {
                $(this).closest(favorites.actions_select).val($(this).data("value"));
                $(this).closest(favorites.actions_select).trigger("change");
            });

            $(favorites.sort_select).change(function() {
                favorites.fav_sort(this);
            });
            favorites.$body.on('click', favorites.sort_activator , function () {
                $(this).closest(favorites.sort_select).val($(this).data("value"));
                $(this).closest(favorites.sort_select).trigger("change");
            });

            favorites.$body.on('click', '[name="markall"]', function(e) {
                var $target = $(this).parents('form').find('tbody .table__mark'),
                    $target_input = $target.find('[type="checkbox"]'),
                    $target_jcf_span = $target.find('.jcf-checkbox'),
                    check = $(this).prop('checked');

                $target_input.prop('checked', check);
                if (check) {
                    $target_jcf_span.removeClass('jcf-unchecked');
                    $target_jcf_span.addClass('jcf-checked');
                } else {
                    $target_jcf_span.removeClass('jcf-checked');
                    $target_jcf_span.addClass('jcf-unchecked');
                }
            });

            favorites.$body.on('click', favorites.tabs_nav , function () {
                favorites.type = $(this).attr('data-type');
            });
        },
        additionalController : function () {

        },
        error_msg: function () {
            alert('Please select one publication at least');
        },
        fav_actions: function (el) {
            if(!$('input[type=checkbox][name="doi"]:checked').length){
                favorites.error_msg();
                $(el).val('');
                return;
            }

            var val = $(el).val();
            var form = $(el).parents("form");
            var action ='';
            if (!val)
                return;

            if(val == 'alert'){
                action ='/action/doUpdateAlertSettings';
                $('option[value=' + val + ']', el).val('addJournalBookAlert');
            } else if (val == 'delete'){
                action = form.attr('action');
            } else if (val == 'publicationAddJournalBookAlert') {
                action = '/action/doUpdateAlertSettings';
                $('option[value=' + val + ']', el).val('addJournalBookAlert');
                $("input[type=checkbox][name=doi]").each(function (){
                    $(this).val($(el).parent("td").attr("serialDoi"));
                });
            } else {
                action = val;
            }

            form.attr('action',action);
            var activeTab ="#" + $(el).closest("li[role='tabpanel']").attr('id');
            sessionStorage.setItem('activeTab',activeTab );
            form.get(0).submit();
        },
        fav_sort: function (el) {
            var val = $(el).val();
            if (!val)
                return;

            var action = $('[name="currentUrl"]').val();
            var form = [ '<form method="GET" action="'+ action+ '">' ];
            form.push('<input type="hidden" name="'+ 'menuTab'+ '" value="'+ 'favorites'+ '"/>');
            form.push('<input type="hidden" name="'+ 'sortBy'+ '" value="'+ val+ '"/>');
            form.push('<input type="hidden" name="'+ 'publicationSortBy'+ '" value="'+ $(".js__favSort").val()+ '"/>');
            form.push('<input type="hidden" name="'+ 'type'+ '" value="'+ favorites.type + '"/>');
            form.push('</form>');

            var activeTab ="#" + $(el).closest("li[role='tabpanel']").attr('id');
            sessionStorage.setItem('activeTab',activeTab );

            $(form.join('')).appendTo('body')[0].submit();
            form.submit();
            $(form).remove();
        },
        manipulateUrl: function () {
            var pathname = favorites.getLocationUrl();
            $('[name="href"]').val(pathname);

            var strippedPathname = favorites.stripParam(pathname,'sortBy');
            $('[name="currentUrl"]').val(strippedPathname);

            var favType = favorites.getParam(pathname, 'type');
            if (favType) {
                favorites.type = favType;
                if ($(favorites.tabs_nav + "[data-type='" + favType + "']").length) {
                    $(favorites.tabs_nav + "[data-type='" + favType + "']").trigger('click');
                }

            }
        },
        getLocationUrl: function (){
            var pathname = window.location.pathname,
                url = window.location.href,
                originalRequestUri = pathname + url.split(pathname)[1];

            return originalRequestUri;
        },
        stripParam: function (originalRequestUri,param) {
            var newPathname = '';

            var arr = originalRequestUri.split('&');
            $.each( arr, function( key, value ) {
                var indexOfParam = this.indexOf(param);

                if ( indexOfParam == 0) {
                    arr[key] = '';
                }

                newPathname += arr[key];

                if (key < arr.length-1 && indexOfParam != 0)
                    newPathname+= '&';
            });

            return newPathname;
        },
        getParam: function (originalRequestUri, param) {
            var arr = originalRequestUri.split('&');
            var type = '';

            $.each(arr, function(key, value) {
                var keyVal = this.split('=');

                if (keyVal[0] === param) {
                    type = keyVal[1];
                    return false;
                }
            });

            return type;
        }
    };

    UX.favorites = favorites; // add to global namespace
})();