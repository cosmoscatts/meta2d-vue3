import type { Meta2d } from '@meta2d/core'

export {}
declare global {
  const meta2d: Meta2d
  const C2S: any

  interface UserTemplate {
    id: string
    image: string
    name: string
    data: any
  }

  interface FileProps {
    grid?: boolean
    gridSize?: number
    gridColor?: string
    rule?: boolean
    ruleColor?: string
    background?: string
    disableScale?: boolean
    activeColor?: string // 选中颜色
    hoverColor?: string // 悬浮颜色
  }
}
