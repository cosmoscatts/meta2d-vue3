<script setup lang="ts">
import ToolbarText from './ToolbarText.vue'
</script>

<template>
  <div flex items-center justify-center gap-3>
    <ToolbarUndo />

    <ToolbarRedo />

    <a-divider direction="vertical" />

    <ToolbarText />

    <ToolbarPen />

    <ToolbarPencil />

    <ToolbarLine />

    <ToolbarDrawLine />

    <a-divider direction="vertical" />

    <ToolbarLineType />

    <ToolbarFromArrow />

    <ToolbarToArrow />

    <a-divider direction="vertical" />

    <ToolbarMiniMap />

    <ToolbarMagnifier />
  </div>
</template>
