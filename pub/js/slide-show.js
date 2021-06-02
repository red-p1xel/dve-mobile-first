// ==================
//  SLIDESHOW PLUGIN
// ==================

(function ($) {

// ----------------------------
// Slideshow methods definition
// ----------------------------

    var actionInterval = null;

    var methods = {
        init: function (options) {
            // This is the easiest way to have default options.
            // These are the default settings.
            var settings = $.extend({
                autoPlay: true,
                defaultDelay: 3000,
                delayInterval: 400,
                visibleButtons: 'all',

                classes: {
                    main: 'slideshow',
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

                templates: {
                    btnPrevious:
                        "<button class=\"" + this.classes.buttons.mainClassname + " " + "\">"
                        +"<i class=\"" + this.classes.buttons.prev.icon + "\"></i></button>"
                    ,
                    btnNext:
                        "<button class=\"" + this.classes.buttons.mainClassname + " " + "\">"
                        +"<i class=\"" + this.classes.buttons.prev.icon + "\"></i></button>"
                    ,
                    sliderButtons: this.templates.btnPrevious + this.templates.btnNext,
                    activeDot: null,
                    dotControls: this.activeDot,
                },
            }, options );

            // $(".slideshow").append(this.).append(buttons);

            if (this.autoPlay === true) {
                this.autoplay();
            }
        },

        autoplay: function () {
            actionInterval = setInterval(this.slide, this.defaultDelay);
        },


    }

// --------------------------------
//  Internal functions definitions
// --------------------------------

    /**
     * Method for create dot items.
     *
     * @param itemClass
     * @returns {methods.activeDot}
     */
    $.fn.createDotItem = function (itemClass) {
        let item = null;

        if (typeof itemClass === 'undefined') {
            item = "<li class=\"" + this.classes.buttons.dots.active + " " + this.buttons.dots.main + "\">"
                        + this.buttons.dots.htmlChar
                + "</li>";

        } else {
            item = "<li class=\"" + itemClass + "\">" + this.buttons.dots.htmlChar + "</li>";
        }

        //-- Create list of slides dot controls
        for (let i = 1; i < $('.' + this.classes.slide).length; i++) {
            let controls = this.templates.dotControls;
            controls = controls + item;
        }

        return this.templates.dotControls;
    }

    /**
     * Toggle autoplaying slideshow.
     *
     * @param action
     * @param timeout
     */
    $.fn.toggleAutoPlay = function (action, timeout) {
        timeout = (timeout === null) ? this.defaultDelay : timeout;

        if (action === 'start') {
            actionInterval = setInterval(this.slide, timeout);
        } else if (action === 'stop') {
            clearInterval(actionInterval);
        }

    }

    /**
     * Toggle next or previous slide.
     *
     * @param action         Toggle slide action ('next', 'prev' or something else).
     * @param delayInterval  Delay of toggle slide.
     * @param index          Dot element list index.
     */
    $.fn.toggleSlide = function (action, delayInterval, index) {
        let nextSlide = null;
        let prevSlide = null;

        let nextDot = null;
        let prevDot = null;

        let Slide = null;
        let Dot = null;

        let selector = '.' + this.classes.slide;
        let dotSelector = '.' + this.classes.buttons.dots.active;
        let current = $('.' + this.classes.current);
        let requiredElement = $(selector).eq( (typeof index !== 'undefined') ? index : 0 );
        let delay = (typeof delayInterval !== 'undefined') ? delayInterval : this.delayInterval;

        if (action === 'next') {
            nextSlide = current.next(selector);
            if (nextSlide.length === 0) {
                nextDot = $(selector).first();
                nextSlide = $(selector).first();
            }
            Slide = nextSlide;
            Dot = nextDot;
        } else if (action === 'prev') {
            prevSlide = current.prev(selector);
            if (prevSlide.length === 0) {
                prevDot = $(dotSelector).last();
                prevSlide = $(selector).last();
            }
            Slide = prevSlide;
            Dot = prevDot;
        } else {
            Slide = requiredElement;
            Dot = requiredElement;
        }

        current.fadeOut(delay).removeClass(current);
        Slide.fadeIn(delay).addClass(current);

        $(dotSelector).removeClass(dotSelector);
        Dot.addClass(dotSelector);
    }

    $(this.classes.buttons.next.class).on('click', function () {
        this.toggleAutoPlay('stop');
        this.toggleSlide('next');
        this.toggleAutoPlay('start');
    });

    $(this.classes.buttons.prev).on('click', function () {
        this.toggleAutoPlay('stop');
        this.toggleSlide('prev');
        this.toggleAutoPlay('start');
    });

    $(this.classes.buttons.dots.main).on('click', function () {
        let index = $(this).index();

        this.toggleAutoPlay('stop');
        this.toggleSlide('', index);
        this.toggleAutoPlay('start');
    });

}(jQuery));