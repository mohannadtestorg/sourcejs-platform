(function () {
    var $body = $('body');

    var refine = {
        $target: null,
        $targets: $('.refineSearch'),
        $showController: $('.quick-search__ctrl__refine'),
        $hideController: $('.quick-search__ctrl__refine--hide'),
        $elements: $('.refineSearch__row'),
        $wrapper: null,
        escape : 27,

        init: function () {
            refine.control();
            if ($('.quick-search').length) {
                refine.on.hide();
            }
        },
        control: function () {
            $body.on('click', '.refineSearch__ctrl__remove', function (e) {
                e.preventDefault();
                var $this = $(this);
                refine.$target = $this.closest('.refineSearch');
                refine.$wrapper = refine.$target.find('.refineSearch__texts');
                refine.on.remove($this);
            });

            $body.on('click', '.refineSearch__ctrl__add', function (e) {
                e.preventDefault();
                var $this = $(this);
                refine.$target = $this.closest('.refineSearch');
                refine.$wrapper = refine.$target.find('.refineSearch__texts');
                refine.on.clone($this);
            });

            $body.on('click', '.quick-search__ctrl__refine', function (e) {
                e.preventDefault();
                if (refine.$targets.length) {
                    refine.on.show();
                }
            });

            $body.on('click', '.quick-search__ctrl__refine--hide', function (e) {
                e.preventDefault();
                refine.on.hide();
            });

            $body.on('click', function (e) {
                if (!refine.$targets.is(e.target) // if the target of the click isn't the container...
                    && refine.$targets.has(e.target).length === 0 // ... nor a descendant of the container
                    && !refine.$showController.is(e.target) // if the target of the click isn't the controller...
                    && refine.$showController.has(e.target).length === 0 // ... nor a descendant of the controller
                    && !$(e.target).closest('.jcf-select-drop').length
                    && !refine.$targets.closest('.search-result__refine-search').length
                    && !$(e.target).closest('.refineSearch__ctrl__remove').length) {
                    refine.on.hide();
                }
            });

            $(document).on('keydown', function (e) {
                if ((e.keyCode || e.which) === refine.escape) {
                    refine.on.hide();
                }
            });
        },
        on: {
            clone: function ($this) {
                jcf.destroyAll();
                $this.closest('.refineSearch__row').clone(true, true).find('input').attr("name","text" + ($(".refineSearch__row").length + 1).toString()).val('').end().appendTo(refine.$wrapper);
                $this.addClass('hidden');
                $this.siblings('.refineSearch__ctrl__remove').removeClass('hidden');
                $('.jcf').each(function () {
                    jcf.replace($(this));
                });
            },
            remove: function ($this) {
                $this.closest('.refineSearch__row').remove();
            },
            show: function () {
                refine.$showController.addClass('hidden');
                refine.$hideController.removeClass('hidden');
                refine.$targets.addClass('js--open');
                refine.$targets.show();
            },
            hide: function () {
                refine.$targets.each(function(){
                    if ($body.attr('data-active') === 'refine') {
                        $body.removeAttr('data-active');
                    }
                    refine.$hideController.addClass('hidden');
                    refine.$showController.removeClass('hidden');
                    refine.$targets.removeClass('js--open');
                    refine.$targets.hide();
                });
            }
        }
    };

    UX.refine = refine; // add to global namespace
})();