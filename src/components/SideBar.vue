<script setup lang="ts">
const currentTabs = ref(1)
</script>

<template>
  <div h-full w-full>
    <a-tabs v-molde="currentTabs">
      <a-tab-pane :key="1" title="基本图元">
        <Graphics border="1 red" />
      </a-tab-pane>
      <a-tab-pane :key="2" title="设备图库">
        <ListEquip />
      </a-tab-pane>
      <a-tab-pane :key="3" title="我的组件">
        <UserComponents />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
