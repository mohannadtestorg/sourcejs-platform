//const circle = require('./literatum.js');

literatum.Widget = function(widgetDef, element) {
    this.state = -1;
    this.$element = $(element);
    this.widgetDef = widgetDef;
    if (widgetDef) {
        this.registerListeners();
    }
};

literatum.Widget.prototype.get = function() {
    return this.$element;
};

literatum.Widget.prototype.resize = function(e) {};

literatum.Widget.prototype.render = function(model, params, callback, renderer) {
    if (this.widgetDef.action) {
        return literatum.widgets.getWidget(this, model, params, callback, renderer);
    }
};

literatum.Widget.prototype.lostFocus = function() {
    // nothing
};

literatum.Widget.prototype.updateView = function(view, model) {
    var $this = this.get();
    var $html = $(view.trim());
    if ($html.length > 0) {
        $this.replaceWith($html);
        this.$element = $("*[widget-id='" + $html.attr('widget-id') + "']");
        if (this.$element.length == 0) {
            this.$element = $("#" + $html.attr('id'));
        }
    } else {
        this.$element.html("");
    }
    this.registerListeners();
    this.triggerInfoHandlers(this, model);
};

literatum.Widget.prototype.triggerInfoHandlers = function(widget, model) {
    var infoHandlers = widget.widgetDef.infoHandlers;
    if (model && model.attributes && infoHandlers) {
        Object.keys(model.attributes).forEach(function(key) {
            var infoHandler = infoHandlers[key];
            if (infoHandler) {
                infoHandler(model.attributes[key], widget, model);
            }
        });
    }
};

literatum.Widget.prototype.registerListeners = function() {
    try {
        this.unbind();
    } catch(e) {
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

literatum.Widget.prototype.update = function(model) {
    var result;
    console.log("Updating " + this.widgetDef.id + "...");
    if (!literatum.utils.hasErrors(model.attributes)) {
        result = this.render(model, {});
        console.log("Updating " + this.widgetDef.id + "... Content");
    } else {
        this.triggerInfoHandlers(this, model);
        this.loaded();
        console.log("Updating " + this.widgetDef.id + "... Info");
        result = $.Deferred().resolve();
    }
    return result;
};

literatum.Widget.prototype.bind = function() {
    var thisWidget = this;

    if (!thisWidget.widgetDef.binders)
        return;

    this.find("*[data-bind]").each(function() {
        var binderName = $(this).data("bind");
        var binder = thisWidget.widgetDef.binders[binderName];
        if (binder) {
            $(this).on('click', function (e) {
                //literatum.events.notify('user-action');
                binder.call(this, e, thisWidget);
            });
        }
    });

    this.find("*[data-bind-change]").each(function() {
        var binderName = $(this).data("bind");
        var binder = thisWidget.widgetDef.binders[binderName];
        if (binder) {
            $(this).on('change', function (e) {
                literatum.events.notify('user-action');
                binder.call(this, e, thisWidget);
            });
        }
    });
};

literatum.Widget.prototype.unbind = function() {
    this.find("*[data-bind]").each(function() {
        $(this).off();
    });
};

literatum.Widget.prototype.find = function(selector) {
    return this.get().find(selector);
};

literatum.Widget.prototype.collectForms = function() {
    var $elements = this.find("form");
    var forms = {};
    $elements.each(function() {
        var $this = $(this);
        var name = $(this).attr('name');
        if (name) {
            var form = {};
            forms[name] = form;
            $this.find("input[type!='checkbox'], textarea").each(function() {
                form[$(this).attr('name')] = $(this).val();
            });

            $this.find("input[type='checkbox']").each(function() {
                if ($(this).is(":checked")) {
                    form[$(this).attr('name')] = $(this).val();
                }
            });

            $this.find("select").each(function() {
                form[$(this).attr('name')] =  $(this).find('option:selected').val();
            });
        }
    });
    this.find("*[data-form]").each(function() {
        var name = $(this).data('form');
        if (name) {
            var form = {};
            forms[name] = form;
            $(this).find("*[data-field]").each(function() {
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

literatum.Widget.prototype.updateForm = function(formName, sourceForm, merge) {
    var forms = this.find("form[name='" + formName + "']");
    if (forms) {
        var form = forms[0];
        if (form) {
            var $form = $(form);
            $form.find("input").each(function() {
                var $this = $(this);
                if ($this.attr("type") == 'submit') {
                    return;
                }

                var value = sourceForm[$this.attr('name')];

                if ($this.attr("type") == 'checkbox') {
                    $this.prop('checked', true);
                }

                if (merge && !value)
                    return;

                $this.val(value);
            });

            var $select = $form.find("select");
            $select.each(function() {
                var $this = $(this);
                var value = sourceForm[$this.attr('name')];

                if (merge && !value)
                    return;

                if (value) {
                    $this.closest(".input-group").show();
                }

                $this.find('option').prop('selected', false);
                $this.find("option[value='" + value + "']").prop('selected',true);
            });
        }
    }
};

literatum.Widget.prototype.initialize = function() {
    this.registerListeners();
};

literatum.Widget.prototype.loading = function() {
    $("body").addClass("widget-loading");
};

literatum.Widget.prototype.error = function() {
    //$("body").addClass("widget-error");
};

literatum.Widget.prototype.loaded = function() {
    //$("body").removeClass("widget-loading");
};

literatum.Widget.prototype.reset = function() {
    this.getNotifications().forEach(function(item) {
        item.reset();
    });
};

literatum.Widget.prototype.getNotifications = function() {
    var result = [];
    this.find("*[data-notification]").each(function() {
        if (this.literatumNotification) {
            result.push(this.literatumNotification);
        }
    });
    return result;
};

literatum.Widget.prototype.getNotification = function(name) {
    if (!this.widgetDef.notifications)
        return null;

    var thisWidget = this;

    var notification = null;

    this.find("*[data-notification='" + name + "']").each(function() {
        var notificationType = thisWidget.widgetDef.notifications[name];
        if (!this.literatumNotification) {
            this.literatumNotification = new notificationType(this);
        }
        notification = this.literatumNotification;
    });

    return notification;
};

literatum.Widget.prototype.register = function(service) {
    var thisWidget = this;
    commerce.cart.register(service, function(model) {
        return thisWidget.update(model);
    });
};
