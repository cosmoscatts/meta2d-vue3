<script setup lang="ts">
const { currentLineType, lineTypes, changeLineType } = getLineTypeInfo();

const svgFillColor = computed(() => ['#232323', '#f3f3f3'][Number(isDark.value)]);
</script>

<template>
  <a-dropdown trigger="hover">
    <div>
      <svg cursor-pointer size-5 aria-hidden="true" op50 hover:op75 :fill="svgFillColor">
        <use
          :xlink:href="
            lineTypes.find((item) => item.value === currentLineType)?.icon
          "
        />
      </svg>
    </div>
    <template #content>
      <a-doption v-for="item in lineTypes" :key="item.value">
        <div flex items-center justify-center gap-5 @click="changeLineType(item.value)">
          <span>
            {{ item.name }}
          </span>
          <svg size-5 aria-hidden="true" :fill="svgFillColor">
            <use :xlink:href="item.icon" />
          </svg>
        </div>
      </a-doption>
    </template>
  </a-dropdown>
</template>
