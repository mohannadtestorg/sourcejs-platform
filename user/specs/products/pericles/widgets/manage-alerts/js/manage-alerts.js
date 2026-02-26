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

            $(document).ready(function() {
                var href = location.href,
                    test = '?isAddCitationAlert=true';

                if (href.indexOf(test) >= 0) {
                    var tabToOpen = href.split(test)[1];
                    if (tabToOpen === '#citAlerts') {
                        $('#pane-citation-con').trigger('click');
                    }
                }
            });
        },
        control: function() {

            $body.on('click', '[name="markall"]', function(e) {
                alerts.$target = $(this).closest('.alert__list');
                var checkboxes = alerts.$target.find('[type="checkbox"]');
                checkboxes.prop('checked', $(this).prop('checked'));
            });

            $body.on('click', '.alert__list [type="checkbox"]', function(e) {
                if (!$(this).prop('checked')) {
                    var markall = $(this).closest('form').find('[name="markall"]');
                    markall.prop('checked', false);
                }
                $(this).prop('checked', $(this).prop('checked'));
            });

            $body.on('click', '[name="groupAll"]', function(e) {
                alerts.$target = $(this).closest('.accordion-tabbed__tab');
                var checkboxes = alerts.$target.find('[type="checkbox"]');
                checkboxes.prop('checked', $(this).prop('checked'));
            });

            $body.on('change', '.alert__freq', function(e) {
                alerts.on.frequency_change($(this));
            });

            $body.on('change', '.alertSort', function(e) {
                alerts.on.sorting_change($(this));
            });

            $body.on('click', '.js__citActions', function(e) {
                alerts.on.checkboxCheck($(this));
                alerts.on.cit_actions_change($(this));
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
                    updateAxa = form.find("input[name=updateAxa]").length;

                form.find("input[name=action]").val(""); //clear the delete field
                if (!updateAxa)
                    createAndAppendInput("updateAxa","true",form);
                // form.submit();
            },
            sorting_change: function ($el) {
                var sortBy = $el.val();
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
            checkboxCheck: function ($el) {
                var $tr = $el.parents('tr'),
                    $checkbox = $tr.find('[type="checkbox"]'),
                    $jfccheckbox = $tr.find('.jcf-checkbox');

                $checkbox.prop('checked', true);
                $jfccheckbox.addClass('jcf-checked');
            }
        }
    };

    UX.alerts = alerts; // add to global namespace
})();