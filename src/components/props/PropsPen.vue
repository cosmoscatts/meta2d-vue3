<script lang="ts" setup>
import type { FileItem } from '@arco-design/web-vue/es/upload/interfaces';
import type { Pen } from '@meta2d/core';

const { selections } = useMeta2dSelection();

const form = reactive<any>({
  id: '',
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  //
  text: '',
  color: '', // 边框颜色
  textColor: '', // 文字颜色
  fontFamily: '', // 文字字体
  fontSize: 12, // 文字大小
  lineHeight: 1.5, // 文字行高
  fontWeight: '',
  fontStyle: '', // 是否倾斜
  background: '',
  dash: 0,
  borderRadius: 0,
  globalAlpha: 1,
  textAlign: '',
  textBaseline: '',
  image: '', // 图片
});

// 特定基础类型可以添加背景图片
const canAddBgImageNames = ['square', 'rectangle', 'circle', 'triangle', 'diamond', 'pentagon', 'hexagon', 'pentagram'];
const showAddBgImage = computed(() => {
  const pen = selections.pen;
  if (!pen || !pen.name?.length)
    return false;
  return canAddBgImageNames.includes(pen.name);
});

function getPen() {
  const pen = selections.pen;
  if (!pen)
    return;
  form.id = pen.id || '';
  form.text = pen.text || '';
  form.color = pen.color || '';
  form.textColor = pen.textColor || ''; // 文字颜色
  form.fontFamily = pen.fontFamily || ''; // 文字字体
  form.fontSize = pen.fontSize || 12; // 文字大小
  form.lineHeight = pen.lineHeight || 1.5; // 文字行高
  form.fontWeight = pen.fontWeight || '';
  form.fontStyle = pen.fontStyle || ''; // 是否倾斜
  form.background = pen.background || '';
  form.dash = (pen as any).dash || 0;
  form.borderRadius = pen.borderRadius || 0;
  form.globalAlpha = pen.globalAlpha || 1;
  form.textAlign = pen.textAlign || 'center';
  form.textBaseline = pen.textBaseline || 'middle';

  const rect = meta2d.getPenRect(pen as Pen);
  if (rect) {
    form.x = rect.x || 0;
    form.y = rect.y || 0;
    form.width = rect.width || 0;
    form.height = rect.height || 0;
  }

  if (showAddBgImage.value)
    form.image = pen.image || '';
}

// 监听选中不同图元
watch(() => selections.pen?.id, getPen);

const lineDashs = [undefined, [5, 5]];

function changeValue(prop: string) {
  const v: any = { id: form.id };
  v[prop] = form[prop];
  if (prop === 'dash')
    v.lineDash = lineDashs[v[prop]];

  meta2d.setValue(v, { render: true });
}

function changeRect(prop: string) {
  const v: any = { id: form.id };
  v[prop] = form[prop];
  meta2d.setValue(v, { render: true });
}

async function onBgImageChange(_: FileItem[], currentFile: FileItem) {
  const imageUrl = await getFileBase64(currentFile.file!);
  form.image = imageUrl;
  changeValue('image');
  Message.success('添加背景图片成功');
}

function removeBgImage() {
  useConfirm({
    title: '提示',
    content: '确定要移除背景图片吗？',
    ok() {
      form.image = '';
      changeValue('image');
      Message.success('移除背景图片成功');
    },
  });
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
      图元设置
    </div>

    <a-form :model="form" auto-label-width label-align="left" size="small">
      <a-form-item label="边框颜色" name="color">
        <ColorPicker v-model="form.color" hide-reset @change="changeValue('color')" />
      </a-form-item>

      <a-form-item label="背景" name="background">
        <ColorPicker v-model="form.background" hide-reset @change="changeValue('background')" />
      </a-form-item>

      <a-form-item label="线条" name="dash">
        <a-select v-model="form.dash" @change="changeValue('dash')">
          <a-option :key="0" :value="0" label="实线" />
          <a-option :key="1" :value="1" label="虚线" />
        </a-select>
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

      <a-form-item v-if="showAddBgImage" label="背景图片" name="image">
        <a-avatar :size="100" shape="square" trigger-type="mask" border="1.5 [var(--color-neutral-5)] dashed">
          <template #trigger-icon>
            <a-upload
              :auto-upload="false"
              list-type="picture-card"
              :show-file-list="false"
              @change="onBgImageChange"
              @before-upload="checkImageBeforeUpload"
            >
              <template #upload-button>
                <IconCamera mr4 text-18px hover:text-primary />
              </template>
            </a-upload>
            <IconDelete text-18px hover:text-primary @click="removeBgImage" />
          </template>
          <img v-show="form.image" :src="form.image" h-full w-full>
        </a-avatar>
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

      <a-form-item label="文本内容" name="text">
        <a-textarea v-model="form.text" @change="changeValue('text')" />
      </a-form-item>

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

<style scoped>
:deep(.arco-avatar) {
  background-color: transparent !important;
}
</style>
