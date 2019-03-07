import React from "react";
import { IProps, propsToInlineStyle } from "./properties";

interface Props {
  onClick?: () => void
}


export default (props: Props & IProps & JSX.ElementChildrenAttribute) => {
  const style = propsToInlineStyle(props);

  return <div style={style} onClick={props.onClick}>{props.children}</div>;
};

