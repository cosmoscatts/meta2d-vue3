<script lang="ts" setup>
function dragStart(e: DragEvent | MouseEvent, elem: any) {
  if (!elem)
    return

  e.stopPropagation()

  const data = elem.data
  if (e instanceof DragEvent)
    e.dataTransfer?.setData('Meta2d', JSON.stringify(data))
}
</script>

<template>
  <div h="[calc(100vh-120px)]" w-full of-y-auto>
    <a-collapse :bordered="false">
      <a-collapse-item v-for="item in graphicsData" :key="item.name" :header="`${item.name}(${item.list.length})`">
        <div grid="~ cols-2 gap-5" w-full>
          <div
            v-for="elem in item.list" :key="elem.name"
            flex="~ col " justify-center hover:bg="gray/10" col-span-1 border-box px-6px py-15px cursor-pointer
            :draggable="true"
            @dragstart="dragStart($event, elem)"
            @click.prevent="dragStart($event, elem)"
          >
            <svg aria-hidden="true" h-28px w-full fill-primary>
              <use :xlink:href="`#${elem.icon}`" />
            </svg>
            <div :title="elem.name" mt-4 text-center>
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
