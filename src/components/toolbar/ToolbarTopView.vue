<script setup lang="ts">
function topView() {
  meta2d.topView();
}
</script>

<template>
  <a-tooltip content="顶部对齐">
    <div
      i-ph:align-top-simple cursor-pointer text-lg op50 hover:op75
      @click="topView"
    />
  </a-tooltip>
</template>
