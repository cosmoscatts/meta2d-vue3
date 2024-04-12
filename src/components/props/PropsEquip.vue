<script setup lang="ts">
import type { Pen } from '@meta2d/core'
import { equipOptions } from './mock'

const { selections } = useMeta2dSelection()

/**
 * dataId -> 设备 id
 * pen tags -> ['equipId', 'hasEquipId']
 */

const form: any = reactive({
  equipId: '',
  id: '',
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  image: '', // 图片
})

function getPen() {
  const pen = selections.pen as Pen
  if (!pen)
    return

  form.equipId = ''

  const tags = pen.tags || []
  if (tags.includes('hasEquipId') && tags.length === 2) {
    if (equipOptions.map(i => i.value).includes(tags[0]))
      form.equipId = tags[0] || ''
  }

  form.id = pen.id || ''

  const rect = meta2d.getPenRect(pen)
  if (rect) {
    form.x = rect.x || 0
    form.y = rect.y || 0
    form.width = rect.width || 0
    form.height = rect.height || 0
  }

  form.image = pen.image || ''
}

// 监听选中不同图元
watch(() => selections.pen?.id, getPen)

const hasSeletedEquip = computed(() => {
  const equipId = form.equipId || ''
  if (equipId === '')
    return false
  return equipOptions.map(i => i.value).includes(equipId)
})

const lineDashs = [undefined, [5, 5]]

function changeValue(prop: string) {
  if (prop === 'equipId') {
    meta2d.setValue({ id: form.id, dataId: form.equipId, tags: [form.equipId, 'hasEquipId'] }, { render: true })
    return
  }
  const v = { id: form.id } as any
  v[prop] = form[prop]
  if (prop === 'dash')
    v.lineDash = lineDashs[v[prop]]

  meta2d.setValue(v, { render: true })
}

function changeRect(prop: string) {
  const v = { id: form.id } as any
  v[prop] = form[prop]
  meta2d.setValue(v, { render: true })
}

async function onBgImageChange(file) {
  if (!checkImage(file.raw))
    return

  const imageUrl = await getFileBase64(file.raw)
  form.image = imageUrl
  changeValue('image')
  $message.success('添加背景图片成功')
}

function checkImage(file) {
  const isLt2M = file.size / 1024 / 1024 < 2
  const isImage = file.type.startsWith('image')
  if (!isImage)
    $message.error('请上传图片!')

  if (!isLt2M)
    $message.error('上传图片大小不能超过 2MB!')

  return isImage && isLt2M
}

onMounted(() => {
  getPen()
  meta2d.on('update', getPen)
  meta2d.on('resizePens', getPen)
  meta2d.on('rotatePens', getPen)
  meta2d.on('valueUpdate', getPen)
})
</script>

<template>
  <div>
    <el-form :model="form" label-position="right" label-width="80px" size="mini" w-full min-w-190px>
      <div mb-4 font-bold text-xl>
        设备
      </div>

      <el-form-item label="设备">
        <el-select v-model="form.equipId" style="width: 100px" @change="changeValue('equipId')">
          <el-option v-for="item in equipOptions" :key="item.value" :value="item.value" :label="item.label" />
        </el-select>
      </el-form-item>
      <Meta2dEquipPropsAutoCreatePoints :equip-id="form.equipId" :has-seleted-equip="hasSeletedEquip" />

      <el-divider />

      <el-form-item label="设备图片">
        <div relative w-90px h-90px rounded flex-center class="img-wrapper">
          <img v-show="form.image" :src="form.image" w-full h-full>
          <div class="img-wrapper-trigger-mask">
            <el-upload
              :show-file-list="false" :auto-upload="false" :on-change="onBgImageChange"
              :before-upload="checkImage"
            >
              <i class="el-icon-camera" icon-btn text-18px />
            </el-upload>
          </div>
        </div>
      </el-form-item>

      <el-divider />

      <el-form-item label="X">
        <el-input-number v-model="form.x" :controls="false" style="width: 100px" @change="changeRect('x')" />
      </el-form-item>
      <el-form-item label="Y">
        <el-input-number v-model="form.y" :controls="false" style="width: 100px" @change="changeRect('y')" />
      </el-form-item>
      <el-form-item label="宽">
        <el-input-number v-model="form.width" :controls="false" style="width: 100px" @change="changeRect('width')" />
      </el-form-item>
      <el-form-item label="高">
        <el-input-number v-model="form.height" :controls="false" style="width: 100px" @change="changeRect('height')" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.img-wrapper {
  border: 1px dashed #dcdfe6;
  border-radius: 5px;
}

.img-wrapper-trigger-mask {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: white;
  font-size: 16px;
  background-color: #1d212999;
  border-radius: 5px;
  opacity: 0;
  transition: all 0.1s cubic-bezier(0, 0, 1, 1);
}

.img-wrapper:hover .img-wrapper-trigger-mask {
  opacity: 1;
}
</style>
