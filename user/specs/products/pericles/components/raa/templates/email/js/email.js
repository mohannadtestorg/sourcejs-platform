(function () {

    var email = {
        $originalEmail: $('.originalEmail'),
        $fakeEmail: $('#fakeEmail'),

        originalEmailVal: null,
        fakeEmailVal: null,

        pattern: /(.+\+(alm)[-]*.+[@].+)/ig,
        replacerPattern: /(\+(alm)[-]*.+?(?=@))/ig,

        replacer: '',

        isAml: false,

        init: function () {
            email.originalEmailVal = email.$originalEmail.val();
            email.fakeEmailVal = email.$fakeEmail.val();
            email.isAml = email.originalEmailVal.match(email.pattern);

            if(email.isAml){
                email.replacer = email.replacerPattern.exec(email.originalEmailVal)[0];
                email.fakeEmailVal = email.originalEmailVal.replace(email.replacerPattern,'');
                email.$fakeEmail.val(email.fakeEmailVal);
            }

            email.control();

        },
        control: function () {
            email.$fakeEmail.on('input', function () {
                email.fakeEmailVal = $(this).val();
                email.$originalEmail.val(email.fakeEmailVal);

                // email.originalEmailVal = email.fakeEmailVal.split('@')[0] + email.replacer + '@' + email.fakeEmailVal.split('@')[1];
                // email.$originalEmail.val(email.originalEmailVal);

            })
        },
    };

    UX.email = email; // add to global namespace
})();
