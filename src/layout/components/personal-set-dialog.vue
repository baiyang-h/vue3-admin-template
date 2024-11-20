<script setup>
const model = defineModel({
  default: false
})
</script>

<template>
  <el-dialog
    v-model="model"
    title="个人设置"
    width="500"
  >
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="model = false">取消</el-button>
        <el-button type="primary" @click="model = false">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
