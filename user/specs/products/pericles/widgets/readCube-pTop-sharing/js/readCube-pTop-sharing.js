
(function () {
    var $window = $(window),
        $body = $('body');

    var readCubeShare = {
        $target:null,
        $toggle:null,
        $readCubePopUp:null,

        init: function () {
            readCubeShare.$toggle = $('#share__ctrl');
            readCubeShare.$target = $('.readCube-sharing');
            readCubeShare.$readCubePopUp = $('.readCube-sharing__modal');

            readCubeShare.control();
        },

        control: function () {
            readCubeShare.$toggle.on('click', function () {

                if (!$(this).hasClass('clicked')) {
                    readCubeShare.render();
                }

                $(this).addClass('clicked');

            });

            $('#terms-and-conditions').on('change', function () {
                readCubeShare.acceptTerms($(this));
            });

            $body.on('click', '.shareable-link__btn', function (e) {
                e.preventDefault();
                readCubeShare.copyLink($(this));
            });
        },

        render: function () {
            $.ajax({
                method: 'GET',
                url: readCubeShare.$target.data('readcube'),
                success: function(data){
                    
                    if (JSON.parse(data).url) {
                        readCubeShare.$target.removeClass('hidden');
                        readCubeShare.$readCubePopUp.find('#shareable-link__text').html(JSON.parse(data).url);
                        readCubeShare.$readCubePopUp.appendTo('body');

                    }else {
                        readCubeShare.failed();
                    }

                    if (JSON.parse(data).token)
                        readCubeShare.$target.attr('data-rc-token', JSON.parse(data).token); // adds the token as data attribute to div.readCube-sharing


                    
                },
                fail: function () {
                    readCubeShare.failed();
                }
            })
        },

        acceptTerms: function ($elem) {
            if ($elem.prop('checked')) {
                readCubeShare.$readCubePopUp.find('.shareable-link__field').css('visibility', 'visible');
                readCubeShare.$readCubePopUp.find('.shareable-link__btn').attr('disabled', false);

                var $token = readCubeShare.$target.data('rc-token');
                if ($token != undefined) {
                    tracking.trackEvent("readcube.share.createlink", {"share": {"create": {"token": $token}}});
                }
            }
        },
        failed: function () {
            readCubeShare.$target.remove();
            readCubeShare.$readCubePopUp.remove();
        },
        copyLink: function ($elem) {

            var shareableLink = document.getElementById('shareable-link__text');
            var range = document.createRange();

            range.selectNodeContents(shareableLink);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            document.execCommand("copy");

        }

    };

    UX.readCubeShare = readCubeShare; // add to global namespace
})();