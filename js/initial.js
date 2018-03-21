var lastScrollTop = 0;

( function() {
    jQuery(document).ready(function () {
        if (! $('body').hasClass('sope-hire-tools')) {
            $('body').addClass('sope-hire-tools');
        }
        $('.collapse').on('show.bs.collapse', function() {
            console.log("abierto");

            $(this).siblings('div').find('i').removeClass('fa fa-plus');
            $(this).siblings('div').find('i').addClass('fa fa-minus');
        })
        $('.collapse').on('hide.bs.collapse', function() {
            $(this).siblings('div').find('i').removeClass('fa fa-minus');
            $(this).siblings('div').find('i').addClass('fa fa-plus');
        })
    });
})(jQuery)