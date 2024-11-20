<template>
  <div class="navbar">
    <div class="navs">
      <span class="bar iconfont icon-github-fill" @click="onClickGithub"></span>
      <span class="bar iconfont icon-suoding_huaban"></span>
      <span class="bar iconfont icon-quanping_o"></span>
      <el-dropdown>
        <div class="personal bar"></div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="$emit('personal-set')">个人设置</el-dropdown-item>
            <el-dropdown-item @click="$emit('signOut')">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span class="bar iconfont icon-shezhi" @click="$emit('systemSet')"></span>
    </div>
  </div>
</template>

<script setup>
// 打开github
function onClickGithub() {
  window.open('https://github.com/baiyang-h/vue3-admin-template')
}
</script>

<style scoped lang="scss">
.navbar {
  display: flex;
  justify-content: flex-end;
  .iconfont {
    font-size: 22px;
  }
  .bar {
    cursor: pointer;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .navs {
    display: flex;
    align-items: center;
    .personal {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #ccc;
    }
  }
}
</style>
