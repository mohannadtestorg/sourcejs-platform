$(function() {

    var lower = /[a-z]/;
    var upper = /[A-Z]/;
    var special = /[!@#\$%\^\&*\)\(+=._-]/;
    var numeric = /[0-9]/;

    var getBaseScore = function(value) {
        var score = 0;
        if (lower.test(value)) {
            score++;
        }
        if (upper.test(value)) {
            score++;
        }
        if (special.test(value)) {
            score++;
        }
        if (numeric.test(value)) {
            score++;
        }
        if (score == 1) {
            score = 0;
        }
        return score;
    };

    var updateIndicator = function($indicator, value, min, max, target) {
        $indicator.removeClass('too-short too-long weak medium strong very-strong');
        if (!value) {
            return;
        }
        var length = value.trim().length;
        if (length < min) {
            $indicator.addClass('too-short');
            return;
        }
        if (length > max) {
            $indicator.addClass('too-long');
            return;
        }
        var score =  getBaseScore(value, min, max);
        if (score != 0) {
            score += Math.floor((length - min) / 2);
        }
        var diff = score - target;
        if (diff < 0) {
            $indicator.addClass('weak');
        } else if (diff == 0 || diff == 1) {
            $indicator.addClass('medium');
        } else if (diff == 2) {
            $indicator.addClass('strong');
        } else if (diff > 2) {
            $indicator.addClass('very-strong');
        }
    };

    $('.password-strength-indicator').each(function() {
        var $indicator = $(this);
        var $group = $indicator.closest('.input-group');
        var $input = $group.find('input');
        var data = $indicator.data();
        var min = data.min;
        var max = data.max;
        var strength = data.strength;
        updateIndicator($indicator, $input.val(), min, max, strength);
        $input.on('input', function() {
            updateIndicator($indicator, $input.val(), min, max, strength);
        });
    });

    $('.password-eye-icon').each(function() {
        var $eye = $(this);
        var $group = $eye.closest('.input-group');
        var $input = $group.find('input');
        $eye.toggleClass('hidden', !$input.val());
        $input.on('input', function() {
            $eye.toggleClass('hidden', !$input.val());
        });
        $eye.click(function() {
            $eye.toggleClass('icon-eye-blocked');
            if ($eye.hasClass('icon-eye-blocked')) {
                $eye.removeClass('icon-eye');
                $input.attr('type', 'text');
            } else {
                $eye.addClass('icon-eye');
                $input.attr('type', 'password');
            }
        });
    });
});

$(document).ready(function () {

    $(".js__mail_verification_widget input").on("keyup", function(){
        if ($(this).val().trim().length > 0){
            $(this).closest("form").find(".form-btn").addClass("blue-subb-btn");
            $(this).closest("form").find(".form-btn").prop('disabled', false);
        }else{
            $(this).closest("form").find(".form-btn").removeClass("blue-subb-btn");
            $(this).closest("form").find(".form-btn").prop('disabled', true);

        }
    });

    //setup all cancels for .raa-modal-dialogs
    $(".raa-modal-dialog .raa-modal-dialog-cncl").on("click", function(e){
        e.preventDefault();
        $(this).closest(".raa-modal-dialog").hide();
    });

    //show all enabled modal dialogs. We don't want this to be styled, since it would cause problems in non-js environments.
    $(".raa-modal-dialog.enabled").show();

    var lower = /[a-z]/;
    var upper = /[A-Z]/;
    var special = /[!@#\$%\^\&*\)\(+=._-]/;
    var numeric = /[0-9]/;


    if ($('.pass-hint')) {
        $('.pass-hint').on('keyup input focus', function () {
            var pswd = $(this).val();
            var pswd_req = $(this).siblings('.password-strength-indicator').data('strength');
            if (!pswd_req) {
                pswd_req = 3;
            }
            var validator = '<div id="pswd_info" class="pass-strength-popup js__pswd_info">' +
                '<h4 id="length">Your password must be at least 8 characters and contain at least ' + pswd_req + ' of the following:</h4>' +
                '<ul>' +
                '<li id="letter" class="invalid"><strong>Lower case</strong></li>' +
                '<li id="capital" class="invalid"><strong>Upper case</strong></li>' +
                '<li id="special" class="invalid"><strong>Special character</strong></li>' +
                '<li id="number" class="invalid"><strong>Digit</strong></li>' +
                '</ul>' +
                '</div>';

            if (!$('.js__pswd_info').length) {
                $(this).closest(".input-group").append(validator);
            }
            if ($('.js__pswd_info').length && $('.js__pswd_info .valid').length < pswd_req || pswd.length < 8) {
                $('.js__pswd_info').fadeIn('slow');
            }

            if (pswd.match(lower)) {
                $('#letter').addClass('valid');
            } else {
                $('#letter').removeClass('valid');
            }
            if (pswd.match(upper)) {
                $('#capital').addClass('valid');
            } else {
                $('#capital').removeClass('valid');
            }
            if (pswd.match(special)) {
                $('#special').addClass('valid');
            } else {
                $('#special').removeClass('valid');
            }
            if (pswd.match(numeric)) {
                $('#number').addClass('valid');
            } else {
                $('#number').removeClass('valid');
            }
            pswd_req = pswd_req - 1
            if ($('.js__pswd_info .valid').length > pswd_req && pswd.length >= 8) {
                $('.js__pswd_info').fadeOut('slow');
            }
        }).blur(function () {
            $('.js__pswd_info').fadeOut('slow');
        });
    }
    var $drawer = $('.emails-wrappers,.phones-wrappers');
    $drawer.on('click', '.make-primary,.remove', function(e) {
        $(".js__profileForm input[type='submit']").prop("disabled", false);
        e.preventDefault();
    });
    $(document).on("keypress change",".js__profileForm input, .js__profileForm select", function(e){
        if ($(this).val()) {
            $(".js__profileForm input[type='submit']").prop("disabled", false);
        } else {
            $(".js__profileForm input[type='submit']").prop("disabled", true);
        }
    });
});