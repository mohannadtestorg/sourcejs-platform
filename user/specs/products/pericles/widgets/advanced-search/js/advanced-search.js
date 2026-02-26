(function () {
    $(window).on('load', function (e) {
        if (window.location.hash == '#citation') {
            $('.citation-search__tab a').click();
        }

        $('body').on('click', '.advanced-tips-text .accordion__control', function () {

            if ($(this).hasClass('js--open')) {
                $('body, html').addClass('lock-screen');

            } else {
                $('body, html').removeClass('lock-screen');

            }

        });


    });

})();



UX.searchFieldsCtrl.select.dateRange = function ($this) {
    var $radioParent = $this.closest('.time-frame');
    var radio = $radioParent.find('input[type=radio]');
    radio.trigger('click');

};


UX.searchFieldsCtrl.select.dateRangeRadio = function ($this) {
    UX.searchFieldsCtrl.select.dateRange($this);

    if ($('#staticRange:checked').length ) {
        $('#staticRangeSelect').attr('name', 'Ppub');
    }else {
        $('#staticRangeSelect').attr('name', '');
    }



    if ($('#customRange:checked').length ) {

        $('.AfterMonth').attr('name', 'AfterMonth');
        $('.AfterYear').attr('name', 'AfterYear');
        $('.BeforeMonth').attr('name', 'BeforeMonth');
        $('.BeforeYear').attr('name', 'BeforeYear');
    }else {
        $('.AfterMonth').attr('name', '');
        $('.AfterYear').attr('name', '');
        $('.BeforeMonth').attr('name', '');
        $('.BeforeYear').attr('name', '');

    }



};

UX.searchFieldsCtrl.on.doSuggest = function () {

    var ms;

    $(UX.searchFieldsCtrl.$form).find('.magicsuggest').each(function () {

        if ($('.appliedFilter').length) {
            var appliedFilterVal = $(this).val().split(',');
            var appliedFilterLabel = $(this).data('label');
        }


        var doSuggestTarget = $(this).data('auto-complete-target');
        var maxWords = 200;
        var maxChars = 222;

        ms = $(this).magicSuggest({
            data: '/action/doSuggest?target=' + doSuggestTarget,
            method: 'GET',
            valueField: 'value',
            autoSelect: false,
            allowFreeEntries: 'false',
            displayField: 'label',
            cls: 'search-term',
            hideTrigger: 'true',
            beforeSend: function (xhr, settings) {
                var enteredTerm = settings.url.substr(settings.url.indexOf('query=') + 6).replace(/[​​+]/g, ' ');
                if (enteredTerm.split(" ").length > maxWords || enteredTerm.length > maxChars || !enteredTerm.replace(/\s/g, '').length) {
                    return false;
                }
            }
        });

        if ($(this).hasClass('appliedFilter')) {

            //ms.setSelection([{name:'Paris', value:1}]);
            ms.setSelection([{value: appliedFilterVal, label:appliedFilterLabel}]);

        }

    });

    $(ms).on('selectionchange', function(){

        var $referenceFieldsWrapper = $('.advanced-search--referenceFields');
        var selection = this.getSelection();
        var selectionParam = selection[0].param;
        var selectionParamValue = selection[0].value;
        var dataLength;

        $.ajax({
            url: '/action/specialSearchFields?' + selectionParam + '=' +  selectionParamValue,
            type: "GET",
            success: function(data) {
                //data = [{"tagId": 123, "tagLabel": "Biological Name", "tagSearchField": "BiologicalNameFieldName"}, {"tagId": 123, "tagLabel": "CAS number", "tagSearchField": "CASNumberFieldName"}] /*static data for testing*/

                dataLength = data.length;

                $.each(data, function( index, value ) {

                    $("<div>")
                        .addClass('referenceFields--field input-group col-md-6')
                        .append('<label for="referenceFields-' + index + '">'+ value.tagLabel +'</label><input id="referenceFields-' + index + '" type="text" placeholder="" name="'+ value.tagSearchField +'"/>')
                        .appendTo($referenceFieldsWrapper.find('fieldset'));

                });

            },
            complete: function(){
                if (dataLength) {
                    $referenceFieldsWrapper.slideDown();
                }
            }
        });


    });

};

UX.searchFieldsCtrl.on.clone =  function ($this) {

    UX.searchFieldsCtrl.$wrapper.clone(true, true).find('input').val('').end().appendTo('.advanced-search--searchIn');
    $this.addClass('hidden');
    $this.siblings('.remove-ctrl-field').removeClass('hidden');
    $this = $('.advanced-search--searchIn').children('.searchIn--field:last-child');
    UX.searchFieldsCtrl.check.lastClone($this);

};

UX.searchFieldsCtrl.toggleSearchBlock = function () {
    return;
};

UX.searchFieldsCtrl.click.toggleSearchBlock = function () {
    $('body').on('click', '.search__result .advanced-search__ctrl', function (e) {
        e.preventDefault();
        $(this).toggleClass('js--open');

        $('.search-result__meta .advanced-search__tabs').slideToggle(600, 'easeOutQuad');

    });

};
