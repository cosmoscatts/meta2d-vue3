<script setup lang="ts">
import type { Meta2dData } from '@meta2d/core'
import { Meta2d } from '@meta2d/core'
import { getDefaultOptions } from '~/const'

const visible = defineModel<boolean>('visible')

let previewMeta2d: Meta2d | null = null

function loadData() {
  if (!previewMeta2d)
    return
  // 读取本地存储
  const json = localStorage.getItem('meta2d')
  if (json) {
    const data = JSON.parse(json) as Meta2dData
    data.locked = 1
    previewMeta2d.open(data!)
    previewMeta2d.centerView()
  }
}

watch(visible, (n) => {
  if (n) {
    useTimeoutFn(() => {
      previewMeta2d = new Meta2d('meta2d-preview', getDefaultOptions())
      registerMeta2dPlugins()
      loadData()
    }, 100)
  }
})
</script>

<template>
  <a-modal v-model:visible="visible" :footer="false" fullscreen unmount-on-close title="图纸预览">
    <div h="[calc(100vh-100px)]" w-full>
      <div id="meta2d-preview" h-full w-full />
    </div>
  </a-modal>
</template>
