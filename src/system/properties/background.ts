import { BoxProperty, Properties } from ".";

export interface Background {
  backgroundColor?: string;
}

const backgroundColor: BoxProperty = {
  cssProperty: 'background-color',
};

const properties: Properties = {
  backgroundColor
};

export default properties;
