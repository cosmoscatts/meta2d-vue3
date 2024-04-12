<script setup lang="ts">
import { Meta2d } from '@meta2d/core'
import { defaultOptions } from '~/const'

const el = ref()
const { width, height } = useElementSize(el)

watch([width, height], ([w, h]) => {
  if (w > 0 && h > 0 && meta2d)
    meta2d.resize(w, h)
})

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
  <div id="meta2d" ref="el" h-full w-full />
</template>
