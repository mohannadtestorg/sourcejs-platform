
$(document).ready(function () {
    if ($('.addresses').length) {
        var $formButtons = $('.addresses').closest('#personalInformationForm').find('.form-btn');
        var addressState = $('.switch-address').val();

        if (!addressState) {
            $formButtons.show();
        } else {
            $formButtons.hide();
        }


        $('.switch-address').on('change', function () {
            var addressState = $('.switch-address').val();

            if (!addressState) {
                $formButtons.show();
            } else {
                $formButtons.hide();
            }

        });

        $('.edit-address').on('click', function () {
            var addressState = $('.switch-address').val();

            if (!addressState) {

                $formButtons.hide();
            } else {
                $formButtons.show();
            }

        });

    }
});