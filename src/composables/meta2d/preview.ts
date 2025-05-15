import { deepClone } from '@meta2d/core';
import { getDefaultOptions } from '~/const';

const visible = ref(false);
const snapshotDisableScale = ref<boolean>(getDefaultOptions().disableScale); // 保存是否缩放

export function usePreview() {
  function preview() {
    // 先停止动画，避免数据波动
    meta2d.stopAnimate();
    // 本地存储
    const data = deepClone(meta2d.data());
    const json = JSON.stringify(data);
    localStorage.setItem('meta2d', json);
    snapshotDisableScale.value = meta2d.getOptions().disableScale ?? getDefaultOptions().disableScale;
    visible.value = true;
  }

  return {
    visible,
    preview,
    snapshotDisableScale,
  };
}
