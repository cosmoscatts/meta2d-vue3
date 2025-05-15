<script setup lang="ts">
const isViewMounted = inject('isViewMounted') as Ref<boolean>;

const selected = ref(false);

function clear() {
  if (!selected.value)
    return;

  selected.value = false;
  meta2d.canvas.addCaches = [];
}

function onClick(event: DragEvent | MouseEvent, name: string) {
  if (selected.value) {
    clear();
    return;
  }

  selected.value = true;
  addMeta2dShape(event, name);
}

function onDrag(event: DragEvent | MouseEvent, name: string) {
  addMeta2dShape(event, name);
  clear();
}

onMounted(async () => {
  await until(isViewMounted);
  meta2d.on('click', clear);
});
</script>

<template>
  <a-tooltip content="文本">
    <div
      :class="selected ? 'text-primary op100!' : ''"
      i-ri-text cursor-pointer text-lg op50 hover:op75 :draggable="true"
      @dragstart="onDrag($event, 'text')"
      @click="onClick($event, 'text')"
    />
  </a-tooltip>
</template>
