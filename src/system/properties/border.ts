import { BoxProperty, Properties } from ".";

export interface Border {
  border?: number;
  borderTop?: number;
  borderLeft?: number;
  borderRight?: number;
  borderBottom?: number;
  borderRadius?: number | number[];
}

function numberProcess(v: number) {
  return v <= 1 && v > 0 ? `${v * 100}%` : `${v}px`
}

/**
 * 现在接受两种方式
 * 1.当个数字
 * 2.数字列表
 * @param v 
 */
function borderRadiusProcess(v: number | number[]) {
  if (Array.isArray(v)) {
    if (v.length > 4) {
      return v.slice(0, 4).map((n) => numberProcess(n)).join(' ')
    } else {
      return v.map((n) => numberProcess(n)).join(' ')
    }
  } else {
    return numberProcess(v);
  }
}

/**
 * 1.数字，默认 solid, 默认 颜色
 */
function borderProcess(v: number) {
  return `${v}px solid`
}

const border: BoxProperty = {
  process: borderProcess
}

const borderTop: BoxProperty = {
  process: borderProcess
}

const borderLeft: BoxProperty = {
  process: borderProcess
}

const borderRight: BoxProperty = {
  process: borderProcess
}

const borderBottom: BoxProperty = {
  process: borderProcess
}

const borderRadius: BoxProperty = {
  cssProperty: 'border-radius',
  process: borderRadiusProcess
};


const properties: Properties = {
  border,
  borderTop,
  borderLeft,
  borderRight,
  borderBottom,

  borderRadius
};

export default properties;
