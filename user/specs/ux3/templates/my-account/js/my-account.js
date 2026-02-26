(function () {
    $(document).on('click', '.add-new-address,.cancle-new-address', function () {
        addAddress();
    });
    function addAddress() {
        $('.new-address').toggle();
        $('.user-addresses').toggle();
    }
})();
