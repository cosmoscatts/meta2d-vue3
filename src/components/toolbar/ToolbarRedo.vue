<script setup lang="ts">
function redo() {
  meta2d.redo()
}
</script>

<template>
  <a-tooltip content="重做">
    <div i-ion-ios-redo cursor-pointer text-lg op50 hover:op75 @click="redo" />
  </a-tooltip>
</template>
