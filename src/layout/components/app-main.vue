<template>
  <router-view v-slot="{ Component }">
    <!--    <transition name="fade-main" mode="out-in">-->
    <!--      -->
    <!--    </transition>-->
    <keep-alive :include="cachedViews">
      <component :is="Component" />
    </keep-alive>
  </router-view>

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
