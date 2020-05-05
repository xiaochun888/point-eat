<template>
  <section class="agile-swiper" v-show="show" @dblclick="onDblClick($event)">
    <div class="swiper" :class="{'swiper-disabled': settings.unagile}">
        <div ref="list" class="swiper-list" id="swiper-list">
            <div ref="track" class="swiper-track" :style="style" @mouseover="handleMouseOver('track')" @mouseout="handleMouseOut('track')">
              <slot></slot>
            </div>
        </div>
        <div v-if="settings.hasBottom && !settings.unagile" class="swiper-bottom">
          <div v-if="settings.arrows && !settings.unagile" class="swiper-button swiper-arrow swiper-arrow-prev" :class="{hidden: hideArrow && slideCount < 2}"
            :disabled="currentSlide === 0 && !settings.infinite" @dblclick="onDblClick($event)" @click="prevSlide" v-html="prevArrow"></div>
          <div v-if="hasButton">
            <slot name="agile-swiper-button"></slot>
          </div>
          <div v-else class="swiper-text">{{shownSlide}}/{{slideCount}}</div>
          <div v-if="settings.arrows && !settings.unagile" class="swiper-button swiper-arrow swiper-arrow-next" :class="{hidden: hideArrow && slideCount < 2}"
            :disabled="currentSlide === (slideCount - 1) && !settings.infinite" @dblclick="onDblClick($event)" @click="nextSlide" v-html="nextArrow"></div>
        </div>
        <div class="prev-arrow" @dblclick="onDblClick($event)" @click="prevSlide" v-html="prevArrow"></div>
        <div class="next-arrow" @dblclick="onDblClick($event)" @click="nextSlide" v-html="nextArrow"></div>
    </div>
  </section>
</template>

<script>
/*
* The clientWidth can be calculated when the element visible
* with the correct style (display: block or innerblock).
* https://github.com/lukaszflorczak/vue-agile
*/
function newDebounce (func, wait) {
  let debounce = function () {
    const context = this;
    const args = arguments;
    const later = function () {
      debounce.timeout = null;
      func.apply(context, args);
    };
    if (debounce.timeout) {
      clearTimeout(debounce.timeout);
    }
    debounce.timeout = setTimeout(later, wait);
  };
  return debounce;
}

export default {
  name: 'agile-swiper',
  components: {
  },

  props: {
    arrows: {
      type: Boolean,
      default: true
    },

    autoplay: {
      type: Boolean,
      default: false
    },

    autoplaySpeed: {
      type: Number,
      default: 3000
    },

    hasBottom: {
      type: Boolean,
      default: true
    },

    infinite: {
      type: Boolean,
      default: true
    },

    mobileFirst: {
      type: Boolean,
      default: true
    },

    /* eslint-disable max-len */
    nextArrow: {
      type: String,
      default: '<div class="arrow-right"></div>'
    },
    /* eslint-enable max-len */

    options: {
      type: Object,
      default: function () {
        return null;
      }
    },

    pauseOnHover: {
      type: Boolean,
      default: true
    },

    /* eslint-disable max-len */
    prevArrow: {
      type: String,
      default: '<div class="arrow-left"></div>'
    },
    /* eslint-enable max-len */

    responsive: {
      type: Object,
      default: function () {
        return null;
      }
    },

    show: {
      type: Boolean,
      default: true
    },

    speed: {
      type: Number,
      default: 150
      // default: 300
    },

    timing: {
      type: String,
      default: 'ease' // linear, ease-in, ease-out, ease-in-out
    },

    unagile: {
      type: Boolean,
      default: false
    },
    /** stop sliding in resizing or dragging */
    frozen: {
      type: Boolean,
      default: false
    },

    defaultSlide: {
      type: Number,
      default: 0,
      validator: value => {
        return value >= 0;
      }
    },

    hideArrow: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      slides: null,
      autoplayStatus: false,
      autoplayTimeout: null,
      allSlidesCount: 0,
      currentSlide: this.defaultSlide,
      mouseDown: false,
      dragStartX: 0,
      dragStaryY: 0,
      dragDistance: 0,
      swipeDistance: 50,
      transform: 0,
      transitionDelay: 0,
      width: {
        document: 0,
        container: 0,
        slide: 0,
        track: 0
      },
      height: {
        document: 0,
        container: 0,
        slide: 0,
        track: 0
      },
      slidesToShow: 1,
      defaultSettings: {
        prevArrow: this.prevArrow,
        nextArrow: this.nextArrow,
        arrows: this.arrows,
        autoplay: this.autoplay,
        autoplaySpeed: this.autoplaySpeed,
        hasBottom: this.hasBottom,
        infinite: this.infinite,
        mobileFirst: this.mobileFirst,
        pauseOnHover: this.pauseOnHover,
        responsive: this.responsive,
        speed: this.speed,
        timing: this.timing,
        unagile: this.unagile,
        frozen: this.frozen
      },
      settings: {},
      cache: {
        listWidth: 0,
        documentWidth: 0,
        slideCount: 0
      },
      resizeEnd: newDebounce(() => {
        if (this.$refs.list) {
          this.cache.listWidth = this.$refs.list.clientWidth;
        }
      }, 50)
    };
  },
  created () {
    console.log('created');

    // Windows resize listener
    window.addEventListener('resize', this.resizeEnd);

    // Read settings from options object
    if (this.options) {
      for (let key in this.options) {
        this.defaultSettings[key] = this.options[key];
      }
    }

    // Sort breakpoints
    if (this.defaultSettings.responsive) {
      this.defaultSettings.responsive.sort(this.compare);
    }

    // Set first load settings
    Object.assign(this.settings, this.defaultSettings);
  },
  mounted () {
    console.log('mounted');
    this.$emit('currSlide', this.currentSlide, this.slideCount);

    // Mouse and touch events
    if ('ontouchstart' in window) {
      this.$refs.track.addEventListener('touchstart', this.handleMouseDown);
      this.$refs.track.addEventListener('touchend', this.handleMouseUp);
      this.$refs.track.addEventListener('touchmove', this.handleMouseMove);
    } else {
      this.$refs.track.addEventListener('mousedown', this.handleMouseDown);
      this.$refs.track.addEventListener('mouseup', this.handleMouseUp);
      this.$refs.track.addEventListener('mousemove', this.handleMouseMove);
    }
  },

  beforeDestroy () {
    console.log('beforeDestroy');

    window.removeEventListener('resize', this.resizeEnd);

    if ('ontouchstart' in window) {
      this.$refs.track.removeEventListener('touchstart', this.handleMouseDown);
      this.$refs.track.removeEventListener('touchend', this.handleMouseUp);
      this.$refs.track.removeEventListener('touchmove', this.handleMouseMove);
    } else {
      this.$refs.track.removeEventListener('mousedown', this.handleMouseDown);
      this.$refs.track.removeEventListener('mouseup', this.handleMouseUp);
      this.$refs.track.removeEventListener('mousemove', this.handleMouseMove);
    }

    this.disableAutoplayMode();
  },

  methods: {
    loadSlides () {
      if (!this.$refs.track) return;

      this.slides = this.$refs.track.children;

      if (this.slideCount == this.slides.length) return;
      this.slideCount = this.slides.length;

      if (this.slideCount > 0 && this.currentSlide >= this.slideCount) {
        this.currentSlide = 0;
        console.warn('The current slide is not smaller than the count of slides.');
      }

      for (let i = 0; i < this.slideCount; ++i) {
        if (this.slides[i]) {
          this.slides[i].classList.remove('swiper-slide');
          this.slides[i].classList.add('swiper-slide');
        }
      }
      /** default slide, default style */
      this.$emit('loadSlide', this.slides[this.currentSlide], this.$el);

      if (!this.$slots.default && this.slideCount != 0) {
        this.slideCount = 0;
        this.$emit('currSlide', this.currentSlide, this.slideCount);
      }
    },
    compare (a, b) {
      if (a.breakpoint < b.breakpoint) {
        return this.defaultSettings.mobileFirst ? -1 : 1;
      } else if (a.breakpoint > b.breakpoint) {
        return this.defaultSettings.mobileFirst ? 1 : -1;
      } else {
        return 0;
      }
    },

    handleMouseDown (e) {
      this.mouseDown = true;
      this.dragStartX =
        'ontouchstart' in window ? e.touches[0].clientX : e.clientX;
      this.dragStartY =
        'ontouchstart' in window ? e.touches[0].clientY : e.clientY;
    },

    handleMouseMove (e) {
      let positionX =
        'ontouchstart' in window ? e.touches[0].clientX : e.clientX;
      let positionY =
        'ontouchstart' in window ? e.touches[0].clientY : e.clientY;

      let dragDistanceX = Math.abs(positionX - this.dragStartX);
      let dragDistanceY = Math.abs(positionY - this.dragStartY);

      if (dragDistanceX > 3 * dragDistanceY) {
        this.dragDistance = positionX - this.dragStartX;
        this.disableScroll();
      }
    },

    handleMouseUp () {
      this.mouseDown = false;
      this.enableScroll();
    },

    handleMouseOver (element) {
      if (this.settings.autoplay) {
        if (element === 'track' && this.settings.pauseOnHover) {
          this.disableAutoplayMode();
        }
      }
    },

    handleMouseOut (element) {
      if (this.settings.autoplay) {
        if (element === 'track' && this.settings.pauseOnHover) {
          this.enableAutoplayMode();
        }
      }
    },

    enableInfiniteMode () {
      if (!this.$refs.list) return;

      if (this.slideCount > 0) {
        let firstSlide = this.$refs.track.firstChild.cloneNode(true);
        let lastSlide = null;
        if (this.slideCount > 1) {
          lastSlide = this.$refs.track.lastChild.cloneNode(true);
        } else {
          lastSlide = this.$refs.track.firstChild.cloneNode(true);
        }

        firstSlide.classList.add('swiper-slide-cloned');
        lastSlide.classList.add('swiper-slide-cloned');

        this.$refs.track.insertBefore(lastSlide, this.slides[0]);
        this.$refs.track.insertBefore(
          firstSlide,
          this.slides[this.slideCount].nextSibling
        );
      }

      this.countSlides();
    },

    disableInfiniteMode () {
      if (!this.$refs.list) return;

      let clonedSlides = this.$refs.list.getElementsByClassName(
        'swiper-slide-cloned'
      );

      while (clonedSlides[0]) {
        clonedSlides[0].parentNode.removeChild(clonedSlides[0]);
      }

      this.countSlides();
    },

    enableAutoplayMode () {
      // Protection against contradictory settings
      if (!this.settings.infinite) {
        this.settings.infinite = true;
        this.enableInfiniteMode();
      }

      this.stopAutoplay();
      this.startAutoplay();
      this.autoplayStatus = true;
    },

    disableAutoplayMode () {
      this.autoplayStatus = false;
      this.stopAutoplay();
    },

    countSlides () {
      if (this.settings.infinite && !this.settings.unagile) {
        this.allSlidesCount = this.slideCount + 2;
      } else {
        this.allSlidesCount = this.slideCount;
      }
    },

    disableScroll () {
      document.ontouchmove = function (e) {
        e.preventDefault();
      };
    },

    enableScroll () {
      document.ontouchmove = function (/* e */) {
        return true;
      };
    },

    addActiveClass (i) {
      if (this.slides[i]) {
        this.slides[i].classList.add('swiper-slide-active');
        /** different slide, different style */
        this.$emit('loadSlide', this.slides[i], this.$el, true);
      }
    },

    startAutoplay () {
      this.autoplayTimeout = setTimeout(() => {
        if (!this.settings.autoplay) {
          this.stopAutoplay();
          this.disableAutoplayMode();
          return false;
        }

        this.nextSlide();
      }, this.autoplaySpeed);
    },

    stopAutoplay () {
      clearTimeout(this.autoplayTimeout);
    },

    setSlide (n, transition = true, autoplayTimeout = true) {
      if (this.settings.unagile || this.frozen || this.isEmpty) {
        return false;
      }
      // Reset autoplay timeout and set new
      if (this.settings.autoplay && autoplayTimeout) {
        this.stopAutoplay();
        this.startAutoplay();
      }

      this.transform = n * this.slideWidth;
      for (let i = 0; i < this.allSlidesCount; ++i) {
        if (this.slides[i]) {
          this.slides[i].classList.remove('swiper-slide-active');
        }
      }
      if (this.settings.infinite) {
        this.transform += this.slideWidth;
        this.addActiveClass(n + 1);
      } else {
        this.addActiveClass(n);
      }

      if (!transition) {
        this.transitionDelay = 0;
      } else {
        this.transitionDelay = this.speed;
      }
      if (this.settings.infinite && n < 0) {
        this.currentSlide = this.slideCount - 1;
        this.$emit('currSlide', this.currentSlide, this.slideCount);

        setTimeout(() => {
          this.setSlide(this.slideCount - 1, false);
        }, this.speed);
      } else if (this.settings.infinite && n >= this.slideCount) {
        this.currentSlide = 0;
        this.$emit('currSlide', this.currentSlide, this.slideCount);

        setTimeout(() => {
          this.setSlide(0, false);
        }, this.settings.speed);
      } else {
        this.currentSlide = n;
        this.$emit('currSlide', this.currentSlide, this.slideCount);
      }
    },

    nextSlide () {
      this.setSlide(this.currentSlide + 1);
      this.$emit('nextSlide', this.currentSlide, this.slideCount);
    },

    prevSlide () {
      this.setSlide(this.currentSlide - 1);
      this.$emit('prevSlide', this.currentSlide, this.slideCount);
    },

    onDblClick (event) {
      /** disable double tap zoom on safari/ios */
      event.preventDefault();
    },

    onRenderStyle () {
      console.log('onRenderStyle');
      // Responsive
      if (this.defaultSettings.responsive) {
        let responsiveSettings = {};
        Object.assign(responsiveSettings, this.defaultSettings);

        responsiveSettings.responsive.forEach(responsive => {
          if (this.defaultSettings.mobileFirst) {
            if (responsive.breakpoint < this.documentWidth) {
              for (let key in responsive.settings) {
                responsiveSettings[key] = responsive.settings[key];
              }
            }
          } else {
            if (responsive.breakpoint > this.documentWidth) {
              for (let key in responsive.settings) {
                responsiveSettings[key] = responsive.settings[key];
              }
            }
          }
        });

        Object.assign(this.settings, responsiveSettings);
      }

      this.disableInfiniteMode();
      this.loadSlides();

      // Check infinity mode status and enable/disable
      if (this.settings.infinite && !this.settings.unagile) {
        this.enableInfiniteMode();
      } else {
        this.disableInfiniteMode();
      }

      // Check autoplay mode status and enable/disable
      if (this.settings.autoplay && !this.autoplayStatus) {
        this.enableAutoplayMode();
      }

      if (
        (!this.settings.autoplay && this.autoplayStatus) ||
        this.settings.unagile
      ) {
        this.disableAutoplayMode();
      }
      // Actions on document resize
      for (let i = 0; i < this.allSlidesCount; ++i) {
        if (this.slides[i]) {
          this.slides[i].style.width = this.listWidth + 'px';
          this.slides[i].style.transform = 'translate(0)';
        }
      }

      // Prepare track
      if (this.settings.unagile) {
        this.transform = 0;
      } else {
        this.setSlide(this.currentSlide, false, false);
      }
    }
  },

  computed: {
    listWidth: {
      get: function () {
        /** catch resize event */
        this.$nextTick(() => {
          if (this.$refs.list) {
            console.log('listWidth', this.$refs.list.clientWidth);
            this.cache.listWidth = this.$refs.list.clientWidth;
          }
        });
        return this.cache.listWidth;
      }
    },
    trackWidth: {
      get: function () {
        return this.settings.unagile ? this.listWidth : this.listWidth * this.allSlidesCount;
      }
    },
    slideWidth: {
      get: function () {
        return !this.settings.unagile ? this.listWidth / this.slidesToShow : 'auto';
      }
    },
    style: {
      get: function () {
        this.onRenderStyle();
        return {
          width: this.trackWidth + 'px',
          transform: 'translate(-' + this.transform + 'px)',
          transition: 'transform ' + this.settings.timing + ' ' + this.transitionDelay + 'ms'
        };
      }
    },
    documentWidth: {
      get: function () {
        this.cache.documentWidth = window.innerWidth ||
          (document.documentElement && document.documentElement.clientWidth) ||
          document.body.clientWidth;

        return this.cache.documentWidth;
      }
    },
    slideCount: {
      get: function () {
        return this.cache.slideCount;
      },
      set: function (value) {
        this.cache.slideCount = value;
      }
    },
    shownSlide: function () {
      if (this.slideCount <= 0)
        return this.currentSlide;
      else
        return this.currentSlide + 1;
    },
    isEmpty () {
      return this.slideCount <= 0;
    },
    hasButton () {
      return this.$slots['agile-swiper-button'];
    }
  },
  watch: {
    show (value) {
      if (value) {
        /** catch display event */
        this.cache.listWidth = 0;
        this.$nextTick(() => {
          this.cache.listWidth = this.$refs.list.clientWidth;
        });
      }
    },
    dragDistance () {
      if (this.mouseDown) {
        if (this.dragDistance > this.swipeDistance) {
          if (!this.settings.infinite && this.currentSlide === 0) {
            return;
          }

          this.prevSlide();
          this.handleMouseUp();
        }

        if (this.dragDistance < -1 * this.swipeDistance) {
          if (!this.settings.infinite && this.currentSlide === this.slideCount - 1) {
            return;
          }

          this.nextSlide();
          this.handleMouseUp();
        }
      }
    }
  }
};
</script>

<style lang="scss" type="text/scss">
.agile-swiper {
  height: 100%;
  .hidden {
    display: none;
  }
  .swiper {
    position: relative;
    height: 100%;

    /* Here just dispaly minimum height for debug.
    *  The parent of v-swipper can controle its display as folows:
    *  height: 100%;
    *  //height: calc(100% - 34px);
    *  width: 100%;
    *  position: absolute;
    */
    min-height: 100px;
    &,
    * {
      &:focus,
      &:active {
        outline: none;
      }
    }

    &-list {
      overflow: hidden;
      position: relative;
      height: 100%;
    }

    &-track {
      display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
      display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
      display: -ms-flexbox;      /* TWEENER - IE 10 */
      display: -webkit-flex;     /* NEW - Chrome */
      display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
      align-items: center;
      justify-content: flex-start;
      height: 100%;

      .swiper-disabled & {
        display: block;
      }
    }

    &-slide {
      display: block;
    }

    &-arrow {
      &[disabled] {
        cursor: default;
      }
    }
    &-bottom {
      /* layer */
      position: absolute;
      bottom: 0;
      width: 100%;

      /* layout */
      display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
      display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
      display: -ms-flexbox;      /* TWEENER - IE 10 */
      display: -webkit-flex;     /* NEW - Chrome */
      display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
      justify-content:center;
      align-items: flex-start;

      /* theme */
      background-color: transparent;
      height:3.3em;

      &[hidden] {
        display: none !important;
      }
    }
    &-text{
      display:inline-block;
      width:3em;
      height:3em;
      line-height: 3em;
      text-align:center;
    }
    &-button{
      margin-right: 1em;
      margin-left: 1em;
      width:3em;
      height:3em;
      line-height: 2.7em;
      border:0.15em solid #aaa;
      color: #fff;
      background-color: #bbb;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      text-align: center;
      border-radius: 50%;
      -o-border-radius: 50%;
      -ms-border-radius: 50%;
      -moz-border-radius: 50%;
      -webkit-border-radius: 50%;
      overflow: hidden;
      box-shadow: 0.1em 0.1em 0.3em rgba(0, 0, 0, .5);
      -o-box-shadow: 0.1em 0.1em 0.3em rgba(0, 0, 0, .5);
      -moz-box-shadow: 0.1em 0.1em 0.3em rgba(0, 0, 0, .5);
      -webkit-box-shadow: 0.1em 0.1em 0.3em rgba(0, 0, 0, .5);
      -webkit-transition: all 0.1s;
      -moz-transition: all 0.1s;
      -o-transition: all 0.1s;
      transition: all 0.1s;
    }
    &-button:hover {
      cursor: pointer;
      color:#fff;
      background-color: #ddd;
      box-shadow: 0.3em 0.3em 0.5em rgba(0, 0, 0, 0.3);
      -o-box-shadow: 0.3em 0.3em 0.5em rgba(0, 0, 0, 0.3);
      -moz-box-shadow: 0.3em 0.3em 0.5em rgba(0, 0, 0, 0.3);
      -webkit-box-shadow: 0.3em 0.3em 0.5em rgba(0, 0, 0, 0.3);
    }
    &-button:active:hover{ /* mouse down */
      border-color: #fff;
      box-shadow: inset 0 0 1000px #666;
      -o-box-shadow: inset 0 0 1000px #666;
      -moz-box-shadow: inset 0 0 1000px #666;
      -webkit-box-shadow: inset 0 0 1000px #666;
    }
    .arrow-left, .arrow-right {
      border: solid white;
      border-width: 0 0.2em 0.2em 0;
      display: inline-block;
      padding: 0.3em;
    }
    .arrow-right {
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
    }
    .arrow-left {
      transform: rotate(135deg);
      -webkit-transform: rotate(135deg);
    }
    .prev-arrow {
      position: absolute;
      float: left;
      left: 1em;
      top: 50%;
      transform: translate(0, -50%);
      -o-transform: translate(0, -50%);
      -ms-transform: translate(0, -50%);
      -webkit-transform: translate(0, -50%);

      .arrow-left {
        border-color: black;
        padding: 0.5em;
      }
    }
    .next-arrow {
      position: absolute;
      float: right;
      right: 1em;
      top: 50%;
      transform: translate(0, -50%);
      -o-transform: translate(0, -50%);
      -ms-transform: translate(0, -50%);
      -webkit-transform: translate(0, -50%);
      .arrow-right {
        border-color: black;
        padding: 0.5em;
      }
    }
  }
}
</style>
