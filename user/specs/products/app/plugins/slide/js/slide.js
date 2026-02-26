var $body = $('body');

UX.slide.addtionalControls= function(){

    if ( $('.activate-res').length) {
        UX.slide.vPort2= "screen-md";
    }

    $(document).on(UX.slide.vPort2 + '-on',function(){
        UX.slide.headerLoi = true;
  });

    $(document).on(UX.slide.vPort2 + '-off',function(){ // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
        UX.slide.headerLoi = false;
    });

    $body.on('click', '.activate-res .w-slide__btn', function(e) {

        e.preventDefault();
        $(".w-slide, .w-slide__content").css('transition', 'all 250ms');
        UX.slide.$toggle   = $(this);
        UX.slide.$target   = $( UX.slide.$toggle.data('slide-target'));
        UX.slide.back = false;

        if (UX.slide.headerLoi) {

            UX.slide.on.show();
        }
        $(".w-slide, .w-slide__content").css('transition', 'all 0ms');
    });

}



