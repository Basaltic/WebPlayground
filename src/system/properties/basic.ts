import { BoxProperty, Properties } from '.';

export interface Basic {
  color?: string;
  opacity?: number;
  display?: 'flex' | 'block' | 'inline' | 'table';
}

const color: BoxProperty = {};

const display: BoxProperty = {};

const opacity: BoxProperty = {};

const properties: Properties = {
  color,
  display,
  opacity,
};

export default properties;
