<template>
  <div>
    <h3>该菜单因为 keep-alive  cache:true 会被缓存，这边是一个测试</h3>
    <div>你在下面输入值后，然后切换路由，重新回到该菜单，发现下面的内容被缓存了</div>
    <div>有一种场景下 name 必须是已显式声明的：即 KeepAlive 通过其 include / exclude prop 来匹配其需要缓存的组件时。默认在使用组合式API的时候，确实组件的名字是根据文件名来默认形成的，但是对于这种特殊场景需要手动显示声明</div>
    <el-input v-model="value" placeholder="请输入值" style="margin-top: 30px; width: 500px"/>
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
