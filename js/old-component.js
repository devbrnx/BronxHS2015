/**
 * Created by Admin on 18/05/2015.
 */
(function ($) {

    /*Global Objects*/
    var slickWrapper =
    {
        slickElement: $('.slick-content')
    };


    /**
     * Init slick
     */
    function slickInit() {
        $('.slick-content').slick({
            autoplay: false,
            prevArrow: $('.slider-navigation .fa-chevron-circle-left'),
            nextArrow: $('.slider-navigation .fa-chevron-circle-right'),
            adaptiveHeight: true,
            infinite: false
        });
    }


    /**
     *Detect the first slide
     */
    function initHit() {
        var nav = $('.slider-navigation .fa-chevron-circle-left');

        $(document).ready(function () {

            nav.wrap('<a class="goto-website" href="http://www.hermes.com/index_fr.html">');

            slickWrapper.slickElement.on('afterChange', function (event, slick, currentSlide) {

                //Debug only
                //console.log('on slide', currentSlide);

                if (currentSlide == 0) {
                    nav.wrap('<a class="goto-website" href="http://www.hermes.com/index_fr.html">');
                }
                else if (currentSlide) {
                    $('.goto-website').attr('href', '#');
                }
            });
        });
    }


    /**
     * Highlight the nav given slide data attr
     * @TODO Refactor if elses
     */
    function navSpy() {

        slickWrapper.slickElement.on('afterChange', function (event, slick, currentSlide) {
            var slideAttribute = $('.slick-active').attr('data-anchor');

            var navLinks = $('.menu li').children();
            var navLinksArray = [];
            for (var i = 0; i < navLinks.length; i++) {
                var navLinksChild = navLinks[i];
                var dataLinkGroup = $(navLinksChild).attr('data-link-group');
                navLinksArray.push(dataLinkGroup);
            }
            console.log(navLinksArray);
            if (slideAttribute == navLinksArray[1]) {
                $('a[data-link-group="event-press"]').css('font-weight', 'bold');
                $('a[data-link-group="digital-press"]').css('font-weight', 'normal');
                $('a[data-link-group="creation-press"]').css('font-weight', 'normal');
            }
            else if (slideAttribute == navLinksArray[2]) {
                $('a[data-link-group="event-press"]').css('font-weight', 'normal');
                $('a[data-link-group="digital-press"]').css('font-weight', 'bold');
                $('a[data-link-group="creation-press"]').css('font-weight', 'normal');
            }
            else if (slideAttribute == navLinksArray[3]) {
                $('a[data-link-group="event-press"]').css('font-weight', 'normal');
                $('a[data-link-group="digital-press"]').css('font-weight', 'normal');
                $('a[data-link-group="creation-press"]').css('font-weight', 'bold');
            } else {
                $('a[data-link-group="event-press"]').css('font-weight', 'normal');
                $('a[data-link-group="digital-press"]').css('font-weight', 'normal');
                $('a[data-link-group="creation-press"]').css('font-weight', 'normal');
            }

        });
    }

    /**
     * Launch fullscreen.
     */
    function launchFullscr() {
        $('.fullscr').click(function () {
            if (screenfull.enabled) {
                screenfull.toggle();
            }
        })
    }

    /**
     * Navigate to slide by index (menu)
     * @return void
     */
    function moveToSlide() {
        $('.menu li').click(function (e) {
            e.preventDefault();
            var slideIndex = $(this).attr('data-link-id');
            console.log(slideIndex);
            slickWrapper.slickElement.slick('slickGoTo', parseInt(slideIndex));
        });
    }

    /**
     * Toggle animate the menu on click
     * @return void
     * @TODO refactor
     */
    function animateMenu() {

        var $window = $(window);
        var windowsize = $window.width();

        $('document').ready(function () {

            //UX for desktop
            if (windowsize > 1222) {
                //Subnav state initialisation
                (function () {
                    $('.sub-menu li:lt(2)').hide();// Less than 2 operator
                    // $('.navbar-nav ').css('margin-left','50px');
                    $('.menu-slide').css('left', '-50px');
                    $('.menu-slide').css('opacity', '0');
                })();

                $('.sommaire').on('click', function () {
                    if ($(this).handled !== true) // This will prevent event triggering more then once
                    {
                        $(this).handled = true;
                        $('#close').show(600);
                        setTimeout(function () {
                            $('.menu ').animate({
                                height: '143px',
                                left: '-15px',
                                opacity: '1'
                            }, 500);
                            $('.sub-menu li:lt(2)').show(700);
                        }, 900);

                        $('.sommaire').animate({
                            left: '-50px',
                            opacity: '0'
                        }, 500, function () {
                            $('.sommaire').animate({height: '150px'}, function () {
                                $(this).animate({height: '100px'});
                            });
                        });
                    }
                });

                $('#close').on('click', function () {
                    if ($(this).handled !== true) {
                        console.log('closed');
                        $(this).handled = true;

                        $('#close').hide(600);

                        setTimeout(function () {
                            $('.menu').animate({
                                //left: '-60px',
                                opacity: '0',
                                height: '1px'
                            }, 700, "linear", function () {
                                $('.sub-menu li:lt(2)').hide(500);
                            });
                            //different animation for sommaire . Comment for old animaztion
                            $('.sommaire').animate({
                                height: '150px'
                            }, 750);
                            //ends
                        }, 1000)

                        setTimeout(function () {

                            $('.sommaire').animate({
                                opacity: '1',
                                left: '1px'
                                //height:'150px'//Uncomment for old animaion
                            }, 600);

                        }, 2300);

                    }

                });
            }

            if (windowsize > 997 && windowsize < 1221) {
                /* $('button').removeAttr('data-toggle');
                 $('button').removeAttr('data-target');
                 $('button').removeClass('collapsed');
                 $('button').removeClass('collapsed');
                 $('button').addClass('toggle-button');*/
                $('.menu-slide').css('height', 'auto');
                $('.navbar-nav').attr('id', 'menu');
                $('.navbar-nav').css('background-color', '#f5f5f5');
                $('.navbar-header').remove();
                $('.col-lg-10').attr('id', 'panel');
                $('.col-lg-10').css({
                    'height' : '610',
                    'background-color': '#ffffff',
                    '-webkit-box-shadow': '-5px 5px 8px 0px rgba(50, 50, 50, 0.2)',
                    '-moz-box-shadow':    '-5px 5px 8px 0px rgba(50, 50, 50, 0.2)',
                    'box-shadow':         '-5px 5px 8px 0px rgba(50, 50, 50, 0.2)'
                });
                $('.container-fluid').css({
                    'padding-left': '1px'
                });
                $('.col-lg-10').attr('id', 'panel');
                $('.col-lg-10').prepend(
                    //' <a class="toggle-button">'+'FOO'+ '</a>'
                    '<nav class="navbar navbar-default toggle-button">'+
                    '<div class="navbar-header">'+
                    '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"  aria-expanded="false" aria-controls="navbar">'+
                    '<span class="sr-only">Toggle navigation</span>'+
                    '<span class="icon-bar"></span>'+
                    '<span class="icon-bar"></span>'+
                    '<span class="icon-bar"></span>'+
                    '</button>'+
                    '</div>'+
                    '</nav>'
                );
                /*$('#navbar').removeClass('navbar-collapse collapse');*/
                var slideout = new Slideout({
                    'panel': document.getElementById('panel'),
                    'menu': document.getElementById('menu'),
                    'padding': 250,
                    'tolerance': 70
                });
                // Toggle button
                document.querySelector('.toggle-button').addEventListener('click', function () {
                    slideout.toggle();
                });

                /*$('.menu').css('position','absolute');
                 $('.menu').css('z-index','1099');
                 $('.navbar-toggle').click( function () {
                 if ($(this).handled !== true)
                 {
                 console.log('entered');
                 $(this).handled = true;
                 $('.menu').animate({
                 //height: '225px',
                 left: '0'
                 }, 500);
                 $('h3').animate({
                 opacity: '0'
                 }, 900);
                 $('this').addClass('opened');
                 }
                 });
                 $('.opened').click(function () {
                 if ($(this).handled !== true)
                 {
                 console.log('leaved');
                 $(this).handled = true;

                 $('.menu').animate({
                 left: '-230px',
                 height: '1px'
                 }, 500);
                 $('h3').animate({
                 opacity: '1'
                 }, 400);

                 }
                 });*/
            }

            //UX for tablets and mobile
            if (windowsize < 996) {
                $('button').on('click', function () {
                    if ($(this).handled !== true) {
                        console.log('entered');
                        $(this).handled = true;
                        $('.menu').animate({
                            height: '225px',
                            left: '0'
                        }, 500);
                        $('h3').animate({
                            opacity: '0'
                        }, 900);
                    }
                });
                $('#close').on('click', function () {
                    if ($(this).handled !== true) {
                        console.log('leaved');
                        $(this).handled = true;

                        $('.menu').animate({
                            left: '-230px',
                            height: '1px'
                        }, 500);
                        $('h3').animate({
                            opacity: '1'
                        }, 400);

                    }
                });
            }
        });
    }

    /**
     * Draw a text canvas with Jcanvas lib
     * @return void
     */
    function canvasDraw() {
        var el = $('.sommaire');
        el.drawText({
            fillStyle: '#E86A15',
            strokeWidth: 2,
            fontSize: 23,
            text: 'SOMMAIRE',
            x: 31, y: 85,
            rotate: -90
        });

    }

    function handleClasses() {

        $('button').on('click', function () {
            $('.icon-bar').toggleClass('icon-bar-color');
        });

        $('.col-md-3')
    }

    /**
     * Load our functions
     */
    function load_functions() {

        slickInit();
        initHit();
        navSpy();
        launchFullscr();
        moveToSlide();
        animateMenu();
        canvasDraw();
        handleClasses();
    }

    $(window).ready(function () {
        load_functions();
    });
})(jQuery)
