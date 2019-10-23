declare module 'electron-devtools-installer'
declare module 'source-map-support'

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  require: any
}

interface HTMLElement {
  createTextRange: () => void
  collapse: () => void
  select: () => void
}

interface Document {
  selection: any
}

// 这些模块没有 types 文件

declare module 'validator'
declare module 'date-format'
declare module '@tencent/bere'
declare module '@tencent/bere-o'
declare module 'mobx-react-form'
declare module 'file-extension'
declare module 'react-tagsinput'

declare module 'react-redux'

declare module 'pixi.js'

declare module 'gsap/Draggable'
