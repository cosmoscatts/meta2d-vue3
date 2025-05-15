<script setup lang="ts">
import type { Pen } from '@meta2d/core';

const { selections } = useMeta2dSelection();

// 是否选中图元
const hasPen = computed(() => !!selections.pens?.length);
// 是否选中多个图元
const isPens = computed(() => {
  const length = selections.pens?.length || 0;
  return hasPen.value && length > 1;
});

const showContextMenu = ref(false);
function closeContextMenu() {
  showContextMenu.value = false;
}

const hasLocked = ref(false);
const hasLockedFile = ref(false); // 是否锁定整张图纸
function setLockedState() {
  if (!meta2d)
    return;

  const pens = selections.pens || [];
  if (!pens.length) {
    const locked = meta2d.data().locked || 0;
    hasLockedFile.value = locked > 0;
    return;
  }

  // 只有所有选中的都为锁定状态，才显示已锁定，存在部分锁定的情况则默认为未锁定
  hasLocked.value = pens.map(pen => pen.locked || 0).filter(i => i > 0).length === pens.length;
}

const showCombine = computed(() => isPens.value);
const showUncombine = computed(() => {
  if (!hasPen.value)
    return false;
  if (isPens.value)
    return false;

  const pen = selections.pen;
  if (!pen?.children?.length)
    return false;
  return true;
});

function remove() {
  closeContextMenu();

  if (!meta2d)
    return;
  const pens = selections.pens;
  if (!pens?.length)
    return;

  const hasLockedPen = pens.map(pen => pen.locked || 0).filter(i => i > 0).length;
  if (!hasLockedPen) {
    meta2d.delete(pens as Pen[]);
    return;
  }

  useConfirm({
    title: '提示',
    content: '当前选中存在锁定图元，确定要删除吗？',
    ok() {
      meta2d.delete(pens as Pen[], true);
    },
  });
}

function redo() {
  closeContextMenu();

  if (!meta2d)
    return;
  meta2d.redo();
}

function undo() {
  closeContextMenu();

  if (!meta2d)
    return;
  meta2d.undo();
}

function lock() {
  closeContextMenu();

  if (!meta2d)
    return;
  if (!hasPen.value)
    return;

  // 将所有选中的图元锁定
  const pens = selections.pens || [];
  pens.forEach((pen) => {
    meta2d.setValue({
      id: pen?.id,
      locked: 2,
    });
  });
  hasLocked.value = true;
  meta2d.render();
}

function unlock() {
  closeContextMenu();

  if (!meta2d)
    return;
  if (!hasPen.value)
    return;

  // 将所有选中的图元解锁
  const pens = selections.pens || [];
  pens.forEach((pen) => {
    meta2d.setValue({
      id: pen?.id,
      locked: 0,
    });
  });
  hasLocked.value = false;
  meta2d.render();
}

function lockFile() {
  closeContextMenu();

  if (!meta2d)
    return;
  if (hasPen.value)
    return;
  // 没有选中则锁定整张图纸
  useConfirm({
    title: '提示',
    content: '确定要将整张图纸锁定吗？',
    ok() {
      meta2d.lock(2);
      hasLockedFile.value = true;
    },
  });
}

function unlockFile() {
  closeContextMenu();

  if (!meta2d)
    return;
  if (hasPen.value)
    return;
  // 没有选中则锁定整张图纸
  useConfirm({
    title: '提示',
    content: '确定要将整张图纸解锁吗？',
    ok() {
      meta2d.lock(0);
      hasLockedFile.value = false;
    },
  });
}

function combine() {
  closeContextMenu();

  if (!meta2d)
    return;
  if (!isPens.value)
    return;

  meta2d.combine(selections.pens as Pen[]);
}

function uncombine() {
  closeContextMenu();

  if (!meta2d)
    return;
  const pen = selections.pen;
  if (!pen?.children?.length)
    return;
  meta2d.uncombine(pen as Pen);
}

function cut() {
  closeContextMenu();

  if (!meta2d)
    return;
  if (!hasPen.value) {
    meta2d.cut();
    return;
  }
  meta2d.cut(selections.pens as Pen[]);
}

function copy() {
  closeContextMenu();

  if (!meta2d)
    return;
  if (!hasPen.value) {
    meta2d.copy();
    return;
  }
  meta2d.copy(selections.pens as Pen[]);
}

function paste() {
  closeContextMenu();

  if (!meta2d)
    return;
  meta2d.paste();
}

function up() {
  closeContextMenu();

  if (!meta2d)
    return;
  if (!hasPen.value || isPens.value)
    return;

  meta2d.up(selections.pen as Pen);
}

function down() {
  closeContextMenu();

  if (!meta2d)
    return;
  if (!hasPen.value || isPens.value)
    return;

  meta2d.down(selections.pen as Pen);
}

function top() {
  closeContextMenu();

  if (!meta2d)
    return;
  if (!hasPen.value || isPens.value)
    return;

  meta2d.top(selections.pen as Pen);
}

function bottom() {
  closeContextMenu();

  if (!meta2d)
    return;
  if (!hasPen.value || isPens.value)
    return;

  meta2d.bottom(selections.pen as Pen);
}

const isViewMounted = inject('isViewMounted') as Ref<boolean>;
const isTranslating = ref(false);
const show = computed({
  get() {
    return showContextMenu.value;
  },
  set(val) {
    if (val && isTranslating.value) // 正在拖动画布，忽略状态改变
      return false;

    showContextMenu.value = val;
  },
});

const timer = shallowRef<NodeJS.Timeout | null>(null);
onMounted(async () => {
  await until(isViewMounted);
  setLockedState();

  meta2d.on('translate', () => {
    isTranslating.value = true;
    if (timer.value)
      clearTimeout(timer.value);
    timer.value = setTimeout(() => {
      isTranslating.value = false;
      timer.value = null;
    }, 200);
  });
});
</script>

<template>
  <a-trigger v-model:popup-visible="show" trigger="contextMenu" align-point @popup-visible-change="setLockedState">
    <slot />
    <template #content>
      <div w-160px bg="[var(--color-bg-popup)]" border="1 base" py-2px shadow-lg>
        <a-doption :disabled="!hasPen || isPens" @click="top">
          置顶
        </a-doption>
        <a-doption :disabled="!hasPen || isPens" @click="bottom">
          置底
        </a-doption>
        <a-doption :disabled="!hasPen || isPens" @click="up">
          上一个图层
        </a-doption>
        <a-doption :disabled="!hasPen || isPens" @click="down">
          下一个图层
        </a-doption>

        <div my-2px border-t-1 border-base border-solid />

        <a-doption v-if="!hasLockedFile && !hasPen" @click="lockFile">
          锁定图纸
        </a-doption>
        <a-doption v-if="hasLockedFile && !hasPen" @click="unlockFile">
          取消锁定图纸
        </a-doption>
        <a-doption v-if="!hasLocked && hasPen" :disabled="hasLockedFile" @click="lock">
          锁定
        </a-doption>
        <a-doption v-if="hasLocked && hasPen" :disabled="hasLockedFile" @click="unlock">
          取消锁定
        </a-doption>
        <a-doption v-if="showCombine" @click="combine">
          组合
        </a-doption>
        <a-doption v-if="showUncombine" @click="uncombine">
          取消组合
        </a-doption>

        <div my-2px border-t-1 border-base />

        <a-doption :disabled="!hasPen" @click="remove">
          删除
        </a-doption>

        <div my-2px border-t-1 border-base border-solid />

        <a-doption @click="undo">
          <div w-full flex items-center justify-between>
            <div>撤销</div>
            <div font-mono>
              Ctrl + Z
            </div>
          </div>
        </a-doption>
        <a-doption @click="redo">
          <div flex items-center justify-between>
            <div>重做</div>
            <div font-mono>
              Shift + Z
            </div>
          </div>
        </a-doption>

        <div my-2px border-t-1 border-base border-solid />

        <a-doption @click="cut">
          <div flex items-center justify-between>
            <div>剪切</div>
            <div font-mono>
              Ctrl + X
            </div>
          </div>
        </a-doption>
        <a-doption @click="copy">
          <div flex items-center justify-between>
            <div>复制</div>
            <div font-mono>
              Ctrl + C
            </div>
          </div>
        </a-doption>
        <a-doption @click="paste">
          <div flex items-center justify-between>
            <div>粘贴</div>
            <div font-mono>
              Ctrl + V
            </div>
          </div>
        </a-doption>
      </div>
    </template>
  </a-trigger>
</template>

<style scoped>
:deep(.arco-dropdown-option-content) {
  width: 100%;
}
</style>
