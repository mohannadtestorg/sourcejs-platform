//const circle1 = require('../../../../plugins/literatum/literatum');
//const circle2 = require('../../../../plugins/literatum/widget');
//const circle3 = require('../../../../plugins/literatum/widgets');
//const circle4 = require('../../../../plugins/literatum/events');

literatum.PasswordLessWidget = function (widgetDef, element) {
    literatum.Widget.call(this, widgetDef, element);
};

literatum.PasswordLessWidget.prototype = new literatum.Widget();

literatum.PasswordLessWidget.id = 'passwordLessLogin';
literatum.PasswordLessWidget.action = '/pb/widgets/identity/passwordLessLogin';


literatum.PasswordLessWidget.binders = {
    start: function (e, widget) {
        e.preventDefault();
        var login = widget.find("[name=login]").val();
        var id = widget.find("[name=id]").val();
        var $errorMessage = widget.find('.message.error');
        var $message = widget.find('.message.info');
        literatum.utils.send({
            'action': 'doPasswordLessLogin',
            'login': login,
            'loginAction': 'start',
            'id': id
        }, function (data) {
            if (data.success) {
                var loginAction = data['loginAction'];
                widget.render({}, {view: loginAction, 'canSwitch': data.canSwitch, 'message':data.message, 'errorMessage': data.errorMessage, 'login':login});
            } else {
                $errorMessage.html(data.errorMessage);
                $message.html(data.message);
            }
        });
    },
    submitCode: function (e, widget) {
        e.preventDefault();
        var loading = new literatum.FullPageLoading();
        loading.start();
        var code = widget.find(".code").val();
        var remember = widget.find("[name=remember]").val();
        var id = widget.find("[name=id]").val();
        literatum.utils.send({
            'action': 'doPasswordLessLogin',
            'code': code,
            'loginAction': 'code',
            'id': id,
            'remember': remember
        }, function (data) {
            var $message = widget.find('.message.info');
            var $errorMessage = widget.find('.message.error');
            var isNewUser = data['isNewUser']
            if (data.success) {
                if (isNewUser) {
                    widget.render({}, {view: 'new'});
                } else {
                    window.location.href = data.redirect;
                }
            } else {
                $errorMessage.html(data.errorMessage);
                $message.html(data.message);
                widget.registerListeners();
            }
        });
        loading.done();
    },
    submitPassword: function (e, widget) {
        e.preventDefault();
        var loading = new literatum.FullPageLoading();
        loading.start();
        var id = widget.find("[name=id]").val();
        var password = widget.find("[name=password]").val();
        var remember = widget.find("[name=remember]").val();
        var $message = widget.find('.message.info');
        var $errorMessage = widget.find('.message.error');
        literatum.utils.send({
            'action': 'doPasswordLessLogin',
            'password': password,
            'loginAction': 'password',
            'id': id,
            'remember': remember
        }, function (data) {
            if (data.success) {
                window.location.href = data.redirect;
            } else {
                $errorMessage.html(data.errorMessage);
                $message.html(data.message);
            }
        });
        loading.done();
    },
    usePassword: function (e, widget) {
        e.preventDefault();
        widget.render({}, {view: 'password','canSwitch': true});
    },
    useCode: function (e, widget) {
        e.preventDefault();
        var login = widget.find("[name=login]").val();
        var id = widget.find("[name=id]").val();
        var $errorMessage = widget.find('.message.error');
        var $message = widget.find('.message.info');
        literatum.utils.send({
            'action': 'doPasswordLessLogin',
            'login': login,
            'loginAction': 'enablePL',
            'id': id
        }, function (data) {
            if (data.success) {
                var loginAction = data['loginAction'];
                widget.render({}, {view: loginAction, 'canSwitch': true, 'message':data.message, 'errorMessage': data.errorMessage, 'login':login});
            } else {
                $errorMessage.html(data.errorMessage);
                $message.html(data.message);
            }
        });
    },
    back: function (e, widget) {
        e.preventDefault();
        widget.render({}, {view: 'start'});
    }
};

literatum.PasswordLessWidget.find = function () {
    var $result = $("*[widget-def='" + literatum.PasswordLessWidget.id + "']");
    if ($result.length > 0) {
        return $result;
    }
    return $("." + literatum.PasswordLessWidget.id);
};

literatum.PasswordLessWidget.prototype.registerListeners = function () {
    Object.getPrototypeOf(literatum.PasswordLessWidget.prototype).registerListeners.call(this);

    this.find('.pass-less-form').each(function () {
        var $form = $(this);
        var $login = $form.find('.login');
        var $submit = $form.find('.submit');

        $login.on('keyup', function () {
            if (!$login.val()) {
                $submit.attr('disabled', true);
            } else {
                $submit.removeAttr('disabled');
            }
        });
    });
    this.find('.pass-less-form').each(function () {
        var $form = $(this);
        var $hiddenMessage = $form.find('.message.hidden');
        setTimeout(function(){
            $hiddenMessage.removeClass('hidden');
        }, 30000);
    });
};

literatum.widgets.register(literatum.PasswordLessWidget);

