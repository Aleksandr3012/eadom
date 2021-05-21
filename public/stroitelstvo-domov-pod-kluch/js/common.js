// Для лэзи загрузки


var top_show = 150; // В каком положении полосы прокрутки начинать показ кнопки "Наверх"
var delay = 1000; // Задержка прокрутки
$(document).ready(function () {
	$(window).scroll(function () { // При прокрутке попадаем в эту функцию
		/* В зависимости от положения полосы прокрукти и значения top_show, скрываем или открываем кнопку "Наверх" */
		if ($(this).scrollTop() > top_show) $('#top').fadeIn();
		else $('#top').fadeOut();
	});
	$('#top').click(function () { // При клике по кнопке "Наверх" попадаем в эту функцию
		/* Плавная прокрутка наверх */
		$('body, html').animate({
			scrollTop: 0
		}, delay);
	});
});

document.addEventListener("DOMContentLoaded", function () {
	let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
	let active = false;

	const lazyLoad = function () {
		if (active === false) {
			active = true;

			setTimeout(function () {
				lazyImages.forEach(function (lazyImage) {
					if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
						lazyImage.src = lazyImage.dataset.src;
						// lazyImage.srcset = lazyImage.dataset.srcset;
						lazyImage.classList.remove("lazy");

						lazyImages = lazyImages.filter(function (image) {
							return image !== lazyImage;
						});

						if (lazyImages.length === 0) {
							document.removeEventListener("scroll", lazyLoad);
							window.removeEventListener("resize", lazyLoad);
							window.removeEventListener("orientationchange", lazyLoad);
							window.addEventListener("DOMContentLoaded", lazyLoad);
							// window.addEventListener("DOMContentLoaded", lazyLoad);
						}
					}
				});

				active = false;
			}, 200);
		}
	};

	document.addEventListener("scroll", lazyLoad);
	window.addEventListener("resize", lazyLoad);
	window.addEventListener("orientationchange", lazyLoad);
	window.addEventListener("DOMContentLoaded", lazyLoad);
});


// лэзи 
document.addEventListener("DOMContentLoaded", function () {
	let lazyImages = [].slice.call(document.querySelectorAll(".lazy-bg"));
	let active = false;

	const lazyLoad = function () {
		if (active === false) {
			active = true;

			setTimeout(function () {
				lazyImages.forEach(function (lazyImage) {
					if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
						lazyImage.parentElement.style.backgroundImage = 'url(' + lazyImage.dataset.src + ')';
						lazyImage.src = lazyImage.dataset.src;
						// lazyImage.srcset = lazyImage.dataset.srcset;
						lazyImage.classList.remove("lazy");

						lazyImages = lazyImages.filter(function (image) {
							return image !== lazyImage;
						});

						if (lazyImages.length === 0) {
							document.removeEventListener("scroll", lazyLoad);
							window.removeEventListener("resize", lazyLoad);
							window.removeEventListener("orientationchange", lazyLoad);
							window.addEventListener("DOMContentLoaded", lazyLoad);
						}
					}
				});

				active = false;
			}, 200);
		}
	};

	document.addEventListener("scroll", lazyLoad);
	window.addEventListener("resize", lazyLoad);
	window.addEventListener("orientationchange", lazyLoad);
	window.addEventListener("DOMContentLoaded", lazyLoad);
});



document.addEventListener("DOMContentLoaded", function () {
	var lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));

	if ("IntersectionObserver" in window) {
		let lazyBackgroundObserver = new IntersectionObserver(function (entries, observer) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");
					lazyBackgroundObserver.unobserve(entry.target);
				}
			});
		});

		lazyBackgrounds.forEach(function (lazyBackground) {
			lazyBackgroundObserver.observe(lazyBackground);
		});
	}
});



jQuery(document).ready(function ($) {

	// для свг
	svg4everybody({});
	// Custom JS




	function heightses() {

		var w = $(window).width();

		// $(".main-wrapper").css("margin-bottom", $('footer').height())
		// $(".otz__item .text-wrap ").height('auto').equalHeights();
		//


		// скрывает моб меню

		var topH = $("header ").innerHeight();

	}


	$(window).resize(function () {
		heightses();

	});
	$(window).on("load", function () {
		heightses();

	})

	heightses();



	// листалка по стр
	$(" .scroll-link").click(function () {
		var elementClick = $(this).attr("href");
		var destination = $(elementClick).offset().top;

		$('html, body').animate({ scrollTop: destination }, 1100);

		return false;
	});


	// modal window
	$('.popup-with-move-anim').magnificPopup({
		type: 'inline',

		fixedContentPos: true,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,

		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in',
		tClose: 'Закрыть (Esc)',
	});

	// / modal window

	// modal галерея
	$(".gal").each(function () {

		$(this).find("a").magnificPopup({
			type: 'image',
			closeOnContentClick: false,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			tClose: 'Закрыть (Esc)',
			image: {
				verticalFit: true,
				// titleSrc: function(item) {
				//   return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
				// }
			},
			gallery: {
				enabled: true
			}
		});
	})
	// /modal галерея



	$('input[type="tel"]').attr("pattern", "[+]7[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}").inputmask("+7(999)999-99-99");

	// / mask for input


	// accordion
	$(".showhide").click(function () {


		$(".showhide-all").slideUp().parent().removeClass("active"), $(".showhide").removeClass("active"),
			$(this).next("div").filter(function () {
				return "block" == $(this).css("display")
			}).slideUp().parent().removeClass("active"),
			$(this).next("div").filter(function () {
				return "none" == $(this).css("display")
			}).slideDown().prev("div").addClass("active").parent().addClass("active")
	})





	var $d4 = $(".range-block input");

	$d4.ionRangeSlider({
		skin: "big",
		hide_min_max: 'true',
		// hide_from_to: 'true',
	});

	// var v = $d4.prop("value");     // input value in format FROM;TO
	// $d4.parents('.range-block ').find('.range-block__value').text(v);
	// $d4.on("change", function () {
	// 	var $inp = $(this);
	// 	var v = $inp.prop("value");     // input value in format FROM;TO
	// 	// var from = $inp.data("from");   // input data-from attribute
	// 	// var to = $inp.data("to");       // input data-to attribute
	// 	$inp.parents('.range-block ').find('.range-block__value').text(v);
	// 	// console.log(v, from, to);       // all values
	// }); 
	// 		// $(".js-range-slider").ionRangeSlider();




	// quiz

	//Слайдер теста расчёта финансов
	var testSwiper = new Swiper('.jsTestSlider', {
		effect: 'slide',
		speed: 800,
		simulateTouch: false,
		longSwipes: false,
		followFinger: false,
		allowTouchMove: false,
		allowNext: false,
		autoHeight: true,
		pagination: {
			el: '.scr2__ind',
			type: 'custom',
			renderCustom: function (swiper, current, total) {
				if (current == 1) {

					var progress = '<div class="jsTestInd" style="width:' + current * 100 / 15 + '%"></div>';
					var progresText = '<div class="jsTestCounter">Осталось 6 вопросов</div>'
				} else {
					var progress = '<div class="jsTestInd" style="width:' + (current - 1) * 100 / 6 + '%"></div>';
					var progresText = '<div class="jsTestCounter">Вопрос ' + (current - 1) + '/' + (total - 1) + '</div>';
				}
				return progress + progresText;
			},
		},
	});
	//Переключение слайда по кнопке
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
	}
	// Простановка значений при переключении
	testSwiper.on('slideChangeTransitionEnd', function () {
		var testCounter = document.querySelector('.jsTestCounter');
		if (testSwiper.activeIndex == 0) {
			// $('.jsSlideBack').hide();
			// testCounter.textContent = "Осталось 6 вопросов";
		} else {
			// testCounter.textContent = "Вопрос " + (testSwiper.activeIndex ) + "/6";
			// $('.jsSlideBack').show();
		}
		//Управление кнопкой "Назад"
		if (testSwiper.activeIndex == 0) {
			$('.jsSlideBack').hide();
		} else {
			$('.jsSlideBack').show();
		}
	});

	//Показ кнопки

	$('.jsTestSlider input').on('change input ', function (e) {
		$(this).closest('.swiper-slide').find('.button').prop("disabled", false);
	});

	$('.s-portfolio__slider-wrap').each(function () {
		// слайдер в портфолио
		var mySwiper = new Swiper($(this).find('.s-portfolio__slider--js'), {
			speed: 800,
			lazy: {
				loadPrevNext: true,
			},
			loop: true,
			navigation: {
				nextEl: $(this).find('.swiper-button-next'),
				prevEl: $(this).find('.swiper-button-prev'),
			},
		});
	})

	// адаптивные табы
	$('.resp-tabs-js').easyResponsiveTabs({
		activate: function () { }
	});



	// steps
	var galleryThumbs = new Swiper('.gallery-thumbs', {
		spaceBetween: 8,
		slidesPerView: 'auto',
		speed: 800,
		freeMode: true,
		loopedSlides: 4, //looped slides should be the same
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		lazy: {
			loadPrevNext: true,
		},
	});
	var galleryTop = new Swiper('.gallery-top', {
		loopedSlides: 1, //looped slides should be the same
		effect: 'slide',
		speed: 800,
		simulateTouch: false,
		longSwipes: false,
		followFinger: false,
		allowTouchMove: false,
		autoHeight: true,

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		thumbs: {
			swiper: galleryThumbs,
		},
	});

	var galleryThumbs2 = new Swiper('.s-team__slider-head--js', {
		slidesPerView: 'auto',
		speed: 800,
		freeMode: true,
		loopedSlides: 4, //looped slides should be the same
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		watchOverflow: true,
		lazy: {
			loadPrevNext: true,
		},

	});
	var galleryTop2 = new Swiper('.s-team__slider-body--js', {
		loopedSlides: 1, //looped slides should be the same 
		speed: 800,
		autoHeight: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		thumbs: {
			swiper: galleryThumbs2,
		},
	});

	function heightses() {
		// team
		if (window.matchMedia("(min-width: 992px)").matches) {
			// galleryThumbs2.changeDirection('vertical');
			setTimeout(() => {

				galleryThumbs2.update();
				galleryThumbs2.changeDirection('vertical');
				// galleryThumbs2.changeDirection('horizontal');
			}, 5);
		} else {
			// galleryThumbs2.destroy();
			setTimeout(() => {

				galleryThumbs2.update();
				galleryThumbs2.changeDirection('horizontal');
			}, 5);
			// galleryThumbs2.init();


		}
	}
	$(window).resize(function () {
		heightses();

	});

	heightses();
	var patnerSlider = new Swiper('.patner-slider--js', {
		slidesPerView: 8,
		speed: 800,
		spaceBetween: 10,
		watchOverflow: true,
		loop: true,
		lazy: {
			loadPrevNext: true,
		},
		autoplay: {
			delay: 800,
		},

		breakpoints: {
			// when window width is <= 320px
			576: {
				slidesPerView: 3,

			},
			// when window width is <= 480px
			768: {
				slidesPerView: 4,
			},
			// when window width is <= 640px
			992: {
				slidesPerView: 6,
				autoplay: {
					delay: 400,
				},
			}
		}
	});

	$(".btn-js").each(function () {
		var B = $(this);
		var A, C, z, D;

		setInterval(function () {
			if (B.find(".animate-js").length === 0) {
				B.prepend("<span class='animate-wrap'><span class='animate-js'></span></span>");
			}
			A = B.find(".animate-js");
			A.removeClass("btn_animate");
			if (!A.height() && !A.width()) {
				C = Math.max(B.outerWidth(), B.outerHeight());
				A.css({
					height: C,
					width: C
				});
			}
			z = Math.round(Math.random() * A.width() - A.width() / 2);
			D = Math.round(Math.random() * A.height() - A.height() / 2);
			A.css({
				top: D + "px",
				left: z + "px"
			}).addClass("btn_animate");
		}, 3000);
	});

	$('.custom-input__input').change(function () {
		$(this).parents('form').find('.toggle-block').slideToggle().toggleClass('active');
	})

	$('[data-step="step-1"]').click(function () {
		$('.floor').val($(this).parents('.swiper-slide').find('input:checked').val());
	})
	$('[data-step="step-2"]').click(function () {
		$('.area').val($(this).parents('.swiper-slide').find('input').val() + ' м2');
	})
	$('[data-step="step-3"]').click(function () {
		$('.overlap').val($(this).parents('.swiper-slide').find('input:checked').val());
	})
	$('[data-step="step-4"]').click(function () {
		$('.fasade').val($(this).parents('.swiper-slide').find('input:checked').val());
	})
	$('[data-step="step-5"]').click(function () {
		$('.price').val($(this).parents('.swiper-slide').find('input').val());
	})
	$('[data-step="step-6"]').click(function () {
		$('.data').val($(this).parents('.swiper-slide').find('input').val() + ' мес.');
	})


	var gets = (function () {
		var a = window.location.search;
		var b = new Object();
		a = a.substring(1).split("&");
		for (var i = 0; i < a.length; i++) {
			c = a[i].split("=");
			b[c[0]] = c[1];
		}
		return b;
	})();
	// form
	$("form").submit(function () { //Change
		var th = $(this);
		th.find('.utm_source').val(gets['utm_source']);
		th.find('.utm_term').val(gets['utm_term']);

		$.ajax({
			type: "POST",
			url: 'action.php', //Change
			data: th.serialize()
		}).success(function () {
			$.magnificPopup.close();
			// $.magnificPopup.open({
			// 	items: {
			// 		src: '#thanks', // can be a HTML string, jQuery object, or CSS selector
			// 		type: 'inline'
			// 	}
			// })
			window.location.replace("/thanks.html");
			setTimeout(function () {
				// Done Functions
				th.trigger("reset");
				// $.magnificPopup.close();
			}, 4000);
		});
		return false;
	});
	// /form


	// show hidden li
	$('.link-more').click(function (e) {
		e.preventDefault();
		$(this).hide().prev().find('li:hidden').slideDown();
	})


	if ($('div').is("#scene")) {

		var scene = document.getElementById('scene');
		var parallaxInstance = new Parallax(scene, {
			relativeInput: true

		});
	}
	if ($('div').is("#scene2")) {

		var scene = document.getElementById('scene2');
		var parallaxInstance = new Parallax(scene, {
			relativeInput: true

		});
	}
});