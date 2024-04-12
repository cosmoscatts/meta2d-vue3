<script lang="ts" setup>
const isViewMounted = inject('isViewMounted') as Ref<boolean>
const updateFilePropsCallback = inject('updateFilePropsCallback') as () => void

const options = computed(() => {
  return meta2d?.getOptions?.()
})
const form = reactive<any>({
  grid: undefined,
  gridSize: undefined,
  rule: undefined,
  background: undefined,
  disableScale: undefined,
})

onMounted(async () => {
  await until(isViewMounted)
  form.grid = options.value.grid
  form.gridSize = options.value.gridSize
  form.disableScale = options.value.disableScale
  form.rule = options.value.rule
  form.background = meta2d.store.data.background
})

function onChangeBackground() {
  meta2d.setBackgroundColor(form.background)
  ;(meta2d.store as any).patchFlagsBackground = true
  meta2d.render()
}

function onChangeOptions() {
  const { grid, gridSize, rule, disableScale } = form
  meta2d.setRule({
    rule,
  })
  meta2d.setOptions({
    disableScale,
  })
  meta2d.setGrid({
    grid,
    gridSize,
  })
  meta2d.store.patchFlagsTop = true
  ;(meta2d.store as any).patchFlagsBackground = true
  meta2d.render()
  updateFilePropsCallback()
}
</script>

<template>
  <div w-full h-full>
    <div mb-4 font-bold text-xl>
      图纸设置
    </div>
    <a-form :model="form" auto-label-width label-align="left">
      <a-form-item label="网格" name="grid">
        <a-switch v-model="form.grid" @change="onChangeOptions" />
      </a-form-item>
      <a-form-item label="网格大小" name="gridSize">
        <a-input-number v-model="form.gridSize" hide-button @change="onChangeOptions" />
      </a-form-item>

      <a-divider />

      <a-form-item label="标尺" name="rule">
        <a-switch v-model="form.rule" @change="onChangeOptions" />
      </a-form-item>

      <a-form-item label="图纸缩放" name="disableScale">
        <a-switch v-model="form.disableScale" :checked-value="false" :unchecked-value="true" @change="onChangeOptions" />
      </a-form-item>

      <a-divider />

      <a-form-item label="背景颜色" name="background">
        <a-color-picker v-model="form.background" disabled-alpha show-text @change="onChangeBackground" />
      </a-form-item>
    </a-form>
  </div>
</template>
