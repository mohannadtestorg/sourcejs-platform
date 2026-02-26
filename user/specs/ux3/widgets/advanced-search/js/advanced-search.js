(function () {
    var $body = $('body');

    var searchFieldsCtrl = {
        $wrapper: null,
        $form: null,
        $terms: null,
        escape: 27,
        dateRangeVal : $('#staticRangeSelect').val(),
        vPort: "screen-sm", // default responsive break point
        isMobile:false,
        magicSuggestObjects:[],

        init: function () {

            searchFieldsCtrl.$form = $('.advanced-search');

            searchFieldsCtrl.check.submitButton();
            searchFieldsCtrl.check.terms();
            searchFieldsCtrl.on.doSuggest();
            searchFieldsCtrl.control();
            searchFieldsCtrl.addtionalControls();

            var $lastTerm = $('.advanced-search--searchIn').find('.searchIn--field:last-child');
            searchFieldsCtrl.check.lastClone($lastTerm);

            searchFieldsCtrl.select.dateRangeRadio($(this));

        },
        control: function () {
            $body.on('click', '[class*="-ctrl-field"]', function (e) {

                e.preventDefault();
                e.stopPropagation();
                searchFieldsCtrl.$wrapper = $(this).closest('.searchIn--field');

                if ($(this).is('.add-ctrl-field')) {

                    searchFieldsCtrl.$terms = $(this).closest('.advanced-search').find('.searchIn--field');

                    if (searchFieldsCtrl.$terms.length < 7) {
                        searchFieldsCtrl.on.clone($(this));
                    }

                } else {
                    searchFieldsCtrl.on.remove($(this));
                }


            });

            $('.time-frame').on('change', 'select', function () {
                searchFieldsCtrl.select.dateRange($(this));
            });

            $('.time-frame').on('change', 'input', function () {
                searchFieldsCtrl.select.dateRangeRadio($(this));
            });

            $body.on('keyup input', '.searchIn--field input', function () {
                searchFieldsCtrl.$form = $(this).closest('form');
                searchFieldsCtrl.check.submitButton();

            });

            searchFieldsCtrl.click.toggleSearchBlock();

            $(document).on(searchFieldsCtrl.vPort + '-on', function () { // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                searchFieldsCtrl.isMobile = true;
            });

            $(document).on(searchFieldsCtrl.vPort + '-off', function () { // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
                searchFieldsCtrl.isMobile = false;
            });

            $('.advanced-search--advancedFilters .radio--primary input').change(function () {
                $('.advanced-search--advancedFilters .radio--primary input').prop('checked', false);
                $(this).prop('checked', true);
            });

            /*$('body').on('input', '.ms-ctn input', function () {

                var $parent = $(this).closest('.ms-ctn');
                if ($(this).val() === '') {
                    $parent.find('.ms-res-ctn.dropdown-menu').remove();
                }

            });*/

            $('body').on('change', '#earlyCite', function () { // this code added to solve LIT-190918

                var $earlyCite_hidden = $("#earlyCite_hidden");

                if($earlyCite_hidden.val() == "") {
                    $earlyCite_hidden.val("off");
                    $earlyCite_hidden.prop("disabled", false);
                }
                else {
                    $earlyCite_hidden.val("");
                    $earlyCite_hidden.prop("disabled", true);
                }
            });

            $('body').on('change', '#earlyCite', function () { // this code added to solve LIT-190918

                var $earlyCite_hidden = $("#earlyCite_hidden");

                if($earlyCite_hidden.val() == "") {
                    $earlyCite_hidden.val("off");
                    $earlyCite_hidden.prop("disabled", false);
                }
                else {
                    $earlyCite_hidden.val("");
                    $earlyCite_hidden.prop("disabled", true);
                }
            });

        },
        addtionalControls:function () {
            
        },
        click: {
            toggleSearchBlock: function () {
                $body.on('click', '.search__result .advanced-search__ctrl', function (e) {
                    if (! searchFieldsCtrl.isMobile) {
                        e.preventDefault();
                        $(this).toggleClass('js--open');
                        $('.search-result__meta .advanced-search__tabs').toggle();
                        //UX.tab.on.calculate($('.search-result__meta .tab__nav'));
                    }
                });
            }
        },
        on: {
            clone: function ($this) {
                jcf.destroy($('.searchIn--field .jcf'))

                searchFieldsCtrl.$wrapper.clone(true, true).find('input').val('').end().appendTo('.advanced-search--searchIn');
                $this.addClass('hidden');
                $this.siblings('.remove-ctrl-field').removeClass('hidden');
                $('.searchIn--field .jcf').each(function () {
                    jcf.replace($(this));
                });

                $this = $('.advanced-search--searchIn').children('.searchIn--field:last-child');
                searchFieldsCtrl.check.lastClone($this);


            },
            remove: function ($this) {
                searchFieldsCtrl.$form = $this.closest('form');
                searchFieldsCtrl.$wrapper.remove();

                searchFieldsCtrl.check.submitButton();

                $this = $('.advanced-search--searchIn').children('.searchIn--field:last-child');
                searchFieldsCtrl.check.lastClone($this);
            },
            doSuggest: function () {
                $(searchFieldsCtrl.$form).find('.magicsuggest').each(function () {
                    var doSuggestTarget = $(this).data('auto-complete-target');
                    var withinData=$(this).data('auto-complete-within');
                    var maxWords = 200;
                    var maxChars = 222;
                    var name = $(this).attr('name');
                    var id = $(this).attr('id');
                    var values = $(this).attr('data-values') ? JSON.parse($(this).attr('data-values')) : [];

                    if (withinData) {
                        doSuggestTarget = doSuggestTarget + '&within=' + withinData;
                    }

                    var $ms = $(this).magicSuggest({
                        data: '/action/doSuggest?target=' + doSuggestTarget,
                        method: 'GET',
                        valueField: 'value',
                        autoSelect: false,
                        allowFreeEntries: 'false',
                        displayField: 'label',
                        cls: 'search-term',
                        hideTrigger: 'true',
                        inputCfg: {'id': id, 'name': name},
                        beforeSend: function (xhr, settings) {
                            var enteredTerm = settings.url.substr(settings.url.indexOf('query=') + 6).replace(/[​​+]/g, ' ');
                            if (enteredTerm.split(" ").length > maxWords || enteredTerm.length > maxChars || !enteredTerm.replace(/\s/g, '').length) {
                                return false;
                            }
                        }
                    });

                    if (values.length) {
                        $ms.setSelection(values);
                    }
                    searchFieldsCtrl.magicSuggestObjects.push($ms);
                });

            }

        },
        select: {
            dateRange: function ($this) {
                var $radioParent = $this.closest('.time-frame');
                var radio = $radioParent.find('input[type=radio]');
                radio.trigger('click');

                if ($this.attr('id') == 'staticRangeSelect') {
                    searchFieldsCtrl.dateRangeVal = $('#staticRangeSelect').find('option:contains("'+$('.jcf-select-staticRange .jcf-select-text span').text()+'")').val();
                    $('#staticRangeSelect').val(searchFieldsCtrl.dateRangeVal);
                }

                searchFieldsCtrl.$form = $this.closest('form');
                searchFieldsCtrl.check.submitButton();

            },
            dateRangeRadio: function ($this) {


                if (!$('#staticRange:checked').length ) {
                    $('#staticRangeSelect').val('');
                }else {
                    searchFieldsCtrl.dateRangeVal = $('#staticRangeSelect').find('option:contains("'+$('.jcf-select-staticRange .jcf-select-text span').text()+'")').val();
                    $('#staticRangeSelect').val(searchFieldsCtrl.dateRangeVal);
                }

            }
        },
        check: {
            emptyInputs: function (form) {
                var textInputs = $(form).find('input[type=search]');
                if (textInputs.length == 0) {
                    textInputs = $(form).find('input[type=text]');
                }
                var $emptyFields = $(textInputs).filter(function () {
                    return this.value === "";
                });
                return $emptyFields.length === textInputs.length;
            },
            submitButton: function () {

                if (searchFieldsCtrl.check.emptyInputs(searchFieldsCtrl.$form)) {
                    $(searchFieldsCtrl.$form).find('button[type=submit]').attr('disabled', true);

                } else {
                    $(searchFieldsCtrl.$form).find('button[type=submit]').removeAttr('disabled', true);

                }
            },
            terms: function () {
                searchFieldsCtrl.$terms = $('.advanced-search--searchIn .searchIn--field');

                searchFieldsCtrl.$terms.each(function (index) {
                    var number = index + 1;

                    $(this).find('select').attr('name', 'field' + number);
                    $(this).find('input').attr('name', 'text' + number);
                });
            },
            lastClone: function ($this) {
                if ($this.index() == 6) {
                    $this.children('.add-ctrl-field').addClass('hidden');
                    $this.children('.remove-ctrl-field').removeClass('hidden');

                } else {
                    $this.children('.add-ctrl-field').removeClass('hidden');
                    $this.children('.remove-ctrl-field').addClass('hidden');
                }
                searchFieldsCtrl.check.terms();
            }
        }

    };

    UX.searchFieldsCtrl = searchFieldsCtrl; // add to global namespace
})();

