$(function () {
    $('.header__menu__link').each(function () {
        var location = window.location.href
        var link = this.href
        var result = location.match(link);
        if(result != null) {
            $(this).addClass('active');
        }
    });
});