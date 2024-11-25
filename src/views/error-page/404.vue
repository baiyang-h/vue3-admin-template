<template>
  <div class="page-404">
    <div>
      <img src="/404.png" alt="">
      <div class="btn">
        <el-button type="primary" style="width: 200px; height: 50px" @click="$router.back()">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '404'
}
</script>

<style>
.page-404 {
  height: 100%;
  display: flex;
  justify-content: center;
  .btn {
    text-align: center;
    transform: translateY(-100px);
  }
}
</style>
