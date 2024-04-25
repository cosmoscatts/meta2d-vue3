<script setup lang="ts">
const { fixed = [], nameMap = {} } = defineProps<{
  fixed?: string[]
  nameMap?: Record<string, string>
}>()
const visible = defineModel<boolean>('visible')
const graphicsDataKey = defineModel<string[]>('graphicsDataKey')

const checked = ref<string[]>([])

function init() {
  let data = graphicsDataKey.value || []
  const notExistFixed = fixed.filter(i => !data.includes(i))
  if (notExistFixed.length)
    data = [...notExistFixed, ...data]
  checked.value = data
}

watch(visible, (n) => {
  if (n)
    init()
})

function isDisabled(value: string) {
  return fixed.includes(value)
}

const options = computed(() => {
  return Object.entries(nameMap)
    .reduce((prev, cur) => {
      const [value, label] = cur
      prev.push({
        value,
        label,
        disabled: isDisabled(value),
      })
      return prev
    }, [] as { value: string, label: string, disabled: boolean }[])
})

function close() {
  visible.value = false
}

function ok() {
  const sorted = Object.keys(nameMap).filter(i => checked.value.includes(i))
  graphicsDataKey.value = sorted
  close()
}
</script>

<template>
  <a-modal v-model:visible="visible" title="图形库管理" :width="500" @ok="ok" @cancel="close">
    <div>
      <a-checkbox-group v-model="checked" :options="options" direction="vertical" />
    </div>
  </a-modal>
</template>
