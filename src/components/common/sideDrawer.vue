<template lang="html">
<div class="side-drawer" :class="[right?'right':'left', {'unbox': unbox}]">
  <div class="side-drawer-box">
    <div class="side-drawer-box-body">
      <slot name="cover"></slot>
    </div>
    <div class="side-drawer-box-pull" :class="['pull', right?'left':'right']" @click="onToggle">
      <slot name="box-pull"></slot>
    </div>
  </div>
  <slot></slot>
  <div class="side-drawer-pull" :class="['pull', right?'right':'left']" @click="onToggle">
    <slot name="pull"></slot>
  </div>
</div>
</template>

<script lang="js">
export default {
  name: 'side-drawer',
  props: {
    right:{
      type: Boolean,
      default: false
    },
    open:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      unbox: this.open
    };
  },
  methods: {
    onToggle() {
      this.unbox = !this.unbox;
    }
  }
};
</script>

<style scoped lang="scss">
.side-drawer {
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  &-box {
    position: absolute;
    display: block;
    overflow: hidden;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: white;
    -webkit-transition: all 1s ease, transform 0s;
    -moz-transition: all 1s ease, transform 0s;
    -o-transition: all 1s ease, transform 0s;
    transition: all 1s ease, transform 0s;
    z-index: 2;
    &-body {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  /**boxing */
  /**from left */
  &.left {
    .side-drawer {
      &-box {
        left: 0;
        &-pull {
          right: 0;
        }
      }
      &-pull {
        left: 0;
        opacity: 0;
      }
    }
  }
  /**from right */
  &.right {
    .side-drawer {
      &-box {
        right: 0;
        &-pull {
          left: 0;
        }
      }
      &-pull {
        right: 0;
        opacity: 0;
      }
    }
  }

  /**unboxed */
  &.unbox > &-box {
    width: 0;
  }
  &.unbox > &-pull {
    opacity: 1;
  }

  .pull {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    -o-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -webkit-transform: translateY(-50%);

    display: inline-block;
    cursor: pointer;
    -webkit-transition: all 1.5s ease;
    -moz-transition: all 1.5s ease;
    -o-transition: all 1.5s ease;
    transition: all 1.5s ease;

    width: 1.5em;
    height: 3em;
    line-height: 3em;
    text-align: center;
    vertical-align: text-top;
    border-style: solid;
    border-width: 0.15em;
    color: #fff;
    border-color: #aaa;
    background-color: #bbb;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .pull[class~="left"] {
    border-radius: 0 1.5em 1.5em 0;
    -o-border-radius: 0 1.5em 1.5em 0;
    -ms-border-radius: 0 1.5em 1.5em 0;
    -moz-border-radius: 0 1.5em 1.5em 0;
    -webkit-border-radius: 0 1.5em 1.5em 0;
  }
  .pull[class~="right"] {
    border-radius: 1.5em 0 0 1.5em;
    -o-border-radius: 1.5em 0 0 1.5em;
    -ms-border-radius: 1.5em 0 0 1.5em;
    -moz-border-radius: 1.5em 0 0 1.5em;
    -webkit-border-radius: 1.5em 0 0 1.5em;
  }
  .pull:hover {
    color: #fff;
    background-color: #ddd;
  }
  .pull:active:hover {
    /* mouse down */
    border-color: #fff;
    -webkit-transition: all 0.1s ease;
    -moz-transition: all 0.1s ease;
    -o-transition: all 0.1s ease;
    transition: all 0.1s ease;
  }
}
</style>
