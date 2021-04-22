var $ = require("jquery");

$(document).ready(function () {
    $('.icon-container').click(function () {
        $(document.body).toggleClass('menu-open');
        $('.mobile-menu').toggleClass('menu-open');
    });
});
