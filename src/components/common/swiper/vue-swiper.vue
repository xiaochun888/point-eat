<template>
  <div
    class="swiper"
    :class="[direction, { dragging: dragging }]"
    @dblclick="onDblClick($event)"
    @touchstart="_onTouchStart"
    @mousedown="_onTouchStart"
    @wheel="_onWheel"
  >
    <div
      class="swiper-wrap"
      ref="swiperWrap"
      :style="{
        transform: 'translate3d(' + translateX + 'px,' + translateY + 'px, 0)',
        'transition-duration': transitionDuration + 'ms',
      }"
      @transitionend="_onTransitionEnd"
    >
      <slot></slot>
    </div>
    <div class="swiper-paginate" v-if="paginate">
      <slot name="prev" v-if="btns">
        <button
          class="swiper-paginate-btns swiper-paginate-prev"
          @click="prev()"
        >
          <slot name="prev-icon">←</slot>
        </button>
      </slot>
      <slot name="dots" v-if="dots">
        <span
          class="swiper-paginate-dot"
          :class="{ active: index + 1 === currentPage }"
          v-for="(slide, index) in slideEls"
          :key="index"
          @click="dotClick && setPage(index + 1)"
        >
        </span>
      </slot>
      <slot name="next" v-if="btns">
        <button
          class="swiper-paginate-btns swiper-paginate-next"
          @click="next()"
        >
          <slot name="next-icon">→</slot>
        </button>
      </slot>
    </div>
  </div>
</template>
<style lang="less" src="./vue-swiper.less"></style>
<script type="text/babel">
/**
 * https://github.com/weilao/vue-swiper
 * The clientWidth can be calculated when the element visible
 * with the correct style (display: block or innerblock).
 * https://github.com/lukaszflorczak/vue-agile
 */
function newDebounce(func, wait) {
  let debounce = function () {
    const context = this,
      args = arguments;
    const later = function () {
      debounce.timeout = null;
      func.apply(context, args);
    };
    if (debounce.timeout) {
      clearTimeout(debounce.timeout);
    }
    debounce.timeout = setTimeout(later, wait);
  };
  debounce.clear = function () {
    if (debounce.timeout) clearTimeout(debounce.timeout);
    debounce.timeout = null;
  };
  return debounce;
}

const VERTICAL = 'vertical';
const HORIZONTAL = 'horizontal';
export default {
  props: {
    direction: {
      type: String,
      default: VERTICAL,
      validator: (value) => [VERTICAL, HORIZONTAL].indexOf(value) > -1
    },
    mousewheel: {
      type: Boolean,
      default: true
    },
    noelastic: {
      type: Boolean,
      default: false
    },
    paginate: {
      type: Boolean,
      default: false
    },
    dotClick: {
      type: Boolean,
      default: false
    },
    btns: {
      type: Boolean,
      default: false
    },
    dots: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: false
    },
    speed: {
      type: Number,
      default: 300
    },
    /**30/05/2020 */
    autoplay: {
      type: Boolean,
      default: false
    },
    autoplaySpeed: {
      type: Number,
      default: 3000
    },
    idleTime: {
      type: Number,
      default: 0
    },
    /**02/08/2020 */
    initialPage: {
      type: Number,
      default: 1,
      validator: (page) => page > 0
    },
    repeat: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentPage: this.initialPage,
      lastPage: 1,
      translateX: 0,
      translateY: 0,
      startTranslate: 0,
      delta: 0,
      dragging: false,
      startPos: null,
      transitioning: false,
      translateOffset: 0,
      transitionDuration: 0,
      playInterval: null,
      slideEls: [],
      insertEls: {},
      appendEls: {}
    };
  },
  /**30/05/2020 */
  computed: {
    isHorizontal() {
      return this.direction === HORIZONTAL;
    },
    isVertical() {
      return this.direction === VERTICAL;
    },
    isPageChanged() {
      return this.lastPage !== this.currentPage;
    }
  },
  /**16/06/2020 */
  created() {
    /**29/05/2020 */
    this.resizeEnd = newDebounce(() => {
      this.reload();
    }, 50);

    this.idleEnd = newDebounce(() => {
      this.autoNext();
    }, this.idleTime);
  },
  mounted() {
    // this._onTouchMove = this._onTouchMove.bind(this);
    // this._onTouchEnd = this._onTouchEnd.bind(this);
    /**29/05/2020 */
    this.load();
    window.addEventListener('resize', this.resizeEnd);
  },
  beforeDestroy() {
    /**21/06/2020 avoid a leak of memory */
    this.resizeEnd.clear();
    this.idleEnd.clear();

    /**30/05/2020 autoplay */
    this.stopPlay();
    if (this.loop) this._disableLoop();
    window.removeEventListener('resize', this.resizeEnd);
  },
  methods: {
    /**30/05/2020 autoplay */
    autoNext() {
      if (!this.playInterval) {
        this.playInterval = setInterval(() => {
          if (this.loop) this.next();
          else {
            if (
              this.currentPage == 1 ||
              (this.lastPage < this.currentPage &&
                this.currentPage != this.slideEls.length)
            )
              this.next();
            else this.prev();
          }
        }, this.autoplaySpeed);
      }
    },
    stopPlay() {
      if (this.playInterval) {
        clearInterval(this.playInterval);
        this.playInterval = null;
      }
    },
    /**
     * disable double tap zoom on safari/ios
     */
    onDblClick(event) {
      event.preventDefault();
    },
    load() {
      this.slideEls = [].map.call(this.$refs.swiperWrap.children, (el) => el);
      if (this.loop) {
        this.$nextTick(function () {
          this._enableLoop();
          const lastIndex = Object.keys(this.insertEls).length - 1;
          this.setPage(this.currentPage + lastIndex, true);
        });
      } else {
        this.setPage(this.currentPage);
      }
      if (this.autoplay) this.idleEnd();

      /**02/08/2020 */
      const page = this.slideEls[this.currentPage - 1];
      if (page) {
        const style = window.getComputedStyle(page) || page.currentStyle;
        this.$emit('load', style);
      }
    },
    reload() {
      if (this.loop) this._disableLoop();
      this.load();
    },
    next() {
      /**02/08/2020 */
      this.$emit('next');

      var page = this.currentPage;
      if (page < this.slideEls.length || this.loop || this.repeat) {
        this.setPage(page + 1);
      } else {
        this.revert();
      }
    },
    prev() {
      /**02/08/2020 */
      this.$emit('prev');

      var page = this.currentPage;
      if (page > 1 || this.loop || this.repeat) {
        this.setPage(page - 1);
      } else {
        this.revert();
      }
    },
    setPage(page, noTransition) {
      var self = this;
      this.lastPage = this.currentPage;
      if (page === 0) {
        this.currentPage = this.slideEls.length;
      } else if (page === this.slideEls.length + 1) {
        this.currentPage = 1;
      } else {
        this.currentPage = page;
      }
      /**02/08/2020 */
      this.$emit('curr', this.currentPage - 1);
      if (this.repeat) page = this.currentPage;

      if (this.loop) {
        if (this.delta === 0) {
          this._setTranslate(self._getTranslateOfPage(this.lastPage));
        }

        setTimeout(function () {
          /**02/08/2020 avoid clone lazy loading element */
          self._updateLoop(page);
          self._setTranslate(self._getTranslateOfPage(page));
          if (noTransition) return;
          self._onTransitionStart();
        }, this.speed);
      } else {
        this._setTranslate(this._getTranslateOfPage(page));
        if (noTransition) return;
        this._onTransitionStart();
      }
    },
    revert() {
      this.setPage(this.currentPage);
    },
    _onTouchStart(e) {
      if (this.autoplay) this.idleEnd();

      this.startPos = this._getTouchPos(e);
      this.delta = 0;
      this.startTranslate = this._getTranslateOfPage(this.currentPage);
      this.startTime = new Date().getTime();
      this.dragging = true;
      this.transitionDuration = 0;
      document.addEventListener('touchmove', this._onTouchMove, false);
      document.addEventListener('touchend', this._onTouchEnd, false);
      document.addEventListener('mousemove', this._onTouchMove, false);
      document.addEventListener('mouseup', this._onTouchEnd, false);
    },
    _onTouchMove(e) {
      this.delta = this._getTouchPos(e) - this.startPos;
      if (!this.noelastic) {
        this._setTranslate(this.startTranslate + this.delta);
      }
      if (this.isVertical || (this.isHorizontal && Math.abs(this.delta) > 0)) {
        e.preventDefault();
      }
    },
    _onTouchEnd(e) {
      this.dragging = false;
      this.transitionDuration = this.speed;
      /**elastic mode by time and delta + _onTouchMove()*/
      var isQuickAction = new Date().getTime() - this.startTime < 1000;
      /**06/10/2020 avoid too sensitive */
      if (this.delta < -100 || (isQuickAction && this.delta < -60)) {
        this.next();
      } else if (this.delta > 100 || (isQuickAction && this.delta > 60)) {
        this.prev();
      } else {
        this.revert();
      }
      document.removeEventListener('touchmove', this._onTouchMove);
      document.removeEventListener('touchend', this._onTouchEnd);
      document.removeEventListener('mousemove', this._onTouchMove);
      document.removeEventListener('mouseup', this._onTouchEnd);
    },
    _onWheel(e) {
      if (this.autoplay) this.idleEnd();

      if (this.mousewheel) {
        // TODO Support apple magic mouse and trackpad.
        /**28/05/2020 make scrollable on top and bottom */
        if (
          !this.transitioning ||
          this.currentPage == 1 ||
          this.currentPage == this.slideEls.length
        ) {
          if (e.deltaY > 0) {
            this.next();
          } else {
            this.prev();
          }
        }
        if (this.isPageChanged) e.preventDefault();
      }
    },
    _getTouchPos(e) {
      var key = this.isHorizontal ? 'pageX' : 'pageY';
      return e.changedTouches ? e.changedTouches[0][key] : e[key];
    },
    _onTransitionStart() {
      this.transitioning = true;
      this.transitionDuration = this.speed;
    },
    _onTransitionEnd() {
      this.transitioning = false;
      this.transitionDuration = 0;
      this.delta = 0;
    },
    _setTranslate(value) {
      var translateName = this.isHorizontal ? 'translateX' : 'translateY';
      this[translateName] = value;
    },
    _getTranslate() {
      var translateName = this.isHorizontal ? 'translateX' : 'translateY';
      return this[translateName];
    },
    _getTranslateOfPage(page) {
      if (page === 0) return 0;
      var propName = this.isHorizontal ? 'clientWidth' : 'clientHeight';
      return (
        -[].reduce.call(
          this.slideEls,
          function (total, el, i) {
            return i > page - 2 ? total : total + el[propName];
          },
          0
        ) + this.translateOffset
      );
    },
    /**
     * 15/10/2020 insert into insertEls and append into appendEls after required cloning
     * impossible to insert or append the same node
    */
    _enableLoop() {
      const propName = this.isHorizontal ? 'clientWidth' : 'clientHeight';
      const swiperWrap = this.$refs.swiperWrap;
      /**insertBefore */
      var total = 0;
      var prevNode = swiperWrap.firstElementChild;
      for (var i = this.slideEls.length - 1; i >= 0; i--) {
        const newNode = this.slideEls[i].cloneNode(true);
        this.insertEls[i] = swiperWrap.insertBefore(newNode, prevNode);
        prevNode = newNode;
        total += newNode[propName];
        if(total >= swiperWrap[propName]) break;
      }
      /**appendChild */
      total = 0;
      var lastNode = swiperWrap.lastElementChild;
      for(var j = 0; j < this.slideEls.length; j++) {
        const newNode = this.slideEls[j].cloneNode(true);
        this.appendEls[j] = swiperWrap.appendChild(newNode);
        lastNode = newNode;
        total += newNode[propName];
        if(total >= swiperWrap[propName]) break;
      }
      this.translateOffset = -lastNode[propName];
    },
    _disableLoop() {
      const children = [].map.call(this.$refs.swiperWrap.children, (el) => el);
      for(var i = 0; i < children.length; i++) {
        const child = children[i];
        if(!this.slideEls.includes(child)) {
          this.$refs.swiperWrap.removeChild(child);
          console.log('_disableLoop removeChild', i);
        }
      }
      this.insertEls = {};
      this.appendEls = {};
    },
    /**02/08/2020 avoid clone lazy loading element */
    _updateLoop() {
      if(this.$refs.swiperWrap) {
        for(let key in this.insertEls) {
          if(!this.insertEls[key].isEqualNode(this.slideEls[key])) {
            console.log('Failed to clone nodes so clone to insert again.', key);
            const newNode = this.slideEls[key].cloneNode(true);
            this.slideEls[key].parentNode.replaceChild(newNode, this.insertEls[key]);
            this.insertEls[key] = newNode;
            console.log('_updateLoop replaced', key);
          }
        }
        for(let key in this.appendEls) {
          if(!this.appendEls[key].isEqualNode(this.slideEls[key])) {
            console.log('Failed to clone nodes so clone to append again.', key);
            const newNode = this.slideEls[key].cloneNode(true);
            this.slideEls[key].parentNode.replaceChild(newNode, this.appendEls[key]);
            this.appendEls[key] = newNode;
            console.log('_updateLoop replaced', key);
          }
        }
      }
    }
  }
};
</script>
