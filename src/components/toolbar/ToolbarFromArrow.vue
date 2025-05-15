<script setup lang="ts">
const { currentFromArrow, fromArrows, changeFromArrow } = getFormArrowInfo();

const svgFillColor = computed(() => ['#232323', '#f3f3f3'][Number(isDark.value)]);
</script>

<template>
  <!-- 左箭头类型 -->
  <a-dropdown trigger="hover" :popup-max-height="false">
    <div>
      <svg cursor-pointer size-6 op50 hover:op75 aria-hidden="true" :fill="svgFillColor">
        <use
          :xlink:href="
            fromArrows.find((item) => item.value === currentFromArrow)?.icon
          "
        />
      </svg>
    </div>
    <template #content>
      <a-doption v-for="item in fromArrows" :key="item.value">
        <div flex justify-center items-center px-12px py-8px @click="changeFromArrow(item.value)">
          <svg size-5 aria-hidden="true" :fill="svgFillColor">
            <use :xlink:href="item.icon" />
          </svg>
        </div>
      </a-doption>
    </template>
  </a-dropdown>
</template>
