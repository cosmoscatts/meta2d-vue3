<script setup lang="ts">
const { currentToArrow, toArrows, changeToArrow } = getToArrowInfo()
</script>

<template>
  <a-dropdown trigger="hover" :popup-max-height="false">
    <div>
      <svg cursor-pointer size-6 color-red op50 hover:op75 aria-hidden="true">
        <use
          :xlink:href="
            toArrows.find((item) => item.value === currentToArrow)?.icon
          "
        />
      </svg>
    </div>
    <template #content>
      <a-doption v-for="item in toArrows" :key="item.value">
        <div flex-center @click="changeToArrow(item.value)">
          <svg size-5 aria-hidden="true">
            <use :xlink:href="item.icon" />
          </svg>
        </div>
      </a-doption>
    </template>
  </a-dropdown>
</template>
