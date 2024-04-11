<script setup lang="ts">
import { Meta2d } from '@meta2d/core'

const { data } = defineProps<{
  data?: string
}>()

const el = ref()

onMounted(() => {

})
</script>

<template>
  <div id="meta2d" ref="el" w-full h-full />
</template>
