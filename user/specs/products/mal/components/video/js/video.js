(function () {
    var video = {
        init: function () {
            jwplayer.key="Ab1T371azbSvbd5YkUPAc+gqr59yrC2ey5vjZQ==";
            var $video=$(".video__player");
            $video.each(function (i) {
                $id="video__player"+i;
                $(this).find(".player").attr('id',$id);
                $file = $(this).attr("data-video-file");
                $adv=$(this).attr("data-video-adv");
                jwplayer($id).setup({
                    width: "100%",
                    height: "350",
                    autostart: "true",
                    playlist: [{
                        sources: [{
                            file: $adv,
                            type: "mp4"
                        }]
                        },
                        {
                            sources: [{
                                file: $file
                            }]
                        }
                    ]
                });
            });
        }
    };
    UX.video = video; // add to global namespace
})();
