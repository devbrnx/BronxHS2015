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
            prevArrow: $('.slider-navigation .prev-arrow-slide'),
            nextArrow: $('.slider-navigation .next-arrow-slide'),
            adaptiveHeight: true,
            infinite: false
        });
    }


    /**
     *Detect the first slide
     */
    function initHit() {
        var nav = $('.slider-navigation .prev-arrow-slide');
        var nav2 = $('.slider-navigation .next-arrow-slide');
        $(document).ready(function () {
            location.hash = '#0';
            nav.wrap('<a class="goto-website" href="http://www.hermes.com/index_fr.html">');
            nav2.wrap('<a class="goto-next" href="#' + 1 + '">');

            slickWrapper.slickElement.on('afterChange', function (event, slick, currentSlide) {

                if (currentSlide == 0) {
                    $('.goto-website').attr('href', 'http://www.hermes.com/index_fr.html');
                }
                else if ($('.goto-website').length > 0 && currentSlide > 0 && currentSlide < 12) {
                    $('.goto-website').attr('href', '#' + (currentSlide - 1));
                    $('.goto-next').attr('href', '#' + (currentSlide));
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

            var MenuUi = {
                elements: {
                    mainPanel: $('.main-panel'),
                    menu: $('.menu-slide'),
                    navigationHeader: $('.nav-to-remove'),
                    fluidContainer: $('.container-fluid'),
                    sommaireButton: $('.sommaire'),
                    closeButton: $('#close'),
                    subMenuLastelem: $('.sub-menu li:lt(2)'),
                    subMenuElem1: $('.sub-menu li .fa-print'),
                    subMenu: $('.sub-menu')
                },

                //Configuration objects ends

                BindEvents: function () {
                    enquire.register("screen and (min-width: 1222px)", {
                        match: function () {
                            MenuUi.elements.subMenuLastelem.hide();
                            MenuUi.elements.sommaireButton.on('click', function () {
                                MenuUi.openMenuUIEvents();
                            });
                            MenuUi.elements.closeButton.on('click', function () {
                                MenuUi.closeMenuUIEvents();
                            });
                        },
                        unmatch: function () {
                            MenuUi.elements.subMenuLastelem.show();
                            MenuUi.elements.sommaireButton.off();
                            MenuUi.elements.closeButton.off();
                        }
                    });
                },

                openMenuUIEvents: function () {
                    MenuUi.elements.closeButton.show(600);
                    setTimeout(function () {
                        MenuUi.elements.menu.animate({
                            height: '143px',
                            left: '0px',
                            opacity: '1'
                        }, 500);
                        MenuUi.elements.subMenuLastelem.show(700);
                        MenuUi.elements.subMenu.animate({width: '199px'}, 700);
                    }, 900);

                    MenuUi.elements.sommaireButton.animate({
                        left: '-50px',
                        opacity: '0'
                    }, 500, function () {
                        MenuUi.elements.sommaireButton.animate({height: '150px'}, function () {
                            $(this).animate({height: '100px'});
                        });
                    });
                },

                closeMenuUIEvents: function () {
                    MenuUi.elements.closeButton.hide(600);
                    setTimeout(function () {
                        MenuUi.elements.menu.animate({
                            //left: '-60px',
                            opacity: '0',
                            height: '1px'
                        }, 700, "linear", function () {
                            MenuUi.elements.subMenuLastelem.hide(500);
                            MenuUi.elements.subMenu.animate({width: '45px'}, 700);
                        });
                        //different animation for sommaire . Comment for old animaztion
                        MenuUi.elements.sommaireButton.animate({
                            height: '150px'
                        }, 750);
                        //ends
                    }, 1000);
                    setTimeout(function () {
                        MenuUi.elements.sommaireButton.animate({
                            opacity: '1',
                            left: '-10px'
                            //height:'150px'//Uncomment for old animaion
                        }, 600);
                    }, 2300);
                },

                slideoutUIEvents: function () {
                    enquire.register("screen and (max-width: 1221px)", {
                        match: function () {
                            MenuUi.elements.menu.attr('id', 'menu');
                            MenuUi.elements.mainPanel
                                .attr('id', 'panel');
                            console.log('added');
                        },
                        unmatch: function () {
                            MenuUi.elements.menu.removeAttr('id');
                            MenuUi.elements.mainPanel
                                .removeAttr('id');
                            console.log('removed');
                        }
                    });
                },

                slideoutInit: function () {
                    enquire.register("screen and (max-width: 1221px)", {
                        match: function () {
                            if(typeof slideout === "undefined"){
                                var slideout = new Slideout(
                                    {
                                        'panel': document.getElementById('panel'),
                                        'menu': document.getElementById('menu'),
                                        'padding': 250,
                                        'tolerance': 70
                                    }
                                );
                                slideout.disableTouch();
                                $('.to-hide').on('click', function () {
                                    console.log('slider clicked');
                                    slideout.toggle();
                                });
                            }
                        },
                        unmatch: function () {
                            $('#navbar>ul').removeClass('slideout-menu');
                            $('.main-panel').removeClass('slideout-panel');
                        }
                    });
                },

                //Rendering and executing the menu
                renderUI: function () {
                    MenuUi.slideoutUIEvents();
                    MenuUi.slideoutInit();
                    MenuUi.BindEvents();
                },
                init: function () {
                    return MenuUi.renderUI();
                }

            };

        //Let's load init menu
          MenuUi.init();

    }

    /**
     * Draw a text canvas with Jcanvas lib
     * @return void
     */
    function canvasDraw() {
        $(window).load(function () {

            var conf = {
                    fillStyle: '#f0532c',
                    strokeWidth: 2,
                    fontSize: 18,
                    fontFamily: 'DIN-Med',
                    text: 'S O M M A I R E',
                    x: 31,
                    y: 85,
                    rotate: -90,
                    letterSpacing: 2
                },
                element = $('.sommaire');
            element.drawText(conf);
        });
    }

    function handleClasses() {
        $('button').on('click', function () {
            $('.icon-bar').toggleClass('icon-bar-color');
        });
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
})(jQuery);
