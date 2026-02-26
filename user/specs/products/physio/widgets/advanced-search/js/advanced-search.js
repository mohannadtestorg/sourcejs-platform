(function () {
    var $body = $('body'),
        isMobile = false;

     UX.searchFieldsCtrl.click.toggleSearchBlock = function () {
         $body.on('click', '.search-result__meta__top .advanced-search__ctrl', function (e) {
             if (!isMobile) {
                 e.preventDefault();
                 $(this).toggleClass('js--open');
                 $('.search-result__meta .advanced-search__tabs').toggle();
             }
         });
     };

    UX.searchFieldsCtrl.check.emptyInputs = function (form) {
        var textInputs = $(form).find('input[type=search]');
        if (textInputs.length == 0) {
            textInputs = $(form).find('input[type=text]');
        }
        var $emptyFields = $(textInputs).filter(function () {
            return this.value === "";
        });

        var $dateRangeSelect = $('.dateFilterSelect select').filter(function () {
            return $(this).val() === "";
        });

        return ($emptyFields.length === textInputs.length && $dateRangeSelect.length != 0)

    };

})();

