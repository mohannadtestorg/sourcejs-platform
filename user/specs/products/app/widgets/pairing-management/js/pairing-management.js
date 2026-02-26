UX.pairingManagment.init= function () {

    $.when(
        UX.pairingManagment.initialization()
    )
        .done(function () {
            setTimeout(function () {
                UX.profileMenu.init();
            },500);
        }
    )

   UX.pairingManagment.control();
}
