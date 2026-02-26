var raa = {};

$(document).ready(function () {

    // display user login popup - loginBar
    $(document).on('click', '#indivLogin', function (event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).toggleClass("active");
        $(".navigation-login-dropdown-container:not(.login-options)").toggleClass('hidden');
        if ($('.search-open').is(":visible")) {
            toggleQuickSearch();
        }

    });

    $(document).on('click', function (e) {
        if ($(e.target).attr('id') !== 'indivLogin' && !$('.navigation-login-dropdown-container').hasClass('hidden')) {
            $('.navigation-login-dropdown-container').addClass('hidden');
        }
    });

    // enable sumbit btn for access token widget
    $('#accessTokenForm div.input-group input[type=text]').on('keyup input change', function(){
        !$('#accessTokenForm div.input-group #tokenAccess').val().length ? $('#accessTokenForm input[type=submit]').attr('disabled', 'disabled') : $('#accessTokenForm input[type=submit]').removeAttr('disabled');
    });


    // enable sumbit btn for access token widget
    $('.registration-popup input[type=submit]').attr('disabled', 'disabled');

    $('.registration-popup input[type=text]').on('keyup input change', function(){
        !$(this).val().length ? $('.registration-form input[type=submit]').attr('disabled', 'disabled') : $('.registration-form input[type=submit]').removeAttr('disabled');
    });


    // recaptcha load
    if ( $('.g-recaptcha').length ) {
        loadRecaptcha();
    }


    // display verification code hidden msg after 3m
    if($('#check-if-exist')){
        setTimeout(function(){
            $('#hidden-message').css('visibility', 'visible');
        }, 30000);
    }

    // enable sumbit btn for 2-step widget
    $('#check-if-exist input[type=input]').on('keyup input change', function(){
        !$('#check-if-exist input[type=input]').val().length ? $('#check-if-exist input[type=submit]').attr('disabled', 'disabled') : $('#check-if-exist input[type=submit]').removeAttr('disabled');
    });



});

function loadInstitutionPage(selectDom){
    var href = $(selectDom).val();
    location.href = href;
}
window.loadInstitutionPage = loadInstitutionPage; // add to global namespace