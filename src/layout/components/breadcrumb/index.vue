<template>
  <el-breadcrumb separator="/" class="breadcrumb">
    <el-breadcrumb-item :to="{ path: '/' }">
      <Icon icon="icon-home" size="16" />
    </el-breadcrumb-item>
    <breadcrumb-item
      v-for="route in levelList"
      :key="route.path"
      :route="route"
    />
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router'
import Icon from '@/components/icon/index.vue'
import BreadcrumbItem from './breadcrumb-item.vue'

const route = useRoute()
let levelList = ref([])

watch(
  route,
  () => getBreadcrumb(),
  {
    immediate: true
  }
)

function getBreadcrumb() {
  const matched = route.matched
  if(route.name === 'Home') {
    levelList.value = []
  } else {
    // 根据菜单标题， 得到会显示的菜单， 如果没标题，那就是有问题的。所以路由配置的时候，如果不是 Submenu 的话，记得 子children中path: index 中写明 meta.title
    levelList.value = matched.filter(route => route.meta && route.meta.title);
  }
}

</script>

<style scoped lang="scss">
.breadcrumb {
  display: flex;
  align-items: center;

  :deep(.el-breadcrumb__inner) {
    cursor: pointer !important;
    font-size: 14px;
    .el-dropdown-link {
      display: flex;
      align-items: center;
    }
  }
}
</style>
