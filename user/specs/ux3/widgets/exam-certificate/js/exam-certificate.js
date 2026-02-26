(function () {
    var examCertificate = {
        $body: $('body'),
        $examCertificateMessage: $('.exam-certificate-message'),
        printCertificate: function () {
            examCertificate.$body.empty();
            examCertificate.$body.append(examCertificate.$examCertificateMessage); 
            window.print();
        }
    }

    UX.examCertificate = examCertificate; // add to global namespace
})();