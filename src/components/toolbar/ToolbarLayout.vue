<script setup lang="ts">
import type { Pen } from '@meta2d/core'

const { selections } = useMeta2dSelection()

function layout() {
  if (selections.pens?.length && selections.pens.length > 1) {
    meta2d.layout(selections.pens as Pen[])
    return
  }
  meta2d.layout()
}
</script>

<template>
  <a-tooltip content="排版">
    <div
      i-ph:layout cursor-pointer text-lg op50 hover:op75
      @click="layout"
    />
  </a-tooltip>
</template>
