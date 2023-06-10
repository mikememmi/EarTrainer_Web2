(function($) {
    $.fn.accordion = function(speed) {
        this.on('click', '.accordion-control', function(e) {
            e.preventDefault();
            if ($(this).hasClass('open')) {
                $(this)
                    .next('.accordion-panel')
                    .not('animated')
                    .slideToggle(speed);
                $(this).removeClass('open');
            } else {            
                $('.accordion-control').removeClass('open');
                $(this)
                    .addClass('open');
                $(this)
                .next('.accordion-panel')
                .not('animated')
                .slideToggle(speed);
            }
            $('.accordion-control').not('.open').next('.accordion-panel').hide(speed);
        });
        return this;
    }
})(jQuery);