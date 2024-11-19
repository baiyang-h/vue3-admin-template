<template>
  <div class="collapsed-icon">
    <el-icon v-if="collapse" @click="$emit('update:collapse', false)"><Fold /></el-icon>
    <el-icon v-else  @click="$emit('update:collapse', true)"><Expand /></el-icon>
  </div>
</template>

<script setup>
import { Expand, Fold } from '@element-plus/icons-vue'

defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})
defineEmits(['update:collapse'])


</script>

<style scoped lang="scss">
.collapsed-icon {
  display: flex;
  align-items: center;
  .el-icon {
    font-size: 22px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
}
</style>
