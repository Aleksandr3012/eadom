let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// мы должны вставить элемент в документ, иначе размеры будут равны 0
document.body.append(div);

let scrollWidth = div.offsetWidth - div.clientWidth;
div.remove();
const JSCCommon = {

	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {
		const link = ".link-modal-js";
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
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share", 
					// ZOOM: "Zoom"
				},
			},
			beforeLoad: function () {
				if (!document.querySelector("html").classList.contains(".fixed")) document.querySelector("html").style.marginRight = scrollWidth + 'px';
			},
			afterClose: function () {
				if (!document.querySelector("html").classList.contains(".fixed")) document.querySelector("html").style.marginRight = null;
				// 	document.querySelector("html").classList.remove("fixed")
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
			document.querySelector("html").style.marginRight = scrollWidth + 'px';
		}, { passive: true });
	},
	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;
		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
			document.querySelector("html").style.marginRight = null
		}

	},
	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".navMenu__link"); // (1)
			if (!container || link) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},
	// /mobileMenu

	// tabs  .
	tabscostume(tab) {
		const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		tabs.forEach(element => {
			let tabs = element;
			const tabsCaption = tabs.querySelector(".tabs__caption");
			const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
			const tabsWrap = tabs.querySelector(".tabs__wrap");
			const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
			const random = Math.trunc(Math.random() * 1000);
			tabsBtn.forEach((el, index) => {
				const data = `tab-content-${random}-${index}`;
				el.dataset.tabBtn = data;
				const content = tabsContent[index];
				content.dataset.tabContent = data;
				if (!content.dataset.tabContent == data) return;

				const active = content.classList.contains('active') ? 'active' : '';
				// console.log(el.innerHTML);
				content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn tabs__btn--accordion ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
			})


			tabs.addEventListener('click', function (element) {
				const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
				if (!btn) return;
				const data = btn.dataset.tabBtn;
				const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
				const content = this.querySelectorAll(`[data-tab-content]`);
				tabsAllBtn.forEach(element => {
					element.dataset.tabBtn == data
						? element.classList.add('active')
						: element.classList.remove('active')
				});
				content.forEach(element => {
					if (element.dataset.tabContent == data) {
						element.classList.add('active'), element.previousSibling.classList.add('active')
						
						if(btn.classList.contains('tabs__btn--accordion')) {
							setTimeout(() => {
								function getCoords(elem) {
									let box = elem.getBoundingClientRect();
									return	box.top + pageYOffset
								}
								const heightHeader = $('.top-nav').height();
								const destination = getCoords(element);
								$('html, body').animate({ scrollTop: destination - heightHeader }, 1100);
								console.log(destination);
							}, 100);
						}
					} else {
						
						element.classList.remove('active')
					}
					

				});
				
			})
		})

		// $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');

		// });

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	// sendForm() {
	// 	var gets = (function () {
	// 		var a = window.location.search;
	// 		var b = new Object();
	// 		var c;
	// 		a = a.substring(1).split("&");
	// 		for (var i = 0; i < a.length; i++) {
	// 			c = a[i].split("=");
	// 			b[c[0]] = c[1];
	// 		}
	// 		return b;
	// 	})();
	// 	// form
	// 	$(document).on('submit', "form", function (e) {
	// 		e.preventDefault();
	// 		const th = $(this);
	// 		var data = th.serialize();
	// 		th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
	// 		th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
	// 		th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
	// 		th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
	// 		$.ajax({
	// 			url: 'action.php',
	// 			type: 'POST',
	// 			data: data,
	// 		}).done(function (data) {

	// 			$.fancybox.close();
	// 			// $.fancybox.open({
	// 			// 	src: '#modal-thanks',
	// 			// 	type: 'inline'
	// 			// });
	// 			if (th.hasClass('sQwiz__wrap')) {
	// 				window.location.replace("/thanks-qwiz.html");
	// 			} else {
	// 				window.location.replace("/thanks.html");
	// 			}
	// 			setTimeout(function () {
	// 				// Done Functions
					
	// 				th.trigger("reset");
	// 				// $.magnificPopup.close();
	// 				// ym(53383120, 'reachGoal', 'zakaz');
	// 				// yaCounter55828534.reachGoal('zakaz');
	// 			}, 4000);
	// 		}).fail(function () { });

	// 	});
	// },
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {

		$(document).on('click', " .top-nav li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top-120;

			$('html, body').animate({ scrollTop: destination }, 1000);

			return false;
		});
	},

	CustomInputFile: function CustomInputFile() {
		var file = $(".add-file input[type=file]");
		file.change(function () {
			var filename = $(this).val().replace(/.*\\/, "");
			var name = $(".add-file__filename  ");
			name.text(filename);

		});
	},

};
const $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('.tabs--js');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();
	JSCCommon.CustomInputFile();

	var x = window.location.host;
	let screenName;
	screenName = '05-320.png';
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}

	var gets = (function () {
		var a = window.location.search;
		var b = new Object();
		var c;
		a = a.substring(1).split("&");
		for (var i = 0; i < a.length; i++) {
			c = a[i].split("=");
			b[c[0]] = c[1];
		}
		return b;
	})();

	$("form").submit(function (e) {
		e.preventDefault();
		const th = $(this);
		let inputs = {
			name : th.find('[name="name"]').val() || '',
			email : th.find('[name="email"]').val() || '',
			utm_source : th.find('[name="utm_source"]').val() || '',
			utm_term : th.find('[name="utm_term"]').val() || '',
			utm_medium : th.find('[name="utm_medium"]').val() || '',
			utm_campaign : th.find('[name="utm_campaign"]').val() || '',
			order : th.find('[name="order"]').val() || '',
			tel : th.find('[name="tel"]').val() || '',
			step1 : th.find('[name="step1"]').val() || '',
			step1text : th.find('[name="step1text"]').val() || '',
			step2 : th.find('[name="step2"]').val() || '',
			step2text : th.find('[name="step2text"]').val() || '',
			area : th.find('[name="area"]').val() || '',
			step4 : th.find('[name="step4"]').val() || '',
			WhenOpening : th.find('[name="WhenOpening"]').val() || '',
			whatsapp : th.find('[name="whatsapp"]').val() || '',
			viber : th.find('[name="viber"]').val() || '',
			telegram : th.find('[name="telegram"]').val() || '',
			time : th.find('[name="time"]').val() || '',
			datetime : th.find('[name="datetime"]').val() || '',
			comment : th.find('[name="comment"]').val() || '',
		}
		
		inputs.utm_source = decodeURIComponent(gets['utm_source'] || '');
		inputs.utm_term = decodeURIComponent(gets['utm_term'] || '');
		inputs.utm_medium = decodeURIComponent(gets['utm_medium'] || '');
		inputs.utm_campaign = decodeURIComponent(gets['utm_campaign'] || '');
		
		var data = new FormData($('form')[0]);
		// data.append('order', order);
		// var file = th.find('[name="file"]');

		for (var prop in inputs) {
			// console.log("inputs." + prop + " = " + inputs[prop]);
			if (inputs[prop] ) data.append(prop, inputs[prop]);
		}
		// if(!$('#div').children('#id').length > 0) {...}
		let file = th.find('[name="file"]');
		if (file.length > 0) {
			data.append('file', file.prop('files')[0]);
		}
		// let file = th.find('[name="file"]').prop('files')[0];
		// if (inputs.email ) data.append('email', inputs.email);
		// data.append('file', file);
		// if (tel ) {

		// 	data.append('organization', organization);
		// 	data.append('tel', tel);
		// }
		// else {
		// 	var file = th.find('[name="file"]').prop('files')[0]
		// 	data.append('file', file);
		// }
		// data.append('utm_source', inputs.utm_source);
		// data.append('utm_term', inputs.utm_term);
		// data.append('utm_medium', inputs.utm_medium);
		// data.append('utm_campaign', inputs.utm_campaign);
	  // data = th.serialize();
		// data.append('action_present', 'save');
		// data.append('product_id', $product_id);
		// data.append('title', title);
		// data.append('description', description);
		// data.append('publish_down', publish_down);
		// data.append('removefile', removefile);
		// data.append('file', $('#file_present')[0].files[0]);

		$.ajax({
			url: 'action.php',
			dataType: 'text',  // what to expect back from the PHP script, if anything
			cache: false,
			contentType: false,
			processData: false,
			type: 'POST',
			data: data,
		}).done(function (data) {

			$.fancybox.close();
			// if (th.parent().is("#modal-call-catalog")) {
			// 	$("#modal-thanks .after-headline").after('<div class="download-wrap"><a class="h3" href="superlok-catalog.pdf" download>Скачать каталог</a> </div>')
			// }
			// else {
			// 	$(".download-wrap").remove();
			// }
			// if (th.hasClass('sQwiz__wrap')) {
			// 	window.location.replace("/thanks-qwiz.html");
			// } else {
			// 	window.location.replace("/thanks.html");
			// }

			setTimeout(function () {
				// Done Functions
				th.trigger("reset");
				// $.magnificPopup.close();
				// $.fancybox.close();

			}, 4000);
		}).fail(function () { });

	});

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
		postfix: "мес.",
	});

	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();

	$(" .qwiz-radio-btn").each(function () { 
		let parent = $(this).parents(".sQwiz__item");
		parent.find(".sQwiz__toggle-block").on('input change copy paste','input', function () {
			if ($(this).val() != '') {
				parent.find(".sQwiz__next").removeClass("disabled")
			}
			else {
				parent.find(".sQwiz__next").addClass("disabled")
			}
		})
		$(this).change(function () {  
			if (!$(this).hasClass("toggle-input-js")) {
				parent.find(".sQwiz__next").removeClass("disabled")
			}

			else if (parent.find(".sQwiz__toggle-block").find('input').val() != '') {
				parent.find(".sQwiz__next").removeClass("disabled")
			}
			else {
				parent.find(".sQwiz__next").addClass("disabled")

			} 
			if ($(this).is(':checked') && $(this).hasClass("toggle-input-js")) {
				
				parent.find(".sQwiz__toggle-block").slideDown();
			}
			else {
				parent.find(".sQwiz__toggle-block").slideUp();
				
				}
			})
	})

	$('.btn-last-js').click(function(){
		$('.sQwiz__top').hide();
		$('.sQwiz').addClass('align-items-center justify-content-center');
	});

	$('.sQwiz .tabs__btn').on('click',function(){
		let btnAttr = $(this).data('tab-btn');
		let contentAttr = $(`[data-tab-content="${btnAttr}"] input`);
		$('.tabs__content input').removeAttr('required');
		contentAttr.attr('required', 'required');
		// console.log(btnAttr);
	})

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
			renderCustom: function (swiper, current, total) {
				var progress = '<div class="jsTestInd" style="width:' + current * 100 / 6 + '%"></div>';
				if (current == 1) {

					var progresText = '<div class="jsTestCounter">Осталось 6 вопросов</div>'
				} else {
					var progresText = '<div class="jsTestCounter">Вопрос ' + (current - 1) + '/' + (total - 1) + '</div>';
				}
				return progress + progresText;
			},
		},
		autoHeight: true,
		breakpoints: {
			
			992: {
				autoHeight: false,
			},
		}
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

	fixedStip();
	function fixedStip(){
		let fixedStrip = document.querySelector('.scroll-top');
		if(!fixedStrip) return

		window.addEventListener("scroll", toggleFixedStrip.bind(undefined, fixedStrip), {passive:  true});
		toggleFixedStrip(fixedStrip);

		$(fixedStrip).click(function (){
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		});
	}
	function toggleFixedStrip(fixedStrip){
		if (window.scrollY > calcVh(10)){
			$(fixedStrip).addClass('active');
		}
		else{
			$(fixedStrip).removeClass('active');
		}
	}
	function calcVh(v) {
		var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		return (v * h) / 100;
	}

	const partnerSlider = new Swiper('.partners__slider--js', {
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

	
	const headerBlockSlider = new Swiper('.headerBlock__slider--js', {
		slidesPerView: 1,
		loop: true,
		spaceBetween: 0,
		navigation: {
			nextEl: '.headerBlock .swiper-button-next',
			prevEl: '.headerBlock .swiper-button-prev',
		},
	});


	const sResultsSlider = new Swiper('.tabs__content .sResults__slider--js', {
		slidesPerView: 1,
		loop: true,
		spaceBetween: 0,
		observer: true,
		observeParents: true,
		navigation: {
			nextEl: '.tabs__content .swiper-button-next',
			prevEl: '.tabs__content .swiper-button-prev',
		},
	});



	const sOurWorkSlider = new Swiper('.sOurWork__itemWrap .sOurWork__slider--js', {
		slidesPerView: 1,
		// loop: true,
		spaceBetween: 0,
		pagination: {
			el: '.sOurWork__itemWrap .swiper-pagination',
			type: 'bullet',
			clickable: true,
		},
	});

	$('.accardion-toggle--js').on('click', function(){
		$(this).toggleClass('active').parent().find('.accardion-item').slideToggle();
	})


	$('.custom-input__input').change(function () {
		$(this).parents('form').find('.toggle-block').slideToggle().toggleClass('active');
	})


	let items = document.querySelectorAll(".sOurWork__item");
	items.forEach(ell => {

		let slider = ell.querySelector('.sOurWork__slider--js');

		const swiper4 = new Swiper(slider, {
			slidesPerView: 1,
			spaceBetween: 0,
			// by: 'container',
			loop: true,
			lazy: {
				loadPrevNext: true,
			},
			pagination: {
				el: ell.querySelector('.swiper-pagination'),
				type: 'bullets',
				clickable: true
			}
		});

		ell.addEventListener(`mouseover`,function(element) {
			const puginBtn = element.target.closest('.swiper-pagination-bullet');
			if (!puginBtn) return;
			$(puginBtn).click();
		})
	})

	// modal window

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }