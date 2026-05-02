// Ширина окна для ресайза
WW = window.innerWidth || document.clientWidth || document.querySelector('body')[0].clientWidth

// Моб. версия
fakeResize = false
fakeResize2 = true

if (document.body.clientWidth < 375) {
	document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
}

$(() => {
	

	// if ($('.main-slider').length) {
	// 	new Swiper(".main-slider", {
	// 		loop: true,
	// 		spaceBetween: 10,
	// 		slidesPerView: 1,
	// 		speed: 800,
	// 		watchSlidesProgress: true,
	// 		watchOverflow: true,
	// 		preloadImages: false,
	// 		lazy: {
	// 			loadPrevNext: true,
	// 			elementClass: 'lazyload',
	// 			enabled: true,
	// 			loadedClass: 'loaded',
	// 			checkInView: true,
	// 			loadOnTransitionStart: true
	// 		},
	// 		navigation: {
	// 			nextEl: '.slider-button-next',
	// 			prevEl: '.slider-button-prev'
	// 		},
	// 		pagination: {
	// 			bulletActiveClass: 'slider-dot_active',
	// 			bulletClass: 'slider-dot',
	// 			clickableClass: 'slider-pagination-clickable',
	// 			el: '.slider-pagination',
	// 			clickable: true
	// 		},
	// 		on: {
	// 			init: function (swiper) {
	// 				$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
	// 			}
	// 		}
	// 	})
	// }

	if ($('.product-info').length) {
		galleryThumbs = new Swiper('.product-thumbs', {
			spaceBetween: 9,
			slidesPerView: 8,
			direction: 'vertical',
			loop: false,
			speed: 500,
			watchOverflow: true,
			watchSlidesProgress: true,
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			breakpoints: {
				'768': {
					spaceBetween: 10,
					slidesPerView: 5
				}
			}
		})

		new Swiper('.product-images__slider', {
			spaceBetween: 10,
			loop: false,
			speed: 500,
			watchOverflow: true,
			thumbs: {
				swiper: galleryThumbs
			},
			pagination: {
				bulletActiveClass: 'slider-dot_active',
				bulletClass: 'slider-dot',
				clickableClass: 'slider-pagination-clickable',
				el: '.slider-pagination',
				clickable: true,
			}
		})
	}

	//
	$('body').on('click', '.amount__btn_minus', function (e) {
		e.preventDefault()

		let parent = $(this).closest('.amount')

		if ( $(this).closest('.product-global-added').hasClass('product-global-added') ) {
			parent = $('.product-global-added')
		}

		let input = parent.find('input')
		let inputVal = parseFloat(input.val())
		let minimum = parseFloat(input.data('minimum'))
		let step = parseFloat(input.data('step'))

		if (inputVal > minimum) {
			input.val(inputVal - step)

			parent.find('.amount__btn_plus').prop("disabled", false)
		}

		if (inputVal-1 == minimum) {
			if ( !parent.hasClass('product__amount') && !parent.closest('.product-global-added').hasClass('product-global-added') ){
				$(this).prop("disabled", true)
			}
		}

		if (inputVal == minimum) {
			if ( parent.hasClass('product__amount') ){
				$(this).closest('.product').find('.product__added').removeClass('_show')
				$(this).closest('.product').find('.product__bot').removeClass('_hide')
			}

			if ( parent.closest('.product-global-added').hasClass('product-global-added') ){
				$('.product-global-added').removeClass('_show')
				$('.product-global-btns').removeClass('_hide')
			}
		}
	})
	
	$('body').on('click', '.amount__btn_plus', function (e) {
		e.preventDefault()

		let parent = $(this).closest('.amount')

		if ( $(this).closest('.product-global-added').hasClass('product-global-added') ) {
			parent = $('.product-global-added')
		}

		let input = parent.find('input')
		let inputVal = parseFloat(input.val())
		let maximum = parseFloat(input.data('maximum'))
		let step = parseFloat(input.data('step'))

		if (inputVal < maximum) {
			input.val(inputVal + step)

			parent.find('.amount__btn_minus').prop("disabled", false)
		}

		if (inputVal+1 == maximum) {
			$(this).prop("disabled", true)
		}
	})

	$('.amount__input').keydown(function () {
		const _self = $(this),
			maximum = parseInt(_self.data('maximum'))

		setTimeout(() => {
			if (_self.val() == '' || _self.val() == 0) _self.val(parseInt(_self.data('minimum')))
			if (_self.val() > maximum) _self.val(maximum)
		})
	})

	// commit

	if ($('#datepicker').length) {
		new AirDatepicker('#datepicker', {
			container: '#datepicker-here1',
			autoClose: true,
			position: 'bottom left',
			range: true,
    		multipleDatesSeparator: '-'
		})
	}

	if ($('.advantages__wrap').length){
		advantagesSlider()
	}

	if ($('.reviews__slider').length) {
		new Swiper(".reviews__slider", {
			loop: true,
			spaceBetween: 24,
			slidesPerView: 1,
			speed: 500,
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			}
		})
	}

	if ($('.projects__slider').length) {
		new Swiper(".projects__slider", {
			loop: false,
			spaceBetween: 24,
			slidesPerView: 'auto',
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			breakpoints: {
				'320': {
					spaceBetween: 15,
				},
				'480': {
					spaceBetween: 15,
				},
				'768': {
					spaceBetween: 15,
					slidesPerView: 2
				},
				'1024': {
					spaceBetween: 24,
					slidesPerView: 2
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				}
			}
		})
	}

	if ($('.about-info__slider').length) {
		new Swiper(".about-info__slider", {
			loop: false,
			spaceBetween: 24,
			slidesPerView: 1,
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			breakpoints: {
				'320': {
					spaceBetween: 15,
					slidesPerView: 1
				},
				'480': {
					spaceBetween: 15,
					slidesPerView: 1
				},
				'768': {
					spaceBetween: 15,
					slidesPerView: 1
				},
				'1024': {
					spaceBetween: 24,
					slidesPerView: 1
				}
			},
			pagination: {
				bulletActiveClass: 'slider-dot_active',
				bulletClass: 'slider-dot',
				clickableClass: 'slider-pagination-clickable',
				el: '.slider-pagination',
				clickable: true
			},
		})
	}

	if ($('.main-articles__slider').length) {
		new Swiper(".main-articles__slider", {
			loop: true,
			spaceBetween: 24,
			slidesPerView: 'auto',
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			breakpoints: {
				'320': {
					spaceBetween: 15,
				},
				'480': {
					spaceBetween: 15,
				},
				'768': {
					spaceBetween: 15,
					slidesPerView: 2
				},
				'1024': {
					spaceBetween: 24,
					slidesPerView: 3
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				}
			}
		})
	}

	if ($('.history').length) {
		historyThumbs = new Swiper('.history-thumbs', {
			spaceBetween: 75,
			slidesPerView:'auto',
			loop: false,
			speed: 500,
			watchOverflow: true,
			watchSlidesProgress: true,
			breakpoints: {
				'768': {
					spaceBetween: 75,
					slidesPerView:'auto',
				}
			}
		})

		new Swiper('.history__slider', {
			spaceBetween: 24,
			loop: false,
			speed: 500,
			watchOverflow: true,
			watchSlidesProgress: true,
			thumbs: {
				swiper: historyThumbs
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				}
			}
		})
	}

	if ($('.vacancies__slider').length) {
		new Swiper(".vacancies__slider", {
			loop: true,
			spaceBetween: 24,
			slidesPerView: 'auto',
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			breakpoints: {
				'320': {
					spaceBetween: 15,
				},
				'480': {
					spaceBetween: 15,
				},
				'768': {
					spaceBetween: 15,
					slidesPerView: 2
				},
				'1024': {
					spaceBetween: 24,
					slidesPerView: 3
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				}
			}
		})
	}

	if ($('.achiev-awards__slider').length) {
		new Swiper(".achiev-awards__slider", {
			loop: false,
			spaceBetween: 24,
			slidesPerView: 'auto',
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			breakpoints: {
				'320': {
					spaceBetween: 15,
				},
				'480': {
					spaceBetween: 15,
				},
				'768': {
					spaceBetween: 15,
					slidesPerView: 2
				},
				'1024': {
					spaceBetween: 24,
					slidesPerView: 4
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				}
			}
		})
	}

	if ($('.development__slider').length) {
		new Swiper(".development__slider", {
			loop: false,
			spaceBetween: 24,
			slidesPerView: 1,
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				}
			}
		})
	}

	if ($('.advantages__slider').length) {
		new Swiper(".advantages__slider", {
			loop: false,
			spaceBetween: 24,
			slidesPerView: 'auto',
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			breakpoints: {
				'320': {
					spaceBetween: 15,
				},
				'480': {
					spaceBetween: 15,
				},
				'768': {
					spaceBetween: 15,
					slidesPerView: 2
				},
				'1024': {
					spaceBetween: 24,
					slidesPerView: 5
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				}
			}
		})
	}

	if ($('.teams-leed__slider').length) {
		new Swiper(".teams-leed__slider", {
			loop: false,
			spaceBetween: 24,
			slidesPerView: 1,
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			}
		})
	}

	if ($('.employ-process__slider').length) {
		new Swiper(".employ-process__slider", {
			loop: false,
			spaceBetween: 24,
			slidesPerView: 'auto',
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			breakpoints: {
				'320': {
					spaceBetween: 15,
				},
				'480': {
					spaceBetween: 15,
				},
				'768': {
					spaceBetween: 15,
					slidesPerView: 2
				},
				'1024': {
					spaceBetween: 24,
					slidesPerView: 4
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				}
			}
		})
	}
});


$(window).on('load', () => {
	if ($('.main-slider').length) {
		$('.main-slider .wheelSlider-container').wheelSlider({
			controls: true,
			dots: false,
			items: 7,
		})
	}

	// $('.').liMarquee({
	// 	direction: 'left',
	// 	// loop: -1,
	// 	scrolldelay: 0,
	// 	scrollamount: 100,
	// 	circular: true,
	// 	drag: true,
	// 	scrollamount: 40,
	// })

	const marquee = new LiMarquee('.partners__slider', { speed: 60 });

	// if ($('.partners__slider').length) {
	// 	new Swiper(".partners__slider", {
	// 		loop: true,
	// 		spaceBetween: 30,
	// 		slidesPerView: 'auto',
	// 		watchSlidesProgress: true,
	// 		watchOverflow: true,
	// 		preloadImages: false,
	// 		lazy: {
	// 			loadPrevNext: true,
	// 			elementClass: 'lazyload',
	// 			enabled: true,
	// 			loadedClass: 'loaded',
	// 			checkInView: true,
	// 			loadOnTransitionStart: true
	// 		},
	// 		speed: 5000,
	// 		autoplay: {
	// 			delay: 0,
	// 			disableOnInteraction: false,
	// 		},
	// 		allowTouchMove: false,
	// 		freeMode: true,
	// 		loopedSlides: 10,
	// 		breakpoints: {
	// 			'320': {
	// 				spaceBetween: 30,
	// 			},
	// 			'480': {
	// 				spaceBetween: 30,
	// 			},
	// 			'768': {
	// 				spaceBetween: 100,
	// 			},
	// 			'1024': {
	// 				spaceBetween: 100,
	// 			}
	// 		},
	// 		on: {
	// 			mouseenter: function () {
	// 				this.autoplay.stop();
	// 			},
	// 			mouseleave: function () {
	// 				this.autoplay.start();
	// 			},
	// 		}
	// 	})
	// }
});


$(window).on('resize', () => {
	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Перезапись ширины окна
		WW = window.innerWidth || document.clientWidth || document.querySelector('body')[0].clientWidth

		// Моб. версия
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}


	if ($('.advantages__wrap').length){
		advantagesSlider()
	}
});


function advantagesSlider(){
	if ( $(window).width() < 768 && !$('.advantages__wrap').hasClass('swiper-initialized') ) {
		$('.advantages__wrap').addClass('swiper')
		$('.advantages__grid').addClass('swiper-wrapper').removeClass('_flex')
		$('.advantages__item').addClass('swiper-slide')

		advantagesSliderImg2 = new Swiper('.advantages__wrap', {
			loop: true,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 16,
			slidesPerView: 1,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			pagination: {
				bulletActiveClass: 'slider-dot_active',
				bulletClass: 'slider-dot',
				clickableClass: 'slider-pagination-clickable',
				el: '.slider-pagination',
				clickable: true
			},
		})
	} else if ($(window).width() > 767 && $('.advantages__wrap').hasClass('swiper-initialized')) {
		advantagesSliderImg2.destroy(true, true)

		$('.advantages__wrap').removeClass('swiper')
		$('.advantages__grid').removeClass('swiper-wrapper').addClass('_flex')
		$('.advantages__item').removeClass('swiper-slide')
	}
}