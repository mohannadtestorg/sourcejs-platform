(function () {
    var mediaPlayer = {
        init: function(){
            jwplayer.key="1evm/Mmn4cHeWUbWymfNhduVYVm/nj/z44e+FU+1pzk="; // todo we must replace this key as this key blongs to hope
            if (!$('article .mediaPlayer').length) {
                return false;
            }
            var $mediaPlayers=$(".mediaPlayer");
            $mediaPlayers.each(function (i) {
                $id="mediaPlayer__player"+i;
                $(this).find(".mediaPlayer__player-holder").attr('id',$id);
                $file=$(this).attr("data-mediaPlayer-file");
                if ($(this).hasClass("audio")) {
                    jwplayer($id).setup({
                        mediaid: "mediaPlayer-1499",
                        file:  $file,
                        autostart: 'false',
                        displaytitle: 'false',
                        ga: {
                            idstring: "mediaid"
                        },
                        skin: {
                            name:"roundster"
                        },
                        height: 32,
                        width: 290
                    });
                } else {
                    jwplayer($id).setup({
                        mediaid: "mediaPlayer-1499",
                        file:  $file,
                        autostart: 'false',
                        displaytitle: 'false',
                        ga: {
                            idstring: "mediaid"
                        },
                        skin: {
                            name:"roundster"
                        },
                        height: 400,
                        width: 688
                    });
                }


            })


        }
    };
    UX.mediaPlayer = mediaPlayer; // add to global namespace
})();