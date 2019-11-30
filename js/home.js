$(document).ready(function() {

    $(window).scroll(function() {

        var height = $('#titulo').height();
        var scrollTop = $(window).scrollTop();

        if (scrollTop >= height) {
            $('.navbar').addClass('solid-nav');
        } else {
            $('.navbar').removeClass('solid-nav');
        }

    });
});
$(document).ready(function() {  
    $('#cookieModal').modal('show');
  });