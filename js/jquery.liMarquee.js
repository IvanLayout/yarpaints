class LiMarquee {
    constructor(selector, options = {}) {
        this.el = document.querySelector(selector);
        if (!this.el) return;

        this.p = {
            direction: options.direction || 'left',
            speed: options.speed || 50,
            circular: options.circular !== undefined ? options.circular : true,
            drag: options.drag !== undefined ? options.drag : true,
            hoverstop: options.hoverstop !== undefined ? options.hoverstop : true,
        };

        this.originalHTML = this.el.innerHTML;
        this.boundEvents = {};
        this.requestId = null;
        this.wasDragged = false; 

        this.init();
    }

    init() {
        this.isPaused = false;
        this.isDragging = false;
        this.pos = 0;
        this.lastTime = 0;

        const content = this.el.innerHTML;
        this.el.classList.add('str_wrap');

        this.strMove = document.createElement('div');
        this.strMove.classList.add('str_move');
        this.strMove.innerHTML = `<div class="str_item">${content}</div>`;
        
        this.el.innerHTML = '';
        this.el.appendChild(this.strMove);

        this.item = this.strMove.querySelector('.str_item');
        this.itemWidth = this.item.offsetWidth;

        if (this.p.circular) {
            const clone = this.item.cloneNode(true);
            this.strMove.appendChild(clone);
        }

        this.bindEvents();
        this.startAnimation();
    }

    startAnimation() {
        const animate = (time) => {
            if (!this.lastTime) this.lastTime = time;
            const delta = (time - this.lastTime) / 1000;
            this.lastTime = time;

            if (!this.isPaused && !this.isDragging) {
                const step = this.p.speed * delta;
                const dir = this.p.direction === 'left' ? -1 : 1;
                this.updatePosition(this.pos + (step * dir));
            }
            this.requestId = requestAnimationFrame(animate);
        };
        this.requestId = requestAnimationFrame(animate);
    }

    updatePosition(newPos) {
        this.pos = newPos;

        if (this.pos <= -this.itemWidth) {
            this.pos += this.itemWidth;
        }
        if (this.pos > 0) {
            this.pos -= this.itemWidth;
        }

        this.strMove.style.transform = `translate3d(${this.pos}px, 0px, 0px)`;
    }

    bindEvents() {
        this.boundEvents.click = (e) => {
            if (this.wasDragged) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        };
        this.el.addEventListener('click', this.boundEvents.click, true);

        if (this.p.hoverstop) {
            this.boundEvents.mouseenter = () => this.isPaused = true;
            this.boundEvents.mouseleave = () => { this.isPaused = false; this.lastTime = 0; };
            this.el.addEventListener('mouseenter', this.boundEvents.mouseenter);
            this.el.addEventListener('mouseleave', this.boundEvents.mouseleave);
        }

        if (this.p.drag) {
            let startX = 0;
            let startPos = 0;

            this.boundEvents.startDrag = (e) => {
                this.isDragging = true;
                this.wasDragged = false;
                this.el.classList.add('is-dragging');
                
                startX = e.pageX || (e.touches && e.touches[0].pageX);
                startPos = this.pos;
            };

            this.boundEvents.moveDrag = (e) => {
                if (!this.isDragging) return;
                
                const currentX = e.pageX || (e.touches && e.touches[0].pageX);
                const diff = currentX - startX;

                if (Math.abs(diff) > 5) this.wasDragged = true;

                this.updatePosition(startPos + diff);
            };

            this.boundEvents.stopDrag = () => {
                if (!this.isDragging) return;
                this.isDragging = false;
                this.el.classList.remove('is-dragging');
                this.lastTime = 0;
            };

            this.el.addEventListener('mousedown', this.boundEvents.startDrag);
            this.el.addEventListener('touchstart', this.boundEvents.startDrag, {passive: true});
            window.addEventListener('mousemove', this.boundEvents.moveDrag);
            window.addEventListener('touchmove', this.boundEvents.moveDrag, {passive: false});
            window.addEventListener('mouseup', this.boundEvents.stopDrag);
            window.addEventListener('touchend', this.boundEvents.stopDrag);
        }
    }

    destroy() {
        if (this.requestId) cancelAnimationFrame(this.requestId);
        this.el.innerHTML = this.originalHTML;
        this.el.classList.remove('str_wrap');
    }
}