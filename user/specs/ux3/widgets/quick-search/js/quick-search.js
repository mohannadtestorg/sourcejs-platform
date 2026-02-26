(function () {
    var quickSearch = {
        autoCompeteSearchUrl: "",
        suggestedData: [],
        enteredTerm: "",
        inputElem: "",
        maxWords: "",
        maxChars: "",
        confNumOfContributors: "",
        confNumOfHistoryItems: "",
        confNumOfPublicationTitles: "",
        confNumOfTopics: "",
        selectedOption: "",
        seriesKey: "",
        vPort: "screen-md",
        isMobile: false,

        init: function () {

            quickSearch.inputElem = $('.quick-search .magicsuggest');
            quickSearch.seriesKey = $('input[name=SeriesKey]', '[name=thisJournalQuickSearch]').val();
            quickSearch.controller();
            quickSearch.additionalController();
        },
        controller: function () {


            $('.quick-search').find('.magicsuggest').each(function () {
                quickSearch.inputElem = $(this);
                quickSearch.maxWords = $(this).data("auto-complete-max-words");
                quickSearch.maxChars = $(this).data("auto-complete-max-chars");
                var searchType = $(this).parent();
                quickSearch.enteredTerm = $(this).val();


                if (searchType.hasClass('option-citation')) {
                    quickSearch.citationSuggestions();
                } else if (searchType.hasClass('option-journal')) {
                    quickSearch.journalSearchSuggestions();
                } else {
                    quickSearch.searchSuggistions();
                }
            });

            $(document).on('keyup', '[name="defaultQuickSearch"],[name="citationQuickSearch"],[name="thisJournalQuickSearch"]', function (e) {
                if ((e.keyCode || e.which) === 13) {
                    var $form = $(e.currentTarget);
                    $form.trigger('submit');
                }
            });

            $(document).on('submit', '[name="defaultQuickSearch"],[name="citationQuickSearch"],[name="thisJournalQuickSearch"]', function (e) {
                var empty = true;

                $(this).find('input[type="text"],input[type="search"]').each(function () {
                    if ($(this).val() && $(this).val() != '') {
                        empty = false;
                    }
                });
                if ($(this).find('.ms-sel-item').length > 0) {
                    empty = false;
                }
                if (empty) {
                    window.location = '/search/advanced';
                    e.preventDefault();
                }
            });

        },
        additionalController: function () {

        },

        doSuggest: function (sug) {
            quickSearch.inputElem.magicSuggest({
                data: sug,
                method: 'GET',
                valueField: 'value',
                autoSelect: false,
                displayField: 'label',
                cls: 'search-term',
                hideTrigger: 'true',
                beforeSend: function (xhr, settings) {
                    var enteredTerm = settings.url.substr(settings.url.indexOf('query=') + 6).replace(/[​​+]/g, ' ');
                    if (enteredTerm.split(" ").length > quickSearch.maxWords || enteredTerm.length > quickSearch.maxChars || !enteredTerm.replace(/\s/g, '').length) {
                        return false;
                    }
                }
            });

        },
        citationSuggestions: function () {
            quickSearch.confNumOfPublicationTitles = quickSearch.inputElem.data('publication-titles-conf');
            quickSearch.autoCompeteSearchUrl = '/action/doSuggest?target=title-auto-complete&pts=' + quickSearch.confNumOfPublicationTitles + '&fl=PubID';
            quickSearch.selectedOption = "citation";
            quickSearch.doSuggest(quickSearch.autoCompeteSearchUrl);
        },
        searchSuggistions: function () {
            quickSearch.confNumOfPublicationTitles = quickSearch.inputElem.data('publication-titles-conf');
            quickSearch.confNumOfContributors = quickSearch.inputElem.data('contributors-conf');
            quickSearch.confNumOfTopics = quickSearch.inputElem.data('topics-conf');
            quickSearch.confNumOfHistoryItems = quickSearch.inputElem.data('history-items-conf');
            quickSearch.autoCompeteSearchUrl = '/action/doSuggest?target=auto-complete&hs=' + quickSearch.confNumOfHistoryItems + '&pts=' + quickSearch.confNumOfPublicationTitles + '&ts=' + quickSearch.confNumOfTopics + '&cs=' + quickSearch.confNumOfContributors + '&fl=PubID';
            quickSearch.doSuggest(quickSearch.autoCompeteSearchUrl);
        },
        journalSearchSuggestions: function () {
            quickSearch.confNumOfPublicationTitles = quickSearch.inputElem.data('publication-titles-conf');
            quickSearch.confNumOfContributors = quickSearch.inputElem.data('contributors-conf');
            quickSearch.confNumOfTopics = quickSearch.inputElem.data('topics-conf');
            quickSearch.confNumOfHistoryItems = quickSearch.inputElem.data('history-items-conf');
            quickSearch.autoCompeteSearchUrl = '/action/doSuggest?target=auto-complete&hs=' + quickSearch.confNumOfHistoryItems + '&pts=' + quickSearch.confNumOfPublicationTitles + '&ts=' + quickSearch.confNumOfTopics + '&cs=' + quickSearch.confNumOfContributors + '&fl=PubID&within=' + quickSearch.seriesKey;
            quickSearch.doSuggest(quickSearch.autoCompeteSearchUrl);
        }
    };
    UX.quickSearch = quickSearch; // add to global namespace
})();