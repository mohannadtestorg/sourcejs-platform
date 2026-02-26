(function () {
    var $body = $('body'),
        isMobile = false;

    var profileMain = {
        $select: null,

        init: function () {


            profileMain.control();
        },
        control: function () {
            $body.on('change', '#institutionList', function (e) {

                e.preventDefault();
                profileMain.$select = $(this);
                var href = profileMain.$select.val();
                location.href = href;

            });

            if ( $("#institutionList option").length <= 2 ) {
                $("#institutionList").val($("#institutionList option").eq(1).val())
            } else {
                if ($("#institutionList").find("option[value='" + location.toString() + "']").length)
                    $("#institutionList").val(location.toString())
                else
                    $("#institutionList").val("#")
            }



        }

    };

    UX.profileMain = profileMain; // add to global namespace
})();

