<script setup lang="ts">
import type { Meta2dData } from '@meta2d/core'
import { Meta2d } from '@meta2d/core'
import dayjs from 'dayjs'
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

function checkHasPointData() {
  const pens = meta2d.find('hasPointId')
  return pens && pens.length > 0
}

const timer = shallowRef<NodeJS.Timeout | null>(null)

function clearTimer() {
  if (!timer.value)
    return
  clearInterval(timer.value)
  timer.value = null
}

function updatePointValue() {
  if (timer.value)
    clearTimer()
  timer.value = setInterval(() => {
    if (!checkHasPointData()) {
      clearTimer()
      return
    }
    const pointPenKeys = meta2d.find('hasPointId')
      .map((pen: any) => pen.dataId)
      .filter(Boolean) || []
    pointPenKeys.forEach((tag) => {
      setPointData({ id: tag, value: getRandomInteger(30, 100), time: dayjs().format('YY-MM-DD HH:mm:ss') })
    })
  }, 500)
}

function mock() {
  if (!checkHasPointData()) {
    Message.warning('当前没有添加监测信号，无法模拟')
    return
  }
  updatePointValue()
}

watch(visible, (n) => {
  if (n) {
    useTimeoutFn(() => {
      previewMeta2d = new Meta2d('meta2d-preview', getDefaultOptions())
      registerMeta2dPlugins()
      loadData()
    }, 100)
  }
  else {
    clearTimer()
  }
})
</script>

<template>
  <a-modal v-model:visible="visible" :footer="false" fullscreen unmount-on-close>
    <template #title>
      <div flex justify-center items-center gap-2 w-full relative>
        <div>图纸预览</div>
        <div absolute h-full top-0 right-100px>
          <a-button type="dashed" status="warning" size="mini" @click="mock">
            模拟实时数据
          </a-button>
        </div>
      </div>
    </template>

    <div h="[calc(100vh-100px)]" w-full>
      <div id="meta2d-preview" h-full w-full />
    </div>
  </a-modal>
</template>
