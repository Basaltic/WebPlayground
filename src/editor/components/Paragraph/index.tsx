import React from 'react';
import { RenderNodeProps } from 'slate-react';

export default (props: RenderNodeProps) => {
  const { attributes, children } = props;
  return <p {...attributes}>{children}</p>;
};
