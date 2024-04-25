<script setup lang="ts">
const graphicsDataKey = ref(defaultGraphicsDataKey)

const graphicsData = computed(() => {
  return graphicsDataKey.value.map((key) => {
    return commonGraphicsDataMap[key]
  })
})

const expandKeys = computed(() => graphicsData.value.map(i => i.key))

const filterVisible = ref(false)
</script>

<template>
  <div h="[calc(100vh-120px)]" w-full of-hidden flex="~ col">
    <div w-full flex-1 of-y-auto>
      <a-collapse :default-active-key="expandKeys" :bordered="false">
        <a-collapse-item v-for="item in graphicsData" :key="item.key" :header="`${item.name}(${item.list.length})`">
          <div grid="~ cols-2 gap-5" w-full>
            <div
              v-for="elem in item.list" :key="elem.name"
              flex="~ col " hover:bg="gray/10" col-span-1 cursor-pointer justify-center border-box px-6px py-15px
              :draggable="true"
              @dragstart="dragStart($event, elem)"
              @click.prevent="dragStart($event, elem)"
            >
              <div v-if="elem?.point" flex items-center justify-center>
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

    <div border-t="1 solid" mt-8px box-border h-50px w-full flex items-center justify-center border-base px-15px py-10px>
      <div
        class="group"
        border="1 solid" h-full w-full flex cursor-pointer items-center justify-center
        gap-2 border-base rounded text-sm hover:bg="primary/10"
        @click="filterVisible = true"
      >
        <div i-ri:apps-line group-hover="i-ri-apps-fill bg-primary" text="primary/50" />
        <span>图形库管理</span>
      </div>
    </div>

    <GraphicsFilter
      v-model:visible="filterVisible"
      v-model:graphics-data-key="graphicsDataKey"
      :fixed="fixedGraphicsDataKey"
      :name-map="allGraphicsDataNameMap"
    />
  </div>
</template>

<style scoped>
:deep(.arco-collapse-item-content) {
  padding-left: 12px;
  padding-right: 12px;
}
</style>
