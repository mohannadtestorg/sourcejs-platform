(function () {

    var $body = $('body');

    var pdActionBar = {
        actionBarSelector: ".pd-action-bar",
        defaultCommentsSelector: ".js-defaultComments",
        btnSubmit: "[data-action]",
        btnRedirect: "[data-redirect]",
        confirmationHTML: "<div class=\"toast toast--success\"><i aria-hidden=\"true\" class=\"icon-check\"></i><div class=\"toast__text\">You have successfully submitted the article</div> </div>",
        validReferrer: "/action/showDraft",

        init: function(){
            pdActionBar.controller();
            pdActionBar.on.build();

            if (window.performance && performance.navigation.type == 0) {
                var documentReferrer = document.referrer;
                if (documentReferrer) {
                    var urlDocumentReferrer = new URL(documentReferrer);
                    var urlDocumentLocation = new URL(document.location);
                    if (urlDocumentLocation.hash == "#submission-successful" && urlDocumentReferrer.pathname == pdActionBar.validReferrer) {
                        this.showConfirmation(urlDocumentLocation.pathname);
                    }
                }
            }
        },

        controller: function() {
            $body.on('click', pdActionBar.btnSubmit, function(e) {
                e.preventDefault();
                var target = e.target;
                if (target.tagName === "BUTTON") {
                    var $form = $(pdActionBar.actionBarSelector).find("form");
                    $form.attr("action", $(target).attr("data-action"));
                    $form.submit();
                }
            });
            $body.on('click', pdActionBar.btnRedirect, function(e) {
                e.preventDefault();
                var target = e.target;
                if (target.tagName === "BUTTON") {
                    window.location = $(target).attr("data-redirect");
                }
            });

            var $defaultComments = $(pdActionBar.defaultCommentsSelector);
            if( $defaultComments.length ) {
                $defaultComments.on('change', "[type='radio']", function(e) {
                    var target = $(this).closest(pdActionBar.defaultCommentsSelector).data("defaultcommenttarget");
                    var text = $(this).data("defaultcomment");
                    $(target).val(text);
                    $(target).focus();
                 });
            }
        },
        on: {
            build: function () {
                //initialize jqueru ui autocomplete
                var $autocomplete = $(".ux-modal-container").find(".ux3-autocomplete");
                $autocomplete.autocomplete({
                    source: function (request, response) {
                        $.ajax({
                            url: $autocomplete.data("url"),
                            dataType: "json",
                            data: {
                                query: request.term
                            },
                            success: function (data) {
                                response($.map(data, function (el) {
                                    return {
                                        label: el.label,
                                        value: el.label,
                                        id: el.value
                                    };
                                }));
                            }
                        });
                    },
                    open: function () {
                        $(".ui-menu.ui-autocomplete").width($(this).innerWidth());
                    },
                    minLength: 2,
                    select: function (event, ui) {
                        $("[name='submitted-to']").val(ui.item.id);
                    }
                });
            }
        },
        showConfirmation: function(redirectionUrl) {
            var el = $(".pdActionBar");
            var delay = 3000;
            if (el) {
                el.prepend(pdActionBar.confirmationHTML);
                var timeoutID = window.setTimeout(function() {
                    $(".toast").fadeOut();
                    document.location = redirectionUrl;
                }, delay);
            }
        }
    };

    UX.pdActionBar = pdActionBar; // add to global namespace
})();