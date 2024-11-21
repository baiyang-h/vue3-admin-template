<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import EventBus from "@/utils/event-bus.js";

const count = ref(0)

onMounted(() => {
  EventBus.on('random-count', handleCustomEvent)
})
onUnmounted(() => {
  EventBus.off('random-count', handleCustomEvent);
});

const handleCustomEvent = (v) => {
  count.value = v
}
</script>

<template>
  <div>
    <p>我是子组件</p>
    <el-input v-model="count" style="width: 150px" />
  </div>
</template>
