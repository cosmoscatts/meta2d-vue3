<script setup lang="ts">
import type { Pen } from '@meta2d/core';
import { signalInfoMap } from '~/const';
import { createPointOptions, equipOptions } from './mock';

const { selections } = useMeta2dSelection();

/**
 * dataId => pointid-signalType
 * 测点 id + 信号类型 => 唯一确定一个 point
 * pen tags -> ['设备id', 'pointId', 'hasPointId']
 *
 *
 * 一个测点是一组 pen, [parent, c1, c2, c3, ..., c7]
 * 背景色是 c1 中设置
 * c2 -> 设备名称
 * ...
 * (const/../../ponit.js)
 */

const form: any = reactive({
  pointId: '',
  equipId: '',
  signalType: '',
  // Parent Pen
  id: '',
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  //
  color: '', // 边框颜色 c1, c6
  textColor: '', // 文字颜色 c2, c3, c4, c5
  fontFamily: '', // 文字字体 c2, c3, c4, c5
  fontSize: 12, // 文字大小 c2, c3, c4, c5
  fontWeight: '', // c2, c3, c4, c5
  fontStyle: '', // 是否倾斜 c2, c3, c4, c5
  textAlign: '', // c2, c3, c4, c5
  textBaseline: '', // c2, c3, c4, c5
  background: '', // c1
  dash: 0, // c1
  borderRadius: 0, // c1
  globalAlpha: 1, // c1
  signalBackground: '', // 小圆点背景 c7
  valueTextColor: '', // 数值文本色 c4

  hasBorder: undefined,
});

function getPen() {
  const pen = selections.pen;
  if (!pen)
    return;

  form.equipId = '';
  form.pointId = '';

  const tags = pen.tags || [];
  if (tags.length && tags[0]) {
    if (equipOptions.map(i => i.value).includes(tags[0]))
      form.equipId = tags[0];
  }
  if (tags.includes('hasPointId') && tags.length > 2)
    form.pointId = tags[1] || '';

  form.id = pen.id || '';
  const rect = meta2d.getPenRect(pen as Pen);
  if (rect) {
    form.x = rect.x || 0;
    form.y = rect.y || 0;
    form.width = rect.width || 0;
    form.height = rect.height || 0;
  }

  const childIds = pen.children;
  if (!childIds?.length || childIds.length !== 7)
    return;

  const child = childIds.map(id => meta2d.findOne(id));

  form.color = child[0]?.color; // 边框颜色 c1, c6
  form.textColor = child[1]?.textColor;// 文字颜色 c2, c3, c4, c5
  form.fontFamily = child[1]?.fontFamily || ''; // 文字字体 c2, c3, c4, c5
  form.fontSize = child[1]?.fontSize || 12; // 文字大小 c2, c3, c4, c5
  form.fontWeight = child[1]?.fontWeight || ''; // c2, c3, c4, c5
  form.fontStyle = child[1]?.fontStyle || ''; // 是否倾斜 c2, c3, c4, c5
  form.background = child[0]?.background; // c1
  form.dash = (child[0] as any)?.dash || 0; // c1
  form.borderRadius = child[0]?.borderRadius || 0; // c1
  form.globalAlpha = child[0]?.globalAlpha || 1; // c1
  form.textAlign = child[1]?.textAlign || 'center'; // c2, c3, c4, c5
  form.textBaseline = child[1]?.textBaseline || 'middle'; // c2, c3, c4, c5
  form.signalBackground = child[6]?.background || ''; // 小圆点背景 c7
  form.valueTextColor = child[3]?.textColor || ''; // 数值文本色 c4
  form.signalType = signalOptions.find(i => i.label === child[2]?.text)?.value || '';

  form.hasBorder = child[0]?.lineWidth !== 0;
}

// 监听选中不同图元
watch(() => selections.pen?.id, getPen);

const pointOptions = ref<SelectOption[]>([]);
watch(() => form.equipId, (n, o) => {
  if (equipOptions.map(i => i.value).includes(n)) {
    pointOptions.value = createPointOptions(n) as SelectOption[];
    if (n && o)
      form.pointId = '';
  }
});

const hasSeletedEquip = computed(() => {
  const equipId = form.equipId || '';
  if (equipId === '')
    return false;
  return equipOptions.map(i => i.value).includes(equipId);
});

const lineDashs = [undefined, [5, 5]];

function updatePropByTag(prop: string) {
  const pen = selections.pen!;
  const tagName = `__${pen.name}_${prop}`;
  const pens = meta2d.find(tagName);
  if (!pens.length)
    return;
  pens.forEach((pen) => {
    const v = { id: pen.id } as any;
    if (prop === 'signalBackground')
      v.background = form[prop];
    else if (prop === 'valueTextColor')
      v.textColor = form[prop];
    else
      v[prop] = form[prop];

    if (prop === 'dash')
      v.lineDash = lineDashs[v[prop]];

    meta2d.setValue(v);
  });
  meta2d.render();
}

function updateBorder(hasBorder: boolean) {
  const pen = selections.pen!;
  const [tagName] = [`__${pen.name}_border`];
  const pens = meta2d.find(tagName);
  if (pens.length) {
    pens.forEach((pen) => {
      const v = { id: pen.id, lineWidth: hasBorder ? 1 : 0 };
      meta2d.setValue(v);
    });
  }
  meta2d.render();
}

function changeValue(prop: string) {
  const childIds = selections.pen!.children;
  const child = childIds!.map(id => meta2d.findOne(id));
  if (prop === 'equipId') {
    meta2d.setValue({ id: form.id, tags: [form.equipId] }, { render: true });
    return;
  }
  if (prop === 'hasBorder') { // c1, c6
    updateBorder(form.hasBorder);
    return;
  }
  if (prop === 'pointId') {
    meta2d.setValue({ id: form.id, dataId: `${form.pointId}-${form.signalType}`, tags: [form.equipId, form.pointId, 'hasPointId'] });
    if (child.length && child.length === 7) {
      meta2d.setValue({ id: child[1]!.id, text: pointOptions.value.find(i => i.value === form.pointId)?.label || '' });
      const valuePenTags = child[3]!.tags || [];
      meta2d.setValue({ id: child[3]!.id, tags: [...valuePenTags, `${form.pointId}-${form.signalType}__value`] });
      const timePenTags = child[4]!.tags || [];
      meta2d.setValue({ id: child[4]!.id, tags: [...timePenTags, `${form.pointId}-${form.signalType}__time`] });
    }
    meta2d.render();
    return;
  }
  if (prop === 'signalType') {
    if (!child.length || child.length !== 7)
      return;
    const valuePenTags = child[3]!.tags || [];
    meta2d.setValue({ id: child[2]!.id, text: signalInfoMap[form.signalType].nameText });
    meta2d.setValue({ id: child[3]!.id, text: signalInfoMap[form.signalType].valueText, tags: [...valuePenTags, `${form.pointId}-${form.signalType}__value`] });
    const timePenTags = child[4]!.tags || [];
    meta2d.setValue({ id: child[4]!.id, tags: [...timePenTags, `${form.pointId}-${form.signalType}__time`] });
    meta2d.setValue({ id: form.id, dataId: `${form.pointId}-${form.signalType}` });
    meta2d.render();
    return;
  }
  updatePropByTag(prop);
}

function changeRect(prop: string) {
  const v = { id: form.id } as any;
  v[prop] = form[prop];
  meta2d.setValue(v, { render: true });
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
    <div mb-4 font-bold text-xl>
      监测信号设置
    </div>

    <a-form :model="form" auto-label-width label-align="left" size="small">
      <a-form-item label="设备" name="equipId">
        <a-select v-model="form.equipId" @change="changeValue('equipId')">
          <a-option v-for="item in equipOptions" :key="item.value" :value="item.value" :label="item.label" />
        </a-select>
      </a-form-item>

      <a-form-item v-if="hasSeletedEquip" label="测点" name="equipId">
        <a-select v-model="form.pointId" @change="changeValue('pointId')">
          <a-option v-for="item in pointOptions" :key="item.value" :value="item.value" :label="item.label" />
        </a-select>
      </a-form-item>

      <a-form-item label="信号类型" name="signalType">
        <a-select v-model="form.signalType" @change="changeValue('signalType')">
          <a-option v-for="item in signalOptions" :key="item.value" :value="item.value" :label="item.label" />
        </a-select>
      </a-form-item>

      <a-divider />

      <a-form-item label="边框颜色" name="color">
        <ColorPicker v-model="form.color" hide-reset @change="changeValue('color')" />
      </a-form-item>

      <a-form-item label="背景" name="background">
        <ColorPicker v-model="form.background" hide-reset @change="changeValue('background')" />
      </a-form-item>

      <a-form-item label="圆点背景" name="signalBackground">
        <ColorPicker v-model="form.signalBackground" hide-reset @change="changeValue('signalBackground')" />
      </a-form-item>

      <a-form-item label="数值颜色" name="valueTextColor">
        <ColorPicker v-model="form.valueTextColor" hide-reset @change="changeValue('valueTextColor')" />
      </a-form-item>

      <a-form-item label="线条" name="dash">
        <a-select v-model="form.dash" @change="changeValue('dash')">
          <a-option :key="0" :value="0" label="实线" />
          <a-option :key="1" :value="1" label="虚线" />
        </a-select>
      </a-form-item>

      <a-form-item label="显示线条" name="rule">
        <a-switch v-model="form.hasBorder" @change="changeValue('hasBorder')" />
      </a-form-item>

      <a-form-item label="圆角" name="borderRadius">
        <a-input-number
          v-model="form.borderRadius"
          :min="0"
          :max="1"
          hide-button
          @change="changeValue('borderRadius')"
        />
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

      <a-divider />
      <a-form-item label="文本颜色" name="textColor">
        <ColorPicker v-model="form.textColor" hide-reset @change="changeValue('textColor')" />
      </a-form-item>

      <a-form-item label="文字字体" name="fontFamily">
        <a-select v-model="form.fontFamily" @change="changeValue('fontFamily')">
          <a-option key="normal" value="" label="默认" />
          <a-option key="微软雅黑" value="微软雅黑" label="微软雅黑" />
          <a-option key="宋体" value="宋体" label="宋体" />
          <a-option key="黑体" value="黑体" label="黑体" />
          <a-option key="楷体" value="楷体" label="楷体" />
          <a-option key="fangsong" value="fangsong" label="仿宋" />
        </a-select>
      </a-form-item>

      <a-form-item label="文字大小" name="fontSize">
        <a-input-number v-model="form.fontSize" hide-button @change="changeValue('fontSize')">
          <template #suffix>
            px
          </template>
        </a-input-number>
      </a-form-item>

      <a-form-item label="加粗" name="fontWeight">
        <a-select v-model="form.fontWeight" @change="changeValue('fontWeight')">
          <a-option key="nornal" value="" label="正常" />
          <a-option key="italic" value="bold" label="加粗" />
        </a-select>
      </a-form-item>

      <a-form-item label="倾斜" name="fontStyle">
        <a-select v-model="form.fontStyle" @change="changeValue('fontStyle')">
          <a-option key="nornal" value="" label="正常" />
          <a-option key="italic" value="italic" label="倾斜" />
        </a-select>
      </a-form-item>

      <a-form-item label="文字水平" name="textAlign">
        <a-select v-model="form.textAlign" @change="changeValue('textAlign')">
          <a-option key="left" value="left" label="左对齐" />
          <a-option key="center" value="center" label="居中" />
          <a-option key="right" value="right" label="右对齐" />
        </a-select>
      </a-form-item>

      <a-form-item label="文字垂直" name="textBaseline">
        <a-select
          v-model="form.textBaseline"
          @change="changeValue('textBaseline')"
        >
          <a-option key="top" value="top" label="顶部对齐" />
          <a-option key="middle" value="middle" label="居中" />
          <a-option key="bottom" value="bottom" label="底部对齐" />
        </a-select>
      </a-form-item>
    </a-form>
  </div>
</template>
