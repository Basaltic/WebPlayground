import { BoxProperty } from '.'

export interface Size {
  width?: BoxProperty
  height?: BoxProperty
  minWidth?: BoxProperty
  minHeight?: BoxProperty
  maxWidth?: BoxProperty
  maxHeight?: BoxProperty
}

/**
 * 对于大小相关的属性，0 ~ 1之间 为百分比，否则为px
 */
function process(v: number) {
  return v <= 1 && v > 0 ? `${v * 100}%` : `${v}px`
}

const width: BoxProperty = {
  process
}

const height: BoxProperty = {
  process
}

const minWidth: BoxProperty = {
  process
}

const minHeight: BoxProperty = {
  process
}

const maxWidth: BoxProperty = {
  process
}

const maxHeight: BoxProperty = {
  process
}

const size: Size = {
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight
}

export default size
