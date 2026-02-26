(function () {

    var reports = {
        $form: $("#institutionUsageReport"),
        $report_input_name: $('[name="counterIds"]'),
        $report_input_name_checked: $('[name="counterIds"]:checked'),
        $submitReport: $('.js__submitReport'),
        $markAll: $('[name="markall"]'),
        $counterToggle: $('[name="counterEnabled"]'),
        submitActor: null,
        $submitActors: null,

        init: function(){

            reports.checkMarkAllValue(reports.$markAll);

            this.$submitActors = this.$form.find('button[type=submit]');
            reports.controller();
        },
        controller: function(){
            reports.$submitReport.off('click');

            reports.$submitActors.click(function(event) {
                reports.submitActor = this;
            });

            reports.$markAll.on('click', function(e) {
                reports.on.markAll($(this));
            });

            reports.$counterToggle.on('click', function(e) {
                window.setTimeout(function () {
                    reports.$form.find('[name="notify"]').trigger('click');
                }, 400);

            });

            reports.$submitReport.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                reports.on.submit();
            });
        },
        checkMarkAllValue: function ($el) {
            reports.$target = $el.closest('.alert__list');
            var MarkAllValue = true;
            reports.$target.find('[type="checkbox"]:not([name="markall"])').each(function () {

                MarkAllValue = MarkAllValue && $(this).prop('checked');
            });
            if (MarkAllValue) {
                $el.prop('checked', true)
            }
        },
        on: {
            submit: function () {
                var numChecked = $('[name="counterIds"]:checked').length;
                if (numChecked === 0){
                    reports.on.error_msg();
                    return;
                } else {
                    if (null === reports.submitActor) {
                        // If no actor is explicitly clicked, the browser will
                        // automatically choose the first in source-order
                        // so we do the same here
                        reports.submitActor = reports.$submitActors[0];
                    }
                    $('<input />').attr('type', 'hidden')
                        .attr('name', reports.submitActor.name)
                        .attr('value', "")
                        .appendTo(reports.$form);
                    reports.$form.submit();
                }
            },
            markAll: function ($el) {
                reports.$target = $el.closest('.alert__list');

                if ($el.prop('checked')) {
                    reports.$target.find('[type="checkbox"]').prop('checked', true);
                }else {
                    reports.$target.find('[type="checkbox"]').prop('checked', false);
                }
            },
            error_msg: function () {
                alert('Please select one report at least');
            }
        }
    };

    UX.reports = reports; // add to global namespace
})();