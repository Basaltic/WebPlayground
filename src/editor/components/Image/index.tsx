import React, { useState } from 'react';
import { RenderNodeProps } from 'slate-react';

export default (props: RenderNodeProps) => {
  const { node, attributes, children } = props;

  const url = node.get('data').get('url');
  console.log(node.get('data').get('url'));

  return (
    <div {...attributes}>
      <img src={url} style={{ width: 100, height: 100 }} />
      {children}
    </div>
  );
};
