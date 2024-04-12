<script setup lang="ts">
const expandKeys = ref<string[]>(graphicsData.map(i => i.name))
</script>

<template>
  <div h="[calc(100vh-120px)]" w-full of-y-auto>
    <a-collapse :default-active-key="expandKeys" :bordered="false">
      <a-collapse-item v-for="item in graphicsData" :key="item.name" :header="`${item.name}(${item.list.length})`">
        <div grid="~ cols-2 gap-5" w-full>
          <div
            v-for="elem in item.list" :key="elem.name"
            flex="~ col " justify-center hover:bg="gray/10" col-span-1 border-box px-6px py-15px cursor-pointer
            :draggable="true"
            @dragstart="dragStart($event, elem)"
            @click.prevent="dragStart($event, elem)"
          >
            <div v-if="elem?.point" flex justify-center items-center>
              <div :class="`${elem.icon}`" size-36px text-primary />
            </div>
            <svg v-else aria-hidden="true" h-28px w-full fill-primary>
              <use :xlink:href="`#${elem.icon}`" />
            </svg>
            <div mt-4 text-center>
              {{ elem.name }}
            </div>
          </div>
        </div>
      </a-collapse-item>
    </a-collapse>
  </div>
</template>

<style scoped>
:deep(.arco-collapse-item-content) {
  padding-left: 12px;
  padding-right: 12px;
}
</style>
