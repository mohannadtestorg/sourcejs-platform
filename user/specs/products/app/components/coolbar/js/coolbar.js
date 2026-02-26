UX.coolbar.addtionalControls= function(){

    if ( $('.activate-res').length) {
        UX.coolbar.vPort2= "screen-md";
    }
    if ($(".delta-revision-highlight").length > 0) {
        $(".book-chapter__updates").css('display','block');
    }

    $(document).on(UX.coolbar.vPort2 + '-on',function(){
        $('.activate-res .coolBar').addClass("coolBar--res");
        $('.activate-res .coolBar--res').addClass('trans').css('top', $('header').height());
    });

    $(document).on(UX.coolbar.vPort2 + '-off',function(){ // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
        $('.activate-res .coolBar').removeClass("coolBar--res");

    });


}

