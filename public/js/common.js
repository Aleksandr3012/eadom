"use strict";

var div = document.createElement('div');
div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px'; // мы должны вставить элемент в документ, иначе размеры будут равны 0

document.body.append(div);
var scrollWidth = div.offsetWidth - div.clientWidth;
div.remove();
var JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	modalCall: function modalCall() {
		var link = ".link-modal-js";
		$(link).fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад" // PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"

				}
			},
			beforeLoad: function beforeLoad() {
				if (!document.querySelector("html").classList.contains(".fixed")) document.querySelector("html").style.marginRight = scrollWidth + 'px';
			},
			afterClose: function afterClose() {
				if (!document.querySelector("html").classList.contains(".fixed")) document.querySelector("html").style.marginRight = null; // 	document.querySelector("html").classList.remove("fixed")
			}
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
		$.fancybox.defaults.backFocus = false;
		var linkModal = document.querySelectorAll(link);

		function addData() {
			linkModal.forEach(function (element) {
				element.addEventListener('click', function () {
					var modal = document.querySelector(element.getAttribute("href"));
					var data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							var el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val; // console.log(modal.querySelector(elem).tagName)
						}
					}

					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				});
			});
		}

		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu: function toggleMenu() {
		var toggle = this.btnToggleMenuMobile;
		var menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			var toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(function (el) {
				return el.classList.toggle("on");
			});
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(function (el) {
				return el.classList.toggle("fixed");
			});
			document.querySelector("html").style.marginRight = scrollWidth + 'px';
		}, {
			passive: true
		});
	},
	closeMenu: function closeMenu() {
		var menu = this.menuMobile;
		if (!menu) return;

		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(function (element) {
				return element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(function (el) {
				return el.classList.remove("fixed");
			});
			document.querySelector("html").style.marginRight = null;
		}
	},
	mobileMenu: function mobileMenu() {
		var _this = this;

		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', function (event) {
			var container = event.target.closest(".menu-mobile--js.active"); // (1)

			var link = event.target.closest(".navMenu__link"); // (1)

			if (!container || link) _this.closeMenu();
		}, {
			passive: true
		});
		window.addEventListener('resize', function () {
			if (window.matchMedia("(min-width: 992px)").matches) _this.closeMenu();
		}, {
			passive: true
		});
	},
	// /mobileMenu
	// tabs  .
	tabscostume: function tabscostume(tab) {
		var tabs = document.querySelectorAll(tab); // const indexOf = element => Array.from(element.parentNode.children).indexOf(element);

		tabs.forEach(function (element) {
			var tabs = element;
			var tabsCaption = tabs.querySelector(".tabs__caption");
			var tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
			var tabsWrap = tabs.querySelector(".tabs__wrap");
			var tabsContent = tabsWrap.querySelectorAll(".tabs__content");
			var random = Math.trunc(Math.random() * 1000);
			tabsBtn.forEach(function (el, index) {
				var data = "tab-content-".concat(random, "-").concat(index);
				el.dataset.tabBtn = data;
				var content = tabsContent[index];
				content.dataset.tabContent = data;
				if (!content.dataset.tabContent == data) return;
				var active = content.classList.contains('active') ? 'active' : ''; // console.log(el.innerHTML);

				content.insertAdjacentHTML("beforebegin", "<div class=\"tabs__btn ".concat(active, "\" data-tab-btn=\"").concat(data, "\">").concat(el.innerHTML, "</div>"));
			});
			tabs.addEventListener('click', function (element) {
				var btn = element.target.closest("[data-tab-btn]:not(.active)");
				if (!btn) return;
				var data = btn.dataset.tabBtn;
				var tabsAllBtn = this.querySelectorAll("[data-tab-btn");
				var content = this.querySelectorAll("[data-tab-content]");
				tabsAllBtn.forEach(function (element) {
					element.dataset.tabBtn == data ? element.classList.add('active') : element.classList.remove('active');
				});
				content.forEach(function (element) {
					element.dataset.tabContent == data ? (element.classList.add('active'), element.previousSibling.classList.add('active')) : element.classList.remove('active');
				});
			});
		}); // $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');
		// });
	},
	// /tabs
	inputMask: function inputMask() {
		// mask for input
		var InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			return element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}");
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie: function ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	sendForm: function sendForm() {
		var gets = function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");

			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}

			return b;
		}(); // form


		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			var th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data
			}).done(function (data) {
				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				}); // window.location.replace("/thanks.html");

				setTimeout(function () {
					// Done Functions
					th.trigger("reset"); // $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () {});
		});
	},
	heightwindow: function heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', function () {
			// We execute the same script as before
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	},
	animateScroll: function animateScroll() {
		$(document).on('click', " .top-nav li a, .scroll-link", function () {
			var elementClick = $(this).attr("href");
			var destination = $(elementClick).offset().top(100);
			$('html, body').animate({
				scrollTop: destination
			}, 1000);
			return false;
		});
	},
	getCurrentYear: function getCurrentYear(el) {
		var now = new Date();
		var currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	CustomInputFile: function CustomInputFile() {
		var file = $(".add-file input[type=file]");
		file.change(function () {
			var filename = $(this).val().replace(/.*\\/, "");
			var name = $(".add-file__filename  ");
			name.text(filename);
		});
	} // customRange: function customRange() {
	// 	$(".range-wrap").each(function () {
	// 		var _this = $(this);
	// 		var $range = _this.find(".slider-js");
	// 		var $inputFrom = _this.find(".input_from");
	// 		var $inputTo = _this.find(".input_to");
	// 		var instance,
	// 			from,
	// 			to,
	// 			min = $range.data('min'),
	// 			max = $range.data('max');
	// 		$range.ionRangeSlider({
	// 			skin: "round",
	// 			type: "double",
	// 			grid: false,
	// 			grid_snap: false,
	// 			hide_min_max: true,
	// 			hide_from_to: true,
	// 			onStart: updateInputs,
	// 			onChange: updateInputs,
	// 			onFinish: updateInputs
	// 		});
	// 		instance = $range.data("ionRangeSlider");
	// 		function updateInputs(data) {
	// 			from = data.from;
	// 			to = data.to;
	// 			$inputFrom.prop("value", from);
	// 			$inputTo.prop("value", to);
	// 		}
	// 		$inputFrom.on("change", function () {
	// 			var val = $(this).prop("value"); // validate
	// 			if (val < min) {
	// 				val = min;
	// 			} else if (val > to) {
	// 				val = to;
	// 			}
	// 			instance.update({
	// 				from: val
	// 			});
	// 			$(this).prop("value", val);
	// 		});
	// 		$inputTo.on("change", function () {
	// 			var val = $(this).prop("value"); // validate
	// 			if (val < from) {
	// 				val = from;
	// 			} else if (val > max) {
	// 				val = max;
	// 			}
	// 			instance.update({
	// 				to: val
	// 			});
	// 			$(this).prop("value", val);
	// 		});
	// 	});
	// },

};
var $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('.tabs--js');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();
	JSCCommon.CustomInputFile(); // JSCCommon.customRange();

	var x = window.location.host;
	var screenName;
	screenName = '02.png';

	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", "<div class=\"pixel-perfect\" style=\"background-image: url(screen/".concat(screenName, ");\"></div>"));
	}

	$(".range-area").ionRangeSlider({
		skin: "round",
		min: 0,
		max: 2000,
		from: 200,
		postfix: " кв. м."
	});
	$(".range-month").ionRangeSlider({
		skin: "round",
		min: 0,
		max: 24,
		from: 4,
		postfix: "мес."
	});

	function setFixedNav() {
		var topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0 ? topNav.classList.add('fixed') : topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', function () {
		setFixedNav();
	}, {
		passive: true
	});
	window.addEventListener('resize', function () {
		whenResize();
	}, {
		passive: true
	});
	whenResize();
	$(" .qwiz-radio-btn").each(function () {
		var parent = $(this).parents(".sQwiz__item");
		parent.find(".sQwiz__toggle-block").on('input change copy paste', 'input', function () {
			if ($(this).val() != '') {
				parent.find(".sQwiz__next").removeClass("disabled");
			} else {
				parent.find(".sQwiz__next").addClass("disabled");
			}
		});
		$(this).change(function () {
			if (!$(this).hasClass("toggle-input-js")) {
				parent.find(".sQwiz__next").removeClass("disabled");
			} else if (parent.find(".sQwiz__toggle-block").find('input').val() != '') {
				console.log('1');
				parent.find(".sQwiz__next").removeClass("disabled");
			} else {
				console.log('2');
				parent.find(".sQwiz__next").addClass("disabled");
			}

			if ($(this).is(':checked') && $(this).hasClass("toggle-input-js")) {
				parent.find(".sQwiz__toggle-block").slideDown();
			} else {
				parent.find(".sQwiz__toggle-block").slideUp();
			}
		});
	});
	$('.btn-last-js').click(function () {
		$('.sQwiz__top').hide();
		$('.sQwiz').addClass('align-items-center justify-content-center');
	});
	var testSwiper = new Swiper('.jsTestSlider', {
		effect: 'fade',
		speed: 400,
		simulateTouch: false,
		longSwipes: false,
		followFinger: false,
		allowTouchMove: false,
		allowNext: false,
		// autoHeight: true,
		pagination: {
			el: '.scr2__ind',
			type: 'custom',
			renderCustom: function renderCustom(swiper, current, total) {
				var progress = '<div class="jsTestInd" style="width:' + current * 100 / 6 + '%"></div>';

				if (current == 1) {
					var progresText = '<div class="jsTestCounter">Осталось 6 вопросов</div>';
				} else {
					var progresText = '<div class="jsTestCounter">Вопрос ' + (current - 1) + '/' + (total - 1) + '</div>';
				}

				return progress + progresText;
			}
		}
	}); //Переключение слайда по кнопке

	var jsNextQuest = document.querySelectorAll('.jsNextQuest', '.jsTestSlider');

	for (var i = 0; i < jsNextQuest.length; ++i) {
		jsNextQuest[i].addEventListener("click", function (e) {
			e.preventDefault();
			testSwiper.slideNext();
		});
	}

	var jsSlideBack = document.querySelectorAll('.jsSlideBack');

	for (var i = 0; i < jsSlideBack.length; ++i) {
		jsSlideBack[i].addEventListener("click", function (e) {
			e.preventDefault();
			testSwiper.slidePrev();
		});
	} // Простановка значений при переключении


	testSwiper.on('slideChangeTransitionEnd', function () {
		var testCounter = document.querySelector('.jsTestCounter');

		if (testSwiper.activeIndex == 0) {// $('.jsSlideBack').hide();
			// testCounter.textContent = "Осталось 6 вопросов";
		} else {// testCounter.textContent = "Вопрос " + (testSwiper.activeIndex ) + "/6";
				// $('.jsSlideBack').show();
			} //Управление кнопкой "Назад"


		if (testSwiper.activeIndex == 0) {
			$('.jsSlideBack').hide();
		} else {
			$('.jsSlideBack').show();
		}
	}); // let defaultSl = {
	// 	spaceBetween: 0,
	// 	lazy: {
	// 		loadPrevNext: true,
	// 	},
	// 	watchOverflow: true,
	// 	spaceBetween: 0,
	// 	loop: true,
	// 	navigation: {
	// 		nextEl: '.swiper-button-next',
	// 		prevEl: '.swiper-button-prev',
	// 	},
	// 	pagination: {
	// 		el: ' .swiper-pagination',
	// 		type: 'bullets',
	// 		clickable: true,
	// 		// renderBullet: function (index, className) {
	// 		// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
	// 		// }
	// 	},
	// }
	// const swiper4 = new Swiper('.sBanners__slider--js', {
	// 	// slidesPerView: 5,
	// 	...defaultSl,
	// 	slidesPerView: 'auto',
	// 	freeMode: true,
	// 	loopFillGroupWithBlank: true,
	// 	touchRatio: 0.2,
	// 	slideToClickedSlide: true,
	// 	freeModeMomentum: true,
	// });

	var partnerSlider = new Swiper('.partners__slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		loop: true,
		spaceBetween: 40,
		breakpoints: {
			768: {
				spaceBetween: 64
			}
		}
	});
	var headerBlockSlider = new Swiper('.headerBlock__slider--js', {
		slidesPerView: 1,
		loop: true,
		spaceBetween: 0,
		navigation: {
			nextEl: '.headerBlock .swiper-button-next',
			prevEl: '.headerBlock .swiper-button-prev'
		}
	});
	var sResultsSlider = new Swiper('.tabs__content .sResults__slider--js', {
		slidesPerView: 1,
		loop: true,
		spaceBetween: 0,
		observer: true,
		observeParents: true,
		navigation: {
			nextEl: '.tabs__content .swiper-button-next',
			prevEl: '.tabs__content .swiper-button-prev'
		}
	});
	var sOurWorkSlider = new Swiper('.sOurWork__itemWrap .sOurWork__slider--js', {
		slidesPerView: 1,
		// loop: true,
		spaceBetween: 0,
		pagination: {
			el: '.sOurWork__itemWrap .swiper-pagination',
			type: 'bullet',
			clickable: true
		}
	});
	var items = document.querySelectorAll(".sOurWork__item");
	items.forEach(function (ell) {
		var slider = ell.querySelector('.sOurWork__slider--js');
		var swiper4 = new Swiper(slider, {
			slidesPerView: 1,
			spaceBetween: 0,
			// by: 'container',
			loop: true,
			lazy: {
				loadPrevNext: true
			},
			pagination: {
				el: ell.querySelector('.swiper-pagination'),
				type: 'bullets',
				clickable: true
			}
		});
		ell.addEventListener("mouseover", function (element) {
			var puginBtn = element.target.closest('.swiper-pagination-bullet');
			if (!puginBtn) return;
			$(puginBtn).click();
		});
	}); // modal window
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
} // window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }