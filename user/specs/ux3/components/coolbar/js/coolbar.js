(function () {
    var coolbar = {
        sections: null,
        holder: $('.coolBar--sections .coolBar__drop'),
        vPort: "screen-sm",
        isMobile: false,
        coolbarElement: null,
        headerHeight: 0,
        isStickyBar: false,
        lock: true, // define lock and set default value, this lock will be used to make sure to run certain functionality and to run on every scroll event
        init: function(){
            coolbar.coolbarElement = $(".coolBar");
            coolbar.isStickyBar = coolbar.coolbarElement.hasClass("stickybar");
            coolbar.get.sections();
            coolbar.fill.sections();
            coolbar.control();
            coolbar.addtionalControls();
        },
        control: function(){
            if ( $('.journal-home').length) {
                coolbar.vPort= "screen-md";
            }

            $(document).on(coolbar.vPort + '-on',function() { // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                $('.coolBar').addClass("coolBar--res"); // class will be used in our scss (to replace media queries)

                if (coolbar.isStickyBar ) {
                    $('.coolBar').addClass("fixed-element");
                }
                coolbar.headerHeight = $('header').outerHeight() || 0;
                $('.coolBar--res').addClass('trans').css('top', coolbar.headerHeight);

                setTimeout(function(){ $(document).trigger("eventSetContentPadding") }, 500 );
                coolbar.isMobile = true;
            });

            $(document).on(coolbar.vPort + '-off',function(){ // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
                $('.coolBar').removeClass("coolBar--res");
                $('.coolBar').removeClass("fixed-element");
                $(document).trigger( "eventSetContentPadding" );
                coolbar.isMobile = false;
                if (typeof(UX.controller) !== 'undefined') {
                    UX.controller.check();
                }
            });
        },
        addtionalControls: function(){

        },
        get: {
            sections: function(){
                coolbar.sections = $('.article__content .section__title');
            }
        },
        fill: {
            sections: function(){
                if ($('.coolBar--sections').length && coolbar.sections.length > 1) {
                    $('.coolBar--sections').removeClass("hidden");
                    var ul = $('<ul class="rlist w-slide--list"/>')
                        .appendTo(coolbar.holder);
                    coolbar.sections.each(function(){
                        var $this = $(this);
                        var li = $('<li/>')
                            .attr('role', 'menuitem')
                            .appendTo(ul);
                        var link = $('<a class="w-slide__hide"/>')
                            .attr('href',"#" + $this.attr('id'))
                            .appendTo(li);
                        var spaner = $('<span/>')
                            .text($(this).text())
                            .appendTo(link);
                    });
                } else {
                    $('.coolBar--sections').remove();
                }
            }
        }
    };
    UX.coolbar = coolbar; // add to global namespace
})();