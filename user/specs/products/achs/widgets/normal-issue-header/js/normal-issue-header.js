(function () {
    var niHeader = {
        $tocGroupHeading: "",
        $inIssueTitelAndList: "",
        $smallImgs: "",
        $largeImg: "",
        $textContainer: "",
        $downloadLink: "",
        $doi: "",
        $serviceUrl: "/pb/widgets/tocListWidgetController/getLargeCoverImage",
        init: function () {
            niHeader.$tocGroupHeading= $('.toc_group-heading');
            niHeader.$inIssueTitel= $('.niHeader_in-issue > h6');
            niHeader.$smallImgs= $(".niHeader_covers-sm img");
            niHeader.$largeImg= $(".niHeader_covers-lg img");
            niHeader.$textContainer= $(".niHeader_about-caption div");
            niHeader.$downloadLink= $(".niHeader_about-links a");
            niHeader.$doi= $("input[name='niHeader_doi']").val();

            niHeader.fillInThisIssue();
            niHeader.controller();
        },
        controller: function () {
            niHeader.$smallImgs.click(function(){
                var $imgPath = $(this).attr("src");

                $.get(niHeader.$serviceUrl,
                {
                    issueDOI: niHeader.$doi,
                    fileName: $imgPath.substring($imgPath.lastIndexOf("/")+1,$imgPath.length),
                    imageLocation: $(this).data("loc")
                },
                function($data, $status){
                    $data = JSON.parse($data);
                    niHeader.$largeImg.fadeOut("slow", function () {
                        $(this).attr("src", $data.coverImage[0].coverPath);
                        $(this).fadeIn("slow");
                    });
                    niHeader.$textContainer.html($data.coverImage[0].coverCaption);
                    niHeader.$downloadLink.attr("href", $data.coverImage[0].coverPath);
                }).fail(function() {
                    console.log("error");
                });
            });

            niHeader.$downloadLink.click(function(event){
                // read the image path to assign the four required variables
                var imgPath = niHeader.$largeImg.attr('src');

                // grab only the relevant part of the url
                imgPath = imgPath.match(/.*\/(.*?issue-.*?)\D/)[1];
                var coden = imgPath.match(/(.*?)\./)[1];
                var year = imgPath.match(/.*\.(\d\d\d\d)\./)[1];
                // convert string to number
                year = (+year);

                if (coden == "jacsat") {
                    if (year < 2009) return false;
                }
                else {
                    if (year < 2010) return false;
                }

                var volume = imgPath.match(/.*\.(.*?)\./)[1];
                var issue = imgPath.match(/.*?issue-(\d+)\D?/)[1];
                var suffix = niHeader.$largeImg.attr("src").split("largecover")[1];

                // normalize volumes to 3-digits
                if (volume.length == 1) volume = "00"+volume;
                else if (volume.length == 2) volume = "0"+volume;

                // normalize issues to 3-digits
                if (issue.length == 1) issue = "00"+issue;
                else if (issue.length == 2) issue = "0"+issue;

                // create the cover path
                var cover = "https://pubs.acs.org/subscribe/covers/";
                // for journals with standing covers
                if ((coden=="bomaf6" && volume=="011") || (coden=="jcchff" && volume=="012") || (coden=="jceaax" && volume=="055") || (coden=="iecred" && volume=="049") || (coden=="jafcau" && volume=="058") || (coden=="oprdfk" && volume=="014") || (coden=="orlef7" && volume=="012")) {
                    cover = cover + coden + "/" + coden + "-2010.jpg?" + Math.random();
                }
                // for all other journals
                else {
                    cover = cover + coden + "/" + coden+"_v"+volume+"i"+issue+suffix+"?" + Math.random();
                }
                // check for the cover's existence and only show the high-res button if it exists
                var coverCheck;
                if (window.XMLHttpRequest) coverCheck = new XMLHttpRequest();
                else if (window.ActiveXObject) coverCheck = new ActiveXObject("Microsoft.XMLHTTP"); // for ie6

                coverCheck.open("GET", cover, true);
                coverCheck.send(null);

                coverCheck.onreadystatechange=function() {
                    if (coverCheck.status==200) {
                        parent.window.location=cover;
                    }
                    else {
                        alert("Sorry, there is not a high-resolution version of this cover.")
                    }
                }
                return false;
            });
        },
        fillInThisIssue: function () {
            if ( niHeader.$tocGroupHeading.length ) {
                niHeader.$tocGroupHeading.each(function () {
                    var section = $(this).text();
                    var id = $(this).attr("id");
                    $('<li><a href="#'+ id +'" title=""><i class="icon-angle-double-right"></i>'+section+'</a>').appendTo('.niHeader_in-issue > ul');
                });
            }else {
                niHeader.$inIssueTitel.addClass("acs_inVisible");
            }
        }
    };
    UX.niHeader = niHeader; // add to global namespace
})();