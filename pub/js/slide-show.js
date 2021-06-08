// ==================
//  SLIDESHOW PLUGIN
// ==================

(function ($) {
    var actionInterval = null;
    var methods = {
        init: function (options) {
            var settings = $.extend({
                autoPlay: true,
                defaultDelay: 3000,
                delayInterval: 400,
                autoplayDelay: 400,
                dots: false,
                arrows: true,

                classes: {
                    slide: 'slide',
                    current: 'current',

                    buttons: {
                        mainClassname: 'slide-btn',
                        prev: {
                            class: 'prev',
                            icon: 'fa fa-chevron-left',
                        },
                        next: {
                            class: 'next',
                            icon: 'fa fa-chevron-right',
                        },
                        dots: {
                            list: 'slider-dots',
                            main: 'dot',
                            active: 'active-dot',
                            htmlChar: '&bull;',
                        },
                    },
                },

                btnArrows: "<button class=\"slide-btn prev\"><i class=\"fa fa-chevron-left\"></i></button>" +
                    "<button class=\"slide-btn next\"><i class=\"fa fa-chevron-right\"></i></button\>",
                btnDots: "<li class=\"dot active-dot\">&bull;</li>",

            }, options);

            console.info("Settings:", settings);

            return this.each(function () {
                if (settings.arrows === true) {
                    $(".slideshow").append(methods.appendButtons());
                }
                if (settings.dots === true) {
                    $(".slideshow").append(methods.appendDots());
                }
                if (settings.autoPlay === true) {
                    methods.autoplay(settings);
                }
            });
        },

        appendButtons: function () {
            let buttons = "<button class=\"slide-btn prev\"><i class=\"fa fa-chevron-left\"></i></button>" +
                "<button class=\"slide-btn next\"><i class=\"fa fa-chevron-right\"></i></button\>";

            return buttons;
        },

        appendDots: function () {
            let d = "<li class=\"dot active-dot\">&bull;</li>";
            for (let i = 1; i < $('.slide').length; i++) {
                d = d + "<li class=\"dot\">&bull;</li>";
            }
            let dots = "<ul class=\"slider-dots\">" + d + "</ul\>";

            return dots;
        },

        autoplay: function (settings) {
            console.info(' >>> ', settings.classes.slide, settings.defaultDelay);
            actionInterval = setInterval(methods.next, settings.defaultDelay);
        },

        next: function (settings) {
            let Slide = null;
            let currentSlide = $("." + settings.classes.current);
            let nextSlide = currentSlide.next("." + settings.classes.slide);

            if (nextSlide.length === 0) {
                // nextDot = $('.dot').first();
                nextSlide = $('.' + settings.classes.slide).first();
            }
            Slide = nextSlide;
            currentSlide.fadeOut(settings.defaultDelay).removeClass(settings.classes.current);
            Slide.fadeIn(settings.defaultDelay).addClass(settings.classes.current);

            console.info('Next slide action!');
        },

        prev: function (settings) {
            console.info('Previous slide action!');

            //---- $(this.classes.buttons.next.class).on('click', function () {
                // Call slider methods on this place.

                // this.toggleAutoPlay('stop');
                // this.toggleSlide('next');
                // this.toggleAutoPlay('start');

                // .bind(this)

            //---- });
        }

    }

    $.fn.slider = function (method) {
        let args = null;
        // Implementation here
        if (methods[method]) {
            args = methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            console.info('[]: `init` method called!', arguments);

            return args;
        } else if (typeof method === 'object' || !method) {
            console.info('{}: Init method called!');
            console.info('Arguments is ', arguments);

            return methods.init.apply(this, arguments);
        } else {
            $.error('Method `' + method + '` not found in jQuery.slider');
        }

    // For example
    // -----------
    /*
        // Method definition.
        this.fadeIn('normal', function(){
            // "this" -  it is DOM element on in palace.
        });

        // Method usage.
        $('#element').myPlugin();
     */

    };

})(jQuery);