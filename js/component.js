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
            nav2.wrap('<a class="goto-next" href="#'+1+'">');

            slickWrapper.slickElement.on('afterChange', function (event, slick, currentSlide) {

                if (currentSlide == 0 ) {
                    $('.goto-website').attr('href','http://www.hermes.com/index_fr.html');
                }
                else if ($('.goto-website').length > 0 && currentSlide > 0 && currentSlide < 12 ) {
                    $('.goto-website').attr('href', '#'+(currentSlide-1));
                    $('.goto-next').attr('href','#'+(currentSlide));
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

        $('document').ready(function () {

            var MenuUi = {
                cnf: {
                    viewportsize: function () {
                       // var $window = $(window);
                        var size = $(window).width();
                        return size;

                    },
                    slideobj: window.onload = function () {
                        var slideConf = {
                            'panel': document.getElementById('panel'),
                            'menu': document.getElementById('menu'),
                            'padding': 250,
                            'tolerance': 70
                        };
                        return slideConf
                    }
                },

                elements: {
                    mainPanel: $('.main-panel'),
                    menu: $('.menu-slide'),
                    navigationHeader: $('.navbar-header'),
                    fluidContainer: $('.container-fluid'),
                    sommaireButton: $('.sommaire'),
                    closeButton: $('#close'),
                    subMenuLastelem: $('.sub-menu li:lt(2)'),
                    subMenuElem1: $('.sub-menu li .fa-print'),
                    subMenu: $('.sub-menu')
                },

                //Configuration objects ends
                init: function () {
                    return MenuUi.renderUI();
                },

                renderUI: function () {
                    MenuUi.slideoutUIEvents();
                    MenuUi.slideoutInit();
                    MenuUi.BindEvents();

                },

                BindEvents: function () {
                    if (MenuUi.cnf.viewportsize() > 1222) {
                        MenuUi.elements.subMenuLastelem.hide();
                        MenuUi.elements.menu.css({'left': '-50px', 'opacity': '0'});
                        MenuUi.elements.subMenuElem1.css('paddingLeft', '105px');

                        MenuUi.elements.sommaireButton.on('click', function () {
                            MenuUi.openMenuUIEvents()
                        });
                        MenuUi.elements.closeButton.on('click', function () {
                            MenuUi.closeMenuUIEvents();
                        });
                    }
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
                    }, 1000)
                    setTimeout(function () {
                        MenuUi.elements.sommaireButton.animate({
                            opacity: '1',
                            left: '-10px'
                            //height:'150px'//Uncomment for old animaion
                        }, 600);
                    }, 2300);
                },

                slideoutUIEvents: function () {

                    if (MenuUi.cnf.viewportsize() < 1221) {
                        MenuUi.elements.mainPanel
                            .attr('id', 'panel')
                            .prepend(
                            '<nav class="navbar navbar-default toggle-button">' +
                            '<div class="navbar-header">' +
                            '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"  aria-expanded="false" aria-controls="navbar">' +
                            '<span class="sr-only">Toggle navigation</span>' +
                            '<span class="icon-bar"></span>' +
                            '<span class="icon-bar"></span>' +
                            '<span class="icon-bar"></span>' +
                            '</button>' +
                            '</div>' +
                            '</nav>'
                        );
                        MenuUi.elements.menu.css({'height': 'auto', 'background-color': '#f5f5f5'}).attr('id', 'menu');
                        MenuUi.elements.navigationHeader.remove();
                        MenuUi.elements.fluidContainer.css({'padding-left': '1px'});

                        if (MenuUi.cnf.viewportsize() < 769) {
                            MenuUi.elements.menu.css('top', '125px');
                            MenuUi.elements.mainPanel.css({'height': 'auto'});
                        }
                    }
                    $(window).on('resize', function(){

                    })
                },

                slideoutInit: function () {
                    try {
                        var slideout = new Slideout(MenuUi.cnf.slideobj());
                        slideout.disableTouch();
                        $('.toggle-button').on('click', function () {
                            slideout.toggle();
                            MenuUi.elements.mainPanel.css({
                                'height': '610',
                                'background-color': '#ffffff',
                                'box-shadow': '-5px 5px 8px 0px rgba(50, 50, 50, 0.2)'
                            });
                        });
                    } catch (e) {

                    }

                }
            };

            MenuUi.init();

        });

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
})(jQuery)
