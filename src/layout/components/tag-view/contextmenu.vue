<template>
  <ul class="contextmenu">
    <li @click="$emit('refresh')">Refresh</li>
    <li @click="$emit('close')" v-show="!(selected.meta && selected.meta.affix)">Close</li>
    <li @click="$emit('closeOther')">Close Other</li>
    <li @click="$emit('closeAll')">Close All</li>
  </ul>
</template>

<script>
export default {
  name: "ContextMenu",

  props: {
    // 刷新
    refresh: {
      type: Function,
      default: () => {}
    },
    // 关闭tag
    close: {
      type: Function,
      default: () => {}
    },
    // 关闭其他
    closeOther: {
      type: Function,
      default: () => {}
    },
    // 关闭所有
    closeAll: {
      type: Function,
      default: () => {}
    },
    // 选择的tagView 的 tagRoute 信息
    selected: {
      type: Object,
      default: () => ({})
    }
  },
}
</script>

<style scoped lang="scss">
.contextmenu {
  position: absolute;
  z-index: 100;
  margin: 0;
  background: #fff;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
