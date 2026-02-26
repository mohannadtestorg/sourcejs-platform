$(function () {
    jcf.setOptions('Select', {
        "wrapNativeOnMobile": false
    });
    jcf.replace('.literatumProfileMainWidget .select select:not([multiple="multiple"])');
    if ($(window).width() < 992) {
        var $select = $('select[multiple="multiple"]');
        $select.each(function () {
            var $this = $(this);
            var $taxonomy = $this.attr('id').split('.');
            var $taxonomyCode = $('[name="' + $taxonomy[0] + '.code"]');
            var $maxTags = $taxonomyCode.data('maxtags').split('.');
            $maxTags = $maxTags[0];
            $this.chosen({max_selected_options: $maxTags});
        });
    }
});