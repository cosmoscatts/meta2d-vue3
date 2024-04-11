<script setup lang="ts">
const showMagnifier = ref(false)

function toggle() {
  showMagnifier.value = !showMagnifier.value
}

watch(showMagnifier, (n) => {
  if (n)
    meta2d.showMagnifier()
  else
    meta2d.hideMagnifier()
})
</script>

<template>
  <a-tooltip content="放大镜">
    <div
      i-ph-magnifying-glass-plus cursor-pointer text-lg op50 hover:op75
      :class="showMagnifier ? 'text-primary op100!' : ''"
      @click="toggle"
    />
  </a-tooltip>
</template>
