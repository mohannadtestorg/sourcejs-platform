$(document).ready(function(){
    $('.registration__personal .registration__button').on('click',function(e){
        e.preventDefault();
        alert('Registration magic happens'); //TODO: For testing purposes only, obviously. Delete after registration procedure is implemented
        $(this).parents('.row').slideUp(200);
        $(this).parents('.row').next().find('.accordion__control').click();
    });
});