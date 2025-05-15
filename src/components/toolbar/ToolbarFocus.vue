<script setup lang="ts">
function focus() {
  meta2d.fitView();
}
</script>

<template>
  <a-tooltip content="元素聚焦">
    <div
      i-fluent-table-resize-column-24-regular cursor-pointer text-lg op50 hover:op75
      @click="focus"
    />
  </a-tooltip>
</template>
