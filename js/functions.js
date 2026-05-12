$(() => {
	// Observer API
	const boxes = document.querySelectorAll('.lazyload, .production-process__flex')

	function scrollTracking(entries) {
		for (const entry of entries) {
			if (entry.intersectionRatio > 0 && entry.target.getAttribute('data-src') && !entry.target.classList.contains('loaded')) {
				entry.target.classList.add('loaded')

				entry.target.src = entry.target.getAttribute('data-src')
			}

			if (entry.intersectionRatio > 0 && entry.target.getAttribute('data-srcset') && !entry.target.classList.contains('loaded')) {
				entry.target.srcset = entry.target.getAttribute('data-srcset')

				entry.target.classList.add('loaded')
			}

			if (entry.intersectionRatio > 0 && entry.target.classList.contains('production-process__flex') && !entry.target.classList.contains('act')) {
				console.log(entry.target)
				tabsTimer()

				entry.target.classList.add('act')
			}
		}
	}

	const observer = new IntersectionObserver(scrollTracking, {
		threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
	})

	boxes.forEach(element => observer.observe(element))
	

	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll() + 'px')


	// Мини всплывающие окна
	$('.mini-modal__btn').click(function (e) {
		e.preventDefault()

		const parent = $(this).closest('.mini-modal')

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
			$('.mini-modal__modal').removeClass('_active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini-modal__btn').removeClass('_active')
			$(this).addClass('_active')

			$('.mini-modal__modal').removeClass('_active')
			parent.find('.mini-modal__modal').addClass('_active')


			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click((e) => {
		if ( !e.target.closest('.mini-modal') ) {
			$('.mini-modal__modal, .mini-modal__btn').removeClass('_active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})

	// Закрываем всплывашку при клике на кнопку таба
	$('.brand-info__tabs-btn').click(function (e) {
		e.preventDefault()

		$('.mini-modal__btn').removeClass('_active')
		$('.mini-modal__modal').removeClass('_active')

		if (is_touch_device()) $('body').css('cursor', 'default')
	})

	$('body').on('click', '[data-mini-close]', function(e) {
		e.preventDefault()

		$('.mini-modal__modal, .mini-modal__btn').removeClass('_active')

		if (is_touch_device()) $('body').css('cursor', 'default')
	})

	$('body').on('click', '.radio__label_del', function(e) {
		let delivery = $(this).data('del')

		$('.calc-amount__data_del').removeClass('_show')

		if ( $(delivery).length ) {
			$(delivery).addClass('_show')
		}
	})

	// Показать все
	$('body').on('click', '.catalog-filter__more-btn', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')

			$(this).closest('.catalog-filter__box').find('._hide').removeClass('_show')
		} else {
			$(this).addClass('_active')

			$(this).closest('.catalog-filter__box').find('._hide').addClass('_show')
		}
	})

	// Моб. фильтр
	$('body').on('click', '.filter-open', function(e) {
		e.preventDefault()

		$('.catalog-filter__wrap').addClass('_show')
		$('body').addClass('_lock-menu')
	})

	$('body').on('click', '.catalog-filter__close', function(e) {
		e.preventDefault()

		$('.catalog-filter__wrap').removeClass('_show')
		$('body').removeClass('_lock-menu')
	})


	// Моб. меню личного кабинета
	$('body').on('click', '.content-lk__open-menu', function(e) {
		e.preventDefault()

		$('.aside-lk').addClass('_show')
		$('body').addClass('_lock-menu')
	})

	$('body').on('click', '.aside-lk__close', function(e) {
		e.preventDefault()

		$('.aside-lk').removeClass('_show')
		$('body').removeClass('_lock-menu')
	})

	
	// Табы
	var locationHash = window.location.hash

	$('body').on('click', '.tabs__button_js', function(e) {
		e.preventDefault()

		if( !$(this).hasClass('_active') ) {
			let parent = $(this).closest('.tabs-container')
			let activeTab = $(this).data('content')
			let activeTitle = $(this).data('content-title')
			let level = $(this).data('level')

			console.log(activeTitle)

			parent.find('.tabs:first').find('.tabs__button_js').removeClass('_active')
			parent.find('.tab-content.' + level).removeClass('_active')

			if ( parent.hasClass('animated') ) {
				parent.removeClass('animated')

				setTimeout(function(){
					if ( !parent.hasClass('animated') ) {
						parent.addClass('animated')
					}
				},50)
			}

			$(this).addClass('_active')
			$(activeTab).addClass('_active')

			if( $(this).closest('.tabs__item').length ){
				parent.find('.tabs__item').removeClass('_active')
				$(this).closest('.tabs__item').addClass('_active')
			}

			if( activeTitle !== 'undefined' ){
				parent.find('.tabs__data').removeClass('_active')
				$(activeTitle).addClass('_active')
			}

			let textEl = $(this).text()

			$(this).closest('.brand-info__tabs-box').find('.brand-info__open-tabs span').text(textEl)
		}
	})

	if( locationHash && $('.tabs-container').length ) {
		let activeTab = $('.tabs__button_js[data-content="'+ locationHash +'"]')
		let parent = activeTab.closest('.tabs-container')
		let level = activeTab.data('level')

		parent.find('.tabs:first').find('.tabs__button_js').removeClass('_active')
		parent.find('.tab-content.' + level).removeClass('_active')

		activeTab.addClass('_active')
		$(locationHash).addClass('_active')

		let textEl = $(locationHash).text()

		$(locationHash).closest('.brand-info__tabs-box').find('.brand-info__open-tabs span').text(textEl)

		$('html, body').stop().animate({
			scrollTop: $(locationHash).offset().top - 120
		}, 1000)
	}


	// Fancybox
	const myCloseBtn = '<button data-fancybox-close class="f-button is-close-button" title="Close"><svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L16 16" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/><path d="M16 1L1 16" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"/></svg></button>';

	const commonOptions = {
		autoFocus: false,
		dragToClose: false,
		placeFocusBack: false,
		
		
		Html: {
			
			tpl: myCloseBtn
		},
		
		
		Toolbar: {
			display: {
				right: ["close"],
			},
			items: {
				close: {
					tpl: myCloseBtn
				}
			}
		}
	};

	// Открытие модалок
	$(document).on('click', '.modal-btn', function (e) {
		e.preventDefault();

		Fancybox.close();
	
		const target = $(this).attr('data-content');
		const isBig = $(this).attr('data-modal-big') !== undefined;

		setTimeout(() => {
			Fancybox.show([{
				src: target,
				type: 'inline'
			}], {
				...commonOptions,
				on: {
					reveal: () => {
						if (isBig) $('body').addClass('_big-modal');
					},
					destroy: () => {
						$('body').removeClass('_big-modal');
						$('.modal video').each(function () { this.pause(); });
					}
				}
			});
		}, 10);
	});

	// 2. Закритие через кнопку .modal-close
	$('body').on('click', '.modal-close', function (e) {
		e.preventDefault();
		Fancybox.close();
	});

	// Для картинок
	Fancybox.bind('.fancy-img', {
		...commonOptions,
		Carousel: {
			Thumbs: false,
		},
	});

	// Аккордион простой
	$('body').on('click', '.accord__open', function(e) {
		e.preventDefault()

		let parent = $(this).closest('.accord__item')

		if( parent.hasClass('_active') ) {
			parent.removeClass('_active')
			parent.find('.accord__data').slideUp(300)
		} else {
			parent.addClass('_active')
			parent.find('.accord__data').slideDown(300)
		}
	})


	// Аккордион
	$('body').on('click', '.accordion__open', function(e) {
		e.preventDefault()

		let parent = $(this).closest('.accordion__item')
		let accordion = $(this).closest('.accordion')

		if( parent.hasClass('_active') ) {
			parent.removeClass('_active')
			parent.find('.accordion__data').slideUp(300)
		} else {
			accordion.find('.accordion__item').removeClass('_active')
			accordion.find('.accordion__data').slideUp(300)

			parent.addClass('_active')
			parent.find('.accordion__data').slideDown(300)
		}
	})

	// Кастомный select
	$('.select-marker select').niceSelect()

	// commit

	// Маска ввода
	$('input[type=tel]').each(function(){
		let datamask = $(this).data('mask');

		$(this).inputmask(`${datamask}`, {
			showMaskOnHover: false
		})
	})

	// Кастомный select
	$('.select-wrap select').niceSelect()

	$('body').on('click', '.header__change', function(e) {
		e.preventDefault();

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')

			$('.header__menu-item_ind').addClass('_show')
			$('.header__menu-item_biz').removeClass('_show')
		} else {
			$(this).addClass('_active')

			$('.header__menu-item_ind').removeClass('_show')
			$('.header__menu-item_biz').addClass('_show')
		}
	})

	$('body').on('click', '.map-svg__path:not(._inactive)', function(e) {
		// e.preventDefault()

		console.log('asd')

		if( !$(this).hasClass('_active') ) {
			let parent = $(this).closest('.select-city__block')
			let activeTab = $(this).data('map-item')

			parent.find('.map-svg__path').removeClass('_active')
			parent.find('.select-city__item').removeClass('_active')

			$(this).addClass('_active')
			$(activeTab).addClass('_active')
		}
	})
	
	$('.select-city .list_item').click(function(e){
		let dataVal = $(this).data('value');

		let el = $(this);

		setTimeout(function() {
			el.closest('.select-city').find('.map-svg__path[data-map-item="#' + dataVal + '"]').trigger('click');
		}, 0);
	});

	// Моб. меню
	$('body').on('click', '.mob-menu-btn', function(e) {
		e.preventDefault()

		$('.header__bot').addClass('_show')
		$('body').addClass('_lock-menu')
	})

	$('body').on('click', '.close-menu-btn', function(e) {
		e.preventDefault()

		$('.header__bot').removeClass('_show')
		$('body').removeClass('_lock-menu')
	})


	// Выбор файла
	$('.file-selection input[type=file]').change(function(){
		var val = $(this).val()

		var parent = $(this).parents('.file-selection')

		parent.find('.file-selection__path span').text(val)
		parent.find('.file-selection__path').addClass('_active')

		if(parent.find('.file-selection__path span').text() == '') {
			let namePath = parent.find('.file-selection__path').data('name')
			parent.find('.file-selection__path span').text(namePath)
		parent.find('.file-selection__path').removeClass('_active')
		}
	})


	$('body').on('click', '.map-contacts__path:not(._inactive)', function(e) {
		if( !$(this).hasClass('_active') ) {
			const parent = $(this).closest('.contacts-specialists');
			const activeTab = $(this).data('map-item');
			
			const $map = parent.find('.map-contacts__wrap');
			const mapEl = $map.get(0); 

			const rect = mapEl.getBoundingClientRect();

			const fullW = mapEl.scrollWidth;
			const fullH = mapEl.scrollHeight;

			const relX = e.clientX - rect.left;
			const relY = e.clientY - rect.top;

			const percentX = (relX / rect.width) * 100;
			const percentY = (relY / rect.height) * 100;

			// Очищення
			parent.find('.map-contacts__path').removeClass('_active');
			parent.find('.map-contacts__point').removeClass('_show _right _bot').css({
				left: 0,
				top: 0
			})
			parent.find('.contacts-specialists__box').removeClass('_active');

			const $point = parent.find(`.map-contacts__point[data-id="${activeTab}"]`);

			$(this).addClass('_active');
			$(activeTab).addClass('_active');
			$point.addClass('_show');

			const pointW = $point.outerWidth();
			const pointH = $point.outerHeight();

			const realPixelX = (percentX * fullW) / 100;
			const realPixelY = (percentY * fullH) / 100;

			if (realPixelX + pointW > fullW) {
				$point.addClass('_right');
			}
			if (realPixelY + pointH > fullH) {
				$point.addClass('_bot');
			}

			$point.css({
				left: percentX + '%',
				top: percentY + '%'
			});

			console.log({
				'Видима ширина': rect.width,
				'Повна ширина (scrollWidth)': fullW,
				'Відсоток X': percentX
			});
		}
	})


	$('body').on('click', '.calc-amount__calculate', function(e) {
		e.preventDefault()
		let parent = $(this).closest('.calc-amount')

		parent.find('.calc-amount__total').addClass('_show')
	})
})


$(window).on('load', () => {
	
	// commit
	
})


// Вспомогательные функции
const widthScroll = () => {
	let div = document.createElement('div')

	div.style.overflowY = 'scroll'
	div.style.width = '50px'
	div.style.height = '50px'
	div.style.visibility = 'hidden'

	document.body.appendChild(div)

	let scrollWidth = div.offsetWidth - div.clientWidth
	document.body.removeChild(div)

	return scrollWidth
}

function setHeight(className){
    let maxheight = 0

    className.each(function() {
		let elHeight = $(this).outerHeight()

        if( elHeight > maxheight ) {
			maxheight = elHeight
        }
    })

    className.outerHeight( maxheight )
}

const is_touch_device = () => !!('ontouchstart' in window)