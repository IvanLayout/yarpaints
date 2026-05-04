;(function($) {

    // Options
    var defaults = {
        itemClass     : 'wheelSlider-item',
        arrowClass    : 'wheelSlider-arrow',
        arrowPrevHtml : '<span></span>',
        arrowNextHtml : '<span></span>',
        mode          : 'horizontal',
        items         : 3,
        startSlide    : 0,
        dots          : false,
        controls      : false,
        auto          : false,
        pause         : 3000,
        autoHover     : false,
        animationSpeed: 600, // Швидкість анімації для блокування (мс)

        // Callbacks
        onSliderLoad   : function() { return true },
        onSlideBefore  : function() { return true },
        onSlideAfter   : function() { return true },
        onSlideNext    : function() { return true },
        onSlidePrev    : function() { return true },
        onSliderResize : function() { return true }
    }


    $.fn.wheelSlider = function(options) {

        if (this.length === 0) {
            return this
        }

        // Support multiple elements
        if (this.length > 1) {
            this.each(function() {
                $(this).wheelSlider(options)
            })

            return this
        }

        var slider = {},
            el = this,
            $el = $(this)


        if ($el.data('wheelSlider')) { return }


        /**
        * ===================================================================================
        * = PRIVATE FUNCTIONS
        * ===================================================================================
        */
       el.destroy = function() {
            if (!slider.initialized) return;
            el.stopAuto();

            $(window).off('resize', resizeWindow);
            el.off('touchstart touchend mousedown mouseup click');
            
            if (slider.controls.next) slider.controls.next.remove();
            if (slider.controls.prev) slider.controls.prev.remove();
            if (slider.dots.length) slider.dots.remove();

            $el.removeClass('loaded with_dots').removeAttr('style');
            slider.children.removeClass('now next prev first last first2 last2').removeAttr('style');

            $el.removeData('wheelSlider');

            slider.initialized = false;
        };

        var init = function() {
            slider.settings = $.extend({}, defaults, options)
            slider.children = $el.find('.' + slider.settings.itemClass)
            slider.active = { index: slider.settings.startSlide }
            slider.controls = {}
            slider.dots = {}
            slider.interval = null
            slider.itemCount = slider.children.length
            
            // Прапорець для блокування перемикання під час анімації
            slider.working = false 

            if (slider.settings.controls) { appendControls() }
            if (slider.settings.dots) { appendDots() }
            if (slider.settings.auto  && slider.itemCount > 1) { initAuto() }

            start()
        }


        var start = function() {
            setSlidePosition( slider.settings.startSlide )
            initTouch()
            initMouse()

            slider.initialized = true
            slider.settings.onSliderLoad.call(el, slider.active.index)

            $(window).on('resize', resizeWindow)
            $el.height( setContainerHeight() ).addClass('loaded')
        }


        var appendControls = function() {
            slider.controls.next = $('<button class="'+slider.settings.arrowClass+'" data-action="next">'+slider.settings.arrowNextHtml+'</button>')
            slider.controls.prev = $('<button class="'+slider.settings.arrowClass+'" data-action="prev">'+slider.settings.arrowPrevHtml+'</button>')

            $el.append( slider.controls.prev ).append( slider.controls.next )

            slider.controls.next.on('click touchend', el.goToNextSlide)
            slider.controls.prev.on('click touchend', el.goToPrevSlide)
        }


        var appendDots = function() {
            slider.dots = $('<div class="dots" />')
            let dotsHtml = ''
            let i = 0

            while ( i < slider.itemCount ) {
                dotsHtml += '<button class="dot" data-slide-index="'+ i +'">'+ (i+1) +'</button>'
                i++
            }

            $el.append( slider.dots ).addClass('with_dots')
            slider.dots.html( dotsHtml )
            slider.dots.on('click touchend', 'button', clickDot)
        }


        var setSlidePosition = function(nowIndex) {
            // Перевірка: якщо анімація триває — ігноруємо виклик
            if (slider.working) return;
            slider.working = true;

            if( slider.initialized ) {
                slider.settings.onSlideBefore.call(el, nowIndex)
            }

            // Очищення всіх класів
            $el.find('.now, .next, .prev, .first, .last, .first2, .last2')
               .removeClass('now next prev first last first2 last2');

            // --- Логіка зациклення класів для країв (items 5 та 7) ---
            
            // Якщо ми на останньому слайді
            if(nowIndex == slider.itemCount - 1){
                slider.children.eq(0).addClass('next');
                if(slider.settings.items >= 5) slider.children.eq(1).addClass('last');
                if(slider.settings.items >= 7) slider.children.eq(2).addClass('last2');
            }

            // Якщо ми на першому слайді
            if(nowIndex == 0) {
                slider.children.eq(slider.itemCount - 1).addClass('prev');
                if(slider.settings.items >= 5) slider.children.eq(slider.itemCount - 2).addClass('first');
                if(slider.settings.items >= 7) slider.children.eq(slider.itemCount - 3).addClass('first2');
            }

            // Додаткова логіка зміщення для items 5 та 7
            if(slider.settings.items >= 5) {
                if(nowIndex == 1) slider.children.eq(slider.itemCount - 1).addClass('first');
                if(nowIndex == slider.itemCount - 2) slider.children.eq(0).addClass('last');
            }

            if(slider.settings.items >= 7) {
                if(nowIndex == 1) slider.children.eq(slider.itemCount - 2).addClass('first2');
                if(nowIndex == 2) {
                    slider.children.eq(slider.itemCount - 1).addClass('first2');
                    slider.children.eq(0).addClass('first');
                }
                if(nowIndex == slider.itemCount - 2) slider.children.eq(1).addClass('last2');
                if(nowIndex == slider.itemCount - 3) {
                    slider.children.eq(slider.itemCount - 1).addClass('last');
                    slider.children.eq(0).addClass('last2');
                }
            }

            // Основне призначення класів для всіх елементів
            slider.children.each(function(index) {
                var $this = $(this);
                if( index == nowIndex ) $this.addClass('now');
                if( index == nowIndex + 1 ) $this.addClass('next');
                if( index == nowIndex - 1 ) $this.addClass('prev');

                if( slider.settings.items >= 5 ) {
                    if( index == nowIndex + 2 ) $this.addClass('last');
                    if( index == nowIndex - 2 ) $this.addClass('first');
                }

                if( slider.settings.items >= 7 ) {
                    if( index == nowIndex + 3 ) $this.addClass('last2');
                    if( index == nowIndex - 3 ) $this.addClass('first2');
                }
            });

            slider.active.index = nowIndex;

            if (slider.settings.dots) { updateDotsActive(nowIndex) }

            if( slider.initialized ) {
                slider.settings.onSlideAfter.call(el, slider.active.index)
            }

            // Розблокування після завершення анімації
            setTimeout(function() {
                slider.working = false;
            }, slider.settings.animationSpeed);
        }


        var updateDotsActive = function(slideIndex) {
            slider.dots.find('button').removeClass('active').eq(slideIndex).addClass('active')
        }


        var clickDot = function(e) {
            e.preventDefault()
            if (slider.working) return;
            
            var dotLink = $(e.currentTarget)
            if (dotLink.data('slide-index') !== undefined) {
                var dotIndex = parseInt(dotLink.data('slide-index'))
                if (dotIndex !== slider.active.index) { el.goToSlide(dotIndex) }
            }
        }


        var initAuto = function() {
            el.startAuto()
            if (slider.settings.autoHover) {
                el.hover(function() {
                    if (slider.interval) {
                        el.stopAuto()
                        slider.autoPaused = true
                    }
                }, function() {
                    if (slider.autoPaused) {
                        el.startAuto()
                        slider.autoPaused = null
                    }
                })
            }
        }


        var initTouch = function() {
            var ts
            el.on('touchstart', function(e) {
                ts = e.originalEvent.touches[0].clientX;
            })
            el.on('touchend', function(e) {
                if (slider.working) return;
                let te = e.originalEvent.changedTouches[0].clientX;
                if(ts > te+5) { el.goToNextSlide(e) } 
                else if(ts < te-5) { el.goToPrevSlide(e) }
            })
        }


        var initMouse = function() {
            var ts
            el.on('mousedown', function(e) {
                ts = e.clientX;
            })
            el.on('mouseup', function(e) {
                if (slider.working) return;
                let te = e.clientX;
                if(ts > te+5) { el.goToNextSlide(e) } 
                else if(ts < te-5) { el.goToPrevSlide(e) }
            })
        }


        var resizeWindow = function() {
            if (!slider.initialized) { return }
            $el.height( setContainerHeight() )
            slider.settings.onSliderResize.call(el, slider.active.index)
        }


        var setContainerHeight = function() {
            let maxheight = 0
            slider.children.each(function(){
                let elHeight = $(this).innerHeight()
                if( elHeight > maxheight ) { maxheight = elHeight }
            })
            return maxheight
        }


        /**
        * ===================================================================================
        * = PUBLIC FUNCTIONS
        * ===================================================================================
        */

        el.goToNextSlide = function(e) {
            if(e) e.preventDefault();
            if (slider.working) return;

            if( slider.active.index == slider.itemCount - 1 ) {
                setSlidePosition(0)
            } else {
                setSlidePosition( slider.active.index + 1 )
            }
            slider.settings.onSlideNext.call(el, slider.active.index)
        }

        el.goToPrevSlide = function(e) {
            if(e) e.preventDefault();
            if (slider.working) return;

            if( slider.active.index == 0 ) {
                setSlidePosition( slider.itemCount - 1 )
            } else {
                setSlidePosition( slider.active.index - 1 )
            }
            slider.settings.onSlidePrev.call(el, slider.active.index)
        }

        el.goToSlide = function(slideIndex) {
            setSlidePosition(slideIndex)
        }

        el.startAuto = function() {
            if (slider.interval) { return }
            slider.interval = setInterval(function() {
                el.goToNextSlide()
            }, slider.settings.pause)
        }

        el.stopAuto = function() {
            if (!slider.interval) { return }
            clearInterval(slider.interval)
            slider.interval = null
        }

        el.getCurrentSlide = function() {
            return slider.active.index
        }

        el.getSlideCount = function() {
            return slider.children.length
        }

        init()
        $el.data('wheelSlider', this)
        return this
    }

})(jQuery)