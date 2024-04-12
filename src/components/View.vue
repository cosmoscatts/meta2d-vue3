<script setup lang="ts">
import { Meta2d } from '@meta2d/core'
import { defaultOptions } from '~/const'

onMounted(() => {
  new Meta2d('meta2d', defaultOptions)
  registerMeta2dPlugins()
  loadMeta2dData()
  bindMeta2dActive()
  listenDarkModeChange()
})

onUnmounted(() => {
  meta2d.destroy()
})
</script>

<template>
  <div id="meta2d" h-full w-full />
</template>
