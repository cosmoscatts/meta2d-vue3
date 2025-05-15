<script setup lang="ts">
import type { Pen } from '@meta2d/core';
import type { FileItem } from '@arco-design/web-vue/es/upload/interfaces';
import { equipOptions } from './mock';

const { selections } = useMeta2dSelection();

/**
 * dataId -> 设备 id
 * pen tags -> ['equipId', 'hasEquipId']
 */

const form: any = reactive({
  equipId: '',
  id: '',
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  image: '', // 图片
});

function getPen() {
  const pen = selections.pen as Pen;
  if (!pen)
    return;

  form.equipId = '';

  const tags = pen.tags || [];
  if (tags.includes('hasEquipId') && tags.length === 2) {
    if (equipOptions.map(i => i.value).includes(tags[0]))
      form.equipId = tags[0] || '';
  }

  form.id = pen.id || '';

  const rect = meta2d.getPenRect(pen);
  if (rect) {
    form.x = rect.x || 0;
    form.y = rect.y || 0;
    form.width = rect.width || 0;
    form.height = rect.height || 0;
  }

  form.image = pen.image || '';
}

// 监听选中不同图元
watch(() => selections.pen?.id, getPen);

const hasSeletedEquip = computed(() => {
  const equipId = form.equipId || '';
  if (equipId === '')
    return false;
  return equipOptions.map(i => i.value).includes(equipId);
});

const lineDashs = [undefined, [5, 5]];

function changeValue(prop: string) {
  if (prop === 'equipId') {
    meta2d.setValue({ id: form.id, dataId: form.equipId, tags: [form.equipId, 'hasEquipId'] }, { render: true });
    return;
  }
  const v = { id: form.id } as any;
  v[prop] = form[prop];
  if (prop === 'dash')
    v.lineDash = lineDashs[v[prop]];

  meta2d.setValue(v, { render: true });
}

function changeRect(prop: string) {
  const v = { id: form.id } as any;
  v[prop] = form[prop];
  meta2d.setValue(v, { render: true });
}

async function onBgImageChange(_: FileItem[], currentFile: FileItem) {
  const imageUrl = await getFileBase64(currentFile.file!);
  form.image = imageUrl;
  changeValue('image');
  Message.success('添加背景图片成功');
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
      设备设置
    </div>

    <a-form :model="form" auto-label-width label-align="left" size="small">
      <a-form-item label="设备" name="equipId">
        <a-select v-model="form.equipId" @change="changeValue('equipId')">
          <a-option v-for="item in equipOptions" :key="item.value" :value="item.value" :label="item.label" />
        </a-select>
      </a-form-item>

      <PropsEquipAutoCreatePoints :equip-id="form.equipId" :has-seleted-equip="hasSeletedEquip" />

      <a-divider />

      <a-form-item label="设备图片" name="image">
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
                <IconCamera text-18px hover:text-primary />
              </template>
            </a-upload>
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
    </a-form>
  </div>
</template>
