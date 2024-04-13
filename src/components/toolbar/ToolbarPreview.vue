<script setup lang="ts">
const { getScaleByInterval } = useScale()
const { visible, preview } = usePreview()

watch(visible, (n, o) => { // 解决打开预览再关闭预览后 View 缩放比例不更新的问题
  if (!n && o)
    getScaleByInterval()
})
</script>

<template>
  <a-tooltip content="预览">
    <div cursor-pointer text-lg op50 hover:op75 i-ph:eye @click="preview" />
    <Preview v-model:visible="visible" />
  </a-tooltip>
</template>
