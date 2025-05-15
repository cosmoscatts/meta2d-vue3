<script setup lang="ts">
const { selections } = useMeta2dSelection();
</script>

<template>
  <div h-full w-full of-y-auto>
    <PropsFile v-if="selections.mode === SelectionMode.File" />
    <PropsPen v-else-if="selections.mode === SelectionMode.Pen" />
    <PropsEquip v-else-if="selections.mode === SelectionMode.Equip" />
    <PropsPoint v-else-if="selections.mode === SelectionMode.Point" />
    <PropsLine v-else-if="selections.mode === SelectionMode.Line" />
  </div>
</template>
