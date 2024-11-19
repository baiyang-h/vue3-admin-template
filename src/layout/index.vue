<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { useAppStore } from '@/store'
import { Sidebar, CollapsedIcon, Breadcrumb, Navbar, TagView, SystemDrawer, AppMain } from './components'

const router = useRouter()
const route = useRoute()

const collapse = ref(false)
const systemDrawerVisible = ref(false)

const wrapAsideWidth = computed(() => collapse.value ? '65px' : '200px')

// 退出
function onSignOut() {
  ElMessageBox.confirm(
    '你确定要退出吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    const app = useAppStore()
    app.leave()
    router.push({
      name: 'Login',
      query: {
        redirect: route.path
      }
    })
  }).catch(() => {})
}

// 系统设置
function onSystemSet() {
  systemDrawerVisible.value = true
}

</script>

<template>
  <el-container id="app-layout">
    <el-aside :width="wrapAsideWidth" class="scrollbar-none">
      <!-- 侧边菜单 -->
      <sidebar :collapse="collapse" />
    </el-aside>
    <el-container>
      <el-header>
        <div class="navigation">
          <!-- 侧边伸缩按钮 -->
          <collapsed-icon v-model:collapse="collapse" />
          <!-- 面包屑 -->
          <breadcrumb />
          <!-- 导航 -->
          <navbar
            @sign-out="onSignOut"
            @system-set="onSystemSet"
          />
        </div>
        <!-- 浏览标签 -->
        <tag-view />
      </el-header>
      <el-main>
        <app-main />
      </el-main>
    </el-container>
  </el-container>
  <!-- 项目设置 -->
  <system-drawer v-model="systemDrawerVisible" />
</template>

<style scoped lang="scss">
#app-layout {
  height: 100%;
  background: #f0f2f5;

  .el-aside {
    overflow-x: hidden;
    background: #fff;
    &>.el-menu {
      min-height: 100%;
    }
  }

  .el-header {
    background: #fff;
    padding: 0;
    height: auto;
    .navigation {
      display: flex;
      align-items: center;
      height: 50px;
      padding: 0 20px;
      .collapsed-icon {
        margin-right: 10px;
      }
      .navbar {
        flex: 1;
      }
    }
  }

  .el-main {
    background: #fff;
    margin: 24px 16px;
  }
}
</style>
