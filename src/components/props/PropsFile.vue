<script lang="ts" setup>
import {
  getDefaultBackgroundColor,
  getDefaultGridColor,
  getDefaultRuleColor,
} from '~/const'

const isViewMounted = inject('isViewMounted') as Ref<boolean>

const { updateDisableScale } = useScale()

const form = reactive<FileProps>({
  grid: undefined,
  gridSize: undefined,
  gridColor: '',
  rule: undefined,
  ruleColor: '',
  background: '',
  disableScale: undefined,
  activeColor: '', // 选中颜色
  hoverColor: '', // 悬浮颜色
})

function setForm() {
  const options = meta2d.getOptions()
  form.disableScale = options.disableScale
  form.hoverColor = options.hoverColor
  form.activeColor = options.activeColor

  const data = meta2d.store.data
  let gridColor = data.gridColor
  if (gridColor && ['#AAAAAA', '#AAA3'].includes(gridColor.toUpperCase())) // 初次加载时覆盖默认颜色
    gridColor = options.gridColor
  form.grid = data.grid
  form.gridSize = data.gridSize
  form.background = data.background
  form.rule = data.rule
  form.ruleColor = data.ruleColor
  form.gridColor = gridColor
}

onMounted(async () => {
  await until(isViewMounted)

  setForm()
})

watch(isDark, setForm)

function onChangeBackground() {
  if (form.background
    && meta2d.store.data.background
    && form.background.toLowerCase() === meta2d.store.data.background.toLowerCase()
  )
    return

  meta2d.setBackgroundColor(form.background)
  ;(meta2d.store as any).patchFlagsBackground = true
  meta2d.render()
}

function onChangeOptions() {
  const {
    grid,
    gridSize,
    gridColor,
    rule,
    ruleColor,
    disableScale,
    activeColor,
    hoverColor,
  } = form
  const changeRuleColor = !(form.ruleColor
    && meta2d.store.data.ruleColor
    && form.ruleColor.toLowerCase() === meta2d.store.data.ruleColor.toLowerCase())
  const changeGridColor = !(form.gridColor
    && meta2d.store.data.gridColor
    && form.gridColor.toLowerCase() === meta2d.store.data.gridColor.toLowerCase())
  meta2d.setRule({
    rule,
    ruleColor: changeRuleColor ? ruleColor : undefined,
  })
  meta2d.setOptions({
    disableScale,
    activeColor,
    hoverColor,
  })
  meta2d.setGrid({
    grid,
    gridSize,
    gridColor: changeGridColor ? gridColor : undefined,
  })
  meta2d.store.patchFlagsTop = true
  ;(meta2d.store as any).patchFlagsBackground = true
  meta2d.render()
  updateDisableScale(isViewMounted)
}
</script>

<template>
  <div px-10px py-15px>
    <div mb-4 font-bold text-xl>
      图纸设置
    </div>

    <a-form :model="form" label-align="left" auto-label-width>
      <a-form-item label="网格" name="grid">
        <a-switch v-model="form.grid" @change="onChangeOptions" />
      </a-form-item>

      <a-form-item label="网格大小" name="gridSize">
        <a-input-number v-model="form.gridSize" hide-button w-100px @change="onChangeOptions" />
      </a-form-item>

      <a-form-item label="网格颜色" name="gridColor">
        <ColorPicker v-model="form.gridColor" @change="onChangeOptions" @reset="form.gridColor = getDefaultGridColor().toUpperCase()" />
      </a-form-item>

      <a-divider />

      <a-form-item label="标尺" name="rule">
        <a-switch v-model="form.rule" @change="onChangeOptions" />
      </a-form-item>

      <a-form-item label="标尺颜色" name="ruleColor">
        <ColorPicker v-model="form.ruleColor" @change="onChangeOptions" @reset="form.ruleColor = getDefaultRuleColor().toUpperCase()" />
      </a-form-item>

      <a-form-item label="图纸缩放" name="disableScale">
        <a-switch v-model="form.disableScale" :checked-value="false" :unchecked-value="true" @change="onChangeOptions" />
      </a-form-item>

      <a-divider />

      <a-form-item label="背景颜色" name="background">
        <ColorPicker v-model="form.background" @change="onChangeBackground" @reset="form.background = getDefaultBackgroundColor().toUpperCase()" />
      </a-form-item>

      <a-form-item label="选中颜色" name="activeColor">
        <ColorPicker v-model="form.activeColor" @change="onChangeOptions" @reset="form.activeColor = '#722ED1'.toUpperCase()" />
      </a-form-item>

      <a-form-item label="悬浮颜色" name="hoverColor">
        <ColorPicker v-model="form.hoverColor" @change="onChangeOptions" @reset="form.hoverColor = '#A871E3'.toUpperCase()" />
      </a-form-item>
    </a-form>
  </div>
</template>
