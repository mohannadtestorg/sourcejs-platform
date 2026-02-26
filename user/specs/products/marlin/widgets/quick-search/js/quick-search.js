(function () {
    $(document).on('change', '.quick-search__dropdown', function() {
        $('input[type="hidden"][name="occurrences"]').val(this.selectedOptions[0].value);
    });
    $(document).on('click', '.quick-search__close', function(e) {
        e.preventDefault();
        UX.dropBlock.on.hide()
    });
    $(document).on('click', '.search-drawer', function(e) {
        e.preventDefault();
        UX.drawer.hide();
    });

    // override searchAutoComplete in quciksearch for marlin's products
    var searchAutoComplete = {
        delay: 100,
        source: function(request, response) {
            var q = request.term;
            if (searchCache[q] != null) {
                response(searchCache[q]);
                return;
            }
            $.ajax({
                url: $("input.autoCompleteServerURL").val(),
                dataType: "jsonp",
                data: {
                    "q": q
                },
                success: function(data) {
                    searchCache[q] = data.results;
                    response(data.results);
                    if ($(".ui-autocomplete").length > 1) {
                        $(".ui-autocomplete").first().remove();
                    }
                    if(!$(".quicksearch__suggestions").length) {
                        $(".ui-autocomplete").addClass("rlist").wrap( "<div class='quicksearch__suggestions ux3'></div>" )
                    }
                }
            });
        },
        minLength: 2,
        open: function() {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function() {
        $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    }

    $("input[name ^='searchText'].autoComplete").autocomplete(searchAutoComplete);
})();