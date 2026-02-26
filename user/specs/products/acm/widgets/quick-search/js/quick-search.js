UX.quickSearch.init = function () {
    $('.quick-search__dropBlock .jcf option').addClass('inDropblock');
    UX.quickSearch.inputElem = $('.quick-search .magicsuggest');
    UX.quickSearch.seriesKey = $('input[name=SeriesKey]', '[name=thisJournalQuickSearch]').val();
    UX.quickSearch.controller();
    UX.quickSearch.additionalController();
}
