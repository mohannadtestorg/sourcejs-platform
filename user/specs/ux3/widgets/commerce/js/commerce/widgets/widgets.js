commerce.widgets = (function () {
    var instance = {};
    var widgetDefs = [];
    var widgets = [];


    function render(template, model) {
        Object.keys(model).forEach(function (key) {
            var re = new RegExp('\\{{' + key + '\\}}', 'g');
            template = template.replace(re, model[key]);
        });
        template = template.replace(/{{.+?}}/g, '');
        return template;
    }

    instance.render = function (widget, model, params) { // FIXME: clean me
        return widget.render(model, params);
    };

    instance.getWidget = function (widget, model, params, callback) {


        return widget.get().pbAjax({
            type: 'GET',
            url: widget.widgetDef.action,
            dataType: 'html',
            data: params,
            async: true,
            success: function (html) {
                var result = render(html, model);
                widget.updateView(result, model);
                //widget.get().fadeIn(400).fadeOut(400).fadeIn(400).fadeOut(400).fadeIn(400); // For debugging
                widget.loaded(); // This is not needed, confirm and remove
                if (callback) {
                    callback();
                }
            },
            error: function (data) {
                widget.error();
            }
        });
    };

    instance.get = function (id) {
        var result = [];
        widgets.forEach(function (item) {
            if (item.widgetDef.id == id)
                result.push(item);
        });
        return result;
    };

    instance.collapse = function () {
        widgets.forEach(function (widget) {
            widget.hide();
        });
    };

    instance.register = function (widgetDef) {
        widgetDefs.push(widgetDef);
    };

    instance.initialize = function () {
        widgetDefs.forEach(function (WidgetDef) {
            WidgetDef.find().each(function () {
                var instance = Object.create(WidgetDef.prototype);
                WidgetDef.call(instance, WidgetDef, this);
                widgets.push(instance);
            });
        });
    };

    return instance;
}());

$(document).ready(function () {
    commerce.widgets.initialize();
});

console.log("Widgets initialized!");