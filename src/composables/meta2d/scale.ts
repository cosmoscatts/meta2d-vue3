const scale = ref(0)
const disableScale = ref(true)

export function useScale() {
  function updateDisableScale(isViewMounted: Ref<boolean> | boolean) {
    const isMounted = unref(isViewMounted)
    if (!isMounted) {
      disableScale.value = true
      return
    }
    disableScale.value = meta2d.getOptions()?.disableScale || false
  }

  function scaleSubscriber(val = 0) {
    scale.value = Math.round(val * 100)
  }

  function getScaleByInterval() {
    const timer = setInterval(() => {
      if (meta2d) {
        clearInterval(timer)
        scaleSubscriber(meta2d.store.data.scale)
        meta2d.on('scale', scaleSubscriber)
      }
    }, 200)
  }

  return {
    scale,
    disableScale,
    updateDisableScale,
    getScaleByInterval,
    scaleSubscriber,
  }
}
