<script setup lang="ts">
const currentTab = ref(1)
</script>

<template>
  <div h-full w-full>
    <a-tabs v-model="currentTab">
      <a-tab-pane :key="1" title="基本图元">
        <Graphics />
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
