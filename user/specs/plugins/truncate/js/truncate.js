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
        var $parent;

        var $seeMore;

        if (this.settings.seeMoreLink) {
            $seeMore = seeMoreLink.call(this);
        } else {
            $seeMore = ellipsis.call(this);
        }

        if (containerEl.get(0).nodeType === Node.ELEMENT_NODE) {
            while (height > maxHeight && containerEl.contents().length) {
                $lastRemoved = containerEl.contents().last().remove();
                height = $this.height();
            }

            if (height <= maxHeight && $lastRemoved) {
                containerEl.append($lastRemoved);
                height = $this.height();
                if (height > maxHeight) {
                    removeElements.call(this, $lastRemoved);
                }
            } else if ($.trim(containerEl.text()) === '') {
                $parent = containerEl.parent();
                containerEl.remove();
                height = $this.height();
                if ($.trim($parent.text()) === '') {
                    removeElements.call(this, $parent);
                } else if (height <= maxHeight) {
                    if ($this.children().length) {
                        $this.children().last().append($seeMore);
                    } else {
                        $this.append($seeMore);
                    }
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

            while (height > maxHeight && mid > 0) {
                $seeMore.remove();
                mid = mid - 1;
                containerEl.get(0).textContent = textContent.substr(0, mid);
                containerEl.parent().append($seeMore);
                height = $this.height();
            }

            if (mid === 0) {
                $parent = containerEl.parent();
                $seeMore.remove();
                if ($.trim($parent.text()) === '') {
                    removeElements.call(this, $parent);
                }
            }

            if (height <= maxHeight && this.settings.addClass && !$this.hasClass(this.settings.addClass)) {
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

        if ($this.children().length === 0) {
            $this.addClass(that.settings.addClass);
            return;
        }

        if (height === 0 || maxHeight === 0) {
            setTimeout(function () {
                truncateList.call(that);
            }, 10);
            return;
        }

        switch (this.settings.position) {
            case 'middle':
                if (height > maxHeight) {
                    removeListItemsMiddle.call(this, $this);
                } else if (this.settings.addClass && !$this.hasClass(this.settings.addClass)) {
                    setTimeout(function () {
                        $this.addClass(that.settings.addClass);
                    }, 0);
                }
                break;
            case 'end':
                if (height > maxHeight) {
                    removeListItemsEnd.call(this, $this);
                } else if (this.settings.addClass && !$this.hasClass(this.settings.addClass)) {
                    setTimeout(function () {
                        $this.addClass(that.settings.addClass);
                    }, 0);
                }
                break;
            case 'betweenFirstAndLast':
                removeListItemsBetweenFirstAndLast.call(this, $this);
                break;
            case 'beforeLast':
                if (height > maxHeight) {
                    removeListItemsBeforeLast.call(this, $this);
                } else if (this.settings.addClass && !$this.hasClass(this.settings.addClass)) {
                    setTimeout(function () {
                        $this.addClass(that.settings.addClass);
                    }, 0);
                }
                break;
        }
    }

    function removeListItemsMiddle() {
        var that = this;
        var $this = $(this);
        var height;
        var lineHeight = Math.ceil(Math.max($this.children().height(), parseFloat($this.css('line-height'))));
        var maxHeight = this.settings.lines * lineHeight;
        var $seeMore;
        var removedCount = 0;
        var $removedItems;
        var $lastRemoved;

        if (this.settings.seeMoreLink) {
            $seeMore = seeMoreMiddleLink.call(this);
        } else {
            $seeMore = ellipsis.call(this, true);
        }

        var removeItems = function () {
            height = $this.height();
            if (height > maxHeight) {
                while (height > maxHeight && $this.contents().length > 2) {
                    $seeMore.remove();
                    if ($removedItems && $this.find($removedItems).length) {
                        $removedItems.remove();
                    }
                    var indexToRemove = Math.floor($this.contents().length / 2);

                    $lastRemoved = $($this.contents().get(indexToRemove)).remove();
                    if ($lastRemoved && $lastRemoved.get(0).nodeType === Node.ELEMENT_NODE) {
                        removedCount += 1;
                    }
                    indexToRemove -= 1;
                    height = $this.height();

                    if (height > maxHeight && $this.contents().length > 2) {
                        $lastRemoved = $($this.contents().get(indexToRemove)).remove();
                        if ($lastRemoved && $lastRemoved.get(0).nodeType === Node.ELEMENT_NODE) {
                            removedCount += 1;
                        }
                        indexToRemove -= 1;
                    }
                    if (that.settings.showRemovedCount && removedCount > 0) {
                        $removedItems = removedCountMarkup(removedCount);
                        $removedItems.insertAfter($($this.contents().get(indexToRemove)));
                    } else {
                        $seeMore.insertAfter($($this.contents().get(indexToRemove)));
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

    function removeListItemsEnd() {
        var that = this;
        var $this = $(this);
        var height;
        var lineHeight = Math.ceil(Math.max($this.children().height(), parseFloat($this.css('line-height'))));
        var maxHeight = this.settings.lines * lineHeight;
        var $seeMore;
        var removedCount = 0;
        var $removedItems;
        var $lastRemoved;

        if (this.settings.seeMoreLink) {
            $seeMore = seeMoreLink.call(this);
        } else {
            $seeMore = ellipsis.call(this);
        }

        var removeItems = function () {
            height = $this.height();
            if (height > maxHeight) {
                while (height > maxHeight && $this.contents().length > 1) {
                    if ($removedItems && $this.find($removedItems).length) {
                        $removedItems.remove();
                    }
                    if ($this.find($seeMore).length) {
                        $lastRemoved = $($this.contents().get($this.contents().length - 2)).remove();
                    } else {
                        $lastRemoved = $this.contents().last().remove();

                        if (!that.settings.showRemovedCount) {
                            $this.append($seeMore);
                        }
                    }
                    if ($lastRemoved && $lastRemoved.get(0).nodeType === Node.ELEMENT_NODE) {
                        removedCount += 1;
                    }

                    if (that.settings.showRemovedCount && removedCount > 0) {
                        $removedItems = removedCountMarkup(removedCount);
                        $this.append($removedItems);
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
        var removedCount = 0;
        var $removedItems;
        var $lastRemoved;

        var removeItems = function () {
            height = $this.height();
            if (height > maxHeight) {
                var $lastXItems = $('<div></div>');
                while (($this.children().length > 1 && $lastXItems.children().length < that.settings.lastItemsCount) || $this.contents().last().get(0).nodeType === Node.TEXT_NODE) {
                    $lastXItems.prepend($this.contents().last().remove());
                }
                var $lastXItemsContent = $lastXItems.contents();
                while (height > maxHeight && $this.children().length > 2) {
                    if ($removedItems && $this.find($removedItems).length) {
                        $removedItems.remove();
                    }
                    $seeMoreLink.remove();
                    $lastXItemsContent.remove()
                    $lastRemoved = $this.contents().last().remove();
                    if ($lastRemoved && $lastRemoved.get(0).nodeType === Node.ELEMENT_NODE) {
                        removedCount += 1;
                    }
                    if (that.settings.showRemovedCount && removedCount > 0) {
                        $removedItems = removedCountMarkup(removedCount);
                        $this.append($removedItems);
                    } else {
                        $this.append($seeMoreLink);
                    }
                    $this.append($lastXItemsContent);
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

    function removeListItemsBetweenFirstAndLast() {
        var that = this;
        var $this = $(this);
        var $items = $this.children();
        var $seeMore;
        var removedCount = $items.length - 2;
        var $removedItems;

        if ($items.length > 1) {
            if (this.settings.seeMoreLink) {
                $seeMore = seeMoreMiddleLink.call(this);
            } else {
                $seeMore = ellipsis.call(this, true);
            }

            if (that.settings.showRemovedCount) {
                $removedItems = removedCountMarkup(removedCount);
            }

            $this.html('');
            $this.append($items.first());
            if (that.settings.showRemovedCount && removedCount > 0) {
                $this.append($removedItems);
            } else {
                $this.append($seeMore);
            }
            $this.append($items.last());
        }
    }

    function removedCountMarkup(count) {
        return $('<a href="#" class="removed-items-count"> + ' + count + ' </a>');
    }

    function ellipsis(isLink) {
        return $('<' + (isLink ? 'a href="#"' : 'span') + ' class="ellipsis"> ' + this.settings.ellipsisChar + ' </' + (isLink ? 'a' : 'span') + '>');
    }

    function seeMoreLink() {
        var seeMore = ' <span class="ellipsis">' + this.settings.ellipsisChar + '</span> ' + this.settings.seeMoreText + ' <i class="icon-section_arrow_d"></i>';

        if (this.settings.seeMoreHtml) {
            seeMore = this.settings.seeMoreHtml;
        } else if (this.settings.isMobile) {
            seeMore = ' <span class="ellipsis">' + this.settings.ellipsisChar + '</span> ' + this.settings.seeMoreText + ' <i class="icon-arrow_r"></i>';
        }

        if (this.settings.isMobile) {
            return $('<a href="#" class="read-more w-slide__btn" data-slide-target="' + this.settings.mobileTarget + '">' + seeMore + '</a>');
        } else {
            return $('<a href="#" class="read-more">' + seeMore + '</a>');
        }
    }

    function seeMoreMiddleLink() {
        var seeMore = ' <span class="ellipsis">' + this.settings.ellipsisChar + '</span> ' + this.settings.seeMoreText + ' <i class="icon-section_arrow_d"></i> <span class="ellipsis">' + this.settings.ellipsisChar + '</span> ';

        if (this.settings.seeMoreHtml) {
            seeMore = this.settings.seeMoreHtml;
        } else if (this.settings.isMobile) {
            seeMore = ' <span class="ellipsis">' + this.settings.ellipsisChar + '</span> ' + this.settings.seeMoreText + ' <i class="icon-arrow_r"></i> <span class="ellipsis">' + this.settings.ellipsisChar + '</span> ';
        }

        if (this.settings.isMobile) {
            return $('<a href="#" class="read-more w-slide__btn" data-slide-target="' + this.settings.mobileTarget + '">' + seeMore + '</a>');
        } else {
            return $('<a href="#" class="read-more">' + seeMore + '</a>');
        }
    }

    function seeLessLink() {
        var seeLess = ' ' + this.settings.seeLessText + ' <i class="icon-section_arrow_u"></i>';

        if (this.settings.seeLessHtml) {
            seeLess = this.settings.seeLessHtml;
        }

        return $('<a href="#" class="read-less">' + seeLess + '</a>');
    }

    function addEventHandlers() {
        var that = this;
        var $this = $(this);

        $this.on('click', function (evt) {
            var $evtTarget = $(evt.target);
            if ($evtTarget.hasClass('ellipsis') && $evtTarget.is('a')) {
                evt.preventDefault();
                $this.data('truncatedContent', $this.html());
                $this.html($this.data('originalContent'));
                var lessLink = seeLessLink.call(that);
                $this.append(lessLink);
            }

            if (($evtTarget.hasClass('read-more') && !$evtTarget.hasClass('w-slide__btn')) || ($evtTarget.parent().hasClass('read-more') && !$evtTarget.parent().hasClass('w-slide__btn')) || $evtTarget.hasClass('removed-items-count')) {
                evt.preventDefault();
                $this.data('truncatedContent', $this.html());
                $this.html($this.data('originalContent'));
                var lessLink = seeLessLink.call(that);
                $this.append(lessLink);
            }

            if (($evtTarget.hasClass('read-less') || $evtTarget.parent().hasClass('read-less'))) {
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
                    if ($this.data('settings')) {
                        this.settings = $this.data('settings');
                    }
                    if (this.settings && this.settings.addClass) {
                        $this.removeClass(this.settings.addClass);
                    }
                    firstInit = false;
                } else {
                    $this.data('originalContent', $this.html());
                }
                if (options) {
                    this.settings = $.extend({}, $.fn.truncate.defaults, options);
                    $this.data('settings', this.settings);
                }
                if (this.settings && this.settings.type === 'text') {
                    truncateText.call(this);
                } else if (this.settings && this.settings.type === 'list') {
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
        position: 'end', // end, middle, beforeLast, betweenFirstAndLast
        showRemovedCount: false,
        lines: 1,
        seeMoreLink: false,
        seeMoreText: 'See More',
        seeLessText: 'See Less',
        seeMoreHtml: '',
        seeLessHtml: '',
        ellipsisChar: '&hellip;',
        lastItemsCount: 1,
        isMobile: false,
        mobileTarget: '',
        addClass: ''
    };
})(jQuery);