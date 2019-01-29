import React from "react";
import { IProps, propsToInlineStyle } from "./properties";


export default (props: IProps & JSX.ElementChildrenAttribute) => {
  const style = propsToInlineStyle(props);

  return <div style={style}>{props.children}</div>;
};

