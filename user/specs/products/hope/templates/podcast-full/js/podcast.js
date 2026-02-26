(function () {
    var podcast = {
        init: function(){
            jwplayer.key="z4dmcf16jaobJoze52nZrJhryXxMTqgryMo/+g==";

            var $podcasts=$(".podcasts__player");
            $podcasts.each(function (i) {
                $id="podcast__player"+i;
                $(this).find(".player").attr('id',$id);
                $file=$(this).attr("data-podcast-file");

                jwplayer($id).setup({
                    mediaid: "podcast-1499",
                    file:  $file,
                    autostart: 'false',
                    displaytitle: 'false',
                    ga: {
                        idstring: "mediaid"
                    },
                    height: 25,
                    width: 362
                });
            })


        }
    };
    UX.podcast = podcast; // add to global namespace
})();