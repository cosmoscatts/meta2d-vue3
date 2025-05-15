<script lang="ts" setup>
import type { Pen } from '@meta2d/core';

const { selections } = useMeta2dSelection();

const lineDashs = [undefined, [5, 5]];
const animateLineDash = [undefined, [5, 5], undefined]; // 虚线段，lineAnimateType : 1 有效

const form = reactive<any>({
  id: '',
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  //
  color: '', // 边框颜色
  lineWidth: 1,
  dash: 0,
  globalAlpha: 1,
  // 动画
  lineAnimateType: undefined, // 动画类型：默认 - 水流； 1 - 虚线段（水珠流动）；2 - 圆点
  animateSpan: undefined, // 轨迹速度，默认1
  animateColor: '', // 轨迹颜色
  animateLineWidth: undefined, // 动画线宽, lineAnimateType != 2 有效
  animateDotSize: undefined, // 圆点大小，lineAnimateType = 2 有效，最小值 6
  animateReverse: undefined, // 反向播放
  animateCycle: undefined, // 默认无限循环播放
  autoPlay: undefined, // 自动播放
});

function getPen() {
  const pen = selections.pen;
  if (!pen)
    return;

  form.id = pen.id || '';
  form.color = pen.color || '';
  form.dash = (pen as any).dash || 0;
  form.borderRadius = pen.borderRadius || 0;
  form.globalAlpha = pen.globalAlpha || 1;
  // 动画
  form.lineAnimateType = pen.lineAnimateType;
  form.animateSpan = pen.animateSpan || 1;
  form.animateColor = pen.animateColor || '';
  form.animateDotSize = pen.animateDotSize;
  form.animateReverse = pen.animateReverse ?? false;
  form.animateCycle = pen.animateCycle === Number.POSITIVE_INFINITY ? undefined : pen.animateCycle;
  form.animateLineWidth = pen.animateLineWidth;
  form.autoPlay = pen.autoPlay ?? false;

  const rect = meta2d.getPenRect(pen as Pen);
  if (rect) {
    form.x = rect.x || 0;
    form.y = rect.y || 0;
    form.width = rect.width || 0;
    form.height = rect.height || 0;
  }
}

// 监听选中不同图元
watch(() => selections.pen?.id, getPen);

function changeValue(prop: string) {
  const v: any = { id: form.id };
  v[prop] = form[prop];

  if (prop === 'dash')
    v.lineDash = lineDashs[v[prop]];

  if (prop === 'lineAnimateType') {
    if (v[prop] === 2) // 圆点需要清除动画线宽，不然会影响圆点大小
      v.animateLineWidth = undefined;

    v.animateLineDash = animateLineDash[v[prop]];
  }

  meta2d.setValue(v, { render: true });
}

function changeRect(prop: string) {
  const v: any = { id: form.id };
  v[prop] = form[prop];
  meta2d.setValue(v, { render: true });
}

function startAnimate() {
  if (selections.pen)
    meta2d.startAnimate(selections.pen.id);
}

function pauseAnimate() {
  if (selections.pen)
    meta2d.pauseAnimate(selections.pen.id);
}

function stopAnimate() {
  if (selections.pen)
    meta2d.stopAnimate(selections.pen.id);
}

onMounted(() => {
  getPen();
  meta2d.on('update', getPen);
  meta2d.on('resizePens', getPen);
  meta2d.on('rotatePens', getPen);
  meta2d.on('valueUpdate', getPen);
});
</script>

<template>
  <div px-10px py-15px>
    <div mb-4 text-xl font-bold>
      连线设置
    </div>

    <a-form :model="form" auto-label-width label-align="left" size="small">
      <a-form-item label="边框颜色" name="color">
        <ColorPicker v-model="form.color" hide-reset @change="changeValue('color')" />
      </a-form-item>

      <a-form-item label="线条" name="dash">
        <a-select v-model="form.dash" @change="changeValue('dash')">
          <a-option :key="0" :value="0" label="实线" />
          <a-option :key="1" :value="1" label="虚线" />
        </a-select>
      </a-form-item>

      <a-form-item label="线条宽度" name="lineWidth">
        <a-input-number v-model="form.lineWidth" hide-button :min="0" @change="changeRect('lineWidth')" />
      </a-form-item>

      <a-form-item label="不透明度" name="globalAlpha">
        <a-slider
          v-model="form.globalAlpha"
          :min="0"
          :max="1"
          :step="0.01"
          @change="changeValue('globalAlpha')"
        />
      </a-form-item>

      <a-divider />

      <a-form-item label="动画效果" name="lineAnimateType">
        <a-select v-model="form.lineAnimateType" @change="changeValue('lineAnimateType')">
          <a-option :key="0" :value="0" label="水流" />
          <a-option :key="1" :value="1" label="水珠流动" />
          <a-option :key="2" :value="2" label="圆点" />
        </a-select>
      </a-form-item>

      <a-form-item v-if="form.lineAnimateType === 2" label="圆点大小" name="animateDotSize">
        <a-input-number v-model="form.animateDotSize" hide-button :min="6" placeholder="最小值 6" @change="changeRect('animateDotSize')" />
      </a-form-item>

      <a-form-item v-else label="动画线宽" name="animateLineWidth">
        <a-input-number v-model="form.animateLineWidth" hide-button :min="0" @change="changeRect('animateLineWidth')" />
      </a-form-item>

      <a-form-item label="动画速度" name="animateSpan">
        <a-slider
          v-model="form.animateSpan"
          :min="0"
          :max="5"
          :step="1"
          @change="changeValue('animateSpan')"
        />
      </a-form-item>

      <a-form-item label="动画颜色" name="animateColor">
        <ColorPicker v-model="form.animateColor" hide-reset @change="changeValue('animateColor')" />
      </a-form-item>

      <a-form-item label="反向流动" name="animateReverse">
        <a-switch v-model="form.animateReverse" @change="changeValue('animateReverse')" />
      </a-form-item>

      <a-form-item label="循环次数" name="animateCycle">
        <a-input-number v-model="form.animateCycle" hide-button :min="0" placeholder="默认无限" @change="changeRect('animateCycle')" />
      </a-form-item>

      <a-form-item label="自动播放" name="autoPlay">
        <a-switch v-model="form.autoPlay" @change="changeValue('autoPlay')" />
      </a-form-item>

      <div flex items-center justify-between>
        <a-button status="success" type="dashed" @click="startAnimate">
          播放
        </a-button>
        <a-button status="warning" type="dashed" @click="pauseAnimate">
          暂停
        </a-button>
        <a-button status="danger" type="dashed" @click="stopAnimate">
          停止
        </a-button>
      </div>

      <a-divider />

      <a-form-item label="X" name="x">
        <a-input-number v-model="form.x" hide-button @change="changeRect('x')" />
      </a-form-item>

      <a-form-item label="Y" name="y">
        <a-input-number v-model="form.y" hide-button @change="changeRect('y')" />
      </a-form-item>

      <a-form-item label="宽" name="width">
        <a-input-number v-model="form.width" hide-button @change="changeRect('width')" />
      </a-form-item>

      <a-form-item label="高" name="height">
        <a-input-number v-model="form.height" hide-button @change="changeRect('height')" />
      </a-form-item>
    </a-form>
  </div>
</template>
