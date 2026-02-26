(function () {
    var $body = $('body');

    var pdPdf = {

        init: function () {
        },
        controller: function () {

        },
        on: {
            add: function (data) {
                var files = data.getAll("files");
                $(".pd-pdf__table").removeClass('hidden');
                $(".pd-pdf__output").text(files[0].name);
            }
        }
    };

    UX.pdPdf = pdPdf; // add to global namespace
})();