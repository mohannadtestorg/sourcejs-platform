var $body = $('body');

UX.searchFieldsCtrl.addtionalControls = function () {
    $body.on('click', '.advanced-search__clear', function (e) {
        var $advancedSearchForm = $(this).closest('form');
        $advancedSearchForm.find("input[type=text]").val("");
        $advancedSearchForm.find('#anyDate').click();
        $.each($advancedSearchForm.find('select.jcf'), function (key, item) {
            $(item).val($(item).find('option:first').val());
            $(item).next('.jcf-select').find('.jcf-select-text span').text($(item).find('option:first').text());
        });

        $.each(UX.searchFieldsCtrl.magicSuggestObjects,function (key, item) {
           item.clear();
        })
        $advancedSearchForm.find('.btn[type="submit"]').attr('disabled', 'disabled');
    });

}