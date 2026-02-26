(function () {

    var profileMenu = {
        menu: ".profile-menu",
        vPort: "screen-sm",

        init: function(){
            profileMenu.controller();
        },
        controller: function(){
            $(document).on(profileMenu.vPort + '-on',function(){
                profileMenu.accordion.make();
            });

            $(document).on(profileMenu.vPort + '-off',function(){
                profileMenu.accordion.destroy();
            });

            if ($('.accordion').length == 0) {
                $(document).on('click', '.profileMenuAccordion .accordion__control', function (e) {
                    e.preventDefault();
                    UX.accordion.on.toggle.single($(this));
                    if ($(this).hasClass('js--open')) {
                        $('body, html').addClass('lock-screen');
                    } else {

                        $('body, html').removeClass('lock-screen');

                    }
                });
            }
        },
        accordion : {
            make : function () {
                var accordion = '<div class="accordion profileMenuAccordion">',
                    trigger = '<a href="#" title="Menu" aria-expanded="false" aria-controls="profileMenu" class="accordion__control">' +
                        '<span class="active-link">Profile Menu</span>' +
                        '<i aria-hidden="true" class="icon-section_arrow_d"></i>' +
                        '</a>',
                    content = '<div id="profileMenu" class="accordion__content" style="display: none;"></div>';

                accordion += trigger + content + '</div>';

                $(profileMenu.menu).after(accordion);
                $('.profileMenuAccordion .accordion__content').append($(profileMenu.menu));

                var active = $(profileMenu.menu).find('li .active');
                if (active.length !== 0) {
                    $('.active-link').text(active.text());
                }
            },
            destroy: function () {
                $('.profileMenuAccordion').after($(profileMenu.menu)).remove();
            }
        }
    };

    UX.profileMenu = profileMenu; // add to global namespace
})();