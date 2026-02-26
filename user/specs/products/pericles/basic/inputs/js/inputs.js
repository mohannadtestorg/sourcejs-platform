UX.fieldsCtrl.init = function () {

    UX.fieldsCtrl.$toggle = $('.reproducible');
    UX.fieldsCtrl.$wrapper = $('.reproducible__wrapper');
    UX.fieldsCtrl.container = '.reproducible__container'; // Support for the legacy emails and phones used in account page

    UX.fieldsCtrl.control();

    var $lastTerm = UX.fieldsCtrl.$wrapper.children('.reproducible').length;
    UX.fieldsCtrl.check.lastClone($lastTerm);

};

UX.fieldsCtrl.on.clone = function ($this) {

    UX.fieldsCtrl.$toggle.clone(true, true).find('input').val('').end().appendTo(UX.fieldsCtrl.$wrapper);

    UX.fieldsCtrl.check.terms($this);

    var $lastTerm = UX.fieldsCtrl.$wrapper.children('.reproducible').length;
    UX.fieldsCtrl.check.lastClone($lastTerm);


};