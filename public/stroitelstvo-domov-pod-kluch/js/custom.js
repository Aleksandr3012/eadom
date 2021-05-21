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

		}, { passive: true });
	},
	closeMenu() {
		if (!this.menuMobile) return;
		this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
		this.menuMobile.classList.remove("active");
		[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));

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

						if (btn.classList.contains('tabs__btn--accordion')) {
							setTimeout(() => {
								function getCoords(elem) {
									let box = elem.getBoundingClientRect();
									return box.top + pageYOffset
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

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask

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
			const destination = $(elementClick).offset().top - 120;

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

$(document).ready(function () {
	// JSCCommon.modalCall();
	// JSCCommon.tabscostume('.tabs--js');
	JSCCommon.mobileMenu();
	// JSCCommon.inputMask();
	// JSCCommon.heightwindow();
	// JSCCommon.animateScroll();
	// JSCCommon.CustomInputFile();


	var partnerSlider = new Swiper('.partners__slider--js', {
		slidesPerView: 'auto',
		autoHeight: true,
		freeMode: true,
		loop: true,
		spaceBetween: 40,
		breakpoints: {
			768: {
				spaceBetween: 64
			}
		}
	});
})