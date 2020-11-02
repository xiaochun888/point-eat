<template>
    <div class="grid-container" :style="style">
        <slot></slot>
        <box class="placeholder" :class="classes" boxId="::placeholder::"></box>
    </div>
</template>

<style>
.grid-container {
  position: relative;
  transition: min-width ease-out 0.1s, min-height ease-out 0.1s;
  width: 100%;
  height: 100%;
}

.grid-container .grid-box.placeholder {
  background: none;
  z-index: 0;
}
.grid-container .grid-box.placeholder:not(.clicking) {
  border: 1px dashed #000;
  box-sizing: border-box;
}

.grid-container .grid-box.placeholder {
  transition: none !important;
}
</style>

<script>
import Box from './gridBox';
import * as utils from './utils';

/** https://github.com/dattn/dnd-grid
 * register box -> mounted -> visible
 * grid + margin = unit *<-- box *<-- container
 */
export default {
  name: 'grid-container',
  components: {
    Box
  },
  props: {
    layout: {
      type: Array,
      required: true
    },
    gridSize: {
      type: Object,
      default() {
        return {
          w: 100,
          h: 100
        };
      }
    },
    margin: {
      type: Number,
      default: 5
    },
    outerMargin: {
      type: Object,
      default() {
        return {
          x: 0,
          y: 0
        };
      }
    },
    bubbleUp: {
      type: Boolean,
      default: false
    },
    bottomed: {
      type: Boolean,
      default: false
    },
    fixLayoutOnLoad: {
      type: Boolean,
      required: false,
      default: true
    },
    visible: {
      type: Boolean,
      default: true
    },
    pinned: {
      type: Boolean,
      default: false
    },
    /**pause time for resizing in order to wait for the end of parent's resizing */
    endTime: {
      type: Number,
      default: 100 /**ms */
    }
  },
  data() {
    return {
      placeholder: {
        hidden: true,
        position: {
          x: 0,
          y: 0,
          w: 1,
          h: 1
        }
      },
      clicking: true,
      dragging: {
        boxLayout: null,
        offset: {
          x: 0,
          y: 0
        }
      },
      resizing: {
        boxLayout: null,
        offset: {
          x: 0,
          y: 0
        }
      },
      fontSize: 16,
      cache:{
        clientSize: {
          width: 0,
          height: 0
        }
      }
    };
  },
  watch: {
    layout(newLayout) {
      if (this.fixLayoutOnLoad) {
        if (utils.layoutHasCollisions(newLayout)) {
          this.updateLayout(utils.fixLayout(newLayout, this.bubbleUp));
        }
      }
    }
  },
  created: function () {
    this.resizeEnd = utils.newDebounce(() => {
      this.setClientSize();
      this.createAllLayout();
    }, this.endTime);
  },
  mounted() {
    console.log('mounted grid-container');

    this.setClientSize();
    this.cleanLayout();
    this.createLayoutByBox(...this.$children);
    window.addEventListener('resize', this.resizeEnd);
  },
  beforeDestroy() {
    console.log('beforeDestroy grid-container');
    this.placeholder = null;
    window.removeEventListener('resize', this.resizeEnd);
  },
  computed: {
    bodyStyle: {
      get: function() {
        /**calculate font size by view port */
        return window.getComputedStyle(document.body) || document.body.currentStyle;
      }
    },
    cellSize() {
      console.log('cellSize');
      /**reactive in style() */
      this.fontSize = parseFloat(this.bodyStyle.fontSize);
      return {
        width: this.adjust(this.gridSize.w),
        height: this.adjust(this.gridSize.h),
        margin: this.adjust(this.margin),
        outerMargin: {
          x: this.outerMargin.x,
          y: this.outerMargin.y
        }
      };
    },
    clientSize: {
      get: function() {
        return this.cache.clientSize;
      },
      set: function(value) {
        this.cache.clientSize = value;
      }
    },
    clientGrid() {
      /**avoid an error of font size during resizing and moving.*/
      this.fontSize = parseFloat(this.bodyStyle.fontSize);
      return {
        w: (this.clientSize.width + this.cellSize.margin) / (this.cellSize.width + this.cellSize.margin),
        h: (this.clientSize.height + this.cellSize.margin) / (this.cellSize.height + this.cellSize.margin),
        outerMargin: {
          x: this.cellSize.outerMargin.x / (this.cellSize.width + this.cellSize.margin),
          y: this.cellSize.outerMargin.y / (this.cellSize.height + this.cellSize.margin)
        }
      };
    },
    display() {
      console.log('display');
      /**here adds or removes a box in silence */
      if(this.visible) {
        if(this.setClientSize()) {
          if(this.clientResized()) {
            console.log('display resized');
            this.createAllLayout();
          } else {
            this.cleanLayout();
            this.createLayoutByBox(...this.$children);
            console.log('display cleaned to add a box');
          }
        } else {
          /**wait a tick for the first view */
          this.$nextTick(() => {
            /**make style reactive */
            this.setClientSize();
            console.log('display() retryed to get clientWidth');
          });
        }
      }
      return this.visible;
    },
    style() {
      const layoutSize = utils.getLayoutSize(this.layout);
      return {
        minWidth:
          layoutSize.w * this.cellSize.width +
          (layoutSize.w - 1) * this.cellSize.margin +
          2 * this.cellSize.outerMargin.x +
          'px',
        minHeight:
          layoutSize.h * this.cellSize.height +
          (layoutSize.h - 1) * this.cellSize.margin +
          2 * this.cellSize.outerMargin.y +
          'px',
        /**render reative on display */
        display: this.display ? 'block' : 'none'
      };
    },
    classes() {
      return {
        clicking: this.clicking
      };
    },
    pinnedLayout() {
      return this.layout.filter(boxLayout => {
        return boxLayout.pinned;
      });
    }
  },
  methods: {
    clientResized() {
      if(this.layout.length) {
        return this.clientSize.width != this.layout[0].clientWidth;
      }
      return false;
    },
    adjust(pixels) {
      return pixels * this.fontSize / 16;
    },
    setClientSize() {
      /**Here is this.$el.parentNode.clientWidth because this.$el has a position relative and width 100%,
       * this.$el.clientWidth is correct only after resizing.
      */
      console.log('setClientSize');
      if(this.$el && this.$el.parentNode && this.$el.parentNode.clientWidth) {
        this.cache.clientSize = {
          width: this.$el.parentNode.clientWidth,
          height: this.$el.parentNode.clientHeight
        };
      }
      return this.cache.clientSize.width > 0;
    },
    getBoxLayoutById(id) {
      if (id === '::placeholder::') {
        return this.placeholder;
      }
      return this.layout.find(box => {
        return box.id === id;
      });
    },
    getPixelPositionById(id) {
      if (this.dragging.boxLayout && this.dragging.boxLayout.id === id) {
        let pixels = utils.positionToPixels(
          this.dragging.boxLayout.position,
          this.cellSize,
          this.cellSize.margin,
          this.cellSize.outerMargin
        );
        pixels.x += this.dragging.offset.x;
        pixels.y += this.dragging.offset.y;
        return pixels;
      }

      if (this.resizing.boxLayout && this.resizing.boxLayout.id === id) {
        let pixels = utils.positionToPixels(
          this.resizing.boxLayout.position,
          this.cellSize,
          this.cellSize.margin,
          this.cellSize.outerMargin
        );
        pixels.w += this.resizing.offset.x;
        pixels.h += this.resizing.offset.y;
        return pixels;
      }

      var boxLayout = this.getBoxLayoutById(id);
      return utils.positionToPixels(
        boxLayout.position,
        this.cellSize,
        this.cellSize.margin,
        this.cellSize.outerMargin
      );
    },
    isBoxVisible(id) {
      var boxLayout = this.getBoxLayoutById(id);
      return boxLayout && !boxLayout.hidden;
    },
    getPositionByPixel(x, y) {
      return {
        x: Math.round(x / (this.cellSize.width + this.cellSize.margin)),
        y: Math.round(y / (this.cellSize.height + this.cellSize.margin))
      };
    },
    registerBox(box) {
      console.log('gridBox registerBox');
      /**box.$props.boxId is incorrect so do nothing with*/
      this.enableResizing(box);
      this.enableDragging(box);
      /**box mounted */
      this.createLayoutByBox(...this.$children);
      this.$emit('createBox');
    },
    unregisterBox(box) {
      console.log('gridBox unregisterBox');
      /**box.$props.boxId is incorrect so do nothing with*/
      /**box.$destroy() triggers the beforeDestroy and destroyed hooks.*/
      box.$destroy();
      this.cleanLayout();
      /**MUST not update layout to avoid leak of memory */
      this.$emit('deleteBox');
    },
    enableDragging(box) {
      var initialLayout;
      var isDragging = false;

      box.$on('dragStart', () => {
        var boxLayout = this.getBoxLayoutById(box.boxId);
        if (boxLayout.pinned) {
          return;
        }
        this.clicking = true;
        isDragging = true;

        // find box
        this.dragging.boxLayout = boxLayout;
        this.placeholder = {
          ...this.dragging.boxLayout
        };

        // clone layout
        initialLayout = utils.sortLayout(this.layout);
      });

      box.$on('dragUpdate', evt => {
        if (!isDragging) {
          return;
        }
        this.clicking = evt.clicking;

        this.dragging.offset.x = evt.offset.x;
        this.dragging.offset.y = evt.offset.y;

        var moveBy = this.getPositionByPixel(evt.offset.x, evt.offset.y);
        const maxMoveBy = {
          x: this.clientGrid.w - this.dragging.boxLayout.position.w,
          y: this.clientGrid.h - this.dragging.boxLayout.position.h
        };

        if((this.dragging.boxLayout.position.x + moveBy.x) > maxMoveBy.x) {
          moveBy.x = maxMoveBy.x - this.dragging.boxLayout.position.x - 2 * this.clientGrid.outerMargin.x;
        } else {
          let rest = this.dragging.boxLayout.position.x % 1;
          moveBy.x = moveBy.x - rest;
        }
        if(this.bottomed) {
          if((this.dragging.boxLayout.position.y + moveBy.y) > maxMoveBy.y) {
            moveBy.y = maxMoveBy.y - this.dragging.boxLayout.position.y - 2 * this.clientGrid.outerMargin.y;
          }
        }
        if (!utils.isFree(this.pinnedLayout, {
          ...this.dragging.boxLayout.position,
          x: this.dragging.boxLayout.position.x + moveBy.x,
          y: this.dragging.boxLayout.position.y + moveBy.y
        })) {
          return;
        }

        let newX = Math.max(0, this.dragging.boxLayout.position.x + moveBy.x);
        let newY = Math.max(0, this.dragging.boxLayout.position.y + moveBy.y);

        // check if box has moved
        if (
          this.placeholder.position.x == newX &&
          this.placeholder.position.y == newY
        ) {
          return;
        }
        this.placeholder = utils.updateBoxPosition(this.placeholder, {
          x: newX,
          y: newY
        });

        var newLayout = [this.placeholder];
        initialLayout.forEach(boxLayout => {
          if (boxLayout.id === this.dragging.boxLayout.id) {
            return;
          }
          newLayout.push(
            utils.moveBoxToFreePlace(newLayout, boxLayout, this.bubbleUp)
          );
        });
        if (this.bubbleUp) {
          newLayout = utils.layoutBubbleUp(newLayout);
          this.placeholder = newLayout.find(boxLayout => {
            return boxLayout.id === this.dragging.boxLayout.id;
          });
        }
        console.assert(this.placeholder.hidden == false, this.placeholder.id, 'should not be hidden after dragUpdate.');
        this.updateLayout(newLayout);
      });

      box.$on('dragEnd', evt => {
        if (!isDragging) {
          return;
        }
        this.clicking = evt.clicking;

        var moveBy = this.getPositionByPixel(evt.offset.x, evt.offset.y);
        const maxMoveBy = {
          x: this.clientGrid.w - this.dragging.boxLayout.position.w,
          y: this.clientGrid.h - this.dragging.boxLayout.position.h
        };

        if((this.dragging.boxLayout.position.x + moveBy.x) > maxMoveBy.x) {
          moveBy.x = maxMoveBy.x - this.dragging.boxLayout.position.x - 2 * this.clientGrid.outerMargin.x;
        } else {
          let rest = this.dragging.boxLayout.position.x % 1;
          moveBy.x = moveBy.x - rest;
        }
        if(this.bottomed) {
          if((this.dragging.boxLayout.position.y + moveBy.y) > maxMoveBy.y) {
            moveBy.y = maxMoveBy.y - this.dragging.boxLayout.position.y - 2 * this.clientGrid.outerMargin.y;
          }
        }
        if (
          utils.isFree(this.pinnedLayout, {
            ...this.dragging.boxLayout.position,
            x: this.dragging.boxLayout.position.x + moveBy.x,
            y: this.dragging.boxLayout.position.y + moveBy.y
          })
        ) {
          this.placeholder = utils.updateBoxPosition(this.placeholder, {
            x: Math.max(0, this.dragging.boxLayout.position.x + moveBy.x),
            y: Math.max(0, this.dragging.boxLayout.position.y + moveBy.y)
          });
        }

        this.dragging.boxLayout = utils.updateBoxPosition(
          this.dragging.boxLayout,
          {
            x: this.placeholder.position.x,
            y: this.placeholder.position.y
          }
        );

        var newLayout = [this.dragging.boxLayout];
        initialLayout.forEach(boxPosition => {
          if (boxPosition.id === this.dragging.boxLayout.id) {
            return;
          }
          newLayout.push(
            utils.moveBoxToFreePlace(newLayout, boxPosition, this.bubbleUp)
          );
        });
        if (this.bubbleUp) {
          newLayout = utils.layoutBubbleUp(newLayout);
        }
        this.updateLayout(newLayout);

        this.dragging.boxLayout = null;
        this.dragging.offset.x = 0;
        this.dragging.offset.y = 0;

        this.placeholder.hidden = true;
        isDragging = false;
      });
    },
    enableResizing(box) {
      var initialLayout;
      var isResizing = false;

      box.$on('resizeStart', () => {
        var boxLayout = this.getBoxLayoutById(box.boxId);
        if (boxLayout.pinned) {
          return;
        }
        this.clicking = false;
        isResizing = true;

        // find box
        this.resizing.boxLayout = boxLayout;
        this.placeholder = {
          ...this.resizing.boxLayout
        };

        // clone layout
        initialLayout = utils.sortLayout(this.layout);
      });

      box.$on('resizeUpdate', evt => {
        if (!isResizing) {
          return;
        }
        this.resizing.offset.x = evt.offset.x;
        this.resizing.offset.y = evt.offset.y;

        var resizeBy = this.getPositionByPixel(evt.offset.x, evt.offset.y);
        const maxResizeBy = {
          x: this.clientGrid.w - this.resizing.boxLayout.position.w
          // y: this.clientGrid.h - this.resizing.boxLayout.position.h,
        };

        if((this.resizing.boxLayout.position.x + resizeBy.x) > maxResizeBy.x) {
          resizeBy.x = maxResizeBy.x - this.resizing.boxLayout.position.x - 2 * this.clientGrid.outerMargin.x;
        } else {
          let rest = this.resizing.boxLayout.position.w % 1;
          resizeBy.x = resizeBy.x - rest;
        }
        if(this.bottomed) {
          if((this.resizing.boxLayout.position.y + resizeBy.y) > this.clientGrid.h) {
            resizeBy.y = this.clientGrid.h - this.resizing.boxLayout.position.y - 2 * this.clientGrid.outerMargin.y;
          }
        }
        if (
          !utils.isFree(this.pinnedLayout, {
            ...this.resizing.boxLayout.position,
            w: this.resizing.boxLayout.position.w + resizeBy.x,
            h: this.resizing.boxLayout.position.h + resizeBy.y
          })
        ) {
          return;
        }

        let newW = Math.max(1, this.resizing.boxLayout.position.w + resizeBy.x);
        let newH = Math.max(1, this.resizing.boxLayout.position.h + resizeBy.y);
        // check if box has moved
        if (
          this.placeholder.position.w == newW &&
          this.placeholder.position.h == newH
        ) {
          return;
        }
        this.placeholder = utils.updateBoxPosition(this.placeholder, {
          x: this.resizing.boxLayout.position.x,
          y: this.resizing.boxLayout.position.y,
          w: newW,
          h: newH
        });

        var newLayout = [this.placeholder];
        initialLayout.forEach(boxLayout => {
          if (boxLayout.id === this.resizing.boxLayout.id) {
            return;
          }
          newLayout.push(
            utils.moveBoxToFreePlace(newLayout, boxLayout, this.bubbleUp)
          );
        });
        if (this.bubbleUp) {
          newLayout = utils.layoutBubbleUp(newLayout);
          this.placeholder = newLayout.find(boxLayout => {
            return boxLayout.id === this.resizing.boxLayout.id;
          });
        }
        this.updateLayout(newLayout);
      });

      box.$on('resizeEnd', evt => {
        if (!isResizing) {
          return;
        }

        var resizeBy = this.getPositionByPixel(evt.offset.x, evt.offset.y);
        const maxResizeBy = {
          x: this.clientGrid.w - this.resizing.boxLayout.position.w
          // y: this.clientGrid.h - this.resizing.boxLayout.position.h,
        };

        if((this.resizing.boxLayout.position.x + resizeBy.x) > maxResizeBy.x) {
          resizeBy.x = maxResizeBy.x - this.resizing.boxLayout.position.x - 2 * this.clientGrid.outerMargin.x;
        } else {
          let rest = this.resizing.boxLayout.position.w % 1;
          resizeBy.x = resizeBy.x - rest;
        }
        if(this.bottomed) {
          if((this.resizing.boxLayout.position.y + resizeBy.y) > this.clientGrid.h) {
            resizeBy.y = this.clientGrid.h - this.resizing.boxLayout.position.y - 2 * this.clientGrid.outerMargin.y;
          }
        }
        if (
          utils.isFree(this.pinnedLayout, {
            ...this.resizing.boxLayout.position,
            w: this.resizing.boxLayout.position.w + resizeBy.x,
            h: this.resizing.boxLayout.position.h + resizeBy.y
          })
        ) {
          this.placeholder = utils.updateBoxPosition(this.placeholder, {
            w: Math.max(1, this.resizing.boxLayout.position.w + resizeBy.x),
            h: Math.max(1, this.resizing.boxLayout.position.h + resizeBy.y)
          });
        }

        this.resizing.boxLayout = utils.updateBoxPosition(
          this.resizing.boxLayout,
          {
            w: this.placeholder.position.w,
            h: this.placeholder.position.h
          }
        );

        var newLayout = [this.resizing.boxLayout];
        initialLayout.forEach(boxPosition => {
          if (boxPosition.id === this.resizing.boxLayout.id) {
            return;
          }
          newLayout.push(
            utils.moveBoxToFreePlace(newLayout, boxPosition, this.bubbleUp)
          );
        });
        if (this.bubbleUp) {
          newLayout = utils.layoutBubbleUp(newLayout);
        }
        this.updateLayout(newLayout);

        this.resizing.boxLayout = null;
        this.resizing.offset.x = 0;
        this.resizing.offset.y = 0;

        this.placeholder.hidden = true;
      });
    },
    /**
     * make reaction on layout.
     */
    updateLayout(layout) {
      console.log('updateLayout', layout.length);
      /**updated in one tick of delay.*/
      this.$emit('update:layout', layout);
    },
    cleanLayout() {
      const orphanList = this.layout.filter(layer => !this.$children.find(child => child.$props.boxId == layer.id));
      console.log('cleanLayout orphan layout', orphanList.length, this.layout.length);
      orphanList.forEach(orphan => {
        const index = this.layout.findIndex(box => box.id == orphan.id);
        if(index >= 0) {
          this.layout.splice(index, 1);
        }
      });
      console.log('cleanLayout layout', this.layout.length);
    },
    renewLayout(newBoxes, layout = []) {
      /**NOTE: A bitwise operator | can be used to truncate floating point figures and it works for positives,
       * BITWISE operators operate on signed 32bit integers, therefore large numbers will be converted into negative.
       * Math.floor only works with positive numbers and slowest.
       */
      if (newBoxes.length) {
        newBoxes.filter(box => box.$props.boxId != '::placeholder::').forEach(box => {
          let maxPosX = (this.clientGrid.w | 0) - box.$props.boxGrid.w;
          let x = 0;
          let y = 0;
          while(!utils.isFree(layout, {
            x: x,
            y: y,
            ...box.$props.boxGrid
          })) {
            if(x >= maxPosX) {
              x = 0;
              y++;
            } else x++;
          }
          const boxLayout = utils.moveBoxToFreePlace(
            layout,
            {
              id: box.$props.boxId,
              hidden: false,
              position: {
                x: x,
                y: y,
                ...box.$props.boxGrid
              },
              pinned: this.pinned,
              /**check if resized */
              clientWidth: this.clientSize.width
            },
            this.bubbleUp
          );
          layout.push(boxLayout);
        });
      }
      return layout;
    },
    createLayoutByBox(...boxes) {
      console.log('createLayoutByBox');
      if(this.visible) {
        /**create only new boxes */
        const newBoxList = boxes.filter(box => !this.getBoxLayoutById(box.$props.boxId));
        if(newBoxList.length) {
          const oldLayout = [...this.layout];
          const newLayout = this.renewLayout(newBoxList, oldLayout);
          this.updateLayout(newLayout);
        }
      }
    },
    createAllLayout() {
      console.log('createAllLayout');
      if(this.visible) {
        /**create all layout in risk to product a flash on screen */
        const newLayout = this.renewLayout(this.$children);
        this.updateLayout(newLayout);
      }
    }
  }
};
</script>
