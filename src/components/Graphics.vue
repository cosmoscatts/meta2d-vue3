<script lang="ts" setup>
import { s8 } from '@meta2d/core'

function dragStart(e: any, elem: any) {
  if (!elem)
    return

  e.stopPropagation()

  const data = { ...elem.data, id: s8() }
  // 拖拽事件
  if (e instanceof DragEvent) {
    // 设置拖拽数据
    e.dataTransfer?.setData('Meta2d', JSON.stringify(data))
  }
  else {
    // 支持单击添加图元。平板模式
    meta2d.canvas.addCaches = [data]
  }
}
</script>

<template>
  <div h="[calc(100vh-120px)]" w-full of-y-auto>
    <a-collapse :bordered="false">
      <a-collapse-item v-for="item in graphicsData" :key="item.name" :header="`${item.name}(${item.list.length})`">
        <div grid="~ cols-2 gap-5" w-full>
          <div
            v-for="elem in item.list" :key="elem.name"
            flex="~ col" hover:bg="gray/10" col-span-1 border-box px-6px py-10px
            :draggable="true"
            @dragstart="dragStart($event, elem)"
            @click.prevent="dragStart($event, elem)"
          >
            <svg v-if="!elem?.image" class="l-icon" aria-hidden="true" style="height: 28px; width: 100%;">
              <use :xlink:href="`#${elem.icon}`" />
            </svg>
            <img v-else :src="elem?.image" h-28px>
            <p :title="elem.name" mt-2 text-center>
              {{ elem.name }}
            </p>
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
