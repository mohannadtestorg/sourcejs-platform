(function(){
    var $body = $('body');

    var basicMetadata = {
        posterMeetingName: null,
        typeName: null,
        container:null,
        $additionalInformation: null,
        $submittedInput:null,


        init: function () {
            this.posterMeetingName = ".basic-metadata__meeting-name";
            this.$additionalInformation = $(".meeting-additional-information");
            this.typeName = "[name='basic-metadata.type']";
            // this.posterMeetingDate = ".basic-metadata__meeting-date";
            this.container = ".basic-metadata";
            this.$submittedInput = $("[name='basic-metadata.preprint-submitted-to']");

            basicMetadata.on.build();

            if ($(basicMetadata.posterMeetingName).length > 0) {
                basicMetadata.controller();
                basicMetadata.on.handleAdditional();
            }

        },
        on:{
            build:function() {
                //initialize jqueru ui autocomplete
                var $autocomplete=$(basicMetadata.container).find(".ux3-autocomplete");
                $autocomplete.autocomplete({
                    source: function( request, response ) {
                        $.ajax( {
                            url: $autocomplete.data("url"),
                            dataType: "json",
                            data: {
                                query: request.term
                            },
                            success: function( data ) {
                                response($.map(data, function (el) {
                                    return {
                                        label: el.label,
                                        value: el.label,
                                        id:el.value
                                    };
                                }));
                            }
                        } );
                    },
                    open: function() {
                        $(".ui-menu.ui-autocomplete").width( $(this).innerWidth() );
                    },
                    minLength: 2,
                    select: function( event, ui ) {
                        basicMetadata.$submittedInput.val(ui.item.id);
                    }
                } );
            },
            handleAdditional: function () {
                var el = $(basicMetadata.posterMeetingName);
                $(".meeting-additional-information__location").text( "" );
                $(".meeting-additional-information__date").text( "" );

                if (el.val() != "" ) {

                    var location = el[0].selectedOptions[0].attributes["data-meeting-location"];
                    if (location) {
                        $(".meeting-additional-information__location").text( location.value );
                    }
                    var date = el[0].selectedOptions[0].attributes["data-meeting-date"];
                    if (date) {
                        $(".meeting-additional-information__date").text( date.value );
                    }
                    basicMetadata.$additionalInformation.removeClass("hidden");
                }
                else {
                    basicMetadata.$additionalInformation.addClass("hidden");
                }
            }
        },
        controller: function () {
            $body.on('click', basicMetadata.typeName, function (e) {
                if ($(this).val() == "poster") {
                    $(".poster").show();
                    $(".preprint").hide();
                }
                else {
                    $(".poster").hide();
                    $(".preprint").show();
                }

            });

            $body.on('change', basicMetadata.posterMeetingName, basicMetadata.on.handleAdditional );

        }
    };

    UX.basicMetadata = basicMetadata; // add to global namespace


})();