<template lang="html">
  <div class="click-popover">
    <div @click="onClickHead($event)" class="click-popover-head square-radius select-option" id="click-popover-head" ref="head">
      <slot name="head"></slot>
    </div>
    <div v-if="isBodyShown && hasBody" class="click-popover-content">
      <div class="click-popover-content-body square-radius box-shadow" @click="onClickBody($event)" id="click-popover-content-body" :style="bodyStyle">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { closest } from '@/assets/js/app.utility.js';

export default {
  name: 'click-popover',
  props: {
    multiselect:{
      type: Boolean,
      default: false
    },
    bodyStyle:{
      type: String,
      default: 'width: 100%;'
    }
  },
  data() {
    return {
      isBodyShown: false,
      hasBody: false
    };
  },
  mounted() {
    this.hasBody = !!this.$slots.body;
    document.addEventListener('click', this.onClickDocument, false);
  },
  beforeDestroy() {
    console.log('beforeDestroy');
    document.removeEventListener('click', this.onClickDocument, false);
  },
  methods: {
    onClickHead(event) {
      console.log('onClickHead');
      /**Here keeps event propaged to decendant into onClickDocument()*/
      if(!this.isBodyShown) {
        /**menuSlides.vue */
        event.visible = true;
        this.$emit('focus', event);
      }
      this.isBodyShown = !this.isBodyShown;
    },
    onClickBody(event) {
      console.log('onClickBody');
      /**no other event decendant*/
      event.stopPropagation();

      if(!this.multiselect) {
        this.isBodyShown = !this.isBodyShown;
      }
    },
    onClickDocument(event) {
      /**no other event decendant*/
      event.stopPropagation();

      const target = event.target || event.srcTarget || event.srcElement;
      const selector = '#click-popover-head';
      const element = target.closest ? target.closest(selector) : closest(target, selector);

      if(this.$refs.head != element) {
        this.isBodyShown = false;
        event.visible = false;
        this.$emit('blur', event);
      }
    }
  }
};
</script>

<style scoped lang="scss">
  .click-popover {
    width: 100%;
    height: 100%;
    .square-radius {
      border-radius: 4px; /** compared to font Comic Sans MS */
      -o-border-radius: 4px;
      -ms-border-radius: 4px;
      -moz-border-radius: 4px;
      -webkit-border-radius: 4px;
    }
    .box-shadow {
      box-shadow: 0.1em 0.1em 0.3em rgba(0, 0, 0, .5);
      -o-box-shadow: 0.1em 0.1em 0.3em rgba(0, 0, 0, .5);
      -moz-box-shadow: 0.1em 0.1em 0.3em rgba(0, 0, 0, .5);
      -webkit-box-shadow: 0.1em 0.1em 0.3em rgba(0, 0, 0, .5);
      -webkit-transition: all 0.1s;
      -moz-transition: all 0.1s;
      -o-transition: all 0.1s;
      transition: all 0.1s;
    }
    .select-option:hover {
      cursor: pointer;
      color: #fff;
      background-color: #ddd;
    }
    .select-option:active:hover {
      color:#fff;
      border-color: #666;
      background-color: #666;
    }

    &-head {
      width: 100%;
      height: 100%;
      background-color: #fff;
      text-align: center;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      border: 1px solid #aaa;
    }
    &-content {
      width: 100%;
      /** attach to current popover-head*/
      position: relative;
      &-body {
        min-width: 100%;
        position: absolute;
        z-index: 1001; /** > simple-sidebar z-index*/
        background-color: #fff;
        overflow: hidden;
        border: 1px solid #aaa;
      }
    }
  }
</style>
