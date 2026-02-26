(function () {

    var $body = $('body');

    var funders = {

        magicSuggestData: null,
        $modal: null,
        $modalName: null,
        $modalValidationMessage: null,
        $modalNumber: null,
        $modalRecipient: null,
        $funderAjaxLink: null,
        td1: null,
        td2: null,
        td3: null,
        $table: null,
        $templateRow: null,
        $modalTitle: null,
        magicSuggest: null,
        fundersValues: null,
        $funderInputTemplate: null,

        init: function () {
            this.$modal = $('#funders-modal');
            this.$funderAjaxLink = $("#funderAjaxLink");
            this.$modalName = $("#funder-name");
            this.$modalNumber = $("#funder-grant-number");
            this.$modalRecipient = $("#funder-recipient");
            this.td1 = ".funder-td";
            this.td2 = ".grant-number-td";
            this.td3 = ".recipient-funder-td";
            this.$modalValidationMessage = $(".modal-validation-message");
            this.$table = $('.funders__table');
            this.$templateRow = $('.funders .rowTemplate tr');
            this.$modalTitle = $("#funders-modal .modal__header");
            this.fundersValues = ".td-funders-val";
            this.$funderInputTemplate = $(".funderInputTemplate");

            funders.controller();
            funders.on.doSuggest();
        },
        fillAuthors: function () {
            if (UX.submissionAuthors.list && funders.$modalRecipient) {
                funders.$modalRecipient.find("option").remove();
                var authors = UX.submissionAuthors.list;
                funders.$modalRecipient.append('<option value="Other">Other</option>');
                for (var index = 0; index < authors.length; index++) {
                    funders.$modalRecipient.append('<option value="'+authors[index]+'">'+authors[index]+'</option>');
                }
                if ($(funders.$modalRecipient).length > 0)
                    $(funders.$modalRecipient)[0].selectedIndex = 0;
            }
        },
        controller: function () {
            $body.on('click', '#saveFunder', function (e) {
                e.preventDefault();
                if (funders.$modalNumber.val() == "" || funders.$modalRecipient.val() == "") {
                    funders.$modalValidationMessage.text("Please fill all fields ")
                }
                else {

                    var fundersValue = "";
                    var fundersText = "";
                    var $fundersValue = $('[name="funder-name[]"]');
                    var $fundersText = $('#funder-name .ms-sel-item');
                    var rowNum = funders.$modal.find(".row-num").val();
                    var funderHiddenInputs = "";

                    $fundersValue.each(function (index) {
                        fundersValue += $(this).val();
                        if (index != $fundersValue.length - 1)
                            fundersValue += ",";

                        funderHiddenInputs += funders.$funderInputTemplate.html()
                            .replace(/\{\{0\}\}/gi, $(this).val())
                            .replace(/\{\{1\}\}/gi, rowNum)
                            .replace(/fakedinput/gi, "input");

                    });

                    $fundersText.each(function (index) {
                        fundersText += $(this).text();
                        if (index != $fundersText.length - 1)
                            fundersText += ",";
                    });


                    if (funders.$modal.find(".mode").val() == 'add') {
                        //add new row
                        var rowHtml = funders.$templateRow[0].outerHTML;
                        rowHtml = rowHtml.replace(/\{\{0\}\}/gi, fundersText)
                            .replace(/\{\{0_val\}\}/gi, fundersValue)
                            .replace(/\{\{0_inputs\}\}/gi, funderHiddenInputs)
                            .replace(/\{\{1\}\}/gi, funders.$modalNumber.val())
                            .replace(/\{\{2\}\}/gi, funders.$modalRecipient.val())
                            .replace(/\{\{3\}\}/gi, rowNum)
                            .replace(/fakedinput/gi, "input");

                        funders.$table.find("tbody").append(rowHtml);
                    }
                    else {
                        //edit row
                        var $rowToEdit = funders.$table.find("tr[data-row-num=" + rowNum + "]");

                        var $td1 = $rowToEdit.find(funders.td1);
                        $td1.find('.td-text').text(fundersText);
                        $td1.find('.funder__hidden-inputs').html(funderHiddenInputs);
                        $td1.find(funders.fundersValues).html(fundersValue);

                        var $td2 = $rowToEdit.find(funders.td2);
                        $td2.find('.td-text').text(funders.$modalNumber.val());
                        $td2.find('input').val(funders.$modalNumber.val());

                        var $td3 = $rowToEdit.find(funders.td3);
                        $td3.find('.td-text').text(funders.$modalRecipient.val());
                        $td3.find('input').val(funders.$modalRecipient.val());

                    }
                    funders.$modal.modal('toggle');
                }

            });

            $body.on('click', '#addGrant', function (e) {
                e.preventDefault();
                funders.$modal.find(".mode").val('add');
                funders.$modal.find(".row-num").val(funders.$table.find('tbody tr').length);
                funders.magicSuggest.clear();
                funders.$modalNumber.val('');
                $(funders.$modalRecipient)[0].selectedIndex = 0;
                funders.$modalValidationMessage.text('');
                funders.$modalTitle.text('Add Funder');
                funders.$modal.modal({backdrop: 'static', keyboard: false}, 'toggle');

            });

            $body.on('click', '.funders .delete', function (e) {
                e.preventDefault();
                $(this).closest("tr").addClass('deleted hidden');
                $(this).closest("tr").html('');
            });

            $body.on('click', '.funders .edit', function (e) {
                e.preventDefault();
                var rowNumber = $(this).closest("tr").data("row-num");

                funders.$modal.find(".mode").val('edit');
                funders.$modal.find(".row-num").val(rowNumber);
                funders.$modalValidationMessage.text(' ');
                funders.$modalNumber.val($(this).closest("tr").find(funders.td2 + ' .td-text').html());

                var selectedFunders = $(this).closest("tr").find(funders.fundersValues).html().split(",");
                funders.magicSuggest.clear();
                if (selectedFunders != "")
                    funders.magicSuggest.setValue(selectedFunders);//if problem occure here you can use "setSelection" check pd-author.js

                var selectedRecipient = $(this).closest("tr").find(funders.td3 + ' .td-text').html();
                var selectRecipientsOptions = $(funders.$modalRecipient).find("option");
                $(funders.$modalRecipient)[0].selectedIndex = 0;
                selectRecipientsOptions.each( function(index, option) {
                    if ( $(option).val() == selectedRecipient) {
                        $(funders.$modalRecipient)[0].selectedIndex = index;
                    }
                });

                funders.$modalTitle.text('Edit Funder');
                funders.$modal.modal({backdrop: 'static', keyboard: false}, 'toggle');
            });

        },
        on: {
            doSuggest: function () {

                funders.$modal.find('.magicsuggest').each(function () {

                    var data;

                    if (funders.magicSuggestData == null)
                        funders.magicSuggestData = funders.$funderAjaxLink.val();


                    funders.magicSuggest = $(this).magicSuggest({
                        data: funders.magicSuggestData,
                        method: 'GET',
                        valueField: 'value',
                        autoSelect: false,
                        allowFreeEntries: false,
                        displayField: 'label',
                        hideTrigger: 'true',
                        useCommaKey: false,
                        mode: "remote"

                    });
                });

            }
        }
    };

    UX.funders = funders; // add to global namespace
})();