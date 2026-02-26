(function () {
    var $body = $('body'),
        isMobile = false;

    var fieldsCtrl = {
        container: null,
        $wrapper: null,
        $toggle: null,
        $form: null,
        $terms: null,
        $markAll: null,
        maxClone: 2,

        init: function () {

            fieldsCtrl.$toggle = $('.reproducible');
            fieldsCtrl.$wrapper = $('.reproducible__wrapper');
            fieldsCtrl.container = '.reproducible__container'; // Support for the legacy emails and phones used in account page

            //fieldsCtrl.check.terms();
            fieldsCtrl.control();

            var $lastTerm = fieldsCtrl.$wrapper.children('.reproducible').length;
            fieldsCtrl.check.lastClone($lastTerm);

        },
        control: function () {
            $body.on('keypress click', '[class*="-ctrl-field"]', function (e) {

                e.preventDefault();
                if (e.which === 13 || e.type === 'click') {
                    fieldsCtrl.$wrapper = $(this).closest('.reproducible__wrapper');
                    fieldsCtrl.$toggle = $(this).closest('.reproducible');

                    fieldsCtrl.$terms = $(this).closest('.reproducible__wrapper').find('.reproducible');

                    // LIT-161778 Support for the legacy emails and phones used in account page
                    if ($(fieldsCtrl.container).length == 0) {
                        if ($(this).is('.add-ctrl-field')) {

                            if (fieldsCtrl.$terms.length < (fieldsCtrl.maxClone + 1)) {
                                fieldsCtrl.on.clone($(this));
                            }

                        } else {

                            if (fieldsCtrl.$terms.length > 1) {
                                fieldsCtrl.on.remove($(this));
                            }

                        }
                    }
                }
            });

            $body.on('click', '[name="markall"]', function(e) {
                fieldsCtrl.on.markAll($(this));
            });
        },
        on: {
            clone: function ($this) {
                jcf.destroy($('.reproducible .jcf'));

                fieldsCtrl.$toggle.clone(true, true).find('input').val('').end().appendTo(fieldsCtrl.$wrapper);

                $('.reproducible .jcf').each(function () {
                    jcf.replace($(this));
                });

                fieldsCtrl.check.terms($this);

                var $lastTerm = fieldsCtrl.$wrapper.children('.reproducible').length;
                fieldsCtrl.check.lastClone($lastTerm);


            },
            remove: function ($this) {

                fieldsCtrl.$toggle.remove();
                fieldsCtrl.check.terms($this);
                var $lastTerm = fieldsCtrl.$wrapper.children('.reproducible').length;
                fieldsCtrl.check.lastClone($lastTerm);
            },

            markAll: function ($el) {
                fieldsCtrl.$markAll = $el.closest('.markAll');

                if ($el.prop('checked')) {
                    fieldsCtrl.$markAll.find('[type="checkbox"]').prop('checked', true);
                }else {
                    fieldsCtrl.$markAll.find('[type="checkbox"]').prop('checked', false);
                }
            },

        },
        check: {
            terms : function ($this) {

                var nameInput = $this.closest('.reproducible').find('input').attr('name');

               if(nameInput){
                   var before = nameInput.split("[");
                   var after = before[1].split("]");
               }


                /*var matches = nameInput.match(/\[(.*?)\]/);
                if (matches) {
                    var submatch = matches[1];
                }*/

                // Support for the legacy emails and phones used in account page
                if ($(fieldsCtrl.container).length == 0) {
                    fieldsCtrl.$terms = $('.reproducible');
                } else {
                    fieldsCtrl.$terms = $this.parents(fieldsCtrl.container).find('.reproducible');
                }
                var copy_from_template = 0;
                fieldsCtrl.$terms.each(function (index) {
                    var $el = $(this);

                    if ($el.parents('.template').length) {
                        copy_from_template = 1;
                    } else {
                        var number = index - copy_from_template;
                        $(this).find('input').attr('name', before[0] + "[" + number + "]" + after[1]);
                    }
                });

                // fieldsCtrl.$terms = $('.reproducible');
                //
                // fieldsCtrl.$terms.each(function (index) {
                //     var number = index;
                //
                //     $(this).find('input').attr('name', before[0] + "[" + index + "]" + after[1]);
                //
                // });
            },
            lastClone: function ($this) {

                if ($this == fieldsCtrl.maxClone) {
                    fieldsCtrl.$wrapper.children('.reproducible:last-child').children('.add-ctrl-field').addClass('hidden');
                }else {
                    fieldsCtrl.$wrapper.children('.reproducible:last-child').children('.add-ctrl-field').removeClass('hidden');
                }


            }
        }

    };

    UX.fieldsCtrl = fieldsCtrl; // add to global namespace
})();

