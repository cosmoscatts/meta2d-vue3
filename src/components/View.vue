<script setup lang="ts">
import { Meta2d } from '@meta2d/core'
import { defaultOptions } from '~/const'

onMounted(() => {
  new Meta2d('meta2d', defaultOptions)
  registerMeta2dPlugins()
  loadMeta2dData()
  bindMeta2dActive()
  listenDarkModeChange()

  const s1 = '1234'
  const s2 = '2345'
  const mixed = [
    {
      id: 'parent',
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      name: 'conbine',
      background: 'red',
      children: [s1, s2],
    },
    {
      x: 0,
      y: 0,
      width: 1,
      height: 1,
      id: s1,
      parentId: 'parent',
      name: 'rectangle',
      borderRadius: 0.15,
    },
    {
      x: 0.2,
      y: 0.3,
      width: 0.3,
      height: 0.4,
      id: s2,
      parentId: 'parent',
      name: 'triangle',
      disableAnchor: true,
    },
  ]
  meta2d.addPens(mixed)
})

onUnmounted(() => {
  meta2d.destroy()
})
</script>

<template>
  <div id="meta2d" h-full w-full />
</template>
