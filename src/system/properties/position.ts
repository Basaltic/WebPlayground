import { BoxProperty, Properties } from ".";

export interface Position {
  top?: number
  left?: number
  right?: number
  bottom?: number
  zIndex?: number
  float?: 'none' | 'left' | 'right' | 'inline-start' | 'inline-end'
  position?: 'static' | 'relative' | 'absolute' | 'fixed'
}

function process(v: number) {
  return v <= 1 && v > 0 ? `${v * 100}%` : `${v}px`
}

const top: BoxProperty = {
  process
}

const left: BoxProperty = {
  process
}
const right: BoxProperty = {
  process
}
const bottom: BoxProperty = {
  process
}
const position: BoxProperty = {
  process: v => v
}
const float: BoxProperty = {
  process: v => v
}
const zIndex: BoxProperty = {
  cssProperty: 'z-index',
  process: v => v
}

const properties: Properties = {
  top,
  left,
  right,
  bottom,
  zIndex,
  
  float,
  position,
};

export default properties;