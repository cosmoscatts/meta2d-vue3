<script setup lang="ts">
import ToolbarText from './ToolbarText.vue'

const isViewMounted = inject('isViewMounted') as Ref<boolean>

const scale = ref(0)
const disableScale = ref(true)

function updateDisableScale() {
  if (!isViewMounted.value) {
    disableScale.value = true
    return
  }
  disableScale.value = meta2d.getOptions()?.disableScale || false
}

function scaleSubscriber(val = 0) {
  scale.value = Math.round(val * 100)
}

function getScaleByInterval() {
  const timer = setInterval(() => {
    if (meta2d) {
      clearInterval(timer)
      scaleSubscriber(meta2d.store.data.scale)
      meta2d.on('scale', scaleSubscriber)
    }
  }, 200)
}

onMounted(async () => {
  await until(isViewMounted)
  updateDisableScale()
  getScaleByInterval()
})
</script>

<template>
  <div flex items-center justify-center gap-2 xl:gap-3>
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

    <ToolbarPreview />

    <ToolbarFile />

    <a-divider direction="vertical" />

    <ToolbarScaleDefault />

    <ToolbarFocus />

    <ToolbarTopView />

    <ToolbarLayout />

    <a-divider direction="vertical" />

    <div op-50 text-lg>
      {{ scale }}%
    </div>
    <div v-if="disableScale" text-sm op-30>
      (已禁用缩放)
    </div>
  </div>
</template>
