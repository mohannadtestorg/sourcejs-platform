(function () {
    var $body = $('body'),
        SUPPLEMENTAL_FILES = "supplementalFiles",
        PDF_FILE = "pdf.path";

    var fileUploader = {

        $uploaders: null,
        init: function () {
            //https://css-tricks.com/drag-and-drop-file-uploading/
            //https://css-tricks.com/examples/DragAndDropFileUploading/?submit-on-demand
            // applying the effect for every uploader
            fileUploader.$uploaders = $('.uploader');

            $.each(fileUploader.$uploaders, function (i, uploader) {
                var input = uploader.querySelector('.uploader__file'),
                    validator = uploader.querySelector('[name="pdf.path__validator"]'),
                    label = uploader.querySelector('.uploader__input label'),
                    uploadMsg = uploader.querySelector('.uploader__message'),
                    uploaderButton = uploader.querySelector(".uploader__button"),
                    uploaderProgress = uploader.querySelector(".uploader__progress"),
                    uploaderInputContainer = uploader.querySelector('.uploader__input'),
                    processingContainer = uploader.querySelector('.uploader__processing'),
                    uploaderInputWrapper = uploader.querySelector('.uploader__input-wrapper'),
                    filesToUpload = false,

                    showFiles = function (files) {
                        label.textContent = files.length > 1 ? ( input.getAttribute('data-multiple-caption') || '' ).replace('{count}', files.length) : files[0].name;
                        $(uploadMsg).html('');
                        $(uploaderInputWrapper).removeClass('error-input');
                        $(uploaderButton).removeAttr('disabled');

                    };

                // automatically submit the uploader on file select
                input.addEventListener('change', function (e) {
                    filesToUpload = e.target.files;
                    showFiles(e.target.files);

                    if (uploaderButton) {
                        $(uploaderButton).trigger( 'click' );
                    } // automatic upload
                });


                // drag&drop files if the feature is available

                ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (event) {
                    uploader.addEventListener(event, function (e) {
                        // preventing the unwanted behaviours
                        e.preventDefault();
                        e.stopPropagation();
                    });
                });
                ['dragover', 'dragenter'].forEach(function (event) {
                    uploader.addEventListener(event, function () {
                        $(uploader).addClass('is-dragover');
                    });
                });
                ['dragleave', 'dragend', 'drop'].forEach(function (event) {
                    uploader.addEventListener(event, function () {
                        $(uploader).removeClass('is-dragover');
                    });
                });
                uploader.addEventListener('drop', function (e) {
                    filesToUpload = e.dataTransfer.files; // the files that were dropped
                    showFiles(filesToUpload);

                    if (uploaderButton) {
                        $(uploaderButton).trigger( 'click' );
                    } // automatic upload
                });

                //click upload btn
                if (uploaderButton) {
                    // if the uploader was submitted
                    uploaderButton.addEventListener('click', function (e) {
                        $(validator).val("false");
                        $('.metadata-form__message').addClass("hidden");
                        //if there's no uploaded files
                        if (!filesToUpload) {
                            $(uploadMsg).text('Please choose file to upload!');
                            $(uploaderInputWrapper).addClass('error-input');
                            return false;
                        }
                        $(processingContainer).removeClass("hide");
                        $(uploaderProgress).removeClass('hide');

                        $(uploaderButton).attr('disabled');
                        $(uploadMsg).text('');
                        $(uploaderInputWrapper).removeClass('error-input');
                        e.preventDefault();


                        // gathering the form data
                        var ajaxData = new FormData();
                        ajaxData.append("doi", uploader.getAttribute("data-doi"));
                        ajaxData.append("anti-forgery-token", uploader.getAttribute("data-forgery"));
                        ajaxData.append("signature", uploader.getAttribute("data-signature"));

                        switch ($(input).attr("id")) {
                            case PDF_FILE:
                                ajaxData.append("type", "pdf");
                                break;
                            case SUPPLEMENTAL_FILES:
                                ajaxData.append("type", "supplementary_material");
                                break;
                            default:
                                ajaxData.append("type", "");
                        }

                        Array.prototype.forEach.call(filesToUpload, function (file) {
                            ajaxData.append("files", file);
                        });

                        $.ajax({
                            xhr: function () {
                                var xhr = new window.XMLHttpRequest();
                                xhr.upload.addEventListener("progress", function (evt) {
                                    if (evt.lengthComputable) {
                                        var percentComplete = evt.loaded / evt.total;
                                        $(uploaderProgress).css({
                                            width: percentComplete * 100 + '%'
                                        });
                                        if (percentComplete === 1) {
                                            // $(uploaderProgress).addClass('hide');
                                        }
                                    }
                                }, false);
                                xhr.addEventListener("progress", function (evt) {
                                    if (evt.lengthComputable) {
                                        var percentComplete = evt.loaded / evt.total;
                                        $(uploaderProgress).css({
                                            width: percentComplete * 100 + '%'
                                        });
                                    }
                                }, false);
                                return xhr;
                            },

                            type: "POST",
                            url: uploader.getAttribute("data-uploadLink"),
                            dataType: "json",
                            data: ajaxData,
                            contentType: false,
                            processData: false,
                            cache: false,
                            async: true,
                            success: function (data) {
                                $("[data-related-field='pdf.path__validator']").addClass("hidden");
                                $(processingContainer).addClass("hide");
                                $(uploaderProgress).css({width: 0});
                                $(uploaderProgress).addClass('hide');
                                if (data.success == true) {
                                    $(validator).val("1");
                                    $(uploaderButton).attr('disabled');

                                    if ($(input).attr("id") == SUPPLEMENTAL_FILES && UX.supplementalFiles) {
                                        $(label).html("<span>File successfully uploaded.</span> <br/><span class=\"uploader__dragndrop\">Drag and Drop File or</span> <span class=\"link\">Select Another File to Upload</span>.");
                                        UX.supplementalFiles.on.add(ajaxData);
                                    }
                                    else if ($(input).attr("id") == PDF_FILE && UX.pdPdf) {
                                        $(label).html("<span>File successfully uploaded.</span> <br/><span>Drag and drop or </span> <span class=\"link\">select to replace the existing file</span>. ");
                                        UX.pdPdf.on.add(ajaxData);
                                    }
                                }
                                else {
                                    $(validator).val($(validator).val());
                                    $(label).html("<span>"+data.message+"</span> <br/><span class=\"uploader__dragndrop\">Drag and Drop File or</span> <span class=\"link\">Select Another File to Upload</span>.");
                                    $(uploaderButton).removeAttr('disabled');
                                }

                            },
                            error: function (e) {
                                $(validator).val("false");
                                $(uploaderProgress).css({width: 0});
                                $(uploaderProgress).addClass('hide');
                                $(processingContainer).addClass("hide");
                                $(uploaderButton).removeAttr('disabled');
                                $(uploadMsg).text('Error. Please, try again!');
                                $(uploaderInputWrapper).addClass('error-input');
                            }
                        });
                    });
                }
            });
        }
    };

    UX.fileUploader = fileUploader; // add to global namespace

})();