(function () {
    function createAndAppendInput(name,value,form){
        var inp = document.createElement("input");
        inp.type = "hidden";
        inp.name = name;
        inp.value= value;
        form.append(inp);
    }

    var ipRanges = {
        $body: $('body'),
        trigger: '.trigger-delete',
        addSubmitBtn: $('.js__addIpRange'),
        deleteSubmitBtn: '[name="delete"]',
        updateSubmitBtn: '[name="update"]',
        forceSubmit: '[name="force"]',
        $updateForm: $('#institutionMultiIpChange'),
        $addForm: $('#institutionMultiIpAdd'),
        $modal: $('#rangeConflict'),
        $ranges: $('.smalltextfield[name^="ipRange"]'),
        $form : '',

        init: function(){
            ipRanges.controller();
        },
        controller: function(){

            ipRanges.$body.on('click',ipRanges.trigger,function (e) {
                e.preventDefault();
                ipRanges.on.deleteRange($(this));
            });

            ipRanges.$updateForm.find('.smalltextfield').on('change input', function () {
                ipRanges.on.updateRange($(this));
                $(ipRanges.updateSubmitBtn).removeAttr('disabled');

            });

            $(ipRanges.updateSubmitBtn).on('click',function (e) {
                e.preventDefault();
                ipRanges.$form = ipRanges.$updateForm;
                ipRanges.on.formSubmit(false);
            });

            ipRanges.$body.on('click','.cancelSubmit',function () {
                ipRanges.modal.cancel();
            });

            ipRanges.$body.on('click','.continueSubmit',function () {
                ipRanges.modal.submit();
            });

            ipRanges.addSubmitBtn.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                ipRanges.form.submit();
            });
        },
        on: {
            deleteRange: function ($el) {
                ipRanges.on.checkboxCheck($el);
                ipRanges.$updateForm.find(ipRanges.deleteSubmitBtn).trigger('click');
            },
            updateRange: function ($el) {
                ipRanges.on.checkboxCheck($el);
            },
            checkboxCheck: function ($el) {
                var $tr = $el.parents('tr'),
                    $checkbox = $tr.find('[type="checkbox"]'),
                    $jfccheckbox = $tr.find('.jcf-checkbox');

                $checkbox.attr('checked', true);
                $jfccheckbox.addClass('jcf-checked');
            },
            formSubmit: function (force) {

                if (!force){
                    var hasConflicts = ipRanges.conflict.check();

                    if(hasConflicts){
                        ipRanges.modal.show();
                        return;
                    }
                }

                if ( ipRanges.$form === ipRanges.$addForm ) {
                    createAndAppendInput("add","add",ipRanges.$addForm);
                } else {
                    createAndAppendInput("update","update",ipRanges.$updateForm);
                }
                ipRanges.$form.submit();
            }
        },
        conflict: {
            check: function () {
                var hasConflicts = false,
                    ip1 = '', ip2 = '',
                    max = $(ipRanges.$ranges).length-1;

                if ( ipRanges.$form === ipRanges.$addForm ) {
                    ip1 = $(ipRanges.$ranges[max]).val();
                    ipRanges.$ranges.each(function(j) {

                        if (j < max) {
                            ip2 = $(this).val();
                            hasConflicts = ipRanges.conflict.compare(ip1,ip2,":");
                        }
                        if (hasConflicts) return false;
                    });
                } else {
                    ipRanges.$ranges.each(function(i) {
                        ip1 = $(this).val();
                        if (i < max) {
                            ipRanges.$ranges.each(function(j) {
                                if (j < max) {
                                    if (i < j) {
                                        ip2 = $(this).val();
                                        hasConflicts = ipRanges.conflict.compare(ip1, ip2, ":");
                                    }
                                    if (hasConflicts) return false;
                                }
                            });
                            if (hasConflicts) return false;
                        }
                    });
                }

                return hasConflicts;
            },
            force: function () {
                $(ipRanges.forceSubmit).prop('checked', true);
                ipRanges.on.formSubmit(true);
            },
            compare: function (ip1,ip2,delimiter ) {

                var minIP1 = ip1.split(delimiter)[0],
                    maxIP1 = ip1.split(delimiter)[1];
                if (typeof maxIP1 === 'undefined' ) {
                    maxIP1 = minIP1;
                }

                var minIP2 = ip2.split(delimiter)[0],
                    maxIP2 = ip2.split(delimiter)[1];
                if (typeof maxIP2 === 'undefined' ) {
                    maxIP2 = minIP2;
                }

                var cmp1 = minIP1.localeCompare(maxIP2),
                    cmp2 = maxIP1.localeCompare(minIP2);

                return (cmp1 <= 0 && cmp2 >= 0) || (cmp1 > 0 && cmp2 < 0);
            }
        },
        modal: {
            show: function () {
                $(ipRanges.$modal).modal();

                UX.modal.$target = $(ipRanges.$modal);
                UX.modal.$close = UX.modal.$target.find('.close');
                UX.modal.items = UX.modal.$target.find('a, button, input');
                UX.modal.items.each(function (index) {
                    if (index === UX.modal.items.length - 1) {
                        UX.modal.lastItem = $(this);
                    }
                });
                UX.modal.on.show();
            },
            cancel: function () {
                $(ipRanges.$modal).modal('hide');
                $('body').removeClass('lock-screen');
            },
            submit: function () {
                ipRanges.conflict.force();
            }
        },
        form: {
            submit: function () {
                var hasInputsFiled = ipRanges.form.emptyFields();
                ipRanges.$form = ipRanges.$addForm;

                if(!hasInputsFiled){
                    ipRanges.form.error_msg();
                    return;
                } else {
                    ipRanges.on.formSubmit(false);
                }
            },
            emptyFields: function () {
                var result = true,
                    $inputs = ipRanges.$addForm.find('input[type="text"]');

                $inputs.each(function (index) {
                    if ( this.value.trim() == '') {
                        result = false;
                    }
                });
                return result;
            },
            error_msg: function () {
                alert('Please fill in both fields.');
            }
        }
    };

    UX.ipRanges = ipRanges; // add to global namespace
})();