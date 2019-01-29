import { BoxProperty, Properties } from '.';

export interface Flex {
  // flex-grow flex-shrink flex-basis
  flex?: number | number[] | 'auto' | 'initial' | 'none';
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';

  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  flexBasis?: number;
  order?: number;

  justifyContent?: 'start' | 'end' | 'center' | 'left' | 'right' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch';
  justifyItems?: 'center' | 'start' | 'end' | 'stretch' | 'left' | 'right' | 'flex-start' | 'flex-end' | 'self-start' | 'self-end';
  justifySelf?: 'center' | 'start' | 'end' | 'stretch' | 'left' | 'right' | 'flex-start' | 'flex-end' | 'self-start' | 'self-end';

  alignContent?: 'center' | 'start' | 'end' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'center' | 'start' | 'end' | 'stretch';
  alignSelf?: 'center' | 'start' | 'end' | 'stretch';
}

function flexProcess(v: number | number[]) {
  if (Array.isArray(v)) {
    if (v.length === 1) {
      return `${v[0]}`;
    } else if (v.length === 2) {
      return `${v[0]} ${v[1]}`;
    } else if (v.length >= 3) {
      return `${v[0]} ${v[1]} ${2}`;
    }
  } else {
    return `${v}`;
  }
}

const flex: BoxProperty = {
  process: flexProcess,
};

const flexDirection: BoxProperty = {
  cssProperty: 'flex-direction'
};

const flexWrap: BoxProperty = {
  cssProperty: 'flex-wrap'
};

const flexBasis: BoxProperty = {
  process: v => `${v}px`,
  cssProperty: 'flex-basis'
};

const order: BoxProperty = {};

const justifyContent: BoxProperty = {
  cssProperty: 'justify-content'
};

const justifyItems: BoxProperty = {
  cssProperty: 'justify-items'
};

const justifySelf: BoxProperty = {
  cssProperty: 'justify-self'
};

const alignContent: BoxProperty = {
  cssProperty: 'align-content'
};
const alignItems: BoxProperty = {
  cssProperty: 'align-items'
};
const alignSelf: BoxProperty = {
  cssProperty: 'align-self'
};

const properties: Properties = {
  flex,
  flexDirection,
  flexWrap,
  flexBasis,
  order,

  justifyContent,
  justifyItems,
  justifySelf,

  alignContent,
  alignItems,
  alignSelf,
};

export default properties;
