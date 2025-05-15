<script setup lang="ts">
const props = defineProps<{
  hideReset?: boolean
}>();
defineEmits(['change', 'reset']);
const modelValue = defineModel<string | undefined>();

const history = ref<string[]>([]);

function addHistory(visible: boolean, color: string) {
  if (!visible) {
    const index = history.value.indexOf(color);
    if (index !== -1)
      history.value.splice(index, 1);

    history.value.unshift(color);
  }
}

function parseHexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [Number.parseInt(result[1], 16), Number.parseInt(result[2], 16), Number.parseInt(result[3], 16)] : null;
}

function isColorCloseToWhite(rgb?: string) {
  if (!rgb || typeof rgb !== 'string' || rgb.startsWith('rgb'))
    return false;

  const arr = parseHexToRgb(rgb);

  if (!arr)
    return false;

  const [r, g, b] = arr;

  const avg = (r + g + b) / 3;
  const threshold = 240;
  return avg > threshold;
}

const isWhite = computed(() => {
  return isColorCloseToWhite(modelValue.value);
});

const showReset = computed(() => !props.hideReset);
</script>

<template>
  <div flex items-center gap-2>
    <a-color-picker
      v-model="modelValue"
      :history-colors="history"
      disabled-alpha
      show-history
      show-preset
      @change="(val: string) => $emit('change', val)"
      @popup-visible-change="addHistory"
    >
      <a-tag :color="modelValue">
        <template #icon>
          <icon-bg-colors :style="{ color: isWhite ? '#232323' : 'white' }" />
        </template>
        <span :class="isWhite ? 'text-#232323' : 'text-white'">
          {{ modelValue }}
        </span>
      </a-tag>
    </a-color-picker>

    <div v-if="showReset" action-button text-lg @click="$emit('reset')">
      <div i-ph:arrow-counter-clockwise-light />
    </div>
  </div>
</template>
