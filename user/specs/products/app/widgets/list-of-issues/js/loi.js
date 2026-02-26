UX.loi.addtionalControls= function(){

    if ( $('.activate-res').length) {
        UX.loi.vPort2= "screen-md";
    }

    $(document).on(UX.loi.vPort2 + '-on',function(){
        $('.activate-res .loi').addClass("loi--res");
        $('.activate-res .loi__banner').addClass("loi--res");
    });

    $(document).on(UX.loi.vPort2 + '-off',function(){
        $('.activate-res .loi').removeClass("loi--res");
        $('.activate-res .loi__banner').removeClass("loi--res");

    });


}

