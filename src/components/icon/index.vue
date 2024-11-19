<template>
  <span :class="wrapClass" :style="wrapStyle"></span>
</template>

<script setup>
import {computed} from 'vue';
import { addUnit } from '@/utils/method'

const props = defineProps({
  // 图标类名 如 icon-home
  icon: {
    type: String,
  },
  // 字体大小
  size: {
    type: [String, Number],
    default: 12
  },
  // 颜色
  color: {
    type: String,
  }
})

const wrapClass = computed(() => ['iconfont', props.icon])
const wrapStyle = computed(() => {
  const style = {}
  if(props.size) style.fontSize = addUnit(props.size)
  if(props.color) style.color = props.color
  return style
})

</script>
