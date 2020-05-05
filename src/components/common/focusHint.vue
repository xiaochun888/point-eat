<template lang="html">
    <div class="focus-hint">
      <table><tbody>
        <tr>
          <td class="focus"><slot></slot></td>
          <td><div class="form"></div></td>
          <td class="hint"><slot name="hint"></slot></td>
        </tr>
      </tbody></table>
    </div>
</template>

<script lang="js">
export default {
  name: 'focus-hint',
  props: {
    hint: ''
  }
};
</script>
<style scoped lang="scss">
.focus-hint {
    tr {
        border-bottom: 1px solid #fe5815;
    }
    td {
        padding: 0;
        height: 2em;
    }
    .focus {
        background-color:#fe5815;
        padding: 0 0.3em;
        color: white;
        text-align: center;
    }
    .form {
        width: 0;
        height: 100%;
        border-top: 3em solid transparent;
        border-left: 2em solid #fe5815;
    }
}
</style>
