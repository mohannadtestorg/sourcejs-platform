(function ($) {
    var methods;

    function truncateText() {
        var that = this;
        var $this = $(this);
        var height = $this.height();
        var maxHeight = this.settings.lines * parseFloat($this.css('line-height'));

        if (height === 0) {
            setTimeout(function () {
                truncateText.call(that);
            }, 10);
            return;
        }

        if (height > maxHeight) {
            removeElements.call(this, $this);
        } else {
            setTimeout(function () {
                $this.addClass(that.settings.addClass);
            }, 0);
        }
    }

    function removeElements(containerEl) {
        var that = this;
        var $this = $(this);
        var height = $this.height();
        var maxHeight = this.settings.lines * Math.ceil(parseFloat($this.css('line-height')));
        var $lastRemoved;

        var $seeMore;

        if (this.settings.seeMoreLink) {
            $seeMore = seeMoreLink.call(this);
        } else {
            $seeMore = ellipsis.call(this);
        }

        if (containerEl.get(0).nodeType === Node.ELEMENT_NODE) {
            while (height > maxHeight) {
                $lastRemoved = containerEl.contents().last().remove();
                height = $this.height();
            }

            if (height <= maxHeight) {
                containerEl.append($lastRemoved);
                height = $this.height();
                if (height > maxHeight) {
                    removeElements.call(this, $lastRemoved);
                }
            }
        } else {
            var textContent = containerEl.text();
            var min = 0;
            var max = textContent.length - 1;
            var mid = Math.floor((min + max) / 2);

            while (min < max) {
                if (height > maxHeight) {
                    //max = mid - 1;
                    max = mid + parseInt(((max - mid) * maxHeight / height), 10);
                } else {
                    min = mid + 1;
                }
                $seeMore.remove();
                mid = Math.floor((min + max) / 2);
                containerEl.get(0).textContent = textContent.substr(0, mid);
                containerEl.parent().append($seeMore);
                height = $this.height();
            }

            while (height > maxHeight) {
                $seeMore.remove();
                mid = mid - 1;
                containerEl.get(0).textContent = textContent.substr(0, mid);
                containerEl.parent().append($seeMore);
                height = $this.height();
            }

            if (height <= maxHeight + 1 && this.settings.addClass && !$this.hasClass(this.settings.addClass)) {
                setTimeout(function () {
                    $this.addClass(that.settings.addClass);
                }, 0);
            }
        }
    }

    function truncateList() {
        var that = this;
        var $this = $(this);
        var height = $this.height();
        var lineHeight = Math.ceil(Math.max($this.children().height(), parseFloat($this.css('line-height'))));
        var maxHeight = this.settings.lines * lineHeight;

        if (height === 0 || maxHeight === 0) {
            setTimeout(function () {
                truncateList.call(that);
            }, 10);
            return;
        }

        if (this.settings.position === 'end') {
            if (height > maxHeight) {
                removeListItemsEnd.call(this, $this);
            } else if (this.settings.addClass && !$this.hasClass(this.settings.addClass)) {
                setTimeout(function () {
                    $this.addClass(that.settings.addClass);
                }, 0);
            }
        } else if (this.settings.position === 'middle') {
            removeListItemsMiddle.call(this, $this);
        } else if (this.settings.position === 'beforeLast') {
            if (height > maxHeight) {
                removeListItemsBeforeLast.call(this, $this);
            } else if (this.settings.addClass && !$this.hasClass(this.settings.addClass)) {
                setTimeout(function () {
                    $this.addClass(that.settings.addClass);
                }, 0);
            }
        }
    }

    function removeListItemsEnd() {
        var that = this;
        var $this = $(this);
        var height;
        var lineHeight = Math.ceil(Math.max($this.children().height(), parseFloat($this.css('line-height'))));
        var maxHeight = this.settings.lines * lineHeight;
        var $seeMore;

        if (this.settings.seeMoreLink) {
            $seeMore = seeMoreLink.call(this);
        } else {
            $seeMore = ellipsis.call(this);
        }

        var removeItems = function () {
            height = $this.height();
            if (height > maxHeight) {
                while (height > maxHeight && $this.contents().length > 1) {
                    if ($this.find($seeMore).length) {
                        $($this.contents().get($this.contents().length - 2)).remove();
                    } else {
                        $this.contents().last().remove();
                        $this.append($seeMore);
                    }
                    height = $this.height();
                }
                setTimeout(removeItems, 1000);
            } else {
                if (that.settings.addClass && !$this.hasClass(that.settings.addClass)) {
                    setTimeout(function () {
                        $this.addClass(that.settings.addClass);
                    }, 0);
                }
            }
        };

        removeItems();
    }

    function removeListItemsBeforeLast() {
        var that = this;
        var $this = $(this);
        var height = $this.height();
        var lineHeight = Math.ceil(Math.max($this.children().height(), parseFloat($this.css('line-height'))));
        var maxHeight = this.settings.lines * lineHeight;
        var $seeMoreLink = seeMoreMiddleLink.call(this);
        var $last1,$last2,$last3;

        var removeItems = function () {
            height = $this.height();
            if (height > maxHeight  + 1) {
                while (height > maxHeight + 1 && $this.children().length > 2) {
                    $seeMoreLink.remove();
                    $last1 = $this.children().last().remove();
                    $last2 = $this.children().last().remove();
                    $last3 = $this.children().last().remove().addClass("dot-dot-dot");
                    $this.contents().last().remove();
                    $this.append( $last3, $last2,$seeMoreLink, $last1);
                    height = $this.height();
                }
                setTimeout(removeItems, 1000);
            }  else {
                if (that.settings.addClass && !$this.hasClass(that.settings.addClass)) {
                    setTimeout(function () {
                        $this.addClass(that.settings.addClass);
                    }, 0);
                }
            }
        };

        removeItems();
    }

    function removeListItemsMiddle() {
        var $this = $(this);
        var $items = $this.children();

        if ($items.length > 1) {
            $this.html('');
            $this.append($items.first(), ellipsis.call(this, true), $items.last());
        }
    }

    function ellipsis(isLink) {
        return $('<' + (isLink ? 'a href="#"' : 'span') + ' class="ellipsis"> ' + this.settings.ellipsisChar + ' </' + (isLink ? 'a' : 'span') + '>');
    }

    function seeMoreLink() {
        if (this.settings.isMobile) {
            return $('<li class="loa__item"><a href="#" class="loa__item__name faded read-more" data-slide-target="' + this.settings.mobileTarget + '" style="white-space: nowrap;"> ... ' + this.settings.seeMoreText + '</a></li>');
        } else {
            return $('<li class="loa__item"><a href="#" class="loa__item__name faded read-more" style="white-space: nowrap;"> ... ' + this.settings.seeMoreText + '</a></li>');
        }
    }

    function seeMoreMiddleLink() {
        if (this.settings.isMobile) {
            return $('<li class="loa__item"><a href="#" class="loa__item__name faded read-more w-slide__btn" data-slide-target="' + this.settings.mobileTarget + '" style="white-space: nowrap;"> ' + this.settings.seeMoreText + '</a></li>');
        } else {
            return $('<li class="loa__item"><a href="#" class="loa__item__name faded read-more" style="white-space: nowrap;">' + this.settings.seeMoreText + '</a></li>');
        }
    }

    function seeLessLink() {
        return $('<li class"loa__item"><a href="#" class="loa__item__name faded read-less" style="white-space: nowrap;">' + this.settings.seeLessText + '</i></a></li>');
    }

    function addEventHandlers() {
        var that = this;
        var $this = $(this);

        $this.on('click', function (evt) {
            if ($(evt.target).hasClass('ellipsis') && $(evt.target).is('a')) {
                evt.preventDefault();
                $this.data('truncatedContent', $this.html());
                $this.html($this.data('originalContent'));
                var lessLink = seeLessLink.call(that);
                $this.append(lessLink);
            }

            if (($(evt.target).hasClass('read-more') && !$(evt.target).hasClass('w-slide__btn')) || ($(evt.target).parent().hasClass('read-more') && !$(evt.target).parent().hasClass('w-slide__btn'))) {
                evt.preventDefault();
                $this.data('truncatedContent', $this.html());
                $this.html($this.data('originalContent'));
                var lessLink = seeLessLink.call(that);
                // $this.append(lessLink);
                lessLink.insertBefore($this.children().last());
            }

            if (($(evt.target).hasClass('read-less') || $(evt.target).parent().hasClass('read-less'))) {
                evt.preventDefault();
                $this.html($this.data('truncatedContent'));
                //var moreLink = seeMoreLink.call(that);
                //$(evt.target).replaceWith(moreLink);
            }
        });
    }

    methods = {
        init: function (options) {
            return this.each(function () {
                var $this = $(this);
                var firstInit = true;
                if ($this.data('originalContent')) {
                    $this.html($this.data('originalContent'));
                    firstInit = false;
                }
                $this.data('originalContent', $this.html());
                if (options) {
                    this.settings = $.extend({}, $.fn.truncate.defaults, options);
                }
                if (this.settings.type === 'text') {
                    truncateText.call(this);
                } else if (this.settings.type === 'list') {
                    truncateList.call(this);
                }
                if (firstInit) {
                    addEventHandlers.call(this);
                }
            });
        },
        destroy: function () {
            return this.each(function () {
                var $this = $(this);
                if ($this.data('originalContent')) {
                    $this.html($this.data('originalContent'));
                    if (this.settings.addClass) {
                        $this.removeClass(this.settings.addClass);
                    }
                }
            });
        }
    };

    $.fn.truncate = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.truncate');
        }
    };

    /* Default truncate settings. */
    $.fn.truncate.defaults = {
        type: 'text', // text, list
        position: 'end', // end, middle, beforeLast
        lines: 1,
        seeMoreLink: false,
        seeMoreText: 'See More',
        seeLessText: 'See Less',
        ellipsisChar: '&hellip;',
        isMobile: false,
        mobileTarget: '',
        addClass: ''
    };
})(jQuery);