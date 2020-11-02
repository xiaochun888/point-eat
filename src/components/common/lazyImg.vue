<template>
  <img ref="img" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
export default {
  name: 'lazy-img',
  props: {
    src: { type: String, required: true },
    srcset: { type: String, default: null },
    delay: { type: Number, default: 0 }
  },
  data() {
    return {
      timer: null,
      observer: null
    };
  },
  methods: {
    observe () {
      if ('IntersectionObserver' in window) {
        this.observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.load();
              this.unobserve();
            }
          });
        });
        this.observer.observe(this.$refs.img);
      } else {
        this.load();
      }
    },
    unobserve () {
      if (this.observer) {
        this.observer.unobserve(this.$refs.img);
      }
    },
    load () {
      this.$nextTick(() => {
        const img = this.$refs.img;
        this.timer = setTimeout(() => {
          img.src = this.src;
          if (this.srcset) {
            img.srcset = this.srcset;
          }
          this.timer = null;
        }, this.delay);
      });
    }
  },
  mounted () {
    this.observe();
  },
  beforeDestroy () {
    if(this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.unobserve();
    if(this.observer) {
      this.observer.disconnect();
      delete this.observer;
      this.observer = null;
    }
  }
};
</script>
