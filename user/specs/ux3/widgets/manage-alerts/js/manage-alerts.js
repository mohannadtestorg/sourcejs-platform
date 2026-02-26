(function () {

    var $window = $(window),
        $body = $('body'),
        isMobile = false; // variable use to determine if responsive mode is on or off

    function createAndAppendInput(name,value,form){
        var inp = document.createElement("input");
        inp.type = "hidden";
        inp.name = name;
        inp.value= value;
        form.append(inp);
    }

    var alerts = {
        $target:null,
        $toggle:null,

        init: function(){
            alerts.$toggle = $("[name='markall']");

            //alerts.on.build();
            alerts.control();
        },
        control: function() {

            $body.on('click', '[name="markall"]', function(e) {
                //e.preventDefault();

                alerts.$target = $(this).closest('.alert__list');


                if ($(this).closest('#citationAlerts').length) {
                    alerts.$target = $('#citationAlerts');
                }


                if ($(this).prop('checked')) {
                    alerts.$target.find('[type="checkbox"]:not(:checked)').click();
                } else {
                    alerts.$target.find('[type="checkbox"]:checked').click();
                }
            });

            $body.on('change', '.alert__freq', function(e) {
                alerts.on.frequency_change($(this));
            });

            $body.on('change', '.alert__sort', function(e) {
                alerts.on.sorting_change($(this));
            });

            $body.on('click', '.js__citActions', function(e) {
                alerts.on.cit_actions_change($(this));
            });

            $body.on('click', '.btn--cancel', function(e) {
                e.preventDefault();
                alerts.on.reset_form($(this));
            });
        },

        on: {
            build: function () {

            },

            error_msg: function () {
                alert('Please select one publication at least');
            },

            frequency_change: function ($el) {
                var form = $el.parents("form"),
                    value = $el.find('select').val();

                form.find("input[name=action]").val(""); //clear the delete field
                createAndAppendInput("save","true",form);
                createAndAppendInput("updateAxa","true",form);
                form.submit();
            },

            sorting_change: function ($el) {
                var sortBy = $el.find('select').val();
                var activeTab ="#" + $el.closest("li[role='tabpanel']").attr('id');
                sessionStorage.setItem('activeTab',activeTab );

                $('<form action="/action/showAlertSettings">' +
                    '<input type="hidden" name="type" value="citation" />' +
                    '<input type="hidden" name="menuTab" value="Alerts"/>' +
                    '<input type="hidden" name="sortBy" value="'+sortBy+'"/>' +
                    '</form>').appendTo('body').submit();
            },

            cit_actions_change: function ($el) {
                var form = $el.parents("form"),
                    val = $el.attr('data-value');

                if (!val)
                    return;

                if(!$('input[type=checkbox][name="citId"]:checked').length){
                    alerts.on.error_msg();
                    return;
                }

                form.find("input[name=action]").val(val);

                if ($el.parents('.dropBlock__holder').length)
                    UX.dropBlock.on.hide();

                var activeTab ="#" + $el.closest("li[role='tabpanel']").attr('id');
                sessionStorage.setItem('activeTab',activeTab );

                form.get(0).submit();
            },

            reset_form: function ($el) {
                var $form = $el.closest('form');
                $form.trigger('reset');
                $form.find('input[name=pubCode], input[name=markall]').prop('checked', false);
                $form.find('input[name=format][value=T]').prop('checked', true);
            }
        }
    };

    UX.alerts = alerts; // add to global namespace
})();