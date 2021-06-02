const $ = require("jquery");
const

$(document).ready(function () {

// =============
//  TOGGLE MENU
// =============
    $('.icon-container').click(function () {
        $(document.body).toggleClass('menu-open');
        $('.mobile-menu').toggleClass('menu-open');
    });
});


$(".slideshow > div:gt(0)").hide();

$('.slideshow').createDotItem('ffff');
$(".slideshow").append(this.createDotItem());
