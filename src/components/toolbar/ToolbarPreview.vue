<script setup lang="ts">
function preview() {

}
</script>

<template>
  <a-tooltip content="预览">
    <div cursor-pointer text-lg op50 hover:op75 i-ph:eye @click="preview" />
  </a-tooltip>
</template>
