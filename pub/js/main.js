var $ = require("jquery");

$(document).ready(function () {
    $('.icon-container').click(function () {
        console.log('Click test!!!');
        $(document.body).toggleClass('menu-open');
        $('.mobile-menu').toggleClass('menu-open');
    });
});
