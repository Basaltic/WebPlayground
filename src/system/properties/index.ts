import size, { Size } from './size'

export interface BoxProperty<V = any> {
  cssProperty?: string
  process?: (v: V) => any
}

export interface Properties extends Size {
  [key: string]: any
}

const properties: Properties = Object.assign({}, size)

export default properties
