<script setup lang="ts">
import { version } from '../../package.json'
</script>

<template>
  <footer z-1000 h-30px w-screen flex items-center justify-center border-base text-sm bg-base text-base border-t="1 solid">
    <span mx-2>cosmoscatts</span>·<span mx-2>v{{ version }}</span>
  </footer>
</template>
