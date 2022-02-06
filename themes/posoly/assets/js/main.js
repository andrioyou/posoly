"use strict";

(function ($) {

  /* ============================ */
  /* HEADER */
  /* ============================ */

  // STICKY
  var header = document.querySelector(".js-header");
  if (header) {
    var stickyHeader = function stickyHeader() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    };

    var sticky = header.offsetTop + 10;

    window.addEventListener('scroll', stickyHeader);
  }

  // HAMBURGER CLICK
  var $toggleMenu = $('.js-toggle-menu');
  $toggleMenu.on('click', function (event) {
    $(event.currentTarget).toggleClass('is-active');
    
    var nav$ = $('.js-header-nav');
    var isOpened = nav$.hasClass('is-active');
    if (isOpened) {
      nav$.animate({ opacity: 0 }, 500, function() {
        nav$.toggleClass('is-active');
      });
    } else {
      nav$.toggleClass('is-active');
      nav$.animate({ opacity: 1 }, 500);
    }
  });

  // Fix Menu if there is an Admin Bar
  var $header;
  var $adminBar;
  window.addEventListener('load', function () {
    $adminBar = $('#wpadminbar');

    if ($adminBar.length) {
      $header = $('.js-header');
      fixHeaderWithAdmin();
      window.addEventListener('resize', fixHeaderWithAdmin);
    }
  });

  function fixHeaderWithAdmin() {
    if (window.innerWidth > 1024) {
      if ($header.hasClass('sticky-static') || $header.hasClass('sticky-absolute')) {
        $header.find('.p-header__main').css('margin-top', 32);
      } else {
        $header.find('.p-header__main').css('margin-top', 0);
      }
    }
  }

  /* ============================ */
  /* IMG TO BG */
  /* ============================ */

  function changeImgToBg(imgSel, parentSel) {
    if (!imgSel) return false;

    var $parent = void 0,
      _this = void 0;
    $(imgSel).each(function (index, element) {
      _this = $(element);
      $parent = _this.closest(parentSel);
      $parent = $parent.length ? $parent : _this.parent();
      $parent.css('background-image', 'url(' + element.src + ')').addClass('js-bg-back');
      _this.hide();
    });
  }

  changeImgToBg('.js-bg');

  /* ==================================== */
  /* HEADER BUTTON - Open Olark chat      */
  /* Disable parallax for touch devices      */
  /* ==================================== */
  jarallax(document.querySelectorAll('.js-parallax-item'), {
    disableParallax: /iPad|iPhone|iPod|Android/
  });

  /* ============================ */
  /* SWIPER */
  /* ============================ */

  var swiper1 = new Swiper(".swiper-1", {
    autoplay: {
      delay: 5000,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    speed: 5000,
  });

  /* ============================ */
  /* SCROLLED INTO VIEW */
  /* Function return boolean value if element is scrolled into view */
  /* ============================ */

  function isScrolledIntoView(elem) {

    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemHeight = $(elem).height();
    var elemMiddle = elemTop + elemHeight / 2;
    var result = elemTop >= docViewTop && elemTop <= docViewBottom || elemMiddle >= docViewTop && elemMiddle <= docViewBottom;

    return result;
  }

  /* ============================ */
  /* AOS */
  /* ============================ */

  AOS.init({
    offset: 20,
    duration: 600,
    easing: 'ease-in-out',
    once: true
  });

  $(document).ajaxComplete(function (event, request, settings) {
    AOS.refresh();
  });

  /* ============================ */
  /* Simple dropdown */
  /* ============================ */

  $('.js-accordion').on('click', function () {
    $(this).toggleClass('active').next().slideToggle("fast", function () {
      AOS.refresh();
    });
  });

  /* ============================ */
  /* Anchor Links */
  /* ============================ */

  $('.menu a[href*=#]').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
  });

  /* ============================ */
  /* Banner bottom link */
  /* ============================ */

  $('.js-banner-button').on('click', function(e) {
    var banner$ = $('.js-banner');
    $([document.documentElement, document.body]).animate({
      scrollTop: banner$.offset().top + banner$.height() + 1
    }, 1000);
  });

})(jQuery);
