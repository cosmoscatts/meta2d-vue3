<script setup lang="ts">
const { currentToArrow, toArrows, changeToArrow } = getToArrowInfo()

const svgFillColor = computed(() => ['#232323', '#f3f3f3'][Number(isDark.value)])
</script>

<template>
  <a-dropdown trigger="hover" :popup-max-height="false">
    <div>
      <svg cursor-pointer size-6 op50 hover:op75 aria-hidden="true" :fill="svgFillColor">
        <use
          :xlink:href="
            toArrows.find((item) => item.value === currentToArrow)?.icon
          "
        />
      </svg>
    </div>
    <template #content>
      <a-doption v-for="item in toArrows" :key="item.value">
        <div flex justify-center items-center px-12px py-8px @click="changeToArrow(item.value)">
          <svg size-5 aria-hidden="true" :fill="svgFillColor">
            <use :xlink:href="item.icon" />
          </svg>
        </div>
      </a-doption>
    </template>
  </a-dropdown>
</template>
