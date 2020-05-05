<template lang="html">
  <div class="slim-scroll" :class='{"webkit-scroll":iOSSafari && scrollable}'>
    <slot></slot>
  </div>
</template>

<script lang="js">
/**
 * automatically load jquery in webpack and declare in ESLint.
 */
// import $ from 'jquery';
import '@/assets/js/jquery.slimscroll.js';

export default {
  name: 'slimScroll',
  props: {
    /* http://rocha.la/jQuery-slimScroll
    *  https://github.com/lanre-ade/jQuery-slimScroll
    */
    axis:{
      type: String,
      default: 'y'
    },
    size:{
      type: String,
      default: '3px'
    },
    height:{
      type: String,
      default: '100%'
    },
    color:{
      type: String,
      default: '#000000'
    },
    alwaysVisible:{
      type:Boolean,
      default: false
    },
    scrollable:{
      type:Boolean,
      default: true
    },
    touchScrollStep:{
      type:Number,
      default: 0.2
    },
    wheelStep:{
      type:Number,
      default: 3
    }
  },
  data() {
    return {
      delta: 0
    };
  },
  mounted() {
    if(!this.iOSSafari) {
      if(this.scrollable) {
        /**preventDefault() prevents click events. */
        $(this.$el).slimScroll({
          height: this.height,
          width: '100%',
          color: this.color,
          alwaysVisible: this.alwaysVisible,
          allowPageScroll: true,
          railVisible: false,
          size: this.size,
          axis: this.axis,
          touchScrollStep: this.touchScrollStep,
          wheelStep: this.wheelStep
        }).bind('slimscrollingY', (e, delta) => {
          this.$emit('delta', e, delta);
          if(this.delta != delta) {
            this.delta = delta;
          } else {
            console.log('slimscrollingY', delta, delta == 0 ? 'top' : 'bottom');
            this.$emit(delta == 0 ? 'top' : 'bottom', e, delta);
          }
        });
      } else {
        $(this.$el).slimScroll({destroy: true});
      }
    }
  },
  computed: {
    iOSSafari() {
      return (navigator.userAgent.match(/Mac OS X.*Safari/i));
    }
  },
  beforeDestroy() {
    /**$el should not be called in console.log to avoid a leak of memory. */
    console.log('beforeDestroy');
    if(!this.iOSSafari) {
      $(this.$el).slimScroll({destroy: true});
    }
  }
};
</script>

<style scoped lang="scss">
.webkit-scroll {
  /**safari on iOS */
  height: 100%;
  width: 100%;
  overflow: scroll !important;
  -webkit-overflow-scrolling: touch !important;

  ::-webkit-scrollbar {
    width: 3px;
    -webkit-appearance: none;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 10;
    -webkit-border-radius: 10;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 10;
    -webkit-border-radius: 10;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
}
</style>
