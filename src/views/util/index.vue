<template>
  <div>
    <el-col>
      <h3>复制</h3>
      <span class="h-m-r-10">{{ copyText }}</span>
      <el-button type="primary" @click="onCopy">复制</el-button>
    </el-col>
    <el-col>
      <h3>事件总线</h3>
      <p>vue3中去掉了以前vue2中的事件总线的api，在3中建议使用事件总线通常使用第三方库 mitt 来实现，该库 npm install mitt</p>
      <div>
        <el-button type="primary" @click="handleEventBus">触发</el-button>
        <Child />
      </div>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'Util'
}
</script>

<script setup>
import { ref } from 'vue'
import { copy } from '@/utils'
import { ElMessage } from 'element-plus'
import Child from './components/Child.vue'
import EventBus from "@/utils/event-bus.js";

const copyText = ref('我是需要被复制的内容')

const onCopy = () => {
  copy(copyText.value).then(() => {
    ElMessage.success('复制成功')
  }, () => {
    ElMessage.error('复制失败')
  })
}

const handleEventBus = () => {
  EventBus.emit('random-count', Math.random()*1000);
}
</script>

<style scoped>
.el-col {
  margin-bottom: 30px;
  h3 {
    margin-bottom: 15px;
  }
}
</style>
