<template>
  <el-sub-menu
    v-if="menuItem.children && menuItem.children.length"
    :index="menuItem.path"
  >
    <template #title>
      <el-icon v-if="menuItem.meta && menuItem.meta.icon"><Icon :icon="menuItem.meta.icon" /></el-icon>
      <span class="h-line-1">{{ menuItem.meta && menuItem.meta.title }}</span>
    </template>
    <sidebar-item
      v-for="child in menuItem.children"
      :key="child.path"
      :menuItem="child"
    />
  </el-sub-menu>
  <el-menu-item
    v-else
    :index="menuItem.path"
  >
    <el-icon v-if="menuItem.meta && menuItem.meta.icon"><Icon :icon="menuItem.meta.icon" /></el-icon>
    <span class="h-line-1">{{ menuItem.meta && menuItem.meta.title }}</span>
  </el-menu-item>
</template>

<script setup>
import Icon from '@/components/icon/index.vue'
defineProps({
  // 点击菜单时的信息
  menuItem: {
    type: Object,
    required: true
  },
})
</script>
