<script setup lang="ts">
const showMiniMap = ref(false);

function toggle() {
  showMiniMap.value = !showMiniMap.value;
}

onMounted(() => {
  useTimeoutFn(() => {
    if (!meta2d)
      return;
    if (showMiniMap.value) { meta2d.showMap(); }
    else {
      if (meta2d.map?.isShow)
        meta2d.hideMap();
    }
  }, 500);
});

watch(showMiniMap, (n) => {
  if (n)
    meta2d.showMap();
  else
    meta2d.hideMap();
});
</script>

<template>
  <a-tooltip content="缩略图">
    <div
      i-solar-point-on-map-outline cursor-pointer text-lg op50 hover:op75
      :class="showMiniMap ? 'text-primary op100!' : ''"
      @click="toggle"
    />
  </a-tooltip>
</template>
