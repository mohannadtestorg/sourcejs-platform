(function () {

    $(document).on('click','.toc__section .sections__drop a',function(){
        UX.dropBlock.on.hide();
    });
    var tocLinksTrim = {
        vPort: "screen-sm",
        isMobile: false,
        init: function () {
            tocLinksTrim.control();
            tocLinksTrim.trimTocLinks();
        },

        control: function () {
            $(document).on(tocLinksTrim.vPort + '-on', function () {
                tocLinksTrim.isMobile = true;
                tocLinksTrim.trimTocLinks();
            });
            $(document).on(tocLinksTrim.vPort + '-off', function () {
                tocLinksTrim.isMobile = false;
            });


        },
        trimTocLinks: function(){
            if(tocLinksTrim.isMobile){
                $('.toc-item__bottom-link').each(function(){
                    if($(this).find('>li').length > 4){
                        $(this).find('.more-toc-links').css('display','inline-block');
                    }
                    if($(this).find('.dropBlock__holder >ul').length > 0){
                        while($(this).find('>li').length > 4){
                            $(this).find('>li').eq('-2').appendTo($(this).find('.dropBlock__holder >ul'));
                        }
                    }
                });
            }

        }
    };

    UX.tocLinksTrim = tocLinksTrim; // add to global namespace
})();