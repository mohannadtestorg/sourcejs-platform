(function () {

    var holdings = {


        init: function () {

            holdings.checkRecipientEmail($('[name="customerEmail"]:checked'),  $('#customer-report'));
            holdings.checkRecipientEmail($('[name="KBARTEmail"]:checked'),  $('#KBART-report'));
            holdings.control();
        },
        control: function () {

            $('[name="customerEmail"]').on('change', function () {
                holdings.checkRecipientEmail($('[name="customerEmail"]:checked'),  $('#customer-report'));
            });

            $('[name="KBARTEmail"]').on('change', function () {
                holdings.checkRecipientEmail($('[name="KBARTEmail"]:checked'),  $('#KBART-report'));
            })

        },
        checkRecipientEmail: function ($radio, $input) {
            $input.attr('required', ($radio.val() == 'CustomEmail'))
        }
        
    };

    UX.holdings = holdings;

})();