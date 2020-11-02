<template>
  <div ref="div" v-bind="$attrs" v-on="$listeners" :class="divClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'lazy-div',
  props: {
    cls: { type: String },
    delay: { type: Number, default: 0 }
  },
  methods: {
    observe () {
      if ('IntersectionObserver' in window) {
        this.$observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.load();
              this.unobserve();
            }
          });
        });
        this.$observer.observe(this.$refs.div);
      } else {
        this.load();
      }
    },
    unobserve () {
      if (this.$observer) {
        this.$observer.unobserve(this.$refs.div);
      }
    },
    load () {
      this.$nextTick(() => {
        setTimeout(() => {
          this.loading = true;
          this.$emit('load');
        }, this.delay);
      });
    }
  },
  data () {
    return {
      loading: false
    };
  },
  computed: {
    divClass() {
      const cls = {};
      cls[this.cls] = this.loading;
      return cls;
    }
  },
  mounted () {
    this.observe();
  },
  beforeDestroy () {
    this.unobserve();
  }
};
</script>
