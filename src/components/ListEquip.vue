<script setup lang="ts">
import type { FileItem } from '@arco-design/web-vue/es/upload/interfaces';
import { s8 } from '@meta2d/core';
import { getDefaultEquipInfo } from '~/const';

const uploadEquipImages = ref<string[]>([]);

async function onImageChange(_: FileItem[], currentFile: FileItem) {
  const imageUrl = await getFileBase64(currentFile.file!);
  uploadEquipImages.value = [
    ...uploadEquipImages.value,
    imageUrl,
  ];
  Message.success('上传成功');
}

const { defaultNames, defaultImages } = getDefaultEquipInfo();

const equips = computed(() => {
  return [
    ...defaultImages,
    ...uploadEquipImages.value,
  ].map((image, idx) => {
    return {
      name: idx >= defaultNames.length ? getRandomStr(6) : defaultNames[idx],
      image,
      icon: '',
      id: s8(),
      data: {
        width: 120,
        height: 80,
        image,
        name: 'image',
        disableInput: true,
      },
    };
  });
});
</script>

<template>
  <div h="[calc(100%-40px)]" w="85/100" mr="13/100" ml="2/100" of-y-auto px-15px py-20px of-x-hidden>
    <div grid="~ cols-2 gap-5" w-full>
      <div
        v-for="elem in equips" :key="elem.name"
        flex="~ col" hover:bg="gray/10" col-span-1 border-box px-6px py-15px cursor-pointer
        :draggable="true"
        @dragstart="dragStart($event, elem)"
        @click.prevent="dragStart($event, elem)"
      >
        <img :src="elem?.image" h-36px>
        <div mt-4 text-center>
          {{ elem.name }}
        </div>
      </div>
      <div col-span-1 cursor-pointer hover:bg="gray/10" rounded>
        <a-upload
          :auto-upload="false" w-full h-full
          list-type="picture-card"
          :show-file-list="false"
          @change="onImageChange"
          @before-upload="checkImageBeforeUpload"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.arco-upload-picture-card) {
  width: 100%;
  height: 100%;
  background-color: transparent;
  min-height: 100px;
}

:deep(.arco-upload-picture-card .arco-icon) {
  width: 2.5em;
  height: 2.5em;
  --at-apply: text-primary op-90;
}
</style>
