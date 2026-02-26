(function () {
    var trustedPoxy = {
        init: function () {
            trustedPoxy.control();
        },
        control: function () {
            $(document).on('change', '.trustedProxyUserId', function () {
                this.closest('form').submit();
            });
        }
    };
    UX.trustedPoxy = trustedPoxy; // add to global namespace
})();
