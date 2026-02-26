(function () {

    var $window = $(window),
        $body = $('body');

    var pairingManagment = {
        widgetId: $("#pairingManagmentWidgetId").text(),
        pbContext: encodeURI($("[name='pbContext']").attr("content")),
        $pairedEmailsTable: $(".pairedEmailsTable"),
        emailsTableRow: ".pairing-management__row",
        paginationContainer: '.pairing-management__pagination',
        clientPagination: null,

        init: function () {
            pairingManagment.initialization();
            pairingManagment.addtionalInitialization();
            pairingManagment.control();
        },

        initialization: function () {
            pairingManagment.on.setDatePickers();
            if(!$(".pairing-management-demo").length){
                pairingManagment.on.refreshPairedDevices();
            }
            pairingManagment.clientPagination = jQuery.extend(true, {}, UX.clientPagination);
            pairingManagment.clientPagination.set.containerName(pairingManagment.paginationContainer);
            pairingManagment.clientPagination.set.tableRowName(pairingManagment.emailsTableRow);
            pairingManagment.clientPagination.init();

        },
        addtionalInitialization:function () {

        },
        control: function () {

            $body.on('click', '.dateFilter .calendar', function (e) {
                e.preventDefault();
                $(this).siblings('.datepicker').datepicker('show');
            })

            $body.on('click', pairingManagment.paginationContainer + ' .prev, '
                + pairingManagment.paginationContainer + ' .next, '
                + pairingManagment.paginationContainer + ' .page'

                , function (e) {
                    e.preventDefault();
                    $("input[name=userEmail]").prop("checked", false);
                    pairingManagment.on.disableActionButtons();

                })


            $body.on('click', '#refreshButton', function (e) {
                e.preventDefault();
                pairingManagment.on.refreshPairedDevices();
            })

            $body.on('click', '#addExternalEmailButton', function (e) {
                e.preventDefault();
                pairingManagment.clear.dialog($("#externalEmailDialogForm"));
            })

            $body.on('click', '#confirmAddExternalEmail', function (e) {
                e.preventDefault();
                pairingManagment.on.addExternalEmail();
            })

            $body.on('click', '#confirmExtendReinstate', function (e) {
                e.preventDefault();
                pairingManagment.on.extendReinstateEmail();
            })

            $body.on('click', '#confirmRevokeAccess', function (e) {
                e.preventDefault();
                pairingManagment.on.revokeEmail();
            })


            $("#viewDetailButton").click(function () {
                var userEmail = $("input[name=userEmail]:checked").attr("id");
                $(this).closest("form").append("<input type='hidden' name='userEmail' value='" + userEmail + "'/>");
            });

            $body.on('click', '#extendReinstateButton', function (e) {
                e.preventDefault();
                pairingManagment.clear.dialog($("#extendReinstateAccessDialogForm"));
                var selectedEmail = $("input[name=userEmail]:checked").val();
                $("#extendEmail").val(selectedEmail);

            })
            $body.on('click', '#revokeButton', function (e) {
                e.preventDefault();
                pairingManagment.clear.dialog($("#revokeAccessDialogForm"));
                var selectedEmail = $("input[name=userEmail]:checked").val();
                $("#revokeAccessEmail").val(selectedEmail);
            })


            $body.on('change', 'input[name=userEmail]', function (e) {
                $("#extendReinstateButton").prop("disabled", false);
                $("#revokeButton").prop("disabled", false);
                $("#viewDetailButton").prop("disabled", false);
                $('.pairing-management__actions .withSelected').removeClass('disabled');

            })
        },
        check: {
            expirationDays: function (expirationDaysField) {
                // validate expiration days to ensure it is an integer
                var intRegex = /^\d+$/;
                if (!intRegex.test(expirationDaysField.val())) {
                    expirationDaysField.addClass("ui-state-error");
                    return false;
                }
                return true;
            },
            reason: function (reasonField) {
                // ensure reason field has text
                if (!reasonField.val()) {
                    reasonField.addClass("ui-state-error");
                    return false;
                }
                return true;
            },
            email: function (emailField) {
                //ensure email field isn't empty
                if (!emailField.val() || $.trim($(emailField).val()).length == 0) {
                    emailField.addClass("ui-state-error");
                    return false;
                }
                return true;
            }
        },
        clear: {
            dialog: function ($dialog) {
                $dialog.find('input').removeClass('ui-state-error').val('');
                $dialog.find('.expdays').val('180');
            },
            filters: function () {
                // reset email filter
                $("input[name=emailFilter]").prop("checked", function () {
                    return this.getAttribute("checked") == "checked";
                });
                // reset permission filter
                $("input[name=permissionFilter]").prop("checked", function () {
                    return this.getAttribute("checked") == "checked";
                });
                // reset the text input filters
                $("input[name=emailAddress]").val("");
                $("input[name=name]").val("");

                pairingManagment.on.setDatePickers();
            }
        },
        on: {
            setDatePickers: function () {
                var fromDateElement = $("#fromDate");
                var toDateElement = $("#toDate");

                fromDateElement.datepicker({
                    defaultDate: "-1w",
                    numberOfMonths: 1,
                    onClose: function (selectedDate) {
                        $("#toDate").datepicker("option", "minDate", selectedDate);
                    }
                });
                fromDateElement.datepicker("setDate", "-180d");

                toDateElement.datepicker({
                    defaultDate: "+0",
                    numberOfMonths: 1,
                    onClose: function (selectedDate) {
                        $("#fromDate").datepicker("option", "maxDate", selectedDate);
                    }
                });
                toDateElement.datepicker("setDate", "+1d");
            },

            addExternalEmail: function () {

                var addExtEmailEmailField = $("#addExternalEmail");
                var addExtEmailExpDaysField = $("#addExternalEmailExp");
                var addExtEmailReasonField = $("#addExternalEmailReason");

                var valid = true;
                valid = valid && pairingManagment.check.email(addExtEmailEmailField);
                valid = valid && pairingManagment.check.expirationDays(addExtEmailExpDaysField);
                valid = valid && pairingManagment.check.reason(addExtEmailReasonField);

                if (valid) {
                    $.get("/pb/widgets/ux3/DevicePairingManagementController/addExternalEmail?widgetId=" + pairingManagment.widgetId + "&pbContext=" + pairingManagment.pbContext, {
                        serviceName: $(".serviceNameHidden").text(),
                        email: addExtEmailEmailField.val(),
                        daysToExpiration: addExtEmailExpDaysField.val(),
                        reason: addExtEmailReasonField.val(),
                        antiForgeryToken: $(".antiForgeryToken").text()
                    })
                        .done(function (html) {
                            // check if the response html is not an error page
                            if (html.indexOf("externalEmailError") == -1) {
                                pairingManagment.$pairedEmailsTable.find("tbody").html(html);
                                pairingManagment.$pairedEmailsTable.trigger("update");
                                pairingManagment.on.disableActionButtons();
                                pairingManagment.clientPagination.buildPagination();
                                pairingManagment.clear.filters();

                            } else {
                                // error trying to add external email
                                pairingManagment.on.displayErrorDialog(html);
                            }

                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {
                            pairingManagment.on.displayErrorDialog("error occure on the server : " + errorThrown);
                        });
                    $("#externalEmailDialogForm").modal("toggle");

                }
            },
            extendReinstateEmail: function () {
                var extendReinstateEmailField = $("#extendEmail");
                var extendReinstateExpDaysField = $("#extendEmailExp");
                var extendReinstateReasonField = $("#extendEmailReason");


                var valid = true;
                valid = valid && pairingManagment.check.expirationDays(extendReinstateExpDaysField);
                valid = valid && pairingManagment.check.reason(extendReinstateReasonField);

                var selectedEmail = extendReinstateEmailField.val();

                if (valid) {
                    $.get("/pb/widgets/ux3/DevicePairingManagementController/extendReinstateEmail?widgetId=" + pairingManagment.widgetId + "&pbContext=" + pairingManagment.pbContext, {
                        serviceName: $(".serviceNameHidden").text(),
                        extendReinstateEmail: selectedEmail,
                        daysToExpiration: extendReinstateExpDaysField.val(),
                        reason: extendReinstateReasonField.val(),
                        // need to send the current filter options as well, so that we maintain the same filters
                        emailFilter: $('input[name=emailFilter]:checked').attr("id"),
                        permissionFilter: $('input[name=permissionFilter]:checked').attr("id"),
                        emailAddress: $('input[name=emailAddress]').val(),
                        name: $('input[name=name]').val(),
                        fromDate: $('input[name=fromDate]').val(),
                        toDate: $('input[name=toDate]').val(),
                        antiForgeryToken: $(".antiForgeryToken").text()
                    })
                        .done(function (html) {
                            pairingManagment.$pairedEmailsTable.find("tbody").html(html);
                            pairingManagment.$pairedEmailsTable.trigger("update");
                            pairingManagment.clientPagination.buildPagination();

                            $("input[value=" + "'" + selectedEmail + "'" + "]").prop("checked", true);
                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {
                            pairingManagment.on.displayErrorDialog("error occure on the server : " + errorThrown);
                        });
                    $("#extendReinstateAccessDialogForm").modal("toggle");

                }
            },
            revokeEmail: function () {
                var revokeEmailField = $("#revokeAccessEmail");
                var revokeReasonField = $("#revokeAccessReason");
                var selectedEmail = revokeEmailField.val();

                $.get("/pb/widgets/ux3/DevicePairingManagementController/revokeAccess?widgetId=" + pairingManagment.widgetId + "&pbContext=" + pairingManagment.pbContext, {
                    serviceName: $(".serviceNameHidden").text(),
                    revokeEmail: selectedEmail,
                    reason: revokeReasonField.val(),
                    // need to send the current filter options as well, so that we maintain the same filters
                    emailFilter: $('input[name=emailFilter]:checked').attr("id"),
                    permissionFilter: $('input[name=permissionFilter]:checked').attr("id"),
                    emailAddress: $('input[name=emailAddress]').val(),
                    name: $('input[name=name]').val(),
                    fromDate: $('input[name=fromDate]').val(),
                    toDate: $('input[name=toDate]').val(),
                    antiForgeryToken: $(".antiForgeryToken").text()
                })
                    .done(function (html) {
                        pairingManagment.$pairedEmailsTable.find("tbody").html(html);
                        pairingManagment.$pairedEmailsTable.trigger("update");
                        pairingManagment.clientPagination.buildPagination();
                        $("input[value=" + "'" + selectedEmail + "'" + "]").prop("checked", true);
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        pairingManagment.on.displayErrorDialog("error occure on the server : " + errorThrown);
                    });
                $("#revokeAccessDialogForm").modal("toggle");
            },

            refreshPairedDevices: function () {
                $.get("/pb/widgets/ux3/DevicePairingManagementController/institutionPairedDevices?widgetId=" + pairingManagment.widgetId + "&pbContext=" + pairingManagment.pbContext, {
                    serviceName: $(".serviceNameHidden").text(),
                    emailFilter: $('input[name=emailFilter]:checked').attr("id"),
                    permissionFilter: $('input[name=permissionFilter]:checked').attr("id"),
                    emailAddress: $('input[name=emailAddress]').val(),
                    name: $('input[name=name]').val(),
                    fromDate: $('input[name=fromDate]').val(),
                    toDate: $('input[name=toDate]').val()
                })
                    .done(function (html) {
                        pairingManagment.$pairedEmailsTable.find("tbody").html(html);
                        pairingManagment.$pairedEmailsTable.trigger("update");
                        pairingManagment.on.disableActionButtons();
                        pairingManagment.clientPagination.buildPagination();
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                       pairingManagment.on.displayErrorDialog("error occure on the server : " + errorThrown);
                });
            },
            disableActionButtons: function () {
                $("#extendReinstateButton").prop("disabled", true);
                $("#revokeButton").prop("disabled", true);
                $("#viewDetailButton").prop("disabled", true);
                $('.pairing-management__actions .withSelected').addClass('disabled');
            },

            displayErrorDialog: function (message) {
                $("#externalEmailError").find(".message").html(message)
                $("#externalEmailError").modal('toggle');
            }
        }

    }

    UX.pairingManagment = pairingManagment; // add to global namespace
})();