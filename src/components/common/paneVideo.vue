<template lang="html">
  <div class="pane-video" @click="onClick">
    <video class="video" ref="video" v-bind="$attrs" v-on="$listeners">
      <source v-for="(source, key) in sources" :key="key" :src="source.src" :type="source.type" />
      <span>Your browser does not support the video.</span>
    </video>
    <span :class="iconClass"></span>
    <div v-if="hasPane" class="pane inherit-radius" :class="{hidden:!ended}">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="js">

export default {
  name: 'pane-video',
  props: {
    sources: Array
  },
  data () {
    return {
      video: null,
      paused: true,
      ended: true
    };
  },
  computed: {
    iconClass: {
      get: function() {
        const stopped = this.paused || this.ended;
        return {
          'animated fadeOut icon-pause': !stopped,
          'icon-play': stopped,
          'ended': this.ended && this.hasPane
        };
      }
    },
    hasPane: {
      get: function() {
        return this.$slots.default && this.$slots.default.length > 0;
      }
    }
  },
  mounted() {
    this.video = this.$refs.video;
    this.video.addEventListener('ended', this.onEnded, false);
    if(this.video.autoplay) {
      document.addEventListener('click', this.onClick, false);
    }
  },
  methods: {
    onClick() {
      if(this.video.autoplay) {
        document.removeEventListener('click', this.onClick, false);
      }

      if(this.video.paused || this.video.ended) {
        this.video.play();
      } else {
        this.video.pause();
      }
      this.paused = this.video.paused;
      this.ended = this.video.ended;
    },
    onEnded () {
      this.paused = true;
      this.ended = true;
    }
  },
  beforeDestroy () {
    this.video.removeEventListener('ended', this.onEnded, false);
  }
};
</script>
<style scoped lang="scss">
.pane-video {
    position: relative;
    width: 100%;
    height: 100%;
    .video {
      width: 100%;
      height: 100%;
      // object-fit: cover;
    }
    span {
      /* centered */
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      color: white;
    }
    span[class~="ended"] {
      opacity: 0.2;
      color:black;
    }
    .pane {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      right: 0;
      opacity: 1;
      background: white;

      -webkit-transition: all 1s ease, transform 0s;
      -moz-transition: all 1s ease, transform 0s;
      -o-transition: all 1s ease, transform 0s;
      transition: all 1s ease, transform 0s;
    }
    .pane[class~="hidden"] {
      width: 0;
      opacity: 0;
    }
}
</style>
