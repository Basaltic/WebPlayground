import { BoxProperty, Properties } from '.'

export interface Space{
  m?: number
  mt?: number
  ml?: number
  mb?: number
  mr?: number
  p?: number
  pt?: number
  pl?: number
  pb?: number
  pr?: number
}

const keyMap: any = {
  m: 'margin',
  p: 'padding',
  t: 'Top',
  b: 'Bottom',
  r: 'Right',
  l: 'Left'
}

const spaceKeys = ['m', 'mt', 'ml', 'mb', 'mr', 'p', 'pt', 'pl', 'pb', 'pr']

function process(v: number) {
  return v <= 1 && v > 0 ? `${v * 100}%` : `${v}px`
}

function generateProperties(): Properties {
  const properties: Properties = {}
  spaceKeys.forEach((key: string) => {
    if (key.length === 1) {
      properties[key] = {
        property:`${keyMap[key]}`,
        cssProperty: `${keyMap[key]}`,
        process
      }
    } else if (key.length === 2) {
      const [a, b] = key.split('')
      properties[key] = {
        property: `${keyMap[a]}${keyMap[b]}`,
        cssProperty: `${keyMap[a]}-${keyMap[b]}`,
        process
      }
    }
  })
  return properties
}

const space: Properties = generateProperties()

export default space
