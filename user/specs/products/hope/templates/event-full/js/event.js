
(function () {
    var event = {
        init: function(){

            jwplayer.key="z4dmcf16jaobJoze52nZrJhryXxMTqgryMo/+g==";
            var $events=$(".events__player");
            $events.each(function (i) {
                $id="events__player"+i;
                $(this).find(".player").attr('id',$id);
                $file = $(this).attr("data-event-file");
                $image = $(this).attr("data-event-image");

                jwplayer($id).setup({

                    image: $image,
                    file:  $file,
                    autostart: false,
                    controls: true,
                    displaydescription: true,
                    displaytitle: true,
                    aspectratio: "16:9",
                    flashplayer: "//ssl.p.jwpcdn.com/player/v/7.12.6/jwplayer.flash.swf",
                    height: 360,
                    mute: false,
                    ph: 1,
                    pid: "I1dI45mi",
                    plugins: {
                        "https://assets-jpcust.jwpsrv.com/player/6/6124956/ping.js": {
                            "pixel": "https://content.jwplatform.com/ping.gif"
                        }
                    },
                    preload: "none",
                    primary: "html5",
                    repeat: false,
                    skin: {
                        active: "#7d7d7d",
                        background: "#ffffff",
                        inactive: "#16475c",
                        name: "bekle"
                    },
                    stagevideo: false,
                    stretching: "uniform",
                    width: "100%"
                });
            });


        }
    };
    UX.event = event; // add to global namespace
})();