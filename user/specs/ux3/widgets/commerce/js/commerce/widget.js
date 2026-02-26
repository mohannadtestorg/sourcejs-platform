commerce.Widget = function (widgetDef, element) {
    this.state = -1;
    this.$element = $(element);
    this.widgetDef = widgetDef;
    if (widgetDef)
        this.registerListeners();
};


commerce.Widget.prototype.get = function () {
    return this.$element;
};

commerce.Widget.prototype.render = function (model, params, callback) {
    if (this.widgetDef.action) {
        return commerce.widgets.getWidget(this, model, params, callback);
    }
};


commerce.Widget.prototype.updateView = function (view, model) {
    var $this = this.get();
    var $html = $(view.trim());
    $this.replaceWith($html);
    this.$element = $("#" + $html.attr('id'));
    this.registerListeners();
    this.triggerInfoHandlers(this, model);
};

commerce.Widget.prototype.triggerInfoHandlers = function (widget, model) {
    var infoHandlers = widget.widgetDef.infoHandlers;
    if (model && model.attributes && infoHandlers) {
        Object.keys(model.attributes).forEach(function (key) {
            var infoHandler = infoHandlers[key];
            if (infoHandler) {
                infoHandler(model.attributes[key], widget, model);
            }
        });
    }
};

commerce.Widget.prototype.registerListeners = function () {
    try {
        this.unbind();
    } catch (e) {
        console.log(e);
    }
    try {
        //console.log("Binding events to candidate elements");
        this.bind();
    } catch (e) {
        console.log("Failed to bind events, rolling back...");
        this.unbind();
    }
};

commerce.Widget.prototype.update = function (model) {
    var result;
    console.log("Updating " + this.widgetDef.id + "...");
    if (!hasErrors(model.attributes)) {
        result = this.render(model, {});
        console.log("Updating " + this.widgetDef.id + "...1");
    } else {
        this.triggerInfoHandlers(this, model);
        this.loaded();
        console.log("Updating " + this.widgetDef.id + "...2");
        result = $.Deferred().resolve();
    }
    return result;
};

commerce.Widget.prototype.bind = function () {
    var thisWidget = this;

    if (!thisWidget.widgetDef.binders)
        return;

    this.find("*[data-bind]").each(function () {
        var binderName = $(this).data("bind");
        var binder = thisWidget.widgetDef.binders[binderName];
        if (binder) {
            $(this).on('click', function (e) {
                binder.call(this, e, thisWidget);
            });
        }
    });

    this.find("*[data-bind-change]").each(function () {
        var binderName = $(this).data("bind");
        var binder = thisWidget.widgetDef.binders[binderName];
        if (binder) {
            $(this).on('change', function (e) {
                binder.call(this, e, thisWidget);
            });
        }
    });
};

commerce.Widget.prototype.unbind = function () {
    this.find("*[data-bind]").each(function () {
        $(this).off('click');
    });
};

commerce.Widget.prototype.find = function (selector) {
    return this.get().find(selector);
};

commerce.Widget.prototype.collectForms = function () {
    var $elements = this.find("form");
    var forms = {};
    $elements.each(function () {
        var $this = $(this);
        var name = $(this).attr('name');
        if (name) {
            var form = {};
            forms[name] = form;
            $this.find("input[type!='checkbox'], textarea").each(function () {
                form[$(this).attr('name')] = $(this).val();
            });

            $this.find("input[type='checkbox']").each(function () {
                if ($(this).is(":checked")) {
                    form[$(this).attr('name')] = $(this).val();
                }
            });

            $this.find("select").each(function () {
                form[$(this).attr('name')] = $(this).find('option:selected').val();
            });
        }
    });
    this.find("*[data-form]").each(function () {
        var name = $(this).data('form');
        if (name) {
            var form = {};
            forms[name] = form;
            $(this).find("*[data-field]").each(function () {
                var $this = $(this);
                var value = $this.data('value');
                if (!value) {
                    value = $this.text().trim();
                }
                form[$this.data('field')] = value;
            });
        }
    });
    return forms;
};

commerce.Widget.prototype.updateForm = function (formName, sourceForm, merge) {
    var forms = this.find("form[name='" + formName + "']");
    if (forms) {
        var form = forms[0];
        if (form) {
            var $form = $(form);
            $form.find("input").each(function () {
                var $this = $(this);
                if ($this.attr("type") == 'submit') {
                    return;
                }
                var value = sourceForm[$this.attr('name')];

                if (merge && !value)
                    return;

                $this.val(value);
            });
            $form.find("select").each(function () {
                var $this = $(this);
                var value = sourceForm[$this.attr('name')];
                console.log("Test select -----------------------------------");
                console.log(value);
                if (value) {
                    $this.closest(".input-group").show();
                }
                $this.find("option[value='" + value + "']").prop('selected', true);
            });
        }
    }
};

commerce.Widget.prototype.initialize = function () {
    this.registerListeners();
};

commerce.Widget.prototype.loading = function () {
    $("body").addClass("widget-loading");
};

commerce.Widget.prototype.error = function () {
    //$("body").addClass("widget-error");
};

commerce.Widget.prototype.loaded = function () {
    //$("body").removeClass("widget-loading");
};

commerce.Widget.prototype.register = function (service) {
    var thisWidget = this;
    commerce.cart.register(service, function (model) {
        return thisWidget.update(model);
    });
};
