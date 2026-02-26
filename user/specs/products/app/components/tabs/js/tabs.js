(function () {
    UX.tab.animate.scroll = function($content, $target) {
        $content.animate({
            scrollTop: $content.scrollTop() + $target.position().top  - $content.position().top
        }, 600);
    }
})();