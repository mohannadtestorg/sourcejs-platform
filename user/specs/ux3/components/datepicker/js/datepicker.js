(function () {

    var datepicker = {
        dateFormat: "yy-mm-dd",
        $datepicker: $(".datepicker"),
        $body: $('body'),
        lastModfied: '',
        vPort: '',

        test: function () {
            // test for input|type=date support
            // it could be better, when tests are separated and used globally - Modernizr test for this issue is much more sofisticated for example
            var hasDateInputSupport = false;

            function checkInput(type) {
                var input = document.createElement("input");
                input.setAttribute("type", type);
                return input.type === type;
            }

            function checkDateInput() {
                var input = document.createElement('input');
                input.setAttribute('type','date');

                var notADateValue = 'not-a-date';
                input.setAttribute('value', notADateValue);

                return (input.value !== notADateValue);
            }

            if(checkInput('date') && checkDateInput()) {
                hasDateInputSupport = true;
            }

            return hasDateInputSupport;
        },

        init: function () {

            // IF native support is not present, use jQuery datepicker on every type=date input
            if (!datepicker.test()) {
                datepicker.$datepicker = datepicker.$datepicker.add($('[type=date]'));
            }

            datepicker.$datepicker.each(function () {
                var $element = $(this);
                var data = $element.data();

                if (typeof $element.datepicker !== 'undefined') {

                    $element.datepicker({
                        dateFormat: data.dateFormat ? data.dateFormat : datepicker.dateFormat // custom date format from data-attr or default one
                    });

                    //set the alt field & the alt format if exist
                    if(data.altFieldName)    {
                        $element.datepicker( "option", "altField", '[name="' + data.altFieldName + '"]' );
                        $element.datepicker( "option", "altFormat", datepicker.dateFormat);
                    }

                }
            });

        }
    };

    UX.datepicker = datepicker; // add to global namespace
})();