const $ = require("jquery");

$(document).ready(function () {

// =============
//  TOGGLE MENU
// =============
    $('.icon-container').click(function () {
        $(document.body).toggleClass('menu-open');
        $('.mobile-menu').toggleClass('menu-open');
    });

// ==========================
//  SLIDESHOW IMPLEMENTATION
// ==========================

    $(".slideshow > div:gt(0)").hide();

    let buttons = "<button class=\"slide-btn prev\"><i class=\"fa fa-chevron-left\"></i></button>" +
        "<button class=\"slide-btn next\"><i class=\"fa fa-chevron-right\"></i></button\>";

    let d = "<li class=\"dot active-dot\">&bull;</li>";

    for (let i = 1; i < $('.slide').length; i++) {
        d = d + "<li class=\"dot\">&bull;</li>";
    }

    let dots = "<ul class=\"slider-dots\">" + d + "</ul\>";

    $(".slideshow").append(dots).append(buttons);
    let interval = setInterval(slide, 3000);

    function toggleSlideInterval(func) {
        if (func === 'start') {
            interval = setInterval(slide, 3000);
        } else {
            clearInterval(interval);
        }
    }

    function slide() {
        toggleSlide('next', 0, 1200);
    }

    function toggleSlide(a, ix, it) {
        let currentSlide = $('.current');
        let nextSlide = currentSlide.next('.slide');
        let prevSlide = currentSlide.prev('.slide');
        let reqSlide = $('.slide').eq(ix);

        let currentDot = $('.active-dot');
        let nextDot = currentDot.next();
        let prevDot = currentDot.prev();
        let reqDot = $('.dot').eq(ix);

        let Slide = null;
        let Dot = null;

        if (nextSlide.length === 0) {
            nextDot = $('.dot').first();
            nextSlide = $('.slide').first();
        }

        if (prevSlide.length === 0) {
            prevDot = $('.dot').last();
            prevSlide = $('.slide').last();
        }

        if (a === 'next') {
            Slide = nextSlide;
            Dot = nextDot;
        } else if (a === 'prev') {
            Slide = prevSlide;
            Dot = prevDot;
        } else {
            Slide = reqSlide;
            Dot = reqDot;
        }

        currentSlide.fadeOut(it).removeClass('current');
        Slide.fadeIn(it).addClass('current');

        currentDot.removeClass('active-dot');
        Dot.addClass('active-dot');
    }

    $('.next').on('click', function () {
        toggleSlideInterval('stop');
        toggleSlide('next', 0, 400);
        toggleSlideInterval('start');
    });//next

    $('.prev').on('click', function () {
        toggleSlideInterval('stop');
        toggleSlide('prev', 0, 400);
        toggleSlideInterval('start');
    });//prev

    $('.dot').on('click', function () {
        toggleSlideInterval('stop');
        var index = $(this).index();
        toggleSlide('dot', index, 400);
        toggleSlideInterval('start');
    });//prev
//slideshow
});
