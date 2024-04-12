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
}
