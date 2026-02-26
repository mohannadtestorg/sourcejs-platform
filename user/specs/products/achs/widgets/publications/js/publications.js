(function () {
    $.fn.publications = function () {
        return $(this).each(function () {
            // variables
            var $pub = $(this);
            var $publicationsList = $(this).find(".pub-content");
            // data
            var $widgetData = JSON.parse($(this).find("input[name='pubModalData']").val());

            // fill the publications list
            fillPublicationsList($widgetData.publications, $publicationsList);

            // fill the publications list function
            function fillPublicationsList($data, $into) {
                for ($i in $data) {
                    // char
                    $into.append("<span class='journals'><span>"+$data[$i].char+"</span></span>");

                    // publications
                    for ($p in $data[$i].publications) {
                        var $classes = "";
                        $classes += "pub_"+$data[$i].publications[$p].type+" ";
                        $classes += $data[$i].publications[$p].type+" ";

                        for($s in $data[$i].publications[$p].subjects) {
                            $classes += $data[$i].publications[$p].subjects[$s].code+" ";
                        }

                        $into.append("<a href='"+$data[$i].publications[$p].url+"' class='"+$classes+"'>"+$data[$i].publications[$p].name+"</a>");
                    }
                }
            }
        });
    };
    $.fn.pubModal = function ($pubModalButton) {
        return $(this).each(function () {
            // variables
            var $pubModal = $(this);
            var $closeButton = $(this).find(".pub-modal_close");
            var $backButton = $(this).find(".pub-modal_back");
            var $typesList = $(this).find(".pub-modal_types-list");
            var $selectedType = "";
            var $typesList_items = "";
            var $subjectsContainer = $(this).find(".pub-modal_subjects");
            var $subjectsList = $(this).find(".pub-modal_subjects-list");
            var $subjectsLinksList ="";
            var $subjectsList_items = "";
            var $pubModalRight = $(this).find(".pub-modal_right");
            var $publicationsList = $(this).find(".pub-content");
            var $publicationsList_items = "";
            var $publicationsList_char = "";
            var $vPort = "screen-sm";
            var $isMobile = false;
            // data
            var $widgetData = JSON.parse($(this).find("input[name='pubModalData']").val());

            // fill the types list
            fillTypesList($widgetData.types, $typesList);

            // fill the subjects list
            fillSubjectsList($widgetData.subjects, $subjectsList);

            // set variables values
            $typesList_items = $typesList.find("a");
            $subjectsList_items = $subjectsList.find("input[type='checkbox']");
            $subjectsLinksList = $(this).find(".pub-modal_subjects-links-list");
            $publicationsList_items = $publicationsList.find("> *");

            // is mobile
            $(document).on($vPort+'-on',function(){
                $isMobile= true;
            });

            $(document).on($vPort+'-off',function(){
                $isMobile= false;
                slideInRight($pubModalRight);
            });

            // types filter
            $typesList_items.click(function () {
                var $selectedCheckboxes = $subjectsList.find("input[type='checkbox']:checked");
                var $selectedSubjects = "";
                var $thisItem = $(this).parent();
                if($thisItem.hasClass("pub-modal_types-active")==false) {
                    $typesList_items.parent().removeClass("pub-modal_types-active");
                    $thisItem.addClass("pub-modal_types-active");
                    $selectedType = $thisItem.data("type");

                    if ($thisItem.data("type") == "all" || $thisItem.data("type") == "") {
                        $subjectsContainer.fadeIn("slow");

                        if($selectedCheckboxes.length) {
                            $publicationsList_items.hide();
                            $.each($selectedCheckboxes, function () {
                                $selectedSubjects+="."+ $(this).data("subject");
                            });

                            $publicationsList.find($selectedSubjects).fadeIn("slow");
                        }
                        else {
                            $publicationsList_items.fadeIn("slow");
                        }
                    }
                    else if($thisItem.data("type") == "journals") {
                        if(!$isMobile) {
                            $subjectsContainer.fadeIn("slow");
                            $publicationsList_items.hide();

                            if($selectedCheckboxes.length) {
                                $.each($selectedCheckboxes, function () {
                                    $selectedSubjects+="."+ $(this).data("subject");
                                });

                                $publicationsList.find($selectedSubjects).fadeIn("slow");
                            }
                            else {
                                $publicationsList_items.hide();
                                $publicationsList.find("." + $thisItem.data("type")).fadeIn("slow");
                            }
                        }
                    }
                    else {
                        $publicationsList_items.hide();
                        $publicationsList.find("." + $thisItem.data("type")).fadeIn("slow");
                        $subjectsContainer.hide();
                    }
                }

                if($isMobile && $thisItem.data("type") != "journals") {
                    slideInRight($pubModalRight);
                }

                if($isMobile && $thisItem.data("type") == "journals"){
                    $subjectsLinksList.slideToggle("slow");
                    $thisItem.toggleClass("pub-modal_types-opened");
                }

                if($thisItem.data("type") == "all" || $thisItem.data("type") == "" || $thisItem.data("type") == "books" || $thisItem.data("type") == "news") {
                    $subjectsLinksList.slideUp("slow");
                    $typesList_items.parent().removeClass("pub-modal_types-opened");
                }
            });

            // subjects filter
            $subjectsList_items.change(function () {
                var $selectedCheckboxes = $subjectsList.find("input[type='checkbox']:checked");
                var $selectedSubjects = "";

                if($selectedCheckboxes.length) {
                    $publicationsList_items.hide();

                    $.each($selectedCheckboxes, function () {
                        $selectedSubjects+="."+ $(this).data("subject");
                    });

                    $publicationsList.find($selectedSubjects).fadeIn("slow");
                }
                else {
                    if($selectedType=="all" || $selectedType == "") {
                        $publicationsList_items.show("slow");
                    }
                    else {
                        $publicationsList.find("."+ $selectedType).fadeIn("slow");
                    }
                }

            });

            // show button
            $pubModalButton.click(function () {
                $("body").addClass("acs_noscroll");
                $pubModal.show();
            });

            // close button
            $closeButton.click(function () {
                if($isMobile) {
                    slideOutRight($pubModalRight,$publicationsList);
                }
                $("body").removeClass("acs_noscroll");
                $pubModal.hide();
            });

            // back button
            $backButton.click(function () {
                slideOutRight($pubModalRight,$publicationsList);
            });

            // Esc key
            $(document).keyup(function(e) {
                if (e.keyCode === 27) {
                    $("body").removeClass("acs_noscroll");
                    $pubModal.hide();
                }
            });

            // fill the types list function
            function fillTypesList($data, $into) {
                for ($i in $data) {
                    $into.append("<li data-type='"+$data[$i].code+"'><a href='#'>"+$data[$i].label+"</a></li>");

                    if($data[$i].code=="journals") {
                        var $lastChild = $into.find("li:last-child");
                        $lastChild.append("<ul class='pub-modal_subjects-links-list hidden-lg hidden-md'></ul>");
                        fillSubjectsLinksList($widgetData.subjects, $lastChild.find("ul"));
                    }
                }
            }


            // fill the subjects list function
            function fillSubjectsList($data, $into) {
                for ($i in $data) {
                    $into.append("<li><label class='checkbox--primary'><input type='checkbox' data-subject='"+$data[$i].code+"'/><span>"+$data[$i].label+"</span></label></li>");
                }
            }

            // fill the subjects links list function (mobile)
            function fillSubjectsLinksList($data, $into) {
                for ($i in $data) {
                    $into.append("<li data-type='"+$data[$i].code+"'><a>"+$data[$i].label+"</a></li>");
                }
            }

            // slideIn Right
            function slideInRight($item) {
                $item.animate({right:"0%"},500);
            }

            // slideOut Right
            function slideOutRight($item,$pubList) {
                $item.animate({right:"-100%"},500);
                $pubList.scrollTop(0);
            }

        });
    };
})();