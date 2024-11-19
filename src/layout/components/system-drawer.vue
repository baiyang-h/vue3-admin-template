<template>
  <el-drawer
      :value="modelValue"
      title="项目设置"
      direction="rtl"
      @close="close"
  >
    <span>Hi, there!</span>
  </el-drawer>
</template>

<script setup>

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
})
const emit =defineEmits(['update:modelValue'])

function close() {
  emit('update:modelValue', false)
}
</script>
