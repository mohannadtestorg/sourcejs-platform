/*! based on outline.js v1.2.0 - https://github.com/lindsayevans/outline.js/ */
(function () {
    var $window = $(window),
        style_element = document.createElement('STYLE'),
        dom_events = 'addEventListener' in document;

    var outlinejs = {
        rule: ':focus{outline:0} ::-moz-focus-inner{border:0;}',
        init: function () {
            document.getElementsByTagName('HEAD')[0].appendChild(style_element);

            outlinejs.add_event_listener('mousedown', function () {
                outlinejs.set_css(outlinejs.rule);
            });

            outlinejs.add_event_listener('keydown', function () {
                outlinejs.set_css('');
            });
        },
        add_event_listener: function (type, callback) {
            // Basic cross-browser event handling
            if (dom_events) {
                document.addEventListener(type, callback);
            } else {
                document.attachEvent('on' + type, callback);
            }
        },
        set_css: function (css_text) {
            // Handle setting of <style> element contents in IE8
            !!style_element.styleSheet ? style_element.styleSheet.cssText = css_text : style_element.innerHTML = css_text;

        }
    }

    UX.outlinejs = outlinejs; // add to global namespace

})();
