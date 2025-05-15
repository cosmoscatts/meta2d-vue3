<script setup lang="ts">
const selected = ref(false);

function onClick() {
  selected.value = !selected.value;

  if (selected.value)
    meta2d.drawingPencil();

  else
    meta2d.stopPencil();
}
</script>

<template>
  <a-tooltip content="铅笔">
    <div
      :class="selected ? 'text-primary op100!' : ''"
      i-ri-ball-pen-line cursor-pointer text-lg op50 hover:op75
      @click="onClick"
    />
  </a-tooltip>
</template>
