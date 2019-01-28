import React from "react";
import properties, { BoxProperty } from "./properties";

interface IProps {
  width?: number;
  height?: number;
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number

  
}

export default (props: IProps & JSX.ElementChildrenAttribute) => {
  const style = propsToStyle(props);

  return <div style={style}>{props.children}</div>;
};

// 处理样式property
function propsToStyle(props: IProps) {
  if (props) {
    const styles: any = {};

    Object.entries(props).forEach(entry => {
      const key = entry[0];
      const value = entry[1];

      const property: BoxProperty = properties[key];
      if (property) {
        if (property.cssProperty && property.process) {
          styles[property.cssProperty] = property.process(value);
        } else if (property.cssProperty) {
          styles[property.cssProperty] = value
        } else if (property.process) {
          styles[key] = property.process(value)
        } else {
          styles[key] = value
        }
      }
    });

    return styles;
  }

  return {};
}
