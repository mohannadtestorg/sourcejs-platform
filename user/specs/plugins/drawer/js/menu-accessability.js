function menubar(e, t) {
    this.$id = $("#" + e),
        this.$rootItems = this.$id.children("li"),
        this.$items = this.$id.find(".menu-item"),
        this.$parents = this.$id.find(".menu-parent"),
        this.$allItems = this.$parents.add(this.$items),
        this.$activeItem = null,
        this.vmenu = t,
        this.bChildOpen = !1,
        this.keys = {
            tab: 9,
            enter: 13,
            esc: 27,
            space: 32,
            left: 37,
            up: 38,
            right: 39,
            down: 40
        },
        this.bindHandlers()
}
menubar.prototype.bindHandlers = function() {
    var e = this;

    this.$allItems.keydown(function(t) {
        return e.handleKeyDown($(this), t)
    }),
    this.$allItems.keypress(function(t) {
        return e.handleKeyPress($(this), t)
    }),
    this.$allItems.focus(function(t) {
        return e.handleFocus($(this), t)
    }),

    $(document).click( function(t) {
        return e.handleDocumentClick(t)
    })
};

menubar.prototype.handleFocus = function(e, t) {
    if (null == this.$activeItem)
        this.$activeItem = e;
    else if (e[0] != this.$activeItem[0])
        return !0;
    var i = this.$activeItem.parentsUntil("div").filter("li");
    if (this.$allItems.removeClass("menu-focus menu-focus-checked"),
            this.$activeItem.is(".checked") ? this.$activeItem.addClass("menu-focus-checked") : this.$activeItem.addClass("menu-focus"),
            i.addClass("menu-focus"),
        1 == this.vmenu)
        if (1 == this.bChildOpen) {
            var s = e.parent();
            s.is("#menubar") && "true" == e.attr("aria-haspopup") && e.addClass('hover').children("ul").attr("aria-hidden", "false")
        } else
            this.vmenu = !1;
    return !0
};

menubar.prototype.handleKeyDown = function(e, t) {
    if (t.altKey || t.ctrlKey)
        return !0;
    switch (t.keyCode) {
        case this.keys.tab:
            this.$id.find("ul").attr("aria-hidden", "true"),
                this.$allItems.removeClass("menu-focus hover"),
                this.$activeItem = null,
            0 == this.bChildOpen;
            break;
        case this.keys.esc:
            if (UX.menu.$toggle.length > 0) {
                //if (e.keyCode  === escKey) {

                    //e.preventDefault();
                UX.menu.on.hide();
                UX.menu.$toggle.focus();
                //}

            }else {
                var i = e.parent();
                return i.is("#menubar") ? (e.removeClass('hover').children("ul").first().attr("aria-hidden", "true"),
                        e.focus()) : (this.$activeItem = i.parent(),
                        e.removeClass('hover'),
                        this.bChildOpen = !1,
                        this.$activeItem.focus(),
                        i.attr("aria-hidden", "true")),
                    t.stopPropagation(),
                    !1;
            }

        case this.keys.enter:
        case this.keys.space:
            var s = e.parent();
            return s.is("#menubar") ? (e.addClass('hover').children("ul").first().attr("aria-hidden", "false"),
                    this.bChildOpen = !0,
                    this.processMenuChoice(e),
                    e.find("ul > li:first").find("a").focus()) : (this.processMenuChoice(e),
                    this.$allItems.removeClass("menu-hover menu-hover-checked hover"),
                    this.$allItems.removeClass("menu-focus menu-focus-checked hover"),
                    this.$id.find("ul").not("#menubar").attr("aria-hidden", "true"),
                    this.$activeItem = null),
                t.stopPropagation(),
                !1;
        case this.keys.left:
            return 1 == this.vmenu && i.is("#menubar") ? this.$activeItem = this.moveUp(e) : this.$activeItem = this.moveToPrevious(e),
                this.$activeItem.focus(),
                t.stopPropagation(),
                !1;
        case this.keys.right:
            return 1 == this.vmenu && i.is("#menubar") ? this.$activeItem = this.moveDown(e) : this.$activeItem = this.moveToNext(e),
                this.$activeItem.focus(),
                t.stopPropagation(),
                !1;
        case this.keys.up:
            return 1 == this.vmenu && i.is("#menubar") ? this.$activeItem = this.moveToPrevious(e) : this.$activeItem = this.moveUp(e),
                this.$activeItem.focus(),
                t.stopPropagation(),
                !1;
        case this.keys.down:
            return 1 == this.vmenu && i.is("#menubar") ? this.$activeItem = this.moveToNext(e) : this.$activeItem = this.moveDown(e),
                this.$activeItem.focus(),
                t.stopPropagation(),
                !1
    }
    return !0
};

menubar.prototype.moveToNext = function(e) {
    var t = e.parent()
        , i = t.children("li")
        , s = i.length
        , r = i.index(e)
        , n = null;
    if (t.is("#menubar")) {
        if (n = s - 1 > r ? e.next() : i.first(),
            "true" == e.attr("aria-haspopup")) {
            e.removeClass('hover');
            var a = e.children("ul").first();
            "false" == a.attr("aria-hidden") && (a.attr("aria-hidden", "true"),
                this.bChildOpen = !0)
        }
        if (e.removeClass("menu-focus"),
            "true" == n.attr("aria-haspopup") && 1 == this.bChildOpen) {
            n.addClass('hover');
            var a = n.children("ul").first();
            a.attr("aria-hidden", "false")
        }
    } else if ("true" == e.attr("aria-haspopup")) {
        e.addClass('hover');
        var a = e.children("ul").first();
        n = a.children("li").first(),
            a.attr("aria-hidden", "false"),
            this.bChildOpen = !0
    } else {
        if (1 == this.vmenu)
            return e;
        var h = null
            , o = null;
        if (h = e.parentsUntil("div").filter("ul").not("#menubar"),
                h.attr("aria-hidden", "true"),
                h.find("li").removeClass("menu-focus hover"),
                h.last().parent().removeClass("menu-focus hover"),
                o = h.last().parent(),
                r = this.$rootItems.index(o),
                n = r < this.$rootItems.length - 1 ? o.next() : this.$rootItems.first(),
            "true" == n.attr("aria-haspopup") && n.children("ul").length > 0) {
            n.addClass('hover');
            var a = n.children("ul").first();
            n = a.children("li").first(),
                a.attr("aria-hidden", "false"),
                this.bChildOpen = !0
        }
    }
    return n
};

menubar.prototype.moveToPrevious = function(e) {
    var t = e.parent()
        , i = t.children("li")
        , s = (i.length,
        i.index(e))
        , r = null;
    if (t.is("#menubar")) {
        if (r = s > 0 ? e.prev() : i.last(),
            "true" == e.attr("aria-haspopup")) {
            var n = e.removeClass('hover').children("ul").first();
            "false" == n.attr("aria-hidden") && (n.attr("aria-hidden", "true"),
                this.bChildOpen = !0)
        }
        if (e.removeClass("menu-focus hover"),
            "true" == r.attr("aria-haspopup") && 1 == this.bChildOpen) {
            r.addClass('hover');
            var n = r.children("ul").first();
            n.attr("aria-hidden", "false")
        }
    } else {
        var a = t.parent()
            , h = a.parent();

        if (1 != this.vmenu && h.is("#menubar")) {
            if (t.attr("aria-hidden", "true"),
                    e.removeClass("menu-focus hover"),
                    a.removeClass("menu-focus hover"),
                    s = this.$rootItems.index(a),
                    r = s > 0 ? a.prev() : this.$rootItems.last(),
                    r.addClass("menu-focus hover"),
                "true" == r.attr("aria-haspopup")) {

                var n = null;
                r.children("ul").length > 0 && (n = r.addClass('hover').children("ul").first(),
                    n.attr("aria-hidden", "false"),
                    this.bChildOpen = !0,
                    r = n.children("li").first())
            }
        } else
            r = t.parent(),
                t.attr("aria-hidden", "true"),
                e.removeClass("menu-focus hover"),
                r.removeClass("hover"),
            1 == this.vmenu && (this.bChildOpen = !1)
    }
    return r
};

menubar.prototype.moveDown = function(e, t) {
    var i = e.parent()
        , s = i.children("li").not(".separator")
        , r = s.length
        , n = s.index(e)
        , a = null
        , h = null;
    if (i.is("#menubar"))
        return "true" != e.attr("aria-haspopup") ? e : (h = e.addClass('hover').children("ul").first(),
                a = h.children("li").first(),
                h.attr("aria-hidden", "false"),
                this.bChildOpen = !0,
                a);
    if (t) {
        var o = !1
            , u = n + 1;
        for (u == r && (u = 0); u != n; ) {
            var l = s.eq(u).html().charAt(0);
            if (l.toLowerCase() == t) {
                o = !0;
                break
            }
            u += 1,
            u == r && (u = 0)
        }
        return 1 == o ? (a = s.eq(u),
                e.removeClass("menu-focus menu-focus-checked"),
                a) : e
    }
    return a = r - 1 > n ? s.eq(n + 1) : s.first(),
        e.removeClass("menu-focus menu-focus-checked"),
        a
};

menubar.prototype.moveUp = function(e) {
    var t = e.parent()
        , i = t.children("li").not(".separator")
        , s = (i.length,
        i.index(e))
        , r = null;
    return t.is("#menubar") ? e : (r = s > 0 ? i.eq(s - 1) : i.last(),
            e.removeClass("menu-focus menu-focus-checked"),
            r)
};

menubar.prototype.handleKeyPress = function(e, t) {
    if (t.altKey || t.ctrlKey || t.shiftKey)
        return !0;
    switch (t.keyCode) {
        case this.keys.tab:
            return !0;
        case this.keys.esc:
        case this.keys.enter:
        case this.keys.space:
        case this.keys.up:
        case this.keys.down:
        case this.keys.left:
        case this.keys.right:
            return t.stopPropagation(),
                !1;
        default:
            var i = String.fromCharCode(t.which);
            return this.$activeItem = this.moveDown(e, i),
                this.$activeItem.focus(),
                t.stopPropagation(),
                !1
    }
    return !0
};

menubar.prototype.handleDocumentClick = function(e) {

    var t = this.$id.find("ul").not("#menubar");
    return t.attr("aria-hidden", "true"),
        this.$allItems.removeClass("menu-focus menu-focus-checked hover"),
        this.$activeItem = null,
        !0
};

menubar.prototype.processMenuChoice = function(e) {
        var t = (e.parent().attr("id"),
            e.attr("id"),
            e.data("href"));
        if (null != t)
            if (t.toLowerCase().indexOf("legacy.") > 0) {
                var i = window.open(t, "_blank");
                i.focus()
            } else
                window.location.href = t;
        var s = e.find("a");
        null != s && (window.location.href = s[0].href)
    }
;

window.menubar = menubar;
