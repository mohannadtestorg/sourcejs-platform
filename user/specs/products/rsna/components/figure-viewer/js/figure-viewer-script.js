(function () {
    var figureViewer = UX.figureViewer,
        $window = $(window),
        $document = $(document),
        $body = $('body');

    figureViewer.expand = function () {
        figureViewer.$figures = $document.find('figure:not(.holder), .figure:not(.holder), .imageTable');
        figureViewer.$figures.each(function (index) {
            var $this = $(this);
            $this.find('.figure__image, .open-figure-link').on({
                click: function (event) {
                    event.preventDefault();
                    if (!$this.hasClass('ui-disabled') && !$this.closest('.figure-viewer__hold__fig').length && $('.figure-viewer').length) {
                        figureViewer.on.show($this, index);
                    }
                }
            });
        });
    };

    figureViewer.on.show = function ($this, index) {
        figureViewer.offsetY = $body.data('yoffset') || window.pageYOffset;
        $body.data('yoffset', figureViewer.offsetY);
        if (typeof(UX.controller) !== 'undefined') {
            if ( $body.attr('data-active') !==  'slide') { // keep drop block open in publication content widget
                UX.controller.check();
            }
        }
        $body.attr('data-active', 'figureViewer');
        figureViewer.islocked = true;
        figureViewer.$currentIndex = index;
        figureViewer.replace($this);
        figureViewer.$focusedElementBeforeOpened = document.activeElement;
        $('.figure-viewer').show();
        $body.css('overflow', 'hidden'); // LIT-152707
        figureViewer.height();
        figureViewer.zoom.check();
        figureViewer.$holder.removeClass('is-hidden');
        figureViewer.$returnbtn.addClass('is-hidden');
        figureViewer.$hideList.each(function(){$(this).removeClass('is-hidden');});
        figureViewer.$lister.addClass('is-hidden');
        $('.figure-viewer__ctrl__close').focus();

        if($this.hasClass("imageTable")) {
            figureViewer.$captionRegion.addClass('is-hidden');
            figureViewer.$browsebtn.addClass('is-hidden');
            figureViewer.$figureNav.addClass('is-hidden');
        }
        else {
            figureViewer.$captionRegion.removeClass('is-hidden');
            figureViewer.$browsebtn.removeClass('is-hidden');
            figureViewer.$figureNav.removeClass('is-hidden');
        }
    };

})();
