<template>
  <el-drawer
      v-model="model"
      title="项目设置"
      direction="rtl"
      @close="model=false"
  >
    <span>Hi, there!</span>
  </el-drawer>
</template>

<script setup>
const model = defineModel({
  default: false
})

function close() {
}
</script>
