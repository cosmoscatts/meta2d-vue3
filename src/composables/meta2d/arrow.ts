/**
 * 连线左右箭头
 */

import { PenType } from '@meta2d/core'

export function getFormArrowInfo() {
  const currentFromArrow = ref('')
  const fromArrows = [
    { icon: '#l-line', value: '' },
    { icon: '#l-from-triangle', value: 'triangle' },
    { icon: '#l-from-diamond', value: 'diamond' },
    { icon: '#l-from-circle', value: 'circle' },
    { icon: '#l-from-lineDown', value: 'lineDown' },
    { icon: '#l-from-lineUp', value: 'lineUp' },
    { icon: '#l-from-triangleSolid', value: 'triangleSolid' },
    { icon: '#l-from-diamondSolid', value: 'diamondSolid' },
    { icon: '#l-from-circleSolid', value: 'circleSolid' },
    { icon: '#l-from-line', value: 'line' },
  ]

  function changeFromArrow(value: string) {
    currentFromArrow.value = value
    meta2d.store.data.fromArrow = value
    if (meta2d.store.active) {
      meta2d.store.active.forEach((pen) => {
        if (pen.type === PenType.Line) {
          pen.fromArrow = value
          meta2d.setValue(
            {
              id: pen.id,
              fromArrow: pen.fromArrow,
            },
            {
              render: false,
            },
          )
        }
      })
      meta2d.render()
    }
  }

  return {
    currentFromArrow,
    fromArrows,
    changeFromArrow,
  }
}

export function getToArrowInfo() {
  const currentToArrow = ref('')
  const toArrows = [
    { icon: '#l-line', value: '' },
    { icon: '#l-to-triangle', value: 'triangle' },
    { icon: '#l-to-diamond', value: 'diamond' },
    { icon: '#l-to-circle', value: 'circle' },
    { icon: '#l-to-lineDown', value: 'lineDown' },
    { icon: '#l-to-lineUp', value: 'lineUp' },
    { icon: '#l-to-triangleSolid', value: 'triangleSolid' },
    { icon: '#l-to-diamondSolid', value: 'diamondSolid' },
    { icon: '#l-to-circleSolid', value: 'circleSolid' },
    { icon: '#l-to-line', value: 'line' },
  ]

  function changeToArrow(value: string) {
    currentToArrow.value = value
    meta2d.store.data.toArrow = value
    if (meta2d.store.active) {
      meta2d.store.active.forEach((pen) => {
        if (pen.type === PenType.Line) {
          pen.toArrow = value
          meta2d.setValue(
            {
              id: pen.id,
              toArrow: pen.toArrow,
            },
            {
              render: false,
            },
          )
        }
      })
      meta2d.render()
    }
  }

  return {
    currentToArrow,
    toArrows,
    changeToArrow,
  }
}
