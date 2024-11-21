<template>
  <router-view v-slot="{ Component }">
    <!--    <transition name="fade-main" mode="out-in">-->
    <!--      -->
    <!--    </transition>-->
    <keep-alive :include="cachedViews">
      <component :is="Component" />
    </keep-alive>
  </router-view>

<!--  测试了该情况不行，不会被缓存，我看vue-tool中的结构是 keep-alive下包的是router-view，不是相应的component，所以不行  -->
<!--  <keep-alive :include="cachedViews">-->
<!--    <router-view />-->
<!--  </keep-alive>-->

</template>

<script setup>
import { computed } from 'vue';
import { useTagViewStore } from '@/store'

const tagViewStore = useTagViewStore()

const cachedViews = computed(() => tagViewStore.cachedViews)

</script>
