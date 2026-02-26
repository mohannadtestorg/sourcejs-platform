(function () {

    var $body = $('body');

    var submissionAuthors = {
        list: [],
        $modal: $('#authors-modal'),
        $modalinput1: $("#author-orcid"),
        $modalinput1err: $("#author-orcid + .error"),
        $modalinput2: $("#author-name"),
        $modalinput2err: $("#author-name + .error"),
        $modalinput3: $("#author-last-name"),
        $modalinput3err: $("#author-last-name + .error"),
        $modalinput4: $("#author-affilation"),
        $modalinput5: $("#author-email"),
        $modalinput5err: $("#author-email + .error"),
        $modalValidationMessage: $(".modal-validation-message"),
        td1: ".author-orcid-td",
        td2: ".author-name-td",
        td3: ".author-surname-td",
        td4: ".author-affiliation-td",
        td5: ".author-email-td",
        $table: $('.authors__table'),
        $templateRow: $('.submission-authors .rowTemplate tr'),
        $modalTitle: $("#authors-modal .modal__header"),
        $affiliationsAjaxLink: $("#affiliationAjaxLink"),
        $affiliationsInputTemplate: $(".affiliationsInputTemplate"),
        affiliationsValues: ".td-affiliations-val",
        affilationMagicSuggest: null,
        authorAjaxLink: ".authorAjaxLink",
        $container: $(".submission-authors"),
        $affiliationsTypes: $(".affiliations-types"),
        affilationsSplitter: "|#|",
        errText: "Field is missing",
        errEmailText: "Please enter a valid email address",


        init: function () {
            submissionAuthors.saveAuthorsToArray();
            submissionAuthors.controller();
            submissionAuthors.on.doSuggest();
        },
        saveAuthorsToArray: function() {
            // Save all Authors into array for later use
            submissionAuthors.list = [];
            var a = $(".authors__table tbody tr:not(.deleted)");
            $.each(a, function (index, row) {
                submissionAuthors.list.push($(row).find(".author-name-td .td-text").text() + " " + $(row).find(".author-surname-td .td-text").text());
            });
            if (UX.funders.fillAuthors) {
                UX.funders.fillAuthors();
            }
        },

        controller: function () {

            $body.on('click', submissionAuthors.authorAjaxLink, function (e) {
                e.preventDefault();
                submissionAuthors.$modalinput1err.text('');
                if (submissionAuthors.$modalinput1.val() == "") {
                    submissionAuthors.$modalinput1err.text("Please enter ORCID number")
                }
                else {
                    var url = $(submissionAuthors.authorAjaxLink).attr("href") + "?orcid=" + submissionAuthors.$modalinput1.val()
                    $.ajax({
                        type: "GET",
                        url: url,
                        success: function (data) {

                            if (data && data != null) {
                                //fill inputs with json data
                                submissionAuthors.$modalinput2.val(data.firstName);
                                submissionAuthors.$modalinput3.val(data.lastName);
                                submissionAuthors.$modalinput5.val(data.email);
                                submissionAuthors.affilationMagicSuggest.clear();
                                submissionAuthors.$affiliationsTypes.text("");
                                if (data.affiliations) {
                                    var affTypes = "";
                                    var affValues = [];
                                    $.each(data.affiliations, function (index, aff) {
                                        affTypes += aff.id + "=" + aff.type + ",";
                                        affValues.push({label: aff.name, value: aff.id});
                                    });

                                    if (affTypes != "") {
                                        affTypes = affTypes.slice(0, -1);
                                        submissionAuthors.$affiliationsTypes.text(affTypes);
                                    }

                                    if (affValues.length !== 0) {
                                        submissionAuthors.affilationMagicSuggest.setSelection(affValues);
                                    }
                                }
                            }
                            else {
                                submissionAuthors.$modalValidationMessage.text("Error occure when check orcid in the server");
                            }

                        },
                        error: function (e) {
                            submissionAuthors.$modalValidationMessage.text("Error occure when check orcid in the server");
                        }
                    });
                }
            });

            $body.on('click', '#saveAuthor', function (e) {
                e.preventDefault();
                submissionAuthors.on.beforeValidate();

                if (submissionAuthors.on.validate()) {
                    var affiliationsValue = "";
                    var affiliatiosText = "";
                    var $affiliatiosValue = $('[name="author-affilation[]"]');
                    var $affiliatiosText = $('#author-affilation .ms-sel-item');
                    var rowNum = submissionAuthors.$modal.find(".row-num").val();
                    var affiliatiosHiddenInputs = "";
                    var affiliatiosTypesText = submissionAuthors.$affiliationsTypes.text();

                    $affiliatiosValue.each(function (index) {

                        var affValue = $(this).val();
                        if ($(this).val() == $($affiliatiosText[index]).text()) {
                            affValue = "text";
                        }
                        else if (affiliatiosTypesText != "" && affiliatiosTypesText.indexOf($(this).val()) >= 0) {
                            var affType = submissionAuthors.getAffiliationsType(affiliatiosTypesText, $(this).val());
                            affValue = affType + "|" + $(this).val();
                        }
                        else {
                            affValue = "isni|" + $(this).val();
                        }

                        affValue += "|" + $($affiliatiosText[index]).text();

                        affiliationsValue += affValue + submissionAuthors.affilationsSplitter;

                        affiliatiosHiddenInputs += submissionAuthors.$affiliationsInputTemplate.html()
                            .replace(/\{\{0\}\}/gi, affValue)
                            .replace(/\{\{1\}\}/gi, rowNum)
                            .replace(/fakedinput/gi, "input");

                    });

                    $affiliatiosText.each(function (index) {
                        affiliatiosText += $(this).text();
                        if (index != $affiliatiosText.length - 1)
                            affiliatiosText += ", ";
                    });

                    if (affiliationsValue != "")
                        affiliationsValue = affiliationsValue.substring(0, affiliationsValue.lastIndexOf(submissionAuthors.affilationsSplitter));


                    if (submissionAuthors.$modal.find(".mode").val() == 'add') {
                        //add new row
                        var rowHtml = submissionAuthors.$templateRow[0].outerHTML;

                        rowHtml = rowHtml.replace(/\{\{0\}\}/gi, submissionAuthors.$modalinput1.val())
                            .replace(/\{\{1\}\}/gi, submissionAuthors.$modalinput2.val())
                            .replace(/\{\{2\}\}/gi, submissionAuthors.$modalinput3.val())
                            .replace(/\{\{3\}\}/gi, affiliatiosText)
                            .replace(/\{\{3_val\}\}/gi, affiliationsValue)
                            .replace(/\{\{3_inputs\}\}/gi, affiliatiosHiddenInputs)
                            .replace(/\{\{4\}\}/gi, submissionAuthors.$modalinput5.val())
                            .replace(/\{\{5\}\}/gi, rowNum)
                            .replace(/fakedinput/gi, "input");
                        submissionAuthors.$table.find("tbody").append(rowHtml);
                    }
                    else {
                        //edit row
                        var $rowToEdit = submissionAuthors.$table.find("tr[data-row-num=" + rowNum + "]");

                        var $td1 = $rowToEdit.find(submissionAuthors.td1);
                        $td1.find('.td-text').text(submissionAuthors.$modalinput1.val());
                        $td1.find('input').val(submissionAuthors.$modalinput1.val());

                        var $td2 = $rowToEdit.find(submissionAuthors.td2);
                        $td2.find('.td-text').text(submissionAuthors.$modalinput2.val());
                        $td2.find('input').val(submissionAuthors.$modalinput2.val());

                        var $td3 = $rowToEdit.find(submissionAuthors.td3);
                        $td3.find('.td-text').text(submissionAuthors.$modalinput3.val());
                        $td3.find('input').val(submissionAuthors.$modalinput3.val());

                        var $td4 = $rowToEdit.find(submissionAuthors.td4);
                        $td4.find('.td-text').text(affiliatiosText);
                        $td4.find('.affiliations__hidden-inputs').html(affiliatiosHiddenInputs);
                        $td4.find(submissionAuthors.affiliationsValues).html(affiliationsValue);

                        var $td5 = $rowToEdit.find(submissionAuthors.td5);
                        $td5.find('.td-text').text(submissionAuthors.$modalinput5.val());
                        $td5.find('input').val(submissionAuthors.$modalinput5.val());

                    }
                    submissionAuthors.$modal.modal('toggle');
                    submissionAuthors.saveAuthorsToArray();
                }

            });

            $body.on('click', '#addAuthor', function (e) {
                e.preventDefault();
                submissionAuthors.$modal.find(".mode").val('add');
                submissionAuthors.$modal.find(".row-num").val(submissionAuthors.$table.find('tbody tr').length);
                submissionAuthors.$modalinput1.val('');
                submissionAuthors.$modalinput2.val('');
                submissionAuthors.$modalinput3.val('');
                submissionAuthors.affilationMagicSuggest.clear();
                submissionAuthors.$modalinput5.val('');
                submissionAuthors.$modalValidationMessage.text('');
                submissionAuthors.$modalTitle.text('Add Author');
                submissionAuthors.$affiliationsTypes.text('');
                submissionAuthors.$modal.modal({backdrop: 'static', keyboard: false},'toggle');

            });

            $body.on('click', '.submission-authors .delete', function (e) {
                e.preventDefault();
                $(this).closest("tr").addClass('deleted hidden');
                $(this).closest("tr").html('');
                submissionAuthors.saveAuthorsToArray();
            });

            $body.on('click', '.submission-authors .edit', function (e) {
                e.preventDefault();
                submissionAuthors.on.beforeValidate();
                var rowNumber = $(this).closest("tr").data("row-num");
                submissionAuthors.$modal.find(".mode").val('edit');
                submissionAuthors.$modal.find(".row-num").val(rowNumber);
                submissionAuthors.$modalValidationMessage.text(' ');
                submissionAuthors.$modalinput1.val($(this).closest("tr").find(submissionAuthors.td1 + ' .td-text').html());
                submissionAuthors.$modalinput2.val($(this).closest("tr").find(submissionAuthors.td2 + ' .td-text').html());
                submissionAuthors.$modalinput3.val($(this).closest("tr").find(submissionAuthors.td3 + ' .td-text').html());

                submissionAuthors.affilationMagicSuggest.clear();
                var selectedValues = submissionAuthors.getAffiliationsSelectedItems($(this).closest("tr").find(submissionAuthors.affiliationsValues).html());
                if (selectedValues.length !== 0)
                    submissionAuthors.affilationMagicSuggest.setSelection(selectedValues);


                submissionAuthors.$affiliationsTypes.text(submissionAuthors.getAffiliationsTypes($(this).closest("tr")));
                submissionAuthors.$modalinput5.val($(this).closest("tr").find(submissionAuthors.td5 + ' .td-text').html());
                submissionAuthors.$modalTitle.text('Edit Author');
                submissionAuthors.$modal.modal({backdrop: 'static', keyboard: false},'toggle');
            });

        },
        getAffiliationsType: function (text, val) {
            var affArray = text.split(",");
            var type = "";
            $.each(affArray, function (i, arrayVal) {
                if (arrayVal.indexOf(val) >= 0) {
                    type = arrayVal.replace(val + "=", "");
                    return false;
                }
            })
            return type;

        },
        getAffiliationsSelectedItems: function (values) {
            var selectedValues = [];
            if (values) {
                var valuesArr = values.split(submissionAuthors.affilationsSplitter);
                $.each(valuesArr, function (i, arrayVal) {
                    var itemvals = arrayVal.split("|");
                    if (itemvals[0] == "text") {
                        selectedValues.push({label: itemvals[1], value: itemvals[1]})
                    }
                    else {
                        selectedValues.push({label: itemvals[2], value: itemvals[1]});
                    }
                })
            }
            return selectedValues;

        },
        getAffiliationsTypes: function ($row) {
            var $affiValus = $row.find('.affiliations__hidden-inputs input');
            var types = "";
            $affiValus.each(function (index) {
                if (($(this).val().indexOf("|") >= 0)) {
                    if ($(this).val().split("|")[0] != "text") {
                        types += $(this).val().split("|")[1] + "=" + $(this).val().split("|")[0] + ",";
                    }
                }
            });

            if (types != "")
                types = types.slice(0, -1);

            return types;
        },
        on: {
            doSuggest: function () {

                var affilationMagicSuggest = submissionAuthors.$modal.find('.aff-magicsuggest');
                submissionAuthors.affilationMagicSuggest = affilationMagicSuggest.magicSuggest({
                    data: submissionAuthors.$affiliationsAjaxLink.val(),
                    method: 'GET',
                    valueField: 'value',
                    autoSelect: false,
                    allowFreeEntries: false,
                    mode: "remote",
                    displayField: 'label',
                    hideTrigger: 'true',
                    useCommaKey: false
                });
            },
            beforeValidate: function() {
                $(".error").text("");
                $(".not-valid").removeClass("not-valid");
            },
            validate: function() {
                var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
                var result = true;
                $(".error").text('');
                $(".not-valid").removeClass("not-valid");

                if (submissionAuthors.$modalinput2.val() == "") {
                    submissionAuthors.$modalinput2.addClass("not-valid");
                    submissionAuthors.$modalinput2err.text(submissionAuthors.errText);
                    result = false;
                }
                if (submissionAuthors.$modalinput3.val() == "") {
                    submissionAuthors.$modalinput3.addClass("not-valid");
                    submissionAuthors.$modalinput3err.text(submissionAuthors.errText);
                    result = false;
                }

                if (submissionAuthors.$modalinput5.val() == "" || !re.test(submissionAuthors.$modalinput5.val())) {
                    submissionAuthors.$modalinput5.addClass("not-valid");
                    submissionAuthors.$modalinput5err.text(submissionAuthors.errEmailText);
                    result = false;
                }
                return result;
            }
        }

    };


    UX.submissionAuthors = submissionAuthors; // add to global namespace

})();