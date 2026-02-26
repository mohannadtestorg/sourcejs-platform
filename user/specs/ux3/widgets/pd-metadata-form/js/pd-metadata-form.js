(function () {

    var $body = $('body');

    var draftForm = {
        $form: $("#draftForm"),
        btnSubmit: "#draftForm [data-action]",
        btnRedirect: "#draftForm [data-redirect]",
        $notValid: $(".not-valid"),

        init: function(){
            draftForm.controller();
        },

        controller: function() {
            draftForm.$form.on('keyup keypress', function(e) {
                var keyCode = e.keyCode || e.which;
                if (keyCode === 13) {
                    e.preventDefault();
                    return false;
                }
            });
            
            $body.on('click', draftForm.btnSubmit, function(e) {
                e.preventDefault();
                var target = e.target;

                if (target.tagName === "BUTTON") {
                    draftForm.$form.attr("action", $(target).attr("data-action"));

                    if(target.id == "draft-form__submit") {
                        draftForm.validate();
                    }
                    else {
                        draftForm.$form.submit();
                    }
                }
            });

            $body.on('click', draftForm.btnRedirect, function(e) {
                e.preventDefault();
                var target = e.target;
                if (target.tagName === "BUTTON") {
                    window.location = $(target).attr("data-redirect");
                }
            });

            $('[name="basic-metadata.type"]').on('change', function(e) {
                $('[data-related-field="basic-metadata.type"]').addClass("hidden");
            });
        },
        validate: function () {
            var selectedType = $('[name="basic-metadata.type"]:checked').val();
            var requiredFields = [];
            var isValid = true;

            $('.metadata-form__message').addClass("hidden");

            //basic metadata
            requiredFields.push("basic-metadata.title");
            requiredFields.push("basic-metadata.abstract");
            requiredFields.push("basic-metadata.license"); //LICENSE
            requiredFields.push("editorial-category.uri"); //CATEGORY
            requiredFields.push("search-categories.uris"); //TAGS
            requiredFields.push("pdf.path__validator"); //PDF

            switch(selectedType) {
                case "poster":
                    requiredFields.push("basic-metadata.poster-meeting");
                    requiredFields.push("basic-metadata.poster-first-presented-date-ui");
                    break;
                case "preprint":
                    break;
                default:
                    $('[data-related-field="basic-metadata.type"]').removeClass("hidden");
                    isValid = false;
            }

            requiredFields.forEach( function(field) {
                var $element = $('[name="'+field+'"]');
                var tempSelector = "[data-related-field='"+ field +"']";
                $($element).removeClass("not-valid");
                if (!$element.val() || !$element.val().length || $element.val() == 0) {
                    isValid = false;
                    $(tempSelector).removeClass("hidden");
                    $($element).addClass("not-valid");
                }
            });

            if (isValid === true ) {
                draftForm.$form.submit();
            }
            else {
                var firstErrorMessage = $(".metadata-form__message:not(.hidden)")[0];
                $(document).scrollTop( $(firstErrorMessage).parent().offset().top - $('header').height() );

                $.each($(".not-valid"), function() {
                    $(this).on("focus", function(e) {
                        $(this).removeClass("not-valid");
                        $("[data-related-field='"+ $(this).attr("name") +"']").addClass("hidden");
                        $(this).off("focus");
                    });
                } );


                return false;
            }
        }
    };

    UX.draftForm = draftForm; // add to global namespace
})();
