"use strict";

(function ($) {

	/* ============================ */
	/* VARS */
	/* ============================ */
	var $WIN = $(window);

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
		$(event.currentTarget).parent().find('.o-header__navigation').toggleClass('is-active');
		$('html, body').toggleClass('no-scroll');
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
				$header.find('.o-header__main').css('margin-top', 32);
			} else {
				$header.find('.o-header__main').css('margin-top', 0);
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

	/* ============================ */
	/* BANNER ANIMATION */
	/* ============================ */

	var banner = $('.js-banner');
	if (banner.length) {
		setTimeout(function () {
			banner.addClass('js-banner-act');
		}, 4000);
	}

	/* ==================================== */
	/* HEADER BUTTON - Open Olark chat      */
	/* ==================================== */

	var button = $('.js-open-olark');
	if (button.length) {
		button.on('click', function (ev) {
			ev.preventDefault();
			$('.olark-launch-button').trigger('click');
		});
	}

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

	var swipers = [];
	var winW = window.innerWidth;
	var BREAKPOINTS = {
		xs: 480,
		sm: 768,
		md: 992,
		lg: 1200,
		xl: 1600
	};

	function calcWinSize() {
		winW = window.innerWidth;
		
	}

	// Initialize swipers
	function initSwiper() {

		var iterator = 0;

		$('.swiper-container').each(function () {

			var $swiper = $(this);

			var breakMobVal = $swiper.attr('data-break-mob') == 'true';
			if (breakMobVal && winW < 767) return true;

			var index = 'swiper-unique-id-' + iterator;

			$swiper.addClass('swiper-' + index + ' initialized').attr('id', index);
			$swiper.parent().addClass('init').find('.swiper-pagination').addClass('swiper-pagination-' + index);

			// Get value for init
			var autoPlayVar = false;
			if ($swiper.attr('data-autoplay') == 'true' || parseInt($swiper.attr('data-delay'), 10)) autoPlayVar = { delay: 4000 || delayVal };

			var directionVal = $swiper.attr('data-direction');
			var verticalDesktopOnly = $swiper.attr('data-vert-desktop') == 'true';
			if (verticalDesktopOnly && winW < 992) directionVal = false;

			var spaceBetweenVal = parseInt($swiper.attr('data-spaceBetween'));
			var slidesPerViewVal = $swiper.attr('data-slidesPerView');
			switch (slidesPerViewVal) {
				case 'responsive':
					slidesPerViewVal = getSlidesPerViewNumber($swiper);
					break;
				case 'auto':
					break;
				default:
					slidesPerViewVal = parseInt(slidesPerViewVal, 10);
			}
			var loopVal = $swiper.attr('data-loop');
			var speedVal = parseInt($swiper.attr('data-speed'), 10);
			if (!speedVal) speedVal = 500;
			var centeredSlidesVal = $swiper.attr('data-centered-slides') == 'true';
			var effectVal = $swiper.attr('data-effect');
			var progBarVal = $swiper.attr('data-progBar');
			var slideToClickedSlideVal = $swiper.attr('data-slideToClickedSlide') == 'true';

			// For slider with thumbnail
			var freeModeVal = $swiper.attr('data-freeMode') == 'true';
			var watchSlidesVisibilityVal = $swiper.attr('data-watchSlidesVisibility') == 'true';
			var watchSlidesProgressVal = $swiper.attr('data-watchSlidesVisibility') == 'true';
			var thumbsVal = false;
			if ($swiper.attr('data-main') == 'true') {
				thumbsVal = { swiper: swipers['swiper-' + 'swiper-unique-id-' + (iterator - 1)] };
			}

			swipers['swiper-' + index] = new Swiper('.swiper-' + index, {
				speed: speedVal,
				pagination: {
					el: '.swiper-pagination-' + index,
					type: progBarVal || 'bullets',
					clickable: true,
					renderBullet: function renderBullet(index, className) {
						if ($swiper.find('.swiper-pagination--numeric').length) {
							if (index < 9) var zero = '0';
							return '<span class="' + className + '">' + zero + (index + 1) + '</span>';
						}
						return '<span class="' + className + '"></span>';
					}
				},
				loop: loopVal,
				effect: effectVal,
				spaceBetween: spaceBetweenVal,
				autoplay: autoPlayVar,
				slidesPerView: slidesPerViewVal,
				centeredSlides: centeredSlidesVal,
				direction: directionVal || 'horizontal',
				slideToClickedSlide: slideToClickedSlideVal,
				freeMode: freeModeVal,
				watchSlidesVisibility: watchSlidesVisibilityVal,
				watchSlidesProgressVal: watchSlidesProgressVal,
				thumbs: thumbsVal
			});

			if ($swiper.find('.pagination').length && $swiper.attr('data-slidesperview') == 'responsive') {
				var paginationSpan = $swiper.find('.pagination span');
				var paginationSlice = paginationSpan.hide().slice(0, paginationSpan.length + 1 - slidesPerViewVal);
				if (paginationSlice.length <= 1 || slidesPerViewVal >= $swiper.find('.swiper-slide').length) $swiper.addClass('pagination-hidden');else $swiper.removeClass('pagination-hidden');
				paginationSlice.show();
			}

			iterator++;
		});
	}

	initSwiper();

	// Swiper arrows
	$('.swiper.init .swiper-button-prev').on('click', function () {
		swipers['swiper-' + $(this).parent().find('.swiper-container').attr('id')].slidePrev();
	});

	$('.swiper.init .swiper-button-next').on('click', function () {
		swipers['swiper-' + $(this).parent().find('.swiper-container').attr('id')].slideNext();
	});

	// Get slides per view number
	function getSlidesPerViewNumber(swiperContainer) {
		if (winW >= BREAKPOINTS.xl) return parseInt(swiperContainer.attr('data-xl-slides'), 10);else if (winW >= BREAKPOINTS.lg) return parseInt(swiperContainer.attr('data-lg-slides'), 10);else if (winW >= BREAKPOINTS.md) return parseInt(swiperContainer.attr('data-md-slides'), 10);else if (winW >= BREAKPOINTS.sm) return parseInt(swiperContainer.attr('data-sm-slides'), 10);else return parseInt(swiperContainer.attr('data-xs-slides'), 10);
	}

	// Update slider per view
	function updateSilderperView() {
		$('.swiper-container.initialized[data-slidesperview="responsive"]').each(function () {
			var thisSwiper = swipers['swiper-' + $(this).attr('id')],
			    slidesPerViewVal = getSlidesPerViewNumber($(this));
			// centerVar = thisSwiper.params.centeredSlides;
			thisSwiper.params.slidesPerView = slidesPerViewVal;
			thisSwiper.update();
		});
	}

	$(window).on('resize', function () {
		calcWinSize();
		updateSilderperView();
	});

	$(window).trigger('resize');

	/* ============================ */
	/* SLIDER WITH THUMBNAILS */
	/* ============================ */

	if ($('.js-sldr-thumbs-list').length) {
		var monitorSwiperActive = 0;
		var monitorSwiperId = $('.swiper-container[data-sldr-w-thmbs=true]').attr('id');
		swipers['swiper-' + monitorSwiperId].on('slideChange', function () {
			monitorSwiperActive = swipers['swiper-' + monitorSwiperId].activeIndex;
			$('.js-sldr-thumbs-item').removeClass('active').eq(monitorSwiperActive).addClass('active');
		});
	}

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
	/* ANIMATION */
	/* ============================ */

	var anim = $('.anim');

	if (anim.length) {

		// Create empty array with status
		var animStatus = [];
		animStatus.length = anim.length;

		// add Class to element
		var addAnimClass = function addAnimClass() {
			for (var i = 0; i < animStatus.length; i++) {
				if (!animStatus[i]) {
					if (!$(anim[i]).hasClass('anim-act') && isScrolledIntoView($(anim[i]))) {
						$(anim[i]).addClass('anim-act');
						animStatus[i] = true;
					}
				}
			}
		};

		addAnimClass();

		$(window).scroll(function () {
			addAnimClass();
		});
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
	/* VIMEO PLAYER */
	/* ============================ */

	if ($('.js-vid-vimeo').length && $('.js-prlx-grid:visible').length == 1) {

		var videoPlayers = [];
		var videoWrappers = [];

		$('.js-vid-vimeo').each(function (index, element) {

			videoWrappers[index] = $(this);
			videoPlayers[index] = new Vimeo.Player(element);
			//videoPlayers[index].updStatus = true;
		});

		var playVimeoVideos = function playVimeoVideos() {
			for (var i = 0; i < videoWrappers.length; i++) {
				var elementTop = videoWrappers[i].offset().top;
				var elementBottom = elementTop + videoWrappers[i].outerHeight();
				var viewportTop = $WIN.scrollTop();
				var viewportBottom = viewportTop + $WIN.height();

				// if ( videoPlayers[i].updStatus ) {
				if (elementBottom > viewportTop && elementTop < viewportBottom) {
					videoPlayers[i].play();
				} else {
					videoPlayers[i].pause();
				}
				// }
			}
		};

		// playVimeoVideos();

		window.addEventListener('scroll', playVimeoVideos);
	}

	/* ============================ */
	/* PRODUCT COLORS SECTION */
	/* ============================ */

	var prodClrs = $('.js-prod-clrs');

	if (prodClrs.length) {
		$('.js-prod-clr').on('click', function () {
			var index = $(this).index();

			// For colors
			$(this).siblings().removeClass('active');
			$(this).addClass('active');

			// For images
			$(this).closest('.js-prod-clrs').find('.js-prod-img').removeClass('active').eq(index).addClass('active');
		});
	}

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

	$('.js-anch-link').on('click', function (e) {
		e.preventDefault();
		var targerClass = '.' + $(this).attr('href');

		var headerHeight = $('.o-header.sticky').find('.o-header__main').innerHeight();
		if (!headerHeight) headerHeight = 0;
		console.log(headerHeight);

		if ($(targerClass).length) {
			$([document.documentElement, document.body]).animate({
				scrollTop: $(targerClass).offset().top - headerHeight
			}, 1000);
		} else {
			console.log('No target block for this link :(');
		}
	});

	/* ============================ */
	/* STICKY BAR with buttons (displayed only on mobile) */
	/* ============================ */

	if (window.innerWidth < 576 && $('.js-stck-bar').length) {

		window.addEventListener('load', function () {

			var stickyBar = document.querySelector(".js-stck-bar");
			var footer = document.querySelector(".js-footer");

			var checkStickyBar = function checkStickyBar() {
				var sticky = footer.offsetTop;
				var oLarkBtn = document.querySelector("#olark-wrapper .olark-launch-button");

				if (window.pageYOffset + window.innerHeight > sticky) {
					stickyBar.classList.add("hide");
					if (oLarkBtn) oLarkBtn.classList.remove("transform");
				} else {
					stickyBar.classList.remove("hide");
					if (oLarkBtn) oLarkBtn.classList.add("transform");
				}
			};

			checkStickyBar();

			setTimeout(checkStickyBar, 300);

			window.addEventListener('scroll', checkStickyBar);
		});
	}

	/* ============================ */
	/* KIOSKS FILTER AJAX */
	/* ============================ */
	if ($('.js-filtering').length) {
		var $inputCheck = $('.js-fltr-input');

		var getFilterTaxonomies = function getFilterTaxonomies() {
			var taxonomies = [];

			$('.js-fltr-labels').each(function () {
				var inputs = $(this).find('.js-fltr-input');
				var taxonomiesList = [];

				inputs.each(function () {
					if ($(this).is(':checked')) {
						taxonomiesList.push($(this).attr('data-taxonomy'));
					}
				});

				var taxonomy = {
					name: $(this).attr('data-taxonomy-name'),
					list: taxonomiesList
				};

				if (taxonomiesList.length) {
					taxonomies.push(taxonomy);
				}
			});

			return taxonomies;
		};

		// Item wrapper Class
		var itemWrap = $('.js-item-wrap');
		var itemWrapClass = void 0;
		itemWrap.length ? itemWrapClass = $('.js-item-wrap').attr("class") : itemWrapClass = $('.js-posts-wrap').attr('data-item-wrap');
		// Posts per load
		var posts_per_page = void 0;
		$('.js-posts-wrap').attr('data-posts-per-page') ? posts_per_page = $('.js-posts-wrap').attr('data-posts-per-page') : posts_per_page = -1;

		var getPostsViaAjax = function getPostsViaAjax(taxonomies) {

			var $ajaxInfoField = $('.js-ajax-info');
			var $postsWrap = $('.js-posts-wrap');
			var $hideElements = $('.js-ajax-success-hide');

			var $posts_data = {
				'action': current_posts_data.action,
				'post_type': current_posts_data.post_type,
				'posts_per_page': posts_per_page,
				// 'current_page': current_posts_data.current_page,
				'order': current_posts_data.order,
				'item_wrap': itemWrapClass
			};

			// For filtering by taxonomy
			if (taxonomies) {
				$posts_data.tax_query = taxonomies;
			}

			$.ajax({
				url: current_posts_data.ajaxurl,
				data: $posts_data,
				type: 'POST',
				dataType: "json",
				beforeSend: function beforeSend() {
					$ajaxInfoField.text(current_posts_data.loading_txt);
				},
				success: function success(response) {

					if (response.posts_count) {
						$ajaxInfoField.text('Showing ' + response.posts_count + ' results');
					} else {
						$ajaxInfoField.html(current_posts_data.nothing_found_txt);
					}

					if ($hideElements.length) $hideElements.hide(0);

					$postsWrap.html(response.posts_html);
				},
				error: function error(message) {
					console.log(message);
				}
			}); // end ajax
		};

		$inputCheck.on('change', function () {
			var taxonomies = getFilterTaxonomies();
			getPostsViaAjax(taxonomies);
		});
	}

	/* ============================ */
	/* Counter animation */
	/* ============================ */
	if ($('.js-counter').length) {

		var counterView = false;
		var $counters = $('.js-counter');

		// $counters.each(function() {
		//   $(this).width($(this).width() + 'px');
		// });

		var loadCounterFills = function loadCounterFills() {
			$('.js-counter-fill').each(function () {
				$(this).css('width', $(this).attr('data-width') + '%');
			});
		};

		var counterInView = function counterInView() {
			if (!counterView) {
				if (isScrolledIntoView($counters)) {
					counterView = true;
					loadCounterFills();
					$counters.each(function () {
						var size = $(this).text().split(".")[1] ? $(this).text().split(".")[1].length : 0;
						$(this).prop('Counter', 0).animate({
							Counter: $(this).text()
						}, {
							duration: 3000,
							easing: 'swing',
							step: function step(now) {
								$(this).text(parseFloat(now).toFixed(size));
								if (parseInt($(this).text()) > 999) {
									$(this).text(parseInt($(this).text()).toLocaleString('en-US'));
								}
							}
						});
					});
				}
			}
		};

		counterInView();

		$(window).scroll(function () {
			if (!counterView) counterInView();
		});
	}

	/* ============================ */
	/* CONTACT FORM POPUP */
	/* ============================ */

	var contactPopup = $('.js-contact');

	if (contactPopup.length) {
		var contactPopupOpen = $('a[href=open-contact-form]');
		var contactPopupClose = $('.js-contact-close');

		var openContactPopup = function openContactPopup() {
			contactPopup.css('opacity', 0);
			contactPopup.addClass('active');
			contactPopup.animate({
				opacity: 1
			}, 500);
		};

		var closeContactPopup = function closeContactPopup() {
			contactPopup.animate({
				opacity: 0
			}, 500, function () {
				contactPopup.removeClass('active');
			});
		};

		contactPopupOpen.on('click', function (e) {
			e.preventDefault();
			openContactPopup();
		});

		contactPopupClose.on('click', function (e) {
			closeContactPopup();
		});
	}

	/* ============================ */
	/* SEARCH POPUP */
	/* ============================ */

	var js_search_btn = $('.js-search-open'),
	    js_search_overlay = $('.js-search-overlay'),
	    js_search_form = $('.js-search-form'),
	    js_search_input = $('.js-search-input');

	function openSearchPopup() {
		js_search_overlay.css('opacity', 0);
		js_search_overlay.addClass('open');
		js_search_overlay.animate({
			opacity: 0.9
		}, 500, function () {
			js_search_form.addClass('open');
			setTimeout(function () {
				js_search_input.focus();
			}, 100);
		});
	}

	function closeSearchPopup() {
		js_search_form.removeClass('open');
		js_search_overlay.animate({
			opacity: 0
		}, 500, function () {
			js_search_overlay.removeClass('open');
		});
	}

	js_search_btn.on('click', function (e) {
		e.preventDefault;
		if ($(this).hasClass('o-btn-search--active')) {
			$(this).removeClass('o-btn-search--active');
			closeSearchPopup();
		} else {
			$(this).addClass('o-btn-search--active');
			openSearchPopup();
		}
	});
})(jQuery);

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9BcHBsaWNhdGlvbnMvTUFNUC9odGRvY3Mvb2xlYS5sb2Mvd3AtY29udGVudC90aGVtZXMvb2xlYS9hc3NldHMvZXM2L21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoJCkge1xuXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblx0LyogVkFSUyAqL1xuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cdGNvbnN0ICRXSU4gPSAkKHdpbmRvdyk7XG5cblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXHQvKiBIRUFERVIgKi9cblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cdC8vIFNUSUNLWVxuXHR2YXIgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1oZWFkZXJcIik7XG5cdGlmIChoZWFkZXIpIHtcblx0XHR2YXIgc3RpY2t5ID0gaGVhZGVyLm9mZnNldFRvcCArIDEwO1xuXHRcdGZ1bmN0aW9uIHN0aWNreUhlYWRlcigpIHtcblx0XHRcdGlmICh3aW5kb3cucGFnZVlPZmZzZXQgPiBzdGlja3kpIHtcblx0XHRcdFx0aGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJzdGlja3lcIik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZShcInN0aWNreVwiKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHN0aWNreUhlYWRlcik7XG5cdH1cblxuXHQvLyBIQU1CVVJHRVIgQ0xJQ0tcblx0Y29uc3QgJHRvZ2dsZU1lbnUgPSAkKCcuanMtdG9nZ2xlLW1lbnUnKTtcblx0JHRvZ2dsZU1lbnUub24oJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG5cdFx0JChldmVudC5jdXJyZW50VGFyZ2V0KS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XG5cdFx0JChldmVudC5jdXJyZW50VGFyZ2V0KS5wYXJlbnQoKS5maW5kKCcuby1oZWFkZXJfX25hdmlnYXRpb24nKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XG5cdFx0JCgnaHRtbCwgYm9keScpLnRvZ2dsZUNsYXNzKCduby1zY3JvbGwnKTtcblx0fSk7XG5cblx0Ly8gRml4IE1lbnUgaWYgdGhlcmUgaXMgYW4gQWRtaW4gQmFyXG5cdHZhciAkaGVhZGVyO1xuXHR2YXIgJGFkbWluQmFyO1xuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuXHRcdCRhZG1pbkJhciA9ICQoJyN3cGFkbWluYmFyJyk7XG5cblx0XHRpZiAoICRhZG1pbkJhci5sZW5ndGggKSB7XG5cdFx0XHQkaGVhZGVyID0gJCgnLmpzLWhlYWRlcicpO1xuXHRcdFx0Zml4SGVhZGVyV2l0aEFkbWluKCk7XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZml4SGVhZGVyV2l0aEFkbWluKTtcblx0XHR9XG5cdH0pO1xuXG5cdGZ1bmN0aW9uIGZpeEhlYWRlcldpdGhBZG1pbigpIHtcblx0XHRpZiAoIHdpbmRvdy5pbm5lcldpZHRoID4gMTAyNCApIHtcblx0XHRcdGlmICggJGhlYWRlci5oYXNDbGFzcygnc3RpY2t5LXN0YXRpYycpIHx8ICRoZWFkZXIuaGFzQ2xhc3MoJ3N0aWNreS1hYnNvbHV0ZScpICkge1xuXHRcdFx0XHQkaGVhZGVyLmZpbmQoJy5vLWhlYWRlcl9fbWFpbicpLmNzcygnbWFyZ2luLXRvcCcsIDMyKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCRoZWFkZXIuZmluZCgnLm8taGVhZGVyX19tYWluJykuY3NzKCdtYXJnaW4tdG9wJywgMCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXHQvKiBJTUcgVE8gQkcgKi9cblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cdGZ1bmN0aW9uIGNoYW5nZUltZ1RvQmcoaW1nU2VsLCBwYXJlbnRTZWwpIHtcblx0XHRpZiAoIWltZ1NlbCkgcmV0dXJuIGZhbHNlO1xuXG5cdFx0bGV0ICRwYXJlbnQsIF90aGlzO1xuXHRcdCQoaW1nU2VsKS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuXHRcdFx0X3RoaXMgPSAkKGVsZW1lbnQpO1xuXHRcdFx0JHBhcmVudCA9IF90aGlzLmNsb3Nlc3QocGFyZW50U2VsKTtcblx0XHRcdCRwYXJlbnQgPSAkcGFyZW50Lmxlbmd0aCA/ICRwYXJlbnQgOiBfdGhpcy5wYXJlbnQoKTtcblx0XHRcdCRwYXJlbnQuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJ3VybCgnICsgZWxlbWVudC5zcmMgKyAnKScpLmFkZENsYXNzKCdqcy1iZy1iYWNrJyk7XG5cdFx0XHRfdGhpcy5oaWRlKCk7XG5cdFx0fSk7XG5cdH1cblxuXHRjaGFuZ2VJbWdUb0JnKCcuanMtYmcnKTtcblxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cdC8qIEJBTk5FUiBBTklNQVRJT04gKi9cblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cdHZhciBiYW5uZXIgPSAkKCcuanMtYmFubmVyJyk7XG5cdGlmIChiYW5uZXIubGVuZ3RoKSB7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0YmFubmVyLmFkZENsYXNzKCdqcy1iYW5uZXItYWN0Jyk7XG5cdFx0fSwgNDAwMCk7XG5cdH1cblxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblx0LyogSEVBREVSIEJVVFRPTiAtIE9wZW4gT2xhcmsgY2hhdCAgICAgICovXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cdHZhciBidXR0b24gPSAkKCcuanMtb3Blbi1vbGFyaycpO1xuXHRpZiAoYnV0dG9uLmxlbmd0aCkge1xuXHRcdGJ1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbihldikge1xuXHRcdFx0ZXYucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCQoJy5vbGFyay1sYXVuY2gtYnV0dG9uJykudHJpZ2dlcignY2xpY2snKTtcblx0XHR9KTtcblx0fVxuXG5cblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cdC8qIEhFQURFUiBCVVRUT04gLSBPcGVuIE9sYXJrIGNoYXQgICAgICAqL1xuXHQvKiBEaXNhYmxlIHBhcmFsbGF4IGZvciB0b3VjaCBkZXZpY2VzICAgICAgKi9cblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cdGphcmFsbGF4KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1wYXJhbGxheC1pdGVtJyksIHtcblx0XHRkaXNhYmxlUGFyYWxsYXg6IC9pUGFkfGlQaG9uZXxpUG9kfEFuZHJvaWQvXG5cdH0pO1xuXG5cblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXHQvKiBTV0lQRVIgKi9cblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cdHZhciBzd2lwZXJzID0gW107XG5cdHZhciB3aW5XID0gd2luZG93LmlubmVyV2lkdGg7XG5cdHZhciB3aW5IID0gd2luZG93LmlubmVySGVpZ2h0O1xuXHR2YXIgQlJFQUtQT0lOVFMgPSB7XG5cdFx0eHM6IDQ4MCxcblx0XHRzbTogNzY4LFxuXHRcdG1kOiA5OTIsXG5cdFx0bGc6IDEyMDAsXG5cdFx0eGw6IDE2MDAsXG5cdH07XG5cblx0ZnVuY3Rpb24gY2FsY1dpblNpemUoKSB7XG5cdFx0d2luVyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXHRcdHdpbkggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdH1cblxuXHQvLyBJbml0aWFsaXplIHN3aXBlcnNcblx0ZnVuY3Rpb24gaW5pdFN3aXBlcigpIHtcblxuXHRcdHZhciBpdGVyYXRvciA9IDA7XG5cblx0XHQkKCcuc3dpcGVyLWNvbnRhaW5lcicpLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0XG5cdFx0XHR2YXIgJHN3aXBlciA9ICQodGhpcyk7XG5cblx0XHRcdHZhciBicmVha01vYlZhbCA9ICggJHN3aXBlci5hdHRyKCdkYXRhLWJyZWFrLW1vYicpID09ICd0cnVlJyApO1xuXHRcdFx0aWYgKCAoYnJlYWtNb2JWYWwpICYmICh3aW5XIDwgNzY3KSApIHJldHVybiB0cnVlO1xuXG5cdFx0XHR2YXIgaW5kZXggPSAnc3dpcGVyLXVuaXF1ZS1pZC0nICsgaXRlcmF0b3I7XG5cblx0XHRcdCRzd2lwZXIuYWRkQ2xhc3MoJ3N3aXBlci0nICsgaW5kZXggKyAnIGluaXRpYWxpemVkJykuYXR0cignaWQnLCBpbmRleCk7XG5cdFx0XHQkc3dpcGVyLnBhcmVudCgpLmFkZENsYXNzKCdpbml0JykuZmluZCgnLnN3aXBlci1wYWdpbmF0aW9uJykuYWRkQ2xhc3MoJ3N3aXBlci1wYWdpbmF0aW9uLScgKyBpbmRleCk7XG5cblx0XHRcdC8vIEdldCB2YWx1ZSBmb3IgaW5pdFxuXHRcdFx0dmFyIGF1dG9QbGF5VmFyID0gZmFsc2U7XG5cdFx0XHRpZiAoICRzd2lwZXIuYXR0cignZGF0YS1hdXRvcGxheScpID09ICd0cnVlJyB8fCBwYXJzZUludCgkc3dpcGVyLmF0dHIoJ2RhdGEtZGVsYXknKSwgMTApKSBhdXRvUGxheVZhciA9IHsgZGVsYXk6IDQwMDAgfHwgZGVsYXlWYWwgfTtcblxuXHRcdFx0dmFyIGRpcmVjdGlvblZhbCA9ICRzd2lwZXIuYXR0cignZGF0YS1kaXJlY3Rpb24nKTtcblx0XHRcdHZhciB2ZXJ0aWNhbERlc2t0b3BPbmx5ID0gKCRzd2lwZXIuYXR0cignZGF0YS12ZXJ0LWRlc2t0b3AnKSA9PSAndHJ1ZScpO1xuXHRcdFx0aWYgKCB2ZXJ0aWNhbERlc2t0b3BPbmx5ICYmICh3aW5XIDwgOTkyKSApIGRpcmVjdGlvblZhbCA9IGZhbHNlO1xuXG5cdFx0XHR2YXIgc3BhY2VCZXR3ZWVuVmFsID0gcGFyc2VJbnQoJHN3aXBlci5hdHRyKCdkYXRhLXNwYWNlQmV0d2VlbicpKTtcblx0XHRcdHZhciBzbGlkZXNQZXJWaWV3VmFsID0gJHN3aXBlci5hdHRyKCdkYXRhLXNsaWRlc1BlclZpZXcnKTtcblx0XHRcdHN3aXRjaCAoIHNsaWRlc1BlclZpZXdWYWwgKSB7XG5cdFx0XHRcdGNhc2UgJ3Jlc3BvbnNpdmUnOlxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXdWYWwgPSBnZXRTbGlkZXNQZXJWaWV3TnVtYmVyKCRzd2lwZXIpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdhdXRvJzpcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3VmFsID0gcGFyc2VJbnQoc2xpZGVzUGVyVmlld1ZhbCwgMTApXG5cdFx0XHR9XG5cdFx0XHR2YXIgbG9vcFZhbCA9ICRzd2lwZXIuYXR0cignZGF0YS1sb29wJyk7XG5cdFx0XHR2YXIgc3BlZWRWYWwgPSBwYXJzZUludCgkc3dpcGVyLmF0dHIoJ2RhdGEtc3BlZWQnKSwgMTApO1xuXHRcdFx0aWYgKCAhIHNwZWVkVmFsICkgc3BlZWRWYWwgPSA1MDA7XG5cdFx0XHR2YXIgY2VudGVyZWRTbGlkZXNWYWwgPSAoJHN3aXBlci5hdHRyKCdkYXRhLWNlbnRlcmVkLXNsaWRlcycpID09ICd0cnVlJyk7XG5cdFx0XHR2YXIgZWZmZWN0VmFsID0gJHN3aXBlci5hdHRyKCdkYXRhLWVmZmVjdCcpO1xuXHRcdFx0dmFyIHByb2dCYXJWYWwgPSAkc3dpcGVyLmF0dHIoJ2RhdGEtcHJvZ0JhcicpO1xuXHRcdFx0dmFyIHNsaWRlVG9DbGlja2VkU2xpZGVWYWwgPSAoJHN3aXBlci5hdHRyKCdkYXRhLXNsaWRlVG9DbGlja2VkU2xpZGUnKSA9PSAndHJ1ZScpO1xuXG5cdFx0XHQvLyBGb3Igc2xpZGVyIHdpdGggdGh1bWJuYWlsXG5cdFx0XHR2YXIgZnJlZU1vZGVWYWwgPSAoJHN3aXBlci5hdHRyKCdkYXRhLWZyZWVNb2RlJykgPT0gJ3RydWUnKTtcblx0XHRcdHZhciB3YXRjaFNsaWRlc1Zpc2liaWxpdHlWYWwgPSAoJHN3aXBlci5hdHRyKCdkYXRhLXdhdGNoU2xpZGVzVmlzaWJpbGl0eScpID09ICd0cnVlJyk7XG5cdFx0XHR2YXIgd2F0Y2hTbGlkZXNQcm9ncmVzc1ZhbCA9ICgkc3dpcGVyLmF0dHIoJ2RhdGEtd2F0Y2hTbGlkZXNWaXNpYmlsaXR5JykgPT0gJ3RydWUnKTtcblx0XHRcdHZhciB0aHVtYnNWYWwgPSBmYWxzZTtcblx0XHRcdGlmKCAkc3dpcGVyLmF0dHIoJ2RhdGEtbWFpbicpID09ICd0cnVlJyApIHtcblx0XHRcdFx0dGh1bWJzVmFsID0geyBzd2lwZXI6IHN3aXBlcnNbJ3N3aXBlci0nICsgJ3N3aXBlci11bmlxdWUtaWQtJyArICggaXRlcmF0b3IgLSAxICkgXSB9O1xuXHRcdFx0fVxuXG5cdFx0XHRzd2lwZXJzWydzd2lwZXItJyArIGluZGV4XSA9IG5ldyBTd2lwZXIoJy5zd2lwZXItJyArIGluZGV4LCB7XG5cdFx0XHRcdHNwZWVkOiBzcGVlZFZhbCxcblx0XHRcdFx0cGFnaW5hdGlvbjoge1xuXHRcdFx0XHRcdGVsOiAnLnN3aXBlci1wYWdpbmF0aW9uLScgKyBpbmRleCxcblx0XHRcdFx0XHR0eXBlOiBwcm9nQmFyVmFsIHx8ICdidWxsZXRzJyxcblx0XHRcdFx0XHRjbGlja2FibGU6IHRydWUsXG5cdFx0XHRcdFx0cmVuZGVyQnVsbGV0OiBmdW5jdGlvbiAoaW5kZXgsIGNsYXNzTmFtZSkge1xuXHRcdFx0XHRcdFx0aWYgKCRzd2lwZXIuZmluZCgnLnN3aXBlci1wYWdpbmF0aW9uLS1udW1lcmljJykubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChpbmRleCA8IDkpIHZhciB6ZXJvID0gJzAnO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gJzxzcGFuIGNsYXNzPVwiJyArIGNsYXNzTmFtZSArICdcIj4nICsgemVybyArIChpbmRleCArIDEpICsgJzwvc3Bhbj4nO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuICc8c3BhbiBjbGFzcz1cIicgKyBjbGFzc05hbWUgKyAnXCI+PC9zcGFuPic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRsb29wOiBsb29wVmFsLFxuXHRcdFx0XHRlZmZlY3Q6IGVmZmVjdFZhbCxcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiBzcGFjZUJldHdlZW5WYWwsXG5cdFx0XHRcdGF1dG9wbGF5OiBhdXRvUGxheVZhcixcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogc2xpZGVzUGVyVmlld1ZhbCxcblx0XHRcdFx0Y2VudGVyZWRTbGlkZXM6IGNlbnRlcmVkU2xpZGVzVmFsLFxuXHRcdFx0XHRkaXJlY3Rpb246IGRpcmVjdGlvblZhbCB8fCAnaG9yaXpvbnRhbCcsXG5cdFx0XHRcdHNsaWRlVG9DbGlja2VkU2xpZGU6IHNsaWRlVG9DbGlja2VkU2xpZGVWYWwsXG5cdFx0XHRcdGZyZWVNb2RlOiBmcmVlTW9kZVZhbCxcblx0XHRcdFx0d2F0Y2hTbGlkZXNWaXNpYmlsaXR5OiB3YXRjaFNsaWRlc1Zpc2liaWxpdHlWYWwsXG5cdFx0XHRcdHdhdGNoU2xpZGVzUHJvZ3Jlc3NWYWw6IHdhdGNoU2xpZGVzUHJvZ3Jlc3NWYWwsXG5cdFx0XHRcdHRodW1iczogdGh1bWJzVmFsLFxuXHRcdFx0fSk7XG5cblx0XHRcdGlmICggKCRzd2lwZXIuZmluZCgnLnBhZ2luYXRpb24nKS5sZW5ndGgpICYmICRzd2lwZXIuYXR0cignZGF0YS1zbGlkZXNwZXJ2aWV3JykgPT0gJ3Jlc3BvbnNpdmUnKSB7XG5cdFx0XHRcdHZhciBwYWdpbmF0aW9uU3BhbiA9ICRzd2lwZXIuZmluZCgnLnBhZ2luYXRpb24gc3BhbicpO1xuXHRcdFx0XHR2YXIgcGFnaW5hdGlvblNsaWNlID0gcGFnaW5hdGlvblNwYW4uaGlkZSgpLnNsaWNlKDAsIChwYWdpbmF0aW9uU3Bhbi5sZW5ndGggKyAxIC0gc2xpZGVzUGVyVmlld1ZhbCkpO1xuXHRcdFx0XHRpZiAocGFnaW5hdGlvblNsaWNlLmxlbmd0aCA8PSAxIHx8IHNsaWRlc1BlclZpZXdWYWwgPj0gJHN3aXBlci5maW5kKCcuc3dpcGVyLXNsaWRlJykubGVuZ3RoKSAkc3dpcGVyLmFkZENsYXNzKCdwYWdpbmF0aW9uLWhpZGRlbicpO1xuXHRcdFx0XHRlbHNlICRzd2lwZXIucmVtb3ZlQ2xhc3MoJ3BhZ2luYXRpb24taGlkZGVuJyk7XG5cdFx0XHRcdHBhZ2luYXRpb25TbGljZS5zaG93KCk7XG5cdFx0XHR9XG5cblx0XHRcdGl0ZXJhdG9yKys7XG5cdFx0fSk7XG5cdH1cblxuXHRpbml0U3dpcGVyKCk7XG5cblx0Ly8gU3dpcGVyIGFycm93c1xuXHQkKCcuc3dpcGVyLmluaXQgLnN3aXBlci1idXR0b24tcHJldicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRzd2lwZXJzWydzd2lwZXItJyArICQodGhpcykucGFyZW50KCkuZmluZCgnLnN3aXBlci1jb250YWluZXInKS5hdHRyKCdpZCcpXS5zbGlkZVByZXYoKTtcblx0fSk7XG5cblx0JCgnLnN3aXBlci5pbml0IC5zd2lwZXItYnV0dG9uLW5leHQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0c3dpcGVyc1snc3dpcGVyLScgKyAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5zd2lwZXItY29udGFpbmVyJykuYXR0cignaWQnKV0uc2xpZGVOZXh0KCk7XG5cdH0pO1xuXG5cdC8vIEdldCBzbGlkZXMgcGVyIHZpZXcgbnVtYmVyXG5cdGZ1bmN0aW9uIGdldFNsaWRlc1BlclZpZXdOdW1iZXIoc3dpcGVyQ29udGFpbmVyKSB7XG5cdFx0aWYgKHdpblcgPj0gQlJFQUtQT0lOVFMueGwpIHJldHVybiBwYXJzZUludChzd2lwZXJDb250YWluZXIuYXR0cignZGF0YS14bC1zbGlkZXMnKSwgMTApO1xuXHRcdGVsc2UgaWYgKHdpblcgPj0gQlJFQUtQT0lOVFMubGcpIHJldHVybiBwYXJzZUludChzd2lwZXJDb250YWluZXIuYXR0cignZGF0YS1sZy1zbGlkZXMnKSwgMTApO1xuXHRcdGVsc2UgaWYgKHdpblcgPj0gQlJFQUtQT0lOVFMubWQpIHJldHVybiBwYXJzZUludChzd2lwZXJDb250YWluZXIuYXR0cignZGF0YS1tZC1zbGlkZXMnKSwgMTApO1xuXHRcdGVsc2UgaWYgKHdpblcgPj0gQlJFQUtQT0lOVFMuc20pIHJldHVybiBwYXJzZUludChzd2lwZXJDb250YWluZXIuYXR0cignZGF0YS1zbS1zbGlkZXMnKSwgMTApO1xuXHRcdGVsc2UgcmV0dXJuIHBhcnNlSW50KHN3aXBlckNvbnRhaW5lci5hdHRyKCdkYXRhLXhzLXNsaWRlcycpLCAxMCk7XG5cdH1cblxuXHQvLyBVcGRhdGUgc2xpZGVyIHBlciB2aWV3XG5cdGZ1bmN0aW9uIHVwZGF0ZVNpbGRlcnBlclZpZXcoKSB7XG5cdFx0JCgnLnN3aXBlci1jb250YWluZXIuaW5pdGlhbGl6ZWRbZGF0YS1zbGlkZXNwZXJ2aWV3PVwicmVzcG9uc2l2ZVwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIHRoaXNTd2lwZXIgPSBzd2lwZXJzWydzd2lwZXItJyArICQodGhpcykuYXR0cignaWQnKV0sXG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlld1ZhbCA9IGdldFNsaWRlc1BlclZpZXdOdW1iZXIoJCh0aGlzKSk7XG5cdFx0XHRcdFx0Ly8gY2VudGVyVmFyID0gdGhpc1N3aXBlci5wYXJhbXMuY2VudGVyZWRTbGlkZXM7XG5cdFx0XHR0aGlzU3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID0gc2xpZGVzUGVyVmlld1ZhbDtcblx0XHRcdHRoaXNTd2lwZXIudXBkYXRlKCk7XG5cdFx0fSk7XG5cdH1cblxuXHQvLyBVcGRhdGUgc2xpZGVyIHNldHRpbmdzXG5cdGZ1bmN0aW9uIHVwZGF0ZVNpbGRlcnBlclZpZXcoKSB7XG5cdFx0JCgnLnN3aXBlci1jb250YWluZXIuaW5pdGlhbGl6ZWRbZGF0YS1zbGlkZXNwZXJ2aWV3PVwicmVzcG9uc2l2ZVwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIHRoaXNTd2lwZXIgPSBzd2lwZXJzWydzd2lwZXItJyArICQodGhpcykuYXR0cignaWQnKV0sXG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlld1ZhbCA9IGdldFNsaWRlc1BlclZpZXdOdW1iZXIoJCh0aGlzKSk7XG5cdFx0XHRcdFx0Ly8gY2VudGVyVmFyID0gdGhpc1N3aXBlci5wYXJhbXMuY2VudGVyZWRTbGlkZXM7XG5cdFx0XHR0aGlzU3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID0gc2xpZGVzUGVyVmlld1ZhbDtcblx0XHRcdHRoaXNTd2lwZXIudXBkYXRlKCk7XG5cdFx0fSk7XG5cdH1cblxuXHQkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcblx0XHRjYWxjV2luU2l6ZSgpO1xuXHRcdHVwZGF0ZVNpbGRlcnBlclZpZXcoKTtcblx0fSk7XG5cblx0JCh3aW5kb3cpLnRyaWdnZXIoJ3Jlc2l6ZScpO1xuXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblx0LyogU0xJREVSIFdJVEggVEhVTUJOQUlMUyAqL1xuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblx0aWYgKCQoJy5qcy1zbGRyLXRodW1icy1saXN0JykubGVuZ3RoKSB7XG5cdFx0dmFyIG1vbml0b3JTd2lwZXJBY3RpdmUgPSAwO1xuXHRcdHZhciBtb25pdG9yU3dpcGVySWQgPSAkKCcuc3dpcGVyLWNvbnRhaW5lcltkYXRhLXNsZHItdy10aG1icz10cnVlXScpLmF0dHIoJ2lkJyk7XG5cdFx0c3dpcGVyc1snc3dpcGVyLScgKyBtb25pdG9yU3dpcGVySWRdLm9uKCdzbGlkZUNoYW5nZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0bW9uaXRvclN3aXBlckFjdGl2ZSA9IHN3aXBlcnNbJ3N3aXBlci0nICsgbW9uaXRvclN3aXBlcklkXS5hY3RpdmVJbmRleDtcblx0XHRcdCQoJy5qcy1zbGRyLXRodW1icy1pdGVtJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmVxKG1vbml0b3JTd2lwZXJBY3RpdmUpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHR9KVxuXHR9XG5cblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXHQvKiBTQ1JPTExFRCBJTlRPIFZJRVcgKi9cblx0LyogRnVuY3Rpb24gcmV0dXJuIGJvb2xlYW4gdmFsdWUgaWYgZWxlbWVudCBpcyBzY3JvbGxlZCBpbnRvIHZpZXcgKi9cblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cdGZ1bmN0aW9uIGlzU2Nyb2xsZWRJbnRvVmlldyhlbGVtKSB7XG5cblx0XHR2YXIgZG9jVmlld1RvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcblx0XHR2YXIgZG9jVmlld0JvdHRvbSA9IGRvY1ZpZXdUb3AgKyAkKHdpbmRvdykuaGVpZ2h0KCk7XG5cblx0XHR2YXIgZWxlbVRvcCA9ICQoZWxlbSkub2Zmc2V0KCkudG9wO1xuXHRcdHZhciBlbGVtSGVpZ2h0ID0gJChlbGVtKS5oZWlnaHQoKTtcblx0XHR2YXIgZWxlbU1pZGRsZSA9IGVsZW1Ub3AgKyAoIGVsZW1IZWlnaHQgLyAyKTtcblx0XHR2YXIgZWxlbUJvdHRvbSA9IGVsZW1Ub3AgKyBlbGVtSGVpZ2h0O1xuXG5cdFx0dmFyIHJlc3VsdCA9ICggKGVsZW1Ub3AgPj0gZG9jVmlld1RvcCkgJiYgKGVsZW1Ub3AgPD0gZG9jVmlld0JvdHRvbSkgfHwgKGVsZW1NaWRkbGUgPj0gZG9jVmlld1RvcCkgJiYgKGVsZW1NaWRkbGUgPD0gZG9jVmlld0JvdHRvbSkgKVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblx0LyogQU5JTUFUSU9OICovXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXHR2YXIgYW5pbSA9ICQoJy5hbmltJyk7XG5cblx0aWYgKGFuaW0ubGVuZ3RoKSB7XG5cblx0XHQvLyBDcmVhdGUgZW1wdHkgYXJyYXkgd2l0aCBzdGF0dXNcblx0XHRsZXQgYW5pbVN0YXR1cyA9IFtdO1xuXHRcdGFuaW1TdGF0dXMubGVuZ3RoID0gYW5pbS5sZW5ndGg7XG5cblx0XHQvLyBhZGQgQ2xhc3MgdG8gZWxlbWVudFxuXHRcdGxldCBhZGRBbmltQ2xhc3MgPSBmdW5jdGlvbigpIHtcblx0XHRcdGZvciggbGV0IGkgPSAwOyBpIDwgYW5pbVN0YXR1cy5sZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0aWYgKCAhIGFuaW1TdGF0dXNbaV0gKSB7XG5cdFx0XHRcdFx0aWYgKCAhKCQoYW5pbVtpXSkuaGFzQ2xhc3MoJ2FuaW0tYWN0JykpICYmIChpc1Njcm9sbGVkSW50b1ZpZXcoJChhbmltW2ldKSkpICkge1xuXHRcdFx0XHRcdFx0JChhbmltW2ldKS5hZGRDbGFzcygnYW5pbS1hY3QnKTtcblx0XHRcdFx0XHRcdGFuaW1TdGF0dXNbaV0gPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGFkZEFuaW1DbGFzcygpO1xuXG5cdFx0JCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7XG5cdFx0XHRhZGRBbmltQ2xhc3MoKTtcblx0XHR9KTtcblxuXHR9XG5cblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXHQvKiBBT1MgKi9cblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXHRcblx0QU9TLmluaXQoe1xuXHRcdG9mZnNldDogMjAsXG5cdFx0ZHVyYXRpb246IDYwMCxcblx0XHRlYXNpbmc6ICdlYXNlLWluLW91dCcsXG5cdFx0b25jZTogdHJ1ZSxcblx0fSk7XG5cblx0JCggZG9jdW1lbnQgKS5hamF4Q29tcGxldGUoZnVuY3Rpb24oIGV2ZW50LCByZXF1ZXN0LCBzZXR0aW5ncyApIHtcblx0XHRBT1MucmVmcmVzaCgpO1xuXHR9KTtcblxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cdC8qIFZJTUVPIFBMQVlFUiAqL1xuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblx0aWYgKCAkKCcuanMtdmlkLXZpbWVvJykubGVuZ3RoICYmICgkKCcuanMtcHJseC1ncmlkOnZpc2libGUnKS5sZW5ndGggPT0gMSkgKSB7XG5cdFx0XG5cdFx0dmFyIHZpZGVvUGxheWVycyA9IFtdO1xuXHRcdHZhciB2aWRlb1dyYXBwZXJzID0gW107XG5cblx0XHQkKCcuanMtdmlkLXZpbWVvJykuZWFjaChmdW5jdGlvbihpbmRleCwgZWxlbWVudCkge1xuXG5cdFx0XHR2aWRlb1dyYXBwZXJzW2luZGV4XSA9ICQodGhpcyk7XG5cdFx0XHR2aWRlb1BsYXllcnNbaW5kZXhdID0gbmV3IFZpbWVvLlBsYXllcihlbGVtZW50KTtcblx0XHRcdC8vdmlkZW9QbGF5ZXJzW2luZGV4XS51cGRTdGF0dXMgPSB0cnVlO1xuXHRcdFx0XG5cdFx0fSk7XG5cblx0XHRsZXQgcGxheVZpbWVvVmlkZW9zID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHZpZGVvV3JhcHBlcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0bGV0IGVsZW1lbnRUb3AgPSB2aWRlb1dyYXBwZXJzW2ldLm9mZnNldCgpLnRvcDtcblx0XHRcdFx0bGV0IGVsZW1lbnRCb3R0b20gPSBlbGVtZW50VG9wICsgdmlkZW9XcmFwcGVyc1tpXS5vdXRlckhlaWdodCgpO1xuXHRcdFx0XHRsZXQgdmlld3BvcnRUb3AgPSAkV0lOLnNjcm9sbFRvcCgpO1xuXHRcdFx0XHRsZXQgdmlld3BvcnRCb3R0b20gPSB2aWV3cG9ydFRvcCArICRXSU4uaGVpZ2h0KCk7XG5cblx0XHRcdFx0Ly8gaWYgKCB2aWRlb1BsYXllcnNbaV0udXBkU3RhdHVzICkge1xuXHRcdFx0XHRcdGlmIChlbGVtZW50Qm90dG9tID4gdmlld3BvcnRUb3AgJiYgZWxlbWVudFRvcCA8IHZpZXdwb3J0Qm90dG9tKSB7XG5cdFx0XHRcdFx0XHR2aWRlb1BsYXllcnNbaV0ucGxheSgpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR2aWRlb1BsYXllcnNbaV0ucGF1c2UoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdC8vIH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBwbGF5VmltZW9WaWRlb3MoKTtcblx0XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHBsYXlWaW1lb1ZpZGVvcyk7XG5cblx0fVxuXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblx0LyogUFJPRFVDVCBDT0xPUlMgU0VDVElPTiAqL1xuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblx0dmFyIHByb2RDbHJzID0gJCgnLmpzLXByb2QtY2xycycpO1xuXG5cdGlmIChwcm9kQ2xycy5sZW5ndGgpIHtcblx0XHQkKCcuanMtcHJvZC1jbHInKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdGxldCBpbmRleCA9ICQodGhpcykuaW5kZXgoKTtcblxuXHRcdFx0Ly8gRm9yIGNvbG9yc1xuXHRcdFx0JCh0aGlzKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG5cdFx0XHQvLyBGb3IgaW1hZ2VzXG5cdFx0XHQkKHRoaXMpLmNsb3Nlc3QoJy5qcy1wcm9kLWNscnMnKS5maW5kKCcuanMtcHJvZC1pbWcnKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuZXEoaW5kZXgpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHR9KVxuXHR9XG5cblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXHQvKiBTaW1wbGUgZHJvcGRvd24gKi9cblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cdCQoJy5qcy1hY2NvcmRpb24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCkuc2xpZGVUb2dnbGUoXCJmYXN0XCIsICgpID0+IHtcblx0XHRcdEFPUy5yZWZyZXNoKCk7XG5cdFx0fSk7XG5cdH0pO1xuXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblx0LyogQW5jaG9yIExpbmtzICovXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXHQkKCcuanMtYW5jaC1saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR2YXIgdGFyZ2VyQ2xhc3MgPSAnLicgKyAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcblxuXHRcdHZhciBoZWFkZXJIZWlnaHQgPSAkKCcuby1oZWFkZXIuc3RpY2t5JykuZmluZCgnLm8taGVhZGVyX19tYWluJykuaW5uZXJIZWlnaHQoKTtcblx0XHRpZiAoICEgaGVhZGVySGVpZ2h0ICkgaGVhZGVySGVpZ2h0ID0gMDtcblx0XHRjb25zb2xlLmxvZyhoZWFkZXJIZWlnaHQpO1xuXG5cdFx0aWYgKCAkKHRhcmdlckNsYXNzKS5sZW5ndGggKSB7XG5cdFx0XHQkKFtkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGRvY3VtZW50LmJvZHldKS5hbmltYXRlKHtcblx0XHRcdFx0c2Nyb2xsVG9wOiAkKHRhcmdlckNsYXNzKS5vZmZzZXQoKS50b3AgLSBoZWFkZXJIZWlnaHRcblx0XHRcdH0sIDEwMDApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmxvZygnTm8gdGFyZ2V0IGJsb2NrIGZvciB0aGlzIGxpbmsgOignKVxuXHRcdH1cblx0fSk7XG5cblxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cdC8qIFNUSUNLWSBCQVIgd2l0aCBidXR0b25zIChkaXNwbGF5ZWQgb25seSBvbiBtb2JpbGUpICovXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXHRpZiAoIHdpbmRvdy5pbm5lcldpZHRoIDwgNTc2ICYmICQoJy5qcy1zdGNrLWJhcicpLmxlbmd0aCApIHtcblxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG5cblx0XHRcdHZhciBzdGlja3lCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXN0Y2stYmFyXCIpO1xuXHRcdFx0dmFyIGZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtZm9vdGVyXCIpO1xuXHRcdFxuXHRcdFx0bGV0IGNoZWNrU3RpY2t5QmFyID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGlja3kgPSBmb290ZXIub2Zmc2V0VG9wO1xuXHRcdFx0XHR2YXIgb0xhcmtCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI29sYXJrLXdyYXBwZXIgLm9sYXJrLWxhdW5jaC1idXR0b25cIik7XG5cdFx0XG5cdFx0XHRcdGlmICh3aW5kb3cucGFnZVlPZmZzZXQgKyB3aW5kb3cuaW5uZXJIZWlnaHQgPiBzdGlja3kpIHtcblx0XHRcdFx0XHRzdGlja3lCYXIuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XG5cdFx0XHRcdFx0aWYgKG9MYXJrQnRuKSBvTGFya0J0bi5jbGFzc0xpc3QucmVtb3ZlKFwidHJhbnNmb3JtXCIpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHN0aWNreUJhci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcblx0XHRcdFx0XHRpZiAob0xhcmtCdG4pIG9MYXJrQnRuLmNsYXNzTGlzdC5hZGQoXCJ0cmFuc2Zvcm1cIik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcblx0XHRcdGNoZWNrU3RpY2t5QmFyKCk7XG5cblx0XHRcdHNldFRpbWVvdXQoY2hlY2tTdGlja3lCYXIsIDMwMCk7XG5cblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBjaGVja1N0aWNreUJhcik7XG5cblx0XHR9KTtcblxuXHR9XG5cblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXHQvKiBLSU9TS1MgRklMVEVSIEFKQVggKi9cblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXHRpZiAoJCgnLmpzLWZpbHRlcmluZycpLmxlbmd0aCkge1xuXHRcdGxldCAkaW5wdXRDaGVjayA9ICQoJy5qcy1mbHRyLWlucHV0Jyk7XG5cdFx0XG5cdFx0dmFyIGdldEZpbHRlclRheG9ub21pZXMgPSBmdW5jdGlvbigpIHtcblx0XHRcdGxldCB0YXhvbm9taWVzID0gW107XG5cdFxuXHRcdFx0JCgnLmpzLWZsdHItbGFiZWxzJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0bGV0IGlucHV0cyA9ICQodGhpcykuZmluZCgnLmpzLWZsdHItaW5wdXQnKTtcblx0XHRcdFx0bGV0IHRheG9ub21pZXNMaXN0ID0gW107XG5cdFxuXHRcdFx0XHRpbnB1dHMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoICQodGhpcykuaXMoJzpjaGVja2VkJykgKSB7XG5cdFx0XHRcdFx0XHR0YXhvbm9taWVzTGlzdC5wdXNoKCQodGhpcykuYXR0cignZGF0YS10YXhvbm9teScpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcblx0XHRcdFx0bGV0IHRheG9ub215ID0ge1xuXHRcdFx0XHRcdG5hbWU6ICQodGhpcykuYXR0cignZGF0YS10YXhvbm9teS1uYW1lJyksXG5cdFx0XHRcdFx0bGlzdDogdGF4b25vbWllc0xpc3Rcblx0XHRcdFx0fVxuXHRcblx0XHRcdFx0aWYgKHRheG9ub21pZXNMaXN0Lmxlbmd0aCkge1xuXHRcdFx0XHRcdHRheG9ub21pZXMucHVzaCh0YXhvbm9teSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gdGF4b25vbWllcztcblx0XHR9XG5cblx0XHQvLyBJdGVtIHdyYXBwZXIgQ2xhc3Ncblx0XHRsZXQgaXRlbVdyYXAgPSAkKCcuanMtaXRlbS13cmFwJyk7XG5cdFx0bGV0IGl0ZW1XcmFwQ2xhc3M7XG5cdFx0KGl0ZW1XcmFwLmxlbmd0aCkgPyBpdGVtV3JhcENsYXNzID0gJCgnLmpzLWl0ZW0td3JhcCcpLmF0dHIoXCJjbGFzc1wiKSA6IGl0ZW1XcmFwQ2xhc3MgPSAkKCcuanMtcG9zdHMtd3JhcCcpLmF0dHIoJ2RhdGEtaXRlbS13cmFwJyk7XG5cdFx0Ly8gUG9zdHMgcGVyIGxvYWRcblx0XHRsZXQgcG9zdHNfcGVyX3BhZ2U7XG5cdFx0KCQoJy5qcy1wb3N0cy13cmFwJykuYXR0cignZGF0YS1wb3N0cy1wZXItcGFnZScpKSA/IHBvc3RzX3Blcl9wYWdlID0gJCgnLmpzLXBvc3RzLXdyYXAnKS5hdHRyKCdkYXRhLXBvc3RzLXBlci1wYWdlJykgOiBwb3N0c19wZXJfcGFnZSA9IC0xO1xuXHRcblx0XHR2YXIgZ2V0UG9zdHNWaWFBamF4ID0gZnVuY3Rpb24odGF4b25vbWllcykge1xuXHRcblx0XHRcdGxldCAkYWpheEluZm9GaWVsZCA9ICQoJy5qcy1hamF4LWluZm8nKTtcblx0XHRcdGxldCAkcG9zdHNXcmFwID0gJCgnLmpzLXBvc3RzLXdyYXAnKTtcblx0XHRcdGxldCAkaGlkZUVsZW1lbnRzID0gJCgnLmpzLWFqYXgtc3VjY2Vzcy1oaWRlJyk7XG5cdFx0XHRcdFxuXHRcdFx0bGV0ICRwb3N0c19kYXRhID0ge1xuXHRcdFx0XHRcdCdhY3Rpb24nOiBjdXJyZW50X3Bvc3RzX2RhdGEuYWN0aW9uLFxuXHRcdFx0XHRcdCdwb3N0X3R5cGUnOiBjdXJyZW50X3Bvc3RzX2RhdGEucG9zdF90eXBlLFxuXHRcdFx0XHRcdCdwb3N0c19wZXJfcGFnZSc6IHBvc3RzX3Blcl9wYWdlLFxuXHRcdFx0XHRcdC8vICdjdXJyZW50X3BhZ2UnOiBjdXJyZW50X3Bvc3RzX2RhdGEuY3VycmVudF9wYWdlLFxuXHRcdFx0XHRcdCdvcmRlcic6IGN1cnJlbnRfcG9zdHNfZGF0YS5vcmRlcixcblx0XHRcdFx0XHQnaXRlbV93cmFwJzogaXRlbVdyYXBDbGFzcyxcblx0XHRcdH07XG5cdFxuXHRcdFx0Ly8gRm9yIGZpbHRlcmluZyBieSB0YXhvbm9teVxuXHRcdFx0aWYgKHRheG9ub21pZXMpIHtcblx0XHRcdFx0JHBvc3RzX2RhdGEudGF4X3F1ZXJ5ID0gdGF4b25vbWllcztcblx0XHRcdH1cblx0XG5cdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdHVybDogY3VycmVudF9wb3N0c19kYXRhLmFqYXh1cmwsXG5cdFx0XHRcdFx0ZGF0YTogJHBvc3RzX2RhdGEsXG5cdFx0XHRcdFx0dHlwZTogJ1BPU1QnLFxuXHRcdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0XHRcdFx0XHRiZWZvcmVTZW5kOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdCRhamF4SW5mb0ZpZWxkLnRleHQoY3VycmVudF9wb3N0c19kYXRhLmxvYWRpbmdfdHh0KTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFxuXHRcdFx0XHRcdFx0aWYgKCByZXNwb25zZS5wb3N0c19jb3VudCApIHtcblx0XHRcdFx0XHRcdFx0JGFqYXhJbmZvRmllbGQudGV4dCgnU2hvd2luZyAnICsgcmVzcG9uc2UucG9zdHNfY291bnQgKyAnIHJlc3VsdHMnKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdCRhamF4SW5mb0ZpZWxkLmh0bWwoY3VycmVudF9wb3N0c19kYXRhLm5vdGhpbmdfZm91bmRfdHh0KTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKCRoaWRlRWxlbWVudHMubGVuZ3RoKSAkaGlkZUVsZW1lbnRzLmhpZGUoMCk7XG5cdFxuXHRcdFx0XHRcdFx0JHBvc3RzV3JhcC5odG1sKHJlc3BvbnNlLnBvc3RzX2h0bWwpO1xuXHRcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGVycm9yOiBmdW5jdGlvbihtZXNzYWdlKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdH0pOyAvLyBlbmQgYWpheFxuXHRcdH1cblxuXHRcdCRpbnB1dENoZWNrLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRsZXQgdGF4b25vbWllcyA9IGdldEZpbHRlclRheG9ub21pZXMoKTtcblx0XHRcdGdldFBvc3RzVmlhQWpheCh0YXhvbm9taWVzKTtcblx0XHR9KTtcblx0fVxuXG5cdC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblx0LyogQ291bnRlciBhbmltYXRpb24gKi9cblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXHRpZiAoJCgnLmpzLWNvdW50ZXInKS5sZW5ndGgpIHtcblxuXHRcdGxldCBjb3VudGVyVmlldyA9IGZhbHNlO1xuXHRcdGxldCAkY291bnRlcnMgPSAkKCcuanMtY291bnRlcicpO1xuXG5cdFx0Ly8gJGNvdW50ZXJzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0Ly8gICAkKHRoaXMpLndpZHRoKCQodGhpcykud2lkdGgoKSArICdweCcpO1xuXHRcdC8vIH0pO1xuXG5cdFx0dmFyIGxvYWRDb3VudGVyRmlsbHMgPSBmdW5jdGlvbigpIHtcblx0XHRcdCQoJy5qcy1jb3VudGVyLWZpbGwnKS5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0JCh0aGlzKS5jc3MoJ3dpZHRoJywgJCh0aGlzKS5hdHRyKCdkYXRhLXdpZHRoJykgKyAnJScpO1xuXHRcdFx0fSlcblx0XHR9XG5cblx0XHR2YXIgY291bnRlckluVmlldyA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCFjb3VudGVyVmlldykge1xuXHRcdFx0XHRpZiAoaXNTY3JvbGxlZEludG9WaWV3KCRjb3VudGVycykpIHtcblx0XHRcdFx0XHRjb3VudGVyVmlldyA9IHRydWU7XG5cdFx0XHRcdFx0bG9hZENvdW50ZXJGaWxscygpO1xuXHRcdFx0XHRcdCRjb3VudGVycy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0dmFyIHNpemUgPSAkKHRoaXMpLnRleHQoKS5zcGxpdChcIi5cIilbMV0gPyAkKHRoaXMpLnRleHQoKS5zcGxpdChcIi5cIilbMV0ubGVuZ3RoIDogMDtcblx0XHRcdFx0XHRcdCQodGhpcykucHJvcCgnQ291bnRlcicsIDApLmFuaW1hdGUoe1xuXHRcdFx0XHRcdFx0XHRDb3VudGVyOiAkKHRoaXMpLnRleHQoKVxuXHRcdFx0XHRcdFx0fSwge1xuXHRcdFx0XHRcdFx0XHRkdXJhdGlvbjogMzAwMCxcblx0XHRcdFx0XHRcdFx0ZWFzaW5nOiAnc3dpbmcnLFxuXHRcdFx0XHRcdFx0XHRzdGVwOiBmdW5jdGlvbihub3cpIHtcblx0XHRcdFx0XHRcdFx0XHQkKHRoaXMpLnRleHQocGFyc2VGbG9hdChub3cpLnRvRml4ZWQoc2l6ZSkpO1xuXHRcdFx0XHRcdFx0XHRcdGlmICgocGFyc2VJbnQoJCh0aGlzKS50ZXh0KCkpKSA+IDk5OSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0JCh0aGlzKS50ZXh0KHBhcnNlSW50KCQodGhpcykudGV4dCgpKS50b0xvY2FsZVN0cmluZygnZW4tVVMnKSlcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y291bnRlckluVmlldygpO1xuXG5cdFx0JCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcblx0XHRcdGlmICghY291bnRlclZpZXcpIGNvdW50ZXJJblZpZXcoKTtcblx0XHR9KTtcblxuXG5cdH07XG5cblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXHQvKiBDT05UQUNUIEZPUk0gUE9QVVAgKi9cblx0LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cdGxldCBjb250YWN0UG9wdXAgPSAkKCcuanMtY29udGFjdCcpO1xuXG5cdGlmICggY29udGFjdFBvcHVwLmxlbmd0aCApIHtcblx0XHRsZXQgY29udGFjdFBvcHVwT3BlbiA9ICQoJ2FbaHJlZj1vcGVuLWNvbnRhY3QtZm9ybV0nKTtcblx0XHRsZXQgY29udGFjdFBvcHVwQ2xvc2UgPSAkKCcuanMtY29udGFjdC1jbG9zZScpO1xuXG5cdFx0dmFyIG9wZW5Db250YWN0UG9wdXAgPSBmdW5jdGlvbigpIHtcblx0XHRcdGNvbnRhY3RQb3B1cC5jc3MoJ29wYWNpdHknLCAwKTtcblx0XHRcdGNvbnRhY3RQb3B1cC5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRjb250YWN0UG9wdXAuYW5pbWF0ZSh7XG5cdFx0XHRcdG9wYWNpdHk6IDFcblx0XHRcdH0sIDUwMClcblx0XHR9XG5cblx0XHR2YXIgY2xvc2VDb250YWN0UG9wdXAgPSBmdW5jdGlvbigpIHtcblx0XHRcdGNvbnRhY3RQb3B1cC5hbmltYXRlKHtcblx0XHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0fSwgNTAwLCgpID0+IHtcblx0XHRcdFx0Y29udGFjdFBvcHVwLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdH0pXG5cdFx0fVxuXG5cdFx0Y29udGFjdFBvcHVwT3Blbi5vbignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0b3BlbkNvbnRhY3RQb3B1cCgpO1xuXHRcdH0pXG5cblx0XHRjb250YWN0UG9wdXBDbG9zZS5vbignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0Y2xvc2VDb250YWN0UG9wdXAoKTtcblx0XHR9KVxuXG5cdH1cblxuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cdC8qIFNFQVJDSCBQT1BVUCAqL1xuXHQvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblx0Y29uc3QgXHRqc19zZWFyY2hfYnRuICAgICA9ICQoJy5qcy1zZWFyY2gtb3BlbicpLFxuXHRcdFx0anNfc2VhcmNoX292ZXJsYXkgPSAkKCcuanMtc2VhcmNoLW92ZXJsYXknKSxcblx0XHRcdGpzX3NlYXJjaF9mb3JtICAgID0gJCgnLmpzLXNlYXJjaC1mb3JtJyksXG5cdFx0XHRqc19zZWFyY2hfaW5wdXRcdCAgPSAkKCcuanMtc2VhcmNoLWlucHV0Jyk7XG5cblx0ZnVuY3Rpb24gb3BlblNlYXJjaFBvcHVwKCkge1xuXHRcdGpzX3NlYXJjaF9vdmVybGF5LmNzcygnb3BhY2l0eScsIDApO1xuXHRcdGpzX3NlYXJjaF9vdmVybGF5LmFkZENsYXNzKCdvcGVuJyk7XG5cdFx0anNfc2VhcmNoX292ZXJsYXkuYW5pbWF0ZSh7XG5cdFx0XHRvcGFjaXR5OiAwLjlcblx0XHR9LCA1MDAsICgpID0+IHtcblx0XHRcdGpzX3NlYXJjaF9mb3JtLmFkZENsYXNzKCdvcGVuJyk7XG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGpzX3NlYXJjaF9pbnB1dC5mb2N1cygpO1xuXHRcdFx0fSwxMDApXG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBjbG9zZVNlYXJjaFBvcHVwKCkge1xuXHRcdGpzX3NlYXJjaF9mb3JtLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG5cdFx0anNfc2VhcmNoX292ZXJsYXkuYW5pbWF0ZSh7XG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0fSwgNTAwLCgpID0+IHtcblx0XHRcdGpzX3NlYXJjaF9vdmVybGF5LnJlbW92ZUNsYXNzKCdvcGVuJyk7XG5cdFx0fSlcblx0fVxuXHRcdFxuXG5cdGpzX3NlYXJjaF9idG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdDtcblx0XHRpZigkKHRoaXMpLmhhc0NsYXNzKCdvLWJ0bi1zZWFyY2gtLWFjdGl2ZScpKSB7XG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdvLWJ0bi1zZWFyY2gtLWFjdGl2ZScpO1xuXHRcdFx0Y2xvc2VTZWFyY2hQb3B1cCgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdvLWJ0bi1zZWFyY2gtLWFjdGl2ZScpO1xuXHRcdFx0b3BlblNlYXJjaFBvcHVwKCk7XG5cdFx0fVxuXHR9KVxuXG59KShqUXVlcnkpOyJdLCJuYW1lcyI6WyIkIiwiJFdJTiIsIndpbmRvdyIsImhlYWRlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInN0aWNreUhlYWRlciIsInBhZ2VZT2Zmc2V0Iiwic3RpY2t5IiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwib2Zmc2V0VG9wIiwiYWRkRXZlbnRMaXN0ZW5lciIsIiR0b2dnbGVNZW51Iiwib24iLCJldmVudCIsImN1cnJlbnRUYXJnZXQiLCJ0b2dnbGVDbGFzcyIsInBhcmVudCIsImZpbmQiLCIkaGVhZGVyIiwiJGFkbWluQmFyIiwibGVuZ3RoIiwiZml4SGVhZGVyV2l0aEFkbWluIiwiaW5uZXJXaWR0aCIsImhhc0NsYXNzIiwiY3NzIiwiY2hhbmdlSW1nVG9CZyIsImltZ1NlbCIsInBhcmVudFNlbCIsIiRwYXJlbnQiLCJfdGhpcyIsImVhY2giLCJpbmRleCIsImVsZW1lbnQiLCJjbG9zZXN0Iiwic3JjIiwiYWRkQ2xhc3MiLCJoaWRlIiwiYmFubmVyIiwiYnV0dG9uIiwiZXYiLCJwcmV2ZW50RGVmYXVsdCIsInRyaWdnZXIiLCJxdWVyeVNlbGVjdG9yQWxsIiwic3dpcGVycyIsIndpblciLCJCUkVBS1BPSU5UUyIsImNhbGNXaW5TaXplIiwiaW5pdFN3aXBlciIsIml0ZXJhdG9yIiwiJHN3aXBlciIsImJyZWFrTW9iVmFsIiwiYXR0ciIsImF1dG9QbGF5VmFyIiwicGFyc2VJbnQiLCJkZWxheSIsImRlbGF5VmFsIiwiZGlyZWN0aW9uVmFsIiwidmVydGljYWxEZXNrdG9wT25seSIsInNwYWNlQmV0d2VlblZhbCIsInNsaWRlc1BlclZpZXdWYWwiLCJnZXRTbGlkZXNQZXJWaWV3TnVtYmVyIiwibG9vcFZhbCIsInNwZWVkVmFsIiwiY2VudGVyZWRTbGlkZXNWYWwiLCJlZmZlY3RWYWwiLCJwcm9nQmFyVmFsIiwic2xpZGVUb0NsaWNrZWRTbGlkZVZhbCIsImZyZWVNb2RlVmFsIiwid2F0Y2hTbGlkZXNWaXNpYmlsaXR5VmFsIiwid2F0Y2hTbGlkZXNQcm9ncmVzc1ZhbCIsInRodW1ic1ZhbCIsInN3aXBlciIsIlN3aXBlciIsImNsYXNzTmFtZSIsInplcm8iLCJwYWdpbmF0aW9uU3BhbiIsInBhZ2luYXRpb25TbGljZSIsInNsaWNlIiwicmVtb3ZlQ2xhc3MiLCJzaG93Iiwic2xpZGVQcmV2Iiwic2xpZGVOZXh0Iiwic3dpcGVyQ29udGFpbmVyIiwieGwiLCJsZyIsIm1kIiwic20iLCJ1cGRhdGVTaWxkZXJwZXJWaWV3IiwidGhpc1N3aXBlciIsInBhcmFtcyIsInNsaWRlc1BlclZpZXciLCJ1cGRhdGUiLCJtb25pdG9yU3dpcGVyQWN0aXZlIiwibW9uaXRvclN3aXBlcklkIiwiYWN0aXZlSW5kZXgiLCJlcSIsImlzU2Nyb2xsZWRJbnRvVmlldyIsImVsZW0iLCJkb2NWaWV3VG9wIiwic2Nyb2xsVG9wIiwiZG9jVmlld0JvdHRvbSIsImhlaWdodCIsImVsZW1Ub3AiLCJvZmZzZXQiLCJ0b3AiLCJlbGVtSGVpZ2h0IiwiZWxlbU1pZGRsZSIsInJlc3VsdCIsImFuaW0iLCJhbmltU3RhdHVzIiwiYWRkQW5pbUNsYXNzIiwiaSIsInNjcm9sbCIsImluaXQiLCJhamF4Q29tcGxldGUiLCJyZXF1ZXN0Iiwic2V0dGluZ3MiLCJyZWZyZXNoIiwidmlkZW9QbGF5ZXJzIiwidmlkZW9XcmFwcGVycyIsIlZpbWVvIiwiUGxheWVyIiwicGxheVZpbWVvVmlkZW9zIiwiZWxlbWVudFRvcCIsImVsZW1lbnRCb3R0b20iLCJvdXRlckhlaWdodCIsInZpZXdwb3J0VG9wIiwidmlld3BvcnRCb3R0b20iLCJwbGF5IiwicGF1c2UiLCJwcm9kQ2xycyIsInNpYmxpbmdzIiwibmV4dCIsInNsaWRlVG9nZ2xlIiwiZSIsInRhcmdlckNsYXNzIiwiaGVhZGVySGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJsb2ciLCJkb2N1bWVudEVsZW1lbnQiLCJib2R5IiwiYW5pbWF0ZSIsInN0aWNreUJhciIsImZvb3RlciIsImNoZWNrU3RpY2t5QmFyIiwib0xhcmtCdG4iLCIkaW5wdXRDaGVjayIsImdldEZpbHRlclRheG9ub21pZXMiLCJ0YXhvbm9taWVzIiwiaW5wdXRzIiwidGF4b25vbWllc0xpc3QiLCJpcyIsInB1c2giLCJ0YXhvbm9teSIsIml0ZW1XcmFwIiwiaXRlbVdyYXBDbGFzcyIsInBvc3RzX3Blcl9wYWdlIiwiZ2V0UG9zdHNWaWFBamF4IiwiJGFqYXhJbmZvRmllbGQiLCIkcG9zdHNXcmFwIiwiJGhpZGVFbGVtZW50cyIsIiRwb3N0c19kYXRhIiwiY3VycmVudF9wb3N0c19kYXRhIiwiYWN0aW9uIiwicG9zdF90eXBlIiwib3JkZXIiLCJ0YXhfcXVlcnkiLCJhamF4IiwiYWpheHVybCIsInRleHQiLCJsb2FkaW5nX3R4dCIsInJlc3BvbnNlIiwicG9zdHNfY291bnQiLCJodG1sIiwibm90aGluZ19mb3VuZF90eHQiLCJwb3N0c19odG1sIiwibWVzc2FnZSIsImNvdW50ZXJWaWV3IiwiJGNvdW50ZXJzIiwibG9hZENvdW50ZXJGaWxscyIsImNvdW50ZXJJblZpZXciLCJzaXplIiwic3BsaXQiLCJwcm9wIiwibm93IiwicGFyc2VGbG9hdCIsInRvRml4ZWQiLCJ0b0xvY2FsZVN0cmluZyIsImNvbnRhY3RQb3B1cCIsImNvbnRhY3RQb3B1cE9wZW4iLCJjb250YWN0UG9wdXBDbG9zZSIsIm9wZW5Db250YWN0UG9wdXAiLCJjbG9zZUNvbnRhY3RQb3B1cCIsImpzX3NlYXJjaF9idG4iLCJqc19zZWFyY2hfb3ZlcmxheSIsImpzX3NlYXJjaF9mb3JtIiwianNfc2VhcmNoX2lucHV0Iiwib3BlblNlYXJjaFBvcHVwIiwiZm9jdXMiLCJjbG9zZVNlYXJjaFBvcHVwIiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxDQUFDLFVBQVVBLENBQVYsRUFBYTs7Ozs7S0FLUEMsT0FBT0QsRUFBRUUsTUFBRixDQUFiOzs7Ozs7O0tBT0lDLFNBQVNDLFNBQVNDLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBYjtLQUNJRixNQUFKLEVBQVk7TUFFRkcs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