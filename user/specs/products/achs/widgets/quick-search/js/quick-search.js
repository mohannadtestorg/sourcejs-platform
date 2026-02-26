(function () {
    $.fn.quickSearch = function () {
        return $(this).each(function () {
            // variables
            var $body = $quickSearch = $allField_input = $journals_select = $mobileIcon = $opendClass = $alert_message = $defaultButton = $citationButton ="";

            $body = $("body");
            $quickSearch = $(this);
            $allField_input = $(this).find(".quick-search_all-field");
            $journals_select = $(this).find(".quick-search_journals-select");
            $mobileIcon = $(this).find(".quick-search_mobile-icon");
            $defaultButton = $(this).find(".quick-search_default button");
            $citationButton = $(this).find(".quick-search_citation button");
            $opendClass = "quick-search_opened";
            $alert_message = "Please enter search terms before running your search.";

            $mobileIcon.on("click",function (e) {
                e.preventDefault();
                if($quickSearch.hasClass($opendClass)) {
                    $quickSearch.removeClass($opendClass);
                }
                else {
                    $quickSearch.addClass($opendClass);
                }
            });

            $allField_input.on("click",function () {
                $quickSearch.addClass($opendClass);
            });

            $defaultButton.on("click", function (e) {
                if($allField_input.val() == "") {
                    e.preventDefault();
                    alert($alert_message);
                }
            });

            $citationButton.on("click", function (e) {
                if($journals_select.val() == "") {
                    e.preventDefault();
                    alert($alert_message);
                }
            });

            $body.on("click",function (e) {
                if(!$(e.target).hasClass("quick-search") &&
                    !$(e.target).parents(".quick-search").length &&
                    !$(e.target).parents(".jcf-select-drop").length) {

                    $quickSearch.removeClass($opendClass);
                }
            });

            $(document).keyup(function(e) {
                if (e.keyCode === 27) {
                    $quickSearch.removeClass($opendClass);
                }
            });

        });
    };
})();