<script setup lang="ts">
import { s8 } from '@meta2d/core'
import type { Pen } from '@meta2d/core'
import type { WritableComputedRef } from 'vue'
import { createPointOptions } from './mock'
import { createBaseCombinePoint, signalInfoMap } from '~/const'

const props = defineProps<{
  equipId: string
  hasSeletedEquip: boolean
}>()

const { selections, select } = useMeta2dSelection()

// 已经创建的测点
const createdPointInfo = ref<Record<string, string[]>>({}) // { [key]: ['A', 'V', ...] }

const pointOptions = ref<{
  value: string
  label: string
}[]>([])

const ponitsCheckData = ref<string[]>([]) // string[]
const signalCheckData = ref<Record<string, string[]>>({}) // { [key]: ['A', 'V', ...] }

const pointIdKeyMap = ref<Record<string, string[]>>({}) // 旧测点数据映射，key - `pointId-signalType` 对应的是 dataId, 需要和 id 做一个绑定，{ key: [ids] }

const selectedPointIds = computed({
  get() {
    return ponitsCheckData.value
  },
  set(val) {
    const _signalCheckData = {} as Record<string, string[]>
    Object.keys(signalCheckData.value).forEach((id) => {
      if (val.includes(id)) {
        if (!ponitsCheckData.value.includes(id))
          _signalCheckData[id] = ['A', 'V', 'D', 'T']
        else
          _signalCheckData[id] = signalCheckData.value[id]
      }
      else {
        _signalCheckData[id] = []
      }
    })
    signalCheckData.value = _signalCheckData
    ponitsCheckData.value = val
  },
})

const selectedSignalComputedMap = ref({})

function createSelectedSignalComputedMap() {
  const ids = pointOptions.value.map(i => i.value)
  const map = {} as Record<string, WritableComputedRef<string[]>>
  ids.forEach((id) => {
    map[id] = computed({
      get() {
        return signalCheckData.value[id]
      },
      set(val) {
        if (val.length > 0 && !ponitsCheckData.value.includes(id))
          ponitsCheckData.value = [...ponitsCheckData.value, id]

        if (!val.length && ponitsCheckData.value.includes(id))
          ponitsCheckData.value = [...ponitsCheckData.value.filter(i => i !== id)]

        const newSignalCheckData = signalCheckData.value
        newSignalCheckData[id] = val
        signalCheckData.value = newSignalCheckData
      },
    })
  })
  selectedSignalComputedMap.value = map
}

function setSignalData() {
  getAllCreatedPoints()
  const _createdPointInfo = createdPointInfo.value
  const _createdPointIds = Object.keys(_createdPointInfo)
  const _signalCheckData = {} as Record<string, string[]>
  const _ponitsCheckData = [] as string[]
  pointOptions.value.forEach(({ value }) => {
    if (_createdPointIds.includes(value)) {
      _signalCheckData[value] = _createdPointInfo[value]
      _ponitsCheckData.push(value) // 设置测点
    }
    else {
      _signalCheckData[value] = []
    }
  })
  signalCheckData.value = _signalCheckData
  ponitsCheckData.value = _ponitsCheckData
}

watch(() => props.equipId, (n) => {
  if (n) {
    const options = createPointOptions(n)
    pointOptions.value = options
    setSignalData()
    createSelectedSignalComputedMap()
  }
})

function getAllCreatedPoints() {
  if (!meta2d || !props.hasSeletedEquip)
    return
  const pointPens = meta2d.find('hasPointId')
  if (!pointPens.length) {
    createdPointInfo.value = {}
    pointIdKeyMap.value = {}
    return
  }

  const pointPenIds = pointPens.map(pen => pen.id)
  const currentEquipPoints = meta2d.find(props.equipId).filter(pen => pointPenIds.includes(pen.id))
  createdPointInfo.value = currentEquipPoints.reduce((prev, cur) => {
    const tags = cur.tags || []
    const pointId = tags.length === 3 ? tags[1] : ''
    if (!pointId)
      return prev
    const o = prev[pointId] || []
    prev[pointId] = [...o, getSignalTypeValue(cur) || ''].filter(i => i !== '')
    return prev
  }, {} as Record<string, string[]>)

  pointIdKeyMap.value = currentEquipPoints.reduce((prev, cur) => {
    const dataId = (cur as any).dataId
    if (!dataId)
      return prev
    const o = prev[dataId] || []
    prev[dataId] = [...o, cur.id].filter(Boolean) as string[]
    return prev
  }, {} as Record<string, string[]>)
}

/**
 * 自动生成测点
 * 实现：
 *  - 插入新选中的
 *  - 删除之前选中现在未选中的
 */
function autoGeneratePoints() {
  // 先统一转换成 'pointId-signalType' 后统一比较
  const format = (obj: Record<string, string[]>) => {
    return Object.entries(obj).reduce((prev, cur) => {
      const [key, value] = cur
      if (value.length) {
        value.forEach((val) => {
          prev.push(`${key}-${val}`)
        })
      }
      return prev
    }, [] as string[])
  }

  const oldSigns = format(createdPointInfo.value)
  const currentSigns = format(signalCheckData.value)

  const add = [] as string[]
  const remove = [] as string[]
  oldSigns.forEach((i) => {
    if (!currentSigns.includes(i))
      remove.push(i)
  })
  currentSigns.forEach((i) => {
    if (!oldSigns.includes(i))
      add.push(i)
  })
  const addPens = add.map((key, idx) => {
    const lastDividerIndex = key.lastIndexOf('-')
    const [pointId, signalType] = [key.slice(0, lastDividerIndex), key.slice(lastDividerIndex + 1)]
    const pointName = pointOptions.value.find(i => i.value === pointId)?.label || '测点名称'
    const signalInfo = signalInfoMap[signalType] || signalInfoMap.A
    const id = s8()
    const pointObj = createBaseCombinePoint(
      pointName,
      signalInfo.nameText,
      signalInfo.valueText,
      '时间',
      { id, dataId: key, tags: [props.equipId, pointId, 'hasPointId'] },
    )
    pointObj[0].x = 30 + idx * 10
    pointObj[0].y = 30
    pointObj.forEach((o: any, idx: number) => {
      if (idx > 0)
        o.parentId = id
    })
    return pointObj
  }).flat(2)
  if (addPens.length)
    meta2d.addPens(addPens)

  if (remove.length) {
    const removeIds = [] as string[]
    // 找到所有子节点 id
    remove.forEach((key) => {
      const ids = pointIdKeyMap.value[key] || []
      if (ids.length) {
        removeIds.push(...ids)
        const fn = (id: string) => {
          const pen = meta2d.findOne(id)
          if (pen && pen.children?.length)
            pen.children.forEach(pid => removeIds.push(pid))
        }
        ids.forEach(fn)
      }
    })
    const pens = selections.pens as Pen[]
    meta2d.delete(removeIds.map((id) => {
      return {
        id,
      }
    }))
    // 解决删除数据后失去焦点的问题
    select(pens)
  }
  setSignalData() // 重置数据
}
</script>

<template>
  <div px-3 min-h-150px max-h-350px of-x-hidden of-y-auto border-box flex items-center justify-center>
    <div v-if="!hasSeletedEquip" flex="~ col  gap-4" items-center justify-center>
      <div i-solar:inbox-broken text-64px op-10 />
      请先绑定设备
    </div>

    <div v-else flex="~ col gap-3" py-4>
      <div grid="~ cols-2">
        <div col-span-1 />
        <div grid="~ cols-4">
          <div v-for="i in 4" :key="i" col-span-1>
            {{ ['A', 'V', 'D', 'T'][i - 1] }}
          </div>
        </div>
      </div>
      <a-checkbox-group v-model="selectedPointIds">
        <div v-for="item in pointOptions" :key="item.value" grid="~ cols-2">
          <a-checkbox :value="item.value" col-span-1>
            {{ item.label }}
          </a-checkbox>
          <div col-span-1>
            <a-checkbox-group v-model="(selectedSignalComputedMap as any)[item.value]">
              <div grid="~ cols-4" of-hidden>
                <a-checkbox v-for="j in 4" :key="j" :value="['A', 'V', 'D', 'T'][j - 1]" />
              </div>
            </a-checkbox-group>
          </div>
        </div>
      </a-checkbox-group>

      <div flex items-center justify-center gap-2>
        <a-button type="dashed" size="small" @click="autoGeneratePoints">
          应用到画布
        </a-button>
        <a-button type="dashed" status="warning" size="small" @click="setSignalData">
          重置
        </a-button>
      </div>
    </div>
  </div>
</template>
