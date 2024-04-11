<script setup lang="ts">
const toggleTheme = toggleDark
</script>

<template>
  <div h-50px flex justify-between items-center border-b="1 solid" border-base px-4 shadow>
    <div font-bold text-xl>
      Meta2d.js
    </div>

    <Toolbar />

    <div>
      <button
        title="切换主题" cursor-pointer
        i-ph-sun-dim-duotone dark:i-ph-moon-stars-duotone text-xl op50 hover:op75
        @click="toggleTheme"
      />
    </div>
  </div>
</template>
