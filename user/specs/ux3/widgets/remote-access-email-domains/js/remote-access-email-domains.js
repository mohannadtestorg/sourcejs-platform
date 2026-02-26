(function () {
    var remoteAccessEmail = {
        $modal: $('#emailDomainsConfirmationDialog'),
        init: function () {
            var showConfirmation = $('.showConfirmation').text().trim();
            if(showConfirmation == 'true'){
                remoteAccessEmail.$modal.modal({backdrop: 'static', keyboard: false},'toggle');
            }
        }
    }
    UX.remoteAccessEmail = remoteAccessEmail; // add to global namespace
})();