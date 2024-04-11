<script setup lang="ts">
function undo() {
  meta2d.undo()
}
</script>

<template>
  <a-tooltip content="撤销">
    <div i-ion-ios-undo cursor-pointer text-lg op50 hover:op75 @click="undo" />
  </a-tooltip>
</template>
