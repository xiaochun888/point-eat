<template lang="html">
    <div class="slide">
      <div class="slide-head"><slot name="head"></slot></div>
      <div class="slide-body"><slot></slot></div>
      <div class="slide-foot"><slot name="foot"></slot></div>
    </div>
</template>

<script lang="js">
export default {
  name: 'slide',
  methods: {
    ellipsizeTextBox(id) {
      let el = document.getElementById(id);
      let wordArray = el.innerHTML.split(' ');
      while(el.scrollHeight > el.offsetHeight) {
        wordArray.pop();
        el.innerHTML = wordArray.join(' ') + '...';
      }
    }
  }
};
</script>
<style scoped lang="scss">
.slide {
  width: 100%;
  height: 100%;
  & div {
    width: 100%;
  }
  &-head {
    height: 2rem;
    font-size: 1.2em;
    text-align: center;
  }
  &-body {
    height: calc(100% - 2rem);//head + foot
    font-size: 0.9em;
    padding: 1em;
  }
  &-foot {
    height: 0;
  }
}
</style>
