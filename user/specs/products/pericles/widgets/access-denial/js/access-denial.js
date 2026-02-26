(function () {
    var accessDenial = {
        $slotLicense: $('.slotLicenseConsumption'),
        $loginTab: $('.accessDenial--tab .login-options'),
        isSlide: false,

        init: function(){

            $('.accessDenial--tab .accordion-tabbed__tab.js--open > a').click();
            accessDenial.control();
        },
        control: function() {
            accessDenial.$slotLicense.on('click', '.linkBtn', function (e) {
                e.preventDefault();
                if (!accessDenial.$loginTab.hasClass('js--open')) {
                    accessDenial.$loginTab.find('> a').click();
                }
            });
        }
    };

    UX.accessDenial = accessDenial;
})();