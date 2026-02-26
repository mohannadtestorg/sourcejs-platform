
UX.basicMetadata.on.build=function(){

    //initialize jqueru ui autocomplete
    var $autocomplete=$(UX.basicMetadata.container).find(".ux3-autocomplete");

    if (typeof $autocomplete.autocomplete !== 'undefined') {
        $autocomplete.autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: "https://jsonplaceholder.typicode.com/posts",
                    dataType: "json",
                    data: {
                        query: request.term
                    },
                    success: function (data) {
                        response($.map(data, function (el) {
                            return {
                                label: el.title,
                                value: el.title,
                                id: el.id
                            };
                        }));
                    }
                });
            },
            minLength: 2,
            open: function () {
                $(".ui-menu.ui-autocomplete").width($(this).innerWidth());
            },
            select: function (event, ui) {
                UX.basicMetadata.$submittedInput.val(ui.item.id);
            }
        });
    }
}