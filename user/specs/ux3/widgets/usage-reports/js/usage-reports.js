(function () {

    var reports = {
        $form: $("#institutionUsageReport"),
        report_input_name: "counterIds",
        submitActor: null,
        $submitActors: null,

        init: function () {
            this.$submitActors = this.$form.find('button[type=submit]');
            reports.controller();
        },
        controller: function () {
            reports.$submitActors.click(function(event) {
                reports.submitActor = this;
            });
            reports.$form.submit(function (event) {
                event.preventDefault();

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


                var error_msg = $(this).children('.error_msg');


                var dateRangeCheck = reports.check.dateRange();
                var reportsRange = reports.check.selectedReports();

                if (dateRangeCheck && reportsRange) {
                    $(this).unbind('submit').submit();
                    error_msg.hide();
                } else {
                    var notifyEmail_error_msg=$('[name="notify"]').next('.error_msg');
                    notifyEmail_error_msg.hide();
                    error_msg.hide();

                    if(reports.submitActor.name=="notify"){
                        notifyEmail_error_msg.html("Please fix the errors below in order to complete your request.");
                        notifyEmail_error_msg.show();
                    }
                    else{
                        error_msg.html("Please fix the errors in order to complete report request.");
                        error_msg.show();
                    }
                }
            });
            reports.$form.on('click change', '.ranges-selects select', function () {
                reports.on.selectRange();
            });
            reports.$form.on('click change', '.year-select select', function () {
                reports.on.selectYear();
            });
        },
        error_msg: function (msg) {
            alert("Errors:\n" + msg);
        },
        on: {
            selectRange: function () {
                var el = reports.$form.find("#dateRange");
                el.find('input[type="radio"]').prop('checked', false);
                el.find('input#range-date').prop('checked', true);
            },
            selectYear: function () {
                var el = reports.$form.find("#dateRange");
                el.find('input[type="radio"]').prop('checked', false);
                el.find('input#year-date').prop('checked', true);
            }
        },
        check: {
            dateRange: function () {
                var el = reports.$form.find('#dateRange');

                if (el.find('input#range-date:checked').length) {

                    // start date
                    var month = el.find('select#startMonthId').val();
                    var year = el.find('select#startYear').val();
                    var start = new Date(year, month, 1);

                    // end date
                    month = el.find('select#endMonthId').val();
                    year = el.find('select#endYear').val();
                    var end = new Date(year, month, 1);

                    var msg = [];

                    if (start > end)
                        msg.push('This is not a valid month range');

                    var numMonths = reports.monthDiff(start, end);
                    if (numMonths > 12)
                        msg.push('Number of report months must be less than or equal to 12');

                    var error_msg = el.find('.error_msg');

                    if (msg.length) {
                        error_msg.html(msg.join('<br>'));
                        error_msg.show();
                        return false;
                    } else {
                        error_msg.html('');
                        error_msg.hide();
                        return true;
                    }
                }
                return true;
            },
            selectedReports: function () {
                var el = reports.$form.find('#reports');

                var error_msg = el.find('.error_msg');

                if (!el.find('input[name="' + reports.report_input_name + '"]:checked').length) {
                    error_msg.html("Please select at least one report");
                    error_msg.show();
                    return false;
                } else {
                    error_msg.html("");
                    error_msg.hide();
                    return true;
                }
            }
        },
        monthDiff: function (d1, d2) {
            var months;
            months = (d2.getFullYear() - d1.getFullYear()) * 12;
            months -= d1.getMonth() + 1;
            months += d2.getMonth();
            return months <= 0 ? 0 : months;
        }
    };

    UX.reports = reports; // add to global namespace
})();