<script setup lang="ts">
function scaleDefault() {
  meta2d.scale(1);
  meta2d.centerView();
}
</script>

<template>
  <a-tooltip content="恢复默认缩放">
    <div
      i-mingcute-refresh-2-line cursor-pointer text-lg op50 hover:op75
      @click="scaleDefault"
    />
  </a-tooltip>
</template>
