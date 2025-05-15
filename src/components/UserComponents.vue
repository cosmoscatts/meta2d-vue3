<script setup lang="ts">
import { s8 } from '@meta2d/core';

const { templates, loadTemplates } = useUserComponents();

loadTemplates();

const templateComponents = computed(() => {
  return templates.value.map(({ id, image, name, data }, idx) => {
    return {
      name: name || `自定义组件${idx + 1}`,
      image,
      icon: '',
      id: s8(),
      data,
      template: true,
      templateId: id,
    };
  });
});

function removeTemplate(id: string) {
  useConfirm({
    title: '提示',
    content: '确定要删除该组件吗？',
    ok() {
      const dataStr = localStorage.getItem('meta2d-templates');
      if (dataStr) {
        const data = JSON.parse(dataStr);
        localStorage.setItem('meta2d-templates', JSON.stringify(data.filter((i: UserTemplate) => i.id !== id)));
        loadTemplates();
      }
      Message.success('删除成功');
    },
  });
}
</script>

<template>
  <div h="[calc(100%-40px)]" w="85/100" mr="13/100" ml="2/100" of-y-auto px-15px py-20px of-x-hidden>
    <div grid="~ cols-2 gap-5" w-full>
      <div
        v-for="elem in templateComponents" :key="elem.name"
        flex="~ col" hover:bg="gray/10" col-span-1 border-box px-6px py-15px cursor-pointer relative
        :draggable="true"
        @dragstart="dragStart($event, elem)"
        @click.prevent="dragStart($event, elem)"
      >
        <img :src="elem?.image" h-36px>
        <div mt-4 text-center>
          {{ elem.name }}
        </div>
        <div
          absolute text-14px top-4px right-4px i-ri:close-fill op-50 hover:op75
          cursor-pointer @click="removeTemplate(elem.templateId)"
        />
      </div>
    </div>
  </div>
</template>
