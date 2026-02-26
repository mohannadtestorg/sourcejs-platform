(function () {
    var $body = $('body');

    var supplementalLinks = {

        $modal: null,
        $modalDesc: null,
        $modalValidationMessage: null,
        $modalUrl: null,
        $modalType:null,
        tdDesc: null,
        tdUrl: null,
        tdType:null,
        $table: null,
        $templateRow: null,
        $modalTitle: null,

        init: function () {
            this.$modal = $('#supplemental-links-modal');
            this.$modalDesc = $("#supp-link-description");
            this.$modalUrl = $("#supp-link-url");
            this.$modalType= $("#supp-link-type");
            this.tdDesc = ".description-td";
            this.tdUrl = ".url-doi-td";
            this.tdType = ".content-type-td";
            this.$modalValidationMessage = $(".modal-validation-message");
            this.$table = $('.supplemental-links__table');
            this.$templateRow = $('.supplemental-links .rowTemplate tr');
            this.$modalTitle = $("#supplemental-links-modal .modal__header");


            supplementalLinks.controller();
        },

        controller: function () {
            $body.on('click', '#saveSuppLink', function (e) {
                e.preventDefault();
                if (supplementalLinks.$modalDesc.val() == "" || supplementalLinks.$modalUrl.val() == "" || supplementalLinks.$modalType.val() == "") {
                    supplementalLinks.$modalValidationMessage.text("Please fill all fields ")
                }
                else {

                    if (supplementalLinks.$modal.find(".mode").val() == 'add') {
                        //add new row
                        var rowHtml = supplementalLinks.$templateRow[0].outerHTML;
                        rowHtml = rowHtml.replace(/\{\{0\}\}/gi, supplementalLinks.$modalDesc.val())
                            .replace(/\{\{1\}\}/gi, supplementalLinks.$modalUrl.val())
                            .replace(/\{\{2\}\}/gi, supplementalLinks.$modalType.val())
                            .replace(/\{\{2_type\}\}/gi, supplementalLinks.$modalType.find("option:selected").text())
                            .replace(/\{\{3\}\}/gi, supplementalLinks.$modal.find(".row-num").val())
                            .replace(/fakedinput/gi, "input");

                        supplementalLinks.$table.find("tbody").append(rowHtml);
                    }
                    else {
                        //edit row
                        var rowNum = supplementalLinks.$modal.find(".row-num").val();
                        var $rowToEdit = supplementalLinks.$table.find("tr[data-row-num=" + rowNum + "]");

                        var $descTD = $rowToEdit.find(supplementalLinks.tdDesc);
                        $descTD.find('.td-text').text(supplementalLinks.$modalDesc.val());
                        $descTD.find('input').val(supplementalLinks.$modalDesc.val());

                        var $urlTD = $rowToEdit.find(supplementalLinks.tdUrl);
                        $urlTD.find('.td-text').text(supplementalLinks.$modalUrl.val());
                        $urlTD.find('input').val(supplementalLinks.$modalUrl.val());

                        var $typeTD = $rowToEdit.find(supplementalLinks.tdType);
                        $typeTD.find('.td-text').text(supplementalLinks.$modalType.find("option:selected").text());
                        $typeTD.find('input').val(supplementalLinks.$modalType.val());

                    }
                    supplementalLinks.$modal.modal('toggle');
                }

            });

            $body.on('click', '#addSuppLink', function (e) {
                e.preventDefault();
                supplementalLinks.$modal.find(".mode").val('add');
                supplementalLinks.$modal.find(".row-num").val(supplementalLinks.$table.find('tbody tr').length);
                supplementalLinks.$modalDesc.val('');
                supplementalLinks.$modalUrl.val('');
                supplementalLinks.$modalType.val('');
                supplementalLinks.$modal.find('.jcf-select-submission__select >.jcf-select-text >span').html("--Select--");
                supplementalLinks.$modalValidationMessage.text('');
                supplementalLinks.$modalTitle.text('Add Supplemental Link');
                supplementalLinks.$modal.modal({backdrop: 'static', keyboard: false},'toggle');

            });

            $body.on('click', '.supplemental-links .delete', function (e) {
                e.preventDefault();
                $(this).closest("tr").addClass('deleted hidden')
                $(this).closest("tr").html('')
            });

            $body.on('click', '.supplemental-links .edit', function (e) {
                e.preventDefault();
                var rowNumber = $(this).closest("tr").data("row-num");

                supplementalLinks.$modal.find(".mode").val('edit');
                supplementalLinks.$modal.find(".row-num").val(rowNumber);
                supplementalLinks.$modalValidationMessage.text(' ');
                supplementalLinks.$modalDesc.val($(this).closest("tr").find(supplementalLinks.tdDesc + ' .td-text').html());
                supplementalLinks.$modalUrl.val($(this).closest("tr").find(supplementalLinks.tdUrl + ' .td-text').html());
                supplementalLinks.$modalType.val($(this).closest("tr").find(supplementalLinks.tdType + ' input').val());
                supplementalLinks.$modal.find('.jcf-select-submission__select >.jcf-select-text >span').html($(this).closest("tr").find(supplementalLinks.tdType + ' .td-text').html());
                supplementalLinks.$modalTitle.text('Edit Supplemental Link');
                supplementalLinks.$modal.modal({backdrop: 'static', keyboard: false},'toggle');
            });

        }

    };

    UX.supplementalLinks = supplementalLinks; // add to global namespace

})();