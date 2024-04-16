<script setup lang="ts">
const isViewMounted = inject('isViewMounted') as Ref<boolean>

const selected = ref(false)

function clear() {
  if (!selected.value)
    return

  selected.value = false
}

function onClick() {
  if (selected.value) {
    clear()
    return
  }
  selected.value = true
  meta2d.toggleAnchorMode()
}

onMounted(async () => {
  await until(isViewMounted)
  meta2d.on('click', clear)
})
</script>

<template>
  <a-tooltip content="添加锚点">
    <div
      :class="selected ? 'text-primary op100!' : ''"
      i-ph:anchor-simple cursor-pointer text-lg op50 hover:op75
      @click="onClick"
    />
  </a-tooltip>
</template>
