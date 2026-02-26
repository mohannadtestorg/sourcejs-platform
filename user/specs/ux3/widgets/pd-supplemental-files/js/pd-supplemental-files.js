(function () {
    var $body = $('body');

    var supplementalFiles = {

        $modal: null,
        $modalDesc: null,
        $modalValidationMessage: null,
        $modalPath: null,
        tdDesc: null,
        tdPath: null,
        $table: null,
        $templateRow: null,
        $modalTitle: null,

        init: function () {
            this.$modal = $('#supplemental-files-modal');
            this.$modalDesc = $("#supp-file-description");
            this.tdDesc = ".description-td";
            this.tdPath = ".path-td";
            this.$modalValidationMessage = $(".modal-validation-message");
            this.$table = $('.supplemental-files__table');
            this.$templateRow = $('.supplemental-files .rowTemplate tr');
            this.$modalTitle = $("#supplemental-files-modal .modal__header");

            supplementalFiles.controller();
        },

        controller: function () {
            $body.on('click', '#saveSuppFile', function (e) {
                e.preventDefault();
                if (supplementalFiles.$modalDesc.val() == "") {
                    supplementalFiles.$modalValidationMessage.text("Please fill all fields ")
                }
                else {
                    supplementalFiles.on.edit();
                }
                supplementalFiles.$modal.modal('toggle');

            });

            $body.on('click', '.supplemental-files .delete', function (e) {
                e.preventDefault();
                $(this).closest("tr").addClass('deleted hidden')
                $(this).closest("tr").html('')
            });

            $body.on('click', '.supplemental-files .edit', function (e) {
                e.preventDefault();
                var rowNumber = $(this).closest("tr").data("row-num");

                supplementalFiles.$modal.find(".mode").val('edit');
                supplementalFiles.$modal.find(".row-num").val(rowNumber);
                supplementalFiles.$modalValidationMessage.text(' ');
                supplementalFiles.$modalDesc.val($(this).closest("tr").find(supplementalFiles.tdDesc + ' .td-text').html());
                supplementalFiles.$modalTitle.text('Edit Supplemental Link');
                supplementalFiles.$modal.modal('toggle');
            });

        },
        on: {
            add: function (data) {
                // add row
                var files = data.getAll("files");
                var len = supplementalFiles.$table.find("tbody tr").length;
                Array.prototype.forEach.call(files, function (file) {
                    var rowHtml = supplementalFiles.$templateRow[0].outerHTML;
                    rowHtml = rowHtml.replace(/fakedinput/gi, "input");
                    rowHtml=rowHtml.replace(/\{\{0\}\}/gi,file.name)
                        .replace(/\{\{1\}\}/gi,file.name)
                        .replace(/\{\{3\}\}/gi, len++);
                    supplementalFiles.$table.find("tbody").append(rowHtml);
                    var selectors = supplementalFiles.$table.find(".future-jcf");
                    selectors.removeClass(".future-jcf");
                    selectors.addClass(".jcf");
                    jcf.replace(selectors);

                    if (UX.editInPlace) {
                        UX.editInPlace.init();
                    }
                });
            },
            edit: function () {
                var rowNum = supplementalFiles.$modal.find(".row-num").val();
                var $rowToEdit = supplementalFiles.$table.find("tr[data-row-num=" + rowNum + "]");

                var $descTD = $rowToEdit.find(supplementalFiles.tdDesc);
                $descTD.find('.td-text').text(supplementalFiles.$modalDesc.val());
                $descTD.find('input').val(supplementalFiles.$modalDesc.val());
            }
        }
    };

    UX.supplementalFiles = supplementalFiles; // add to global namespace
})();