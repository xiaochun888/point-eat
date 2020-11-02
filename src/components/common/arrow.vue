<template>
<div class="arrow border-box flex-center">
  <div :class="{'arrow-left': dir=='left', 'arrow-right': dir=='right'}"></div>
</div>
</template>
<script lang="js">
export default {
  name: 'arrow',
  props: {
    dir: {
      type: String,
      default: 'left'
    }
  }
};
</script>
<style scoped lang="scss">
.arrow {
  /**square */
  width: 2em;
  height: 2em;
  border: 5px solid transparent;
  background: transparent;

  /**circle */
  border-radius: 50%;
  -o-border-radius: 50%;
  -ms-border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;

  /**arrows */
  &-left,
  &-right {
    border: solid black;
    border-width: 0 0.2em 0.2em 0;
    display: inline-block;
    padding: 0.3em;
  }
  &-right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  &-left {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }

  /**shadow */
  &:hover {
    background-color: white;
    border-color: white;
    .arrow-left, .arrow-right {
      border-color: black;
    }
    &:active {
      background-color: #666;
      border-color: transparent;
      .arrow-left, .arrow-right {
        border-color: white;
      }
    }
  }
}
</style>
