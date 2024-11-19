<template>
  <el-breadcrumb-item v-if="!(route.children && route.children.length)">
    <a @click="onLink(route)">{{ route.meta.title }}</a>
  </el-breadcrumb-item>
  <el-breadcrumb-item v-else>
    <el-dropdown>
      <span class="el-dropdown-link">
        <a>{{ route.meta.title }}</a>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="childRoute in route.children" :key="childRoute.path">
            <a rel="next" @click="onLink(childRoute)">{{ childRoute.meta.title }}</a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-breadcrumb-item>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'
import { isUrl } from '@/utils/common/regexp'

defineProps({
  route: {
    type: Object,
    default: () => ({})
  }
})

const router = useRouter()

function onLink(route) {
  if(isUrl(route.path)) { // 是否是真实的网页地址
    window.open(route.path)
  } else {
    router.push(route.path)
  }
}

</script>
