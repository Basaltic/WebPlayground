import size, { Size } from './size';
import space, { Space } from './space';
import border, { Border } from './border';
import basic, { Basic } from './basic';
import position, { Position } from './position';
import flex, { Flex } from './flex';

export interface BoxProperty<V = any> {
  // inline style property key
  property?: string;
  // raw css property key
  cssProperty?: string;
  // process the value to
  process?: (v: V) => any;
}

export interface Properties {
  [key: string]: BoxProperty;
}

export interface IProps extends Basic, Size, Space, Border, Position, Flex {}

const properties: Properties = Object.assign({}, size, space, border, basic, position, flex);

export default properties;
// 处理样式property
export function propsToInlineStyle(props: IProps) {
  // 这里可以加一个全局的memorize 结果，通过props作为key， 如果props相同那么结果也是一样的，不需要反复计算
  if (props) {
    const styles: any = {};

    Object.entries(props).forEach(entry => {
      const key = entry[0];
      const value = entry[1];

      const property: BoxProperty = properties[key];
      if (property) {
        if (property.property && property.process) {
          styles[property.property] = property.process(value);
        } else if (property.property) {
          styles[property.property] = value;
        } else if (property.process) {
          styles[key] = property.process(value);
        } else {
          styles[key] = value;
        }
      }
    });
    return styles;
  }
  return {};
}
