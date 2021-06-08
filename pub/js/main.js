// const $ = require("jquery");

$(document).ready(function () {

// =============
//  TOGGLE MENU
// =============
    $('.icon-container').click(function () {
        $(document.body).toggleClass('menu-open');
        $('.mobile-menu').toggleClass('menu-open');
    });
});


let slideshow = '.slideshow';
$(slideshow).slider({
    dots: true,
});

// $(".slideshow > div:gt(0)").hide();
