<template>
  <div>
    <h3>该模块因为 keep-alive  cache:true 会被缓存</h3>
    <el-input v-model="value" placeholder="请输入值" />
  </div>
</template>

<script>
export default {
  name: 'Cache'
}
</script>
<script setup>
import { ref } from 'vue';

const value = ref('');

</script>
