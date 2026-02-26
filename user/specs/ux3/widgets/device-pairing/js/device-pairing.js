(function () {

    var $window = $(window),
        $body = $('body');

    var devicePairing = {

        $pairedDevicesTable: $(".device-pairing__devices table"),
        $noPairedDevicesResult: $(".device-pairing__devices .no-result"),
        $pairingHistoryTable: $(".device-pairing__history table"),
        pairingHistoryTableRow: '.device-pairing__history tbody tr',
        $noPairedDevicesHistoryResult: $(".device-pairing__history .no-result"),
        $instAdminUnpairSelectedBtn: $("#instAdminUnpairSelected"),
        $instAdminUnpairAllBtn: $("#instAdminUnpairAll"),
        $unpairDialogForm: $("#unpairDevicesDialogForm"),
        selectedDevicesArray: [],
        $deviceSelectedList: $(".device-pairing__selectedList"),
        $unpairButtonsPanel: $(".unpairButtonsPanel"),
        paginationContainer: '.device-pairing__pagination',
        widgetId: $("#widgetId").text(),
        pbContext: encodeURI($("[name='pbContext']").attr("content")),
        $selectEmailInstButton: $(".selectEmailInstButton"),
        $confirmAddEmailButton: $('.confirmAddEmailButton'),
        $continueInstButton: $('.continueInstButton'),
        isInstitutionMode: $('.dp-institution-template').length > 0,
        clientPagination: null,

        init: function () {
            if(!$('.device-pairing-demo').length){
                devicePairing.initialization();
            }

            devicePairing.clientPagination = jQuery.extend(true, {}, UX.clientPagination);
            devicePairing.clientPagination.set.containerName(devicePairing.paginationContainer);
            devicePairing.clientPagination.set.tableRowName(devicePairing.pairingHistoryTableRow);
            devicePairing.clientPagination.init();
            devicePairing.control();

        },
        initialization: function () {

            if ((devicePairing.$pairedDevicesTable).length > 0) {

                if (devicePairing.isInstitutionMode) {
                    $.get("/pb/widgets/ux3/DevicePairingManagementController/pairedDevicesOfUser?widgetId=" + devicePairing.widgetId + "&pbContext=" + devicePairing.pbContext, {
                        serviceName: $(".serviceNameHidden").text(),
                        userEmail: $(".userEmailHidden").text()
                    })
                        .done(function (html) {
                            devicePairing.on.fillPairedDevicesTable(html);
                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {
                            devicePairing.on.displayErrorDialog("error occure on the server : " + errorThrown);
                        });
                }
                else {
                    $.get("/pb/widgets/ux3/DevicePairingController/pairedDevices?widgetId=" + devicePairing.widgetId + "&pbContext=" + devicePairing.pbContext, {})
                        .done(function (html) {
                            devicePairing.on.fillPairedDevicesTable(html);
                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {
                            devicePairing.on.displayErrorDialog("error occure on the server : " + errorThrown);
                        });
                }
            }

            if (devicePairing.$pairingHistoryTable.length > 0) {
                $.get("/pb/widgets/ux3/DevicePairingManagementController/pairingHistory?widgetId=" + devicePairing.widgetId + "&pbContext=" + devicePairing.pbContext, {
                    serviceName: $(".serviceNameHidden").text(),
                    userEmail: $(".userEmailHidden").text()
                })
                    .done(function (html) {
                        if (html.indexOf("device-pairing__row") >= 0) {
                            devicePairing.$pairingHistoryTable.find("tbody").html(html);
                            devicePairing.$pairingHistoryTable.trigger("update");
                            devicePairing.clientPagination.buildPagination();
                            devicePairing.$pairingHistoryTable.removeClass('hidden');
                            devicePairing.$noPairedDevicesHistoryResult.addClass('hidden');

                        } else {
                            devicePairing.$pairingHistoryTable.addClass('hidden');
                            devicePairing.$noPairedDevicesHistoryResult.removeClass('hidden');
                        }
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        devicePairing.on.displayErrorDialog("error occure on the server : " + errorThrown);
                    });
            }


        },
        control: function () {


            $body.on('change', '.institutionId-radio', function (e) {
                devicePairing.$continueInstButton.prop("disabled", false);
            })

            $body.on('change', '.instEmailSelected-checkbox', function (e) {
                if ($("input[name=instEmailSelected]:checked").length > 0) {
                    devicePairing.$selectEmailInstButton.prop("disabled", false);
                } else {
                    devicePairing.$selectEmailInstButton.prop("disabled", true);
                }
            })


            $body.on('keyup', '.instEmailSelected-textbox', function (e) {
                $(".device-pairing__add-instEmail .error").addClass('hidden');
                if ($(this).val() != '') {
                    if (!devicePairing.check.isValidEmail($(this).val()))
                        devicePairing.$confirmAddEmailButton.prop("disabled", true);
                    else
                        devicePairing.$confirmAddEmailButton.prop("disabled", false);
                }
                else {
                    devicePairing.$confirmAddEmailButton.prop("disabled", true);
                }
            })

            $body.on('focusout', '.instEmailSelected-textbox', function (e) {
                if ($(this).val() != '') {
                    if (!devicePairing.check.isValidEmail($(this).val())) {
                        $(".device-pairing__add-instEmail .error").removeClass('hidden');
                    }
                    else {
                        devicePairing.$confirmAddEmailButton.prop("disabled", false);
                    }
                }

            })


            $body.on('change', 'input[name=deviceId]', function (e) {
                if ($("input[name=deviceId]:checked").length > 0) {
                    devicePairing.$instAdminUnpairSelectedBtn.prop("disabled", false);
                } else {
                    devicePairing.$instAdminUnpairSelectedBtn.prop("disabled", true);
                }
            })


            $body.on('click', '#instAdminUnpairSelected', function (e) {
                e.preventDefault();
                devicePairing.selectedDevicesArray = [];
                devicePairing.$deviceSelectedList.empty();
                devicePairing.$pairedDevicesTable.find("input[name='deviceId']:checked").each(function () {
                    devicePairing.selectedDevicesArray.push($(this).attr('id'));
                    devicePairing.$deviceSelectedList.append("<li>" + $(this).val() + "</li>");
                });
            })

            $body.on('click', '#instAdminUnpairAll', function (e) {
                e.preventDefault();
                devicePairing.selectedDevicesArray = [];
                devicePairing.$deviceSelectedList.empty();
                devicePairing.$pairedDevicesTable.find("input[name='deviceId']").each(function () {
                    devicePairing.selectedDevicesArray.push($(this).attr('id'));
                    devicePairing.$deviceSelectedList.append("<li>" + $(this).val() + "</li>");
                });
            })


            $body.on('click', '#ConfirmUnpairDevices', function (e) {
                e.preventDefault();

                if (devicePairing.isInstitutionMode) {
                    $.get("/pb/widgets/ux3/DevicePairingManagementController/unpairSelected?widgetId=" + devicePairing.widgetId + "&pbContext=" + devicePairing.pbContext, {
                        serviceName: $(".serviceNameHidden").text(),
                        userEmail: $(".userEmailHidden").text(),
                        devices: JSON.stringify(devicePairing.selectedDevicesArray),
                        antiForgeryToken: $(".antiForgeryToken").text()
                    })
                        .done(function (html) {
                            devicePairing.on.fillPairedDevicesTable(html);
                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {
                            devicePairing.on.displayErrorDialog("error occure on the server : " + errorThrown);
                        });


                }
                else {
                    $.get("/pb/widgets/ux3/DevicePairingController/unpairSelected?widgetId=" + devicePairing.widgetId + "&pbContext=" + devicePairing.pbContext, {
                        devices: JSON.stringify(devicePairing.selectedDevicesArray)
                    })
                        .done(function (html) {
                            devicePairing.on.fillPairedDevicesTable(html);
                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {
                            devicePairing.on.displayErrorDialog("error occure on the server : " + errorThrown);
                        });
                }


                devicePairing.selectedDevicesArray = [];
                devicePairing.$unpairDialogForm.modal('toggle');
            })


        },

        on: {
            fillPairedDevicesTable: function (html) {
                devicePairing.$pairedDevicesTable.find("tbody").html(html);
                devicePairing.$pairedDevicesTable.trigger("update");
                devicePairing.$instAdminUnpairSelectedBtn.prop("disabled", true);

                if (html.indexOf("device-pairing__row") >= 0) {
                    devicePairing.$pairedDevicesTable.removeClass('hidden');
                    devicePairing.$unpairButtonsPanel.removeClass('hidden');
                    devicePairing.$noPairedDevicesResult.addClass('hidden');
                }
                else {
                    devicePairing.$pairedDevicesTable.addClass('hidden');
                    devicePairing.$unpairButtonsPanel.addClass('hidden');
                    devicePairing.$noPairedDevicesResult.removeClass('hidden');
                }

            },
            displayErrorDialog: function (message) {
                $("#devicePairingError").find(".message").html(message)
                $("#devicePairingError").modal('toggle');
            }

        },
        check: {
            isValidEmail: function (value) {
                var emailPattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
                if (!emailPattern.test(value)) {
                    return false;
                }

                return true;
            }
        }


    }

    UX.devicePairing = devicePairing;

})();