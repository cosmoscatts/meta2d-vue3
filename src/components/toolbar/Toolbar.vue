<script setup lang="ts">
function undo() {
  meta2d.undo()
}

function redo() {
  meta2d.redo()
}
</script>

<template>
  <div flex items-center justify-center gap-3>
    <a-tooltip content="撤销">
      <div i-ion-ios-undo cursor-pointer text-lg op50 hover:op75 @click="undo" />
    </a-tooltip>
    <a-tooltip content="重做">
      <div i-ion-ios-redo cursor-pointer text-lg op50 hover:op75 @click="redo" />
    </a-tooltip>

    <a-divider direction="vertical" />
  </div>
</template>
