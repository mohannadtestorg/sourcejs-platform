
    var $body = $('body');

    UX.searchFieldsCtrl.control= function () {
        $body.on('click', '[class*="-ctrl-field"]', function (e) {

            e.preventDefault();

            UX.searchFieldsCtrl.$wrapper = $(this).closest('.searchIn--field');

            if ($(this).is('.add-ctrl-field')) {

                UX.searchFieldsCtrl.$terms = $(this).closest('.advanced-search').find('.searchIn--field');

                if (UX.searchFieldsCtrl.$terms.length < 7) {
                    UX.searchFieldsCtrl.on.clone($(this));
                }

            } else {
                UX.searchFieldsCtrl.on.remove($(this));
            }


        });

        $('.time-frame').on('change', 'select', function () {
            UX.searchFieldsCtrl.select.dateRange($(this));
        });

        $body.on('change', '.publication-type__select', function (e) {
            e.preventDefault();
            $(".publication-type__label").attr('name',$(this).find("option:selected").attr('param'));
            $(".publication-type__label").attr('value',$(this).find("option:selected").val());
        });


        $body.on('keyup input', '.searchIn--field input', function () {
            UX.searchFieldsCtrl.$form = $(this).closest('form');
            UX.searchFieldsCtrl.check.submitButton();

        });

        UX.searchFieldsCtrl.click.toggleSearchBlock();

        $(document).on(UX.searchFieldsCtrl.vPort + '-on', function () { // Waiting for custom event that will be triggered by controller.js to activate responsive effects
            UX.searchFieldsCtrl.isMobile = true;
        });

        $(document).on(UX.searchFieldsCtrl.vPort + '-off', function () { // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
            UX.searchFieldsCtrl.isMobile = false;
        });

        $('.advanced-search--advancedFilters .radio--primary input').change(function () {
            $('.advanced-search--advancedFilters .radio--primary input').prop('checked', false);
            $(this).prop('checked', true);
        });

        $('body').on('input', '.ms-ctn input', function () {

            var $parent = $(this).closest('.ms-ctn');
            if ($(this).val() === '') {
                $parent.find('.ms-res-ctn.dropdown-menu').remove();
            }

        });

    }


