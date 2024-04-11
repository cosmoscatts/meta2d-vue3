<script setup lang="ts">
import logo from '/public/favicon.ico'

const toggleTheme = toggleDark
</script>

<template>
  <div h-50px flex justify-between items-center border-b="1 solid" border-base px-4 shadow>
    <div font-bold text-lg flex items-center gap-3 text-base>
      <img :src="logo" h-36px rounded>
      2D可视化
      <span op50 font-mono inline-block translate-y--2 text-0.6em font-200> v0.0.1 </span>
    </div>

    <Toolbar />

    <div flex items-center gap-4>
      <div action-button-active>
        保存
      </div>

      <div action-button>
        清空
      </div>

      <div action-button>
        另存为组件
      </div>

      <button
        title="切换主题" cursor-pointer
        i-ph-sun-dim-duotone dark:i-ph-moon-stars-duotone text-xl op50 hover:op75
        @click="toggleTheme"
      />
    </div>
  </div>
</template>
