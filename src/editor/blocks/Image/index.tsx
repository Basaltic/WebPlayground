import React from 'react'
import { RenderNodeProps } from 'slate-react';

export default (props: RenderNodeProps) => {
  console.log(props.node.get('data').get('url'))
  return (<div>Image</div>)
}
