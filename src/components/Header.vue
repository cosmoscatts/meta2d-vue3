<script setup lang="ts">
import { deepClone } from '@meta2d/core'
import logo from '/public/favicon.ico'
import { version } from '/package.json'

const toggleTheme = toggleDark

const { getScaleByInterval } = useScale()

function save() {
  Message.success('图纸数据已保存成功')
  const data = deepClone(meta2d.data())
  localStorage.setItem('meta2d', JSON.stringify(data))
}

function clear() {
  useConfirm({
    title: '提示',
    content: '确定要清空图纸吗？',
    ok() {
      meta2d.clear()
      Message.success('清空图纸成功')
      getScaleByInterval()
    },
  })
}

const refForm = ref()
const visible = ref(false)
const form = reactive({
  name: '',
})
const { loadTemplates } = useUserComponents()

function openModal() {
  form.name = ''
  visible.value = true
}

async function handleBeforeOk() {
  const errors = await refForm.value.validate()
  if (errors)
    return false
  return true
}

function saveAsTemplate() {
  const isInfinity = (val?: number) => !Number.isFinite(val)
  const data = meta2d.toComponent()
  if (Array.isArray(data)) {
    const { width, height } = data[0]
    if ([width, height].some(isInfinity)) {
      Message.error('当前组态没有内容')
      return
    }
  }
  const image = meta2d.toPng(10)
  const cacheStr = localStorage.getItem('meta2d-templates')
  let caches = cacheStr ? JSON.parse(cacheStr) : undefined

  if (!caches)
    caches = []

  caches = [...caches, { id: getRandomStr(6), name: form.name, data, image }]
  localStorage.setItem('meta2d-templates', JSON.stringify(caches))
  loadTemplates()
  Message.success('另存为组件成功')
  visible.value = false
}
</script>

<template>
  <div h-50px flex justify-between items-center border-b="1 solid" border-base px-4 shadow>
    <div font-bold text-lg flex items-center gap-3 text-base>
      <img :src="logo" h-36px rounded>
      2D可视化
      <span op50 font-mono inline-block translate-y--2 text-0.6em font-200> v{{ version }} </span>
    </div>

    <Toolbar />

    <div flex items-center gap-2>
      <div action-button-active @click="save">
        保存
      </div>

      <div action-button @click="clear">
        清空
      </div>

      <div action-button @click="openModal">
        另存为组件
      </div>

      <button
        title="切换主题" cursor-pointer
        i-ph-sun-dim-duotone dark:i-ph-moon-stars-duotone text-xl op50 hover:op75
        @click="toggleTheme"
      />

      <a
        href="https://github.com/cosmoscatts/meta2d-vue3"
        rel="noopener noreferrer" target="_blank"
        i-carbon-logo-github text-lg op50 hover:op75
      />

      <a-modal
        v-model:visible="visible"
        title="自定义组件信息"
        @cancel="visible = false"
        @before-ok="handleBeforeOk"
        @ok="saveAsTemplate"
      >
        <a-form ref="refForm" :model="form">
          <a-form-item
            field="name" label="组件名称"
            :rules="[
              { required: true, message: '组件名称是必须的' },
              { maxLength: 8, message: '最长为8个字符' },
            ]"
          >
            <a-input v-model="form.name" />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>
