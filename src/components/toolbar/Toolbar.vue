<script setup lang="ts">
import ToolbarText from './ToolbarText.vue';

const isViewMounted = inject('isViewMounted') as Ref<boolean>;

const { scale, disableScale, updateDisableScale, getScaleByInterval } = useScale();

onMounted(async () => {
  await until(isViewMounted);
  updateDisableScale(isViewMounted);
  getScaleByInterval();
});
</script>

<template>
  <div flex items-center justify-center gap-2 xl:gap-3>
    <ToolbarUndo />

    <ToolbarRedo />

    <a-divider direction="vertical" />

    <ToolbarText />

    <ToolbarPen />

    <ToolbarPencil />

    <ToolbarLine />

    <ToolbarDrawLine />

    <ToolbarAnchor />

    <a-divider direction="vertical" />

    <ToolbarLineType />

    <ToolbarFromArrow />

    <ToolbarToArrow />

    <a-divider direction="vertical" />

    <ToolbarMiniMap />

    <ToolbarMagnifier />

    <ToolbarPreview />

    <ToolbarFile />

    <a-divider direction="vertical" />

    <ToolbarScaleDefault />

    <ToolbarFocus />

    <ToolbarTopView />

    <ToolbarLayout />

    <a-divider direction="vertical" />

    <div op-50 text-lg>
      {{ scale }}%
    </div>
    <div v-if="disableScale" text-sm op-30>
      (已禁用缩放)
    </div>
  </div>
</template>
