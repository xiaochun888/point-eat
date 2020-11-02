<template>
  <div :class="classes" :style="style" ref="dragHandle">
    <slot></slot>
    <div class="resize-handle" ref="resizeHandle"></div>
  </div>
</template>

<style>
.grid-box {
  position: absolute;
  z-index: 1;
  box-sizing: border-box;
}

.grid-box.dragging,
.grid-box.resizing {
  z-index: 2;
  opacity: 0.7;
}

.grid-box:not(.dragging):not(.resizing) {
  transition: top ease-out 0.1s, left ease-out 0.1s, width ease-out 0.1s, height ease-out 0.1s;
}

.grid-box .resize-handle {
  position: absolute;
  right: -5px;
  bottom: -5px;
  width: 15px;
  height: 15px;
  cursor: se-resize;
}
</style>

<script>
export default {
  name: 'gridBox',
  props: {
    boxId: {
      required: true
    },
    boxGrid: {
      type: Object,
      required: false,
      default() {
        return {
          w: 1, /** in grid */
          h: 1 /** in grid */
        };
      }
    },
    dragSelector: {
      type: String,
      default: '*'
    },
    displayed: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      /**07/05/2020 avoid mouseup after touching */
      touching: false,
      dragging: false,
      resizing: false,
      dragElements: [],
      dragEvent: null,
      resizeEvent: null
    };
  },
  computed: {
    style() {
      if (this.$parent.isBoxVisible(this.boxId)) {
        var pixelPosition = this.$parent.getPixelPositionById(this.boxId);
        return {
          display: this.displayed ? 'block' : 'none',
          width: pixelPosition.w + 'px',
          height: pixelPosition.h + 'px',
          left: pixelPosition.x + 'px',
          top: pixelPosition.y + 'px'
        };
      }
      /**placeholder.hidden=true when dragEnd, resizeEnd */
      return {
        display: 'none'
      };
    },
    classes() {
      return {
        'grid-box': true,
        dragging: this.dragging,
        resizing: this.resizing
      };
    }
  },
  mounted() {
    console.log('mounted gridBox', this.boxId);
    // register component on parent
    this.$parent.registerBox(this);

    // moving
    this.$dragHandle = this.$el || this.$refs.dragHandle;
    this.dragElements = this.$dragHandle.querySelectorAll(this.dragSelector);

    this.dragEvent = evt => {
      let matched = false;
      for(var i = 0; i < this.dragElements.length; i++) {
        if(this.dragElements[i].contains(evt.target)) {
          matched = true;
          break;
        }
      }
      if(!matched) return;
      /**26/05/2020 avoid mouseup after touching. */
      const touching = (evt.type == 'touchstart');
      if(this.touching && !touching) {
        this.touching = touching;
        return;
      } else this.touching = touching;

      this.dragging = true;
      this.$emit('dragStart');
      let mouseX = evt.clientX || evt.touches[0].pageX;
      let mouseY = evt.clientY || evt.touches[0].pageY;

      const handleMouseUp = evt => {
        /**26/05/2020 avoid mouseup in touching. */
        if(touching) {
          window.removeEventListener('touchend', handleMouseUp, true);
          window.removeEventListener('touchmove', handleMouseMove, true);
        } else {
          window.removeEventListener('mouseup', handleMouseUp, true);
          window.removeEventListener('mousemove', handleMouseMove, true);
        }

        this.dragging = false;

        const offset = {
          x: (evt.clientX || evt.changedTouches[0].pageX) - mouseX,
          y: (evt.clientY || evt.changedTouches[0].pageY) - mouseY
        };
        /** set sensibility of click to 5px */
        const clicking = Math.abs(offset.x) < 5 && Math.abs(offset.y) < 5;
        console.log('dragEnd', offset, 'clicking=', clicking);
        this.$emit('dragEnd', { offset, clicking: clicking });
      };

      const handleMouseMove = evt => {
        const offset = {
          x: (evt.clientX || evt.touches[0].pageX) - mouseX,
          y: (evt.clientY || evt.touches[0].pageY) - mouseY
        };
        const clicking = Math.abs(offset.x) < 5 && Math.abs(offset.y) < 5;
        console.log('dragUpdate', offset, 'clicking=', clicking);
        this.$emit('dragUpdate', { offset, clicking: clicking, target: evt.target });
      };

      /**26/05/2020 avoid mouseup after touching. */
      if(touching) {
        window.addEventListener('touchend', handleMouseUp, true);
        window.addEventListener('touchmove', handleMouseMove, true);
      } else {
        window.addEventListener('mouseup', handleMouseUp, true);
        window.addEventListener('mousemove', handleMouseMove, true);
      }
    };
    this.$dragHandle.addEventListener('touchstart', this.dragEvent);
    this.$dragHandle.addEventListener('mousedown', this.dragEvent);

    // resizing
    this.$resizeHandle = this.$refs.resizeHandle;
    if (this.$resizeHandle) {
      this.resizeEvent = evt => {
        evt.preventDefault();
        evt.stopPropagation();
        /**26/05/2020 avoid mouseup after touching. */
        const touching = (evt.type == 'touchstart');
        if(this.touching && !touching) {
          this.touching = false;
          return;
        } else this.touching = touching;

        this.resizing = true;
        this.$emit('resizeStart');
        let mouseX = evt.clientX || evt.touches[0].pageX;
        let mouseY = evt.clientY || evt.touches[0].pageY;

        const handleMouseUp = evt => {
          /**26/05/2020 avoid mouseup after touching. */
          if(touching) {
            window.removeEventListener('touchend', handleMouseUp, true);
            window.removeEventListener('touchmove', handleMouseMove, true);
          } else {
            window.removeEventListener('mouseup', handleMouseUp, true);
            window.removeEventListener('mousemove', handleMouseMove, true);
          }

          this.resizing = false;

          var offset = {
            x: (evt.clientX || evt.changedTouches[0].pageX) - mouseX,
            y: (evt.clientY || evt.changedTouches[0].pageY) - mouseY
          };
          this.$emit('resizeEnd', { offset });
        };

        const handleMouseMove = evt => {
          var offset = {
            x: (evt.clientX || evt.touches[0].pageX) - mouseX,
            y: (evt.clientY || evt.touches[0].pageY) - mouseY
          };
          this.$emit('resizeUpdate', { offset });
        };

        /**26/05/2020 avoid mouseup after touching. */
        if(touching) {
          window.addEventListener('touchend', handleMouseUp, true);
          window.addEventListener('touchmove', handleMouseMove, true);
        } else {
          window.addEventListener('mouseup', handleMouseUp, true);
          window.addEventListener('mousemove', handleMouseMove, true);
        }
      };

      this.$resizeHandle.addEventListener('touchstart', this.resizeEvent);
      this.$resizeHandle.addEventListener('mousedown', this.resizeEvent);
    }
  },
  beforeDestroy() {
    console.log('beforeDestroy gridBox');
    this.$dragHandle.removeEventListener('touchstart', this.dragEvent);
    this.$dragHandle.removeEventListener('mousedown', this.dragEvent);
    this.$resizeHandle.removeEventListener('touchstart', this.resizeEvent);
    this.$resizeHandle.removeEventListener('mousedown', this.resizeEvent);
  },
  destroyed() {
    console.log('destroyed gridBox');
    this.$parent.unregisterBox(this);
  }
};
</script>
