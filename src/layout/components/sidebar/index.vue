<script setup>
import { computed, ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/store'
import SidebarItem from './sidebar-item.vue';

const props = defineProps({
  // 伸缩
  collapse: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const route = useRoute()

let selectedKeys = ref();     // 选中的keys
let openKeys = ref([]);         // 展开的 submenu keys
let preOpenKeys = ref([]);      // 前一个展开的 submenu keys

// 有权限的菜单路由
const menu = computed(() => useAppStore().menu)

onMounted(() => {
  // 初始 默认 selectedKeys ， 默认选中的
  selectedKeys.value = route.path
  // 初始化 默认 openKeys ， 默认有展开
  openKeys.value = getRouteOpenKeys()
})

// 点击 MenuItem
function selectMenuItem(index, indexPath, item) {
  router.push(index)
}

// 切换或者刷新、浏览器前进回退、tags切换，根路由变化，左侧菜单展开合拢
function getRouteOpenKeys() {
  return route.matched.filter(_route => _route.meta && _route.meta.isSubmenu && _route.children.length).map(_route => _route.path)
}

// 根绝路由变化监听，选择的菜单变化
watch(
  () => route.path,
  (val) => {
    selectedKeys.value = val
  }
)

// 监听 openKeys 用于保存上一次的 openKeys
watch(
  () => openKeys.value,
  (val, oldVal) => {
    preOpenKeys.value = oldVal;
  }
)

// 监听 collapsed 伸缩
watch(
  () => props.collapse,
  (val) => {
    if(val) {
      openKeys.value = [];
    } else {
      openKeys.value = preOpenKeys.value
    }
  }
)
</script>

<template>
  <el-menu
    :collapse="collapse"
    :collapse-transition="false"
    :unique-opened="true"
    :default-active="selectedKeys"
    :default-openeds="openKeys"
    @select="selectMenuItem"
  >
    <sidebar-item
      v-for="menuItem in menu"
      :key="menuItem.path"
      :menuItem="menuItem"
    />
  </el-menu>
</template>
