UX.submissionAuthors.on.doSuggest = function () {
    var affilationMagicSuggest = UX.submissionAuthors.$modal.find('.aff-magicsuggest');

    UX.submissionAuthors.affilationMagicSuggest = affilationMagicSuggest.magicSuggest({
        data: [{"value": "0001", "label": "Test Inst"}, {"value": "0002", "label": "AAA Inst"}],
        method: 'GET',
        valueField: 'value',
        autoSelect: false,
        allowFreeEntries: false,
        displayField: 'label',
        hideTrigger: 'true',
        useCommaKey: false,
        mode: "remote"
    });


}