<script setup lang="ts">
const selected = ref(false)

function onClick() {
  selected.value = !selected.value

  if (selected.value)
    meta2d.drawLine('curve')

  else
    meta2d.drawLine()
}
</script>

<template>
  <a-tooltip content="钢笔">
    <div
      :class="selected ? 'text-primary op100!' : ''"
      i-ri-pen-nib-line cursor-pointer text-lg op50 hover:op75
      @click="onClick"
    />
  </a-tooltip>
</template>
