<script setup lang="ts">
const isDrawLine = ref(false)

function drawLine() {
  if (isDrawLine.value) {
    isDrawLine.value = false
    meta2d.finishDrawLine()
    meta2d.drawLine()
    meta2d.store.options.disableAnchor = true
  }
  else {
    isDrawLine.value = true
    meta2d.drawLine(meta2d.store.options.drawingLineName)
    meta2d.store.options.disableAnchor = false
  }
}
</script>

<template>
  <a-tooltip content="连线">
    <div
      :class="isDrawLine ? 'text-primary op100!' : ''"
      i-ph:line-segment cursor-pointer text-lg op50 hover:op75
      @click="drawLine"
    />
  </a-tooltip>
</template>
