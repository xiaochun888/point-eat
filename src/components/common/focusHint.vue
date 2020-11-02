<template lang="html">
    <div class="focus-hint">
      <table @click="onToggle"><tbody>
        <tr>
          <td class="focus"><slot></slot></td>
          <td><div class="form"></div></td>
          <td class="hint"><slot name="hint"></slot></td>
        </tr>
      </tbody></table>
      <div v-if="paved" class="pave"><slot name="pave"></slot></div>
    </div>
</template>

<script lang="js">
export default {
  name: 'focus-hint',
  props: {
    hint: ''
  },
  data () {
    return {
      paved: false
    };
  },
  methods: {
    onToggle() {
      this.paved = !this.paved;
    }
  }
};
</script>
<style scoped lang="scss">
.focus-hint {
  tr {
    box-sizing: border-box;
    border-bottom: 1px solid #fe5815;
  }
  td {
      padding: 0;
      height: 2.6em;
      line-height: 1.3em;
      max-height: 2.6em;
  }
  .focus {
    background-color:#fe5815;
    padding: 0 0.3em;
    color: white;
    text-align: center;
    cursor: pointer;
  }
  .form {
    border-top: 2.6em solid transparent;
    border-left: 2.6em solid #fe5815;
    cursor: pointer;
  }
  .hint {
    cursor: pointer;
  }
}
</style>
