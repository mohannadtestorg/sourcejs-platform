(function () {
    var $body = $('body');


    var slotLicense = {
        $wrapper: null,

        init: function () {
            slotLicense.$wrapper = $('.slot-license-usage');
            slotLicense.control();
        },
        control: function () {
            slotLicense.$wrapper.on('click', 'tbody tr', function () {
                window.location.href = $(this).data('href');
            });

            slotLicense.$wrapper.on('click', '.licenseReportForm', function (e) {
                e.stopPropagation();
            });


            slotLicense.$wrapper.on('click', '.licenseReportBtn', function (e) {
                e.stopPropagation();
                UX.dropBlock.$controller   = $(this);
                UX.dropBlock.find.target();
            });

            slotLicense.$wrapper.on('click', '.licenseReportForm [type="cancel"]', function (e) {
                e.preventDefault();
                UX.dropBlock.on.hide();
            });

            slotLicense.$wrapper.on('click', '.licenseReportForm [type="submit"]', function (e) {
                e.preventDefault();
                slotLicense.sendReport($(this));
            });


        },

        sendReport: function ($el) {
            var $form = $el.closest('form');
            var ajaxUrl = $form.attr('action');
            var ajaxData = $form.serialize();
            var inputVal = $form.find('[name="emailAddress"]').val();

            var successMsg = '<span class="success"><i class="icon-checkmark" aria-hidden="true"></i>The report has been sent successfully</span>';
            var errorEmptyMsg = '<span class="error"><i class="icon-tools_close" aria-hidden="true"></i>Please enter a valid Email</span>';
            var errorMsg = '<span class="error"><i class="icon-tools_close" aria-hidden="true"></i>The report has not been sent, please try again</span>';


            if (inputVal == '') {
                slotLicense.hideForm($el, errorEmptyMsg);
                return;
            } else {

                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!re.test(inputVal)) {
                    slotLicense.hideForm($el, errorEmptyMsg);
                    return;
                }
            }

            $.ajax({
                url: ajaxUrl + '&' +ajaxData,
                type: 'POST',

                success: function() {

                    slotLicense.hideForm($el, successMsg);
                },

                error: function () {
                    slotLicense.hideForm($el, errorMsg);


                }
            });

        },
        hideForm: function ($el, msg) {
            UX.dropBlock.on.hide();
            UX.dropBlock.$controller   = $el;
            UX.dropBlock.find.target();
            UX.dropBlock.$target.find('.infoBox').html(msg);
        }
    };
    UX.slotLicense = slotLicense;
})();