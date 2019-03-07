import React, { useEffect, useLayoutEffect } from 'react'
import { RenderNodeProps } from 'slate-react';
import { BlockJSON, Block, Text } from 'slate'
import { NodeType } from '../../nodes';
import { fromJS } from 'immutable'




export default (props: RenderNodeProps) => {
  const { attributes, children, node, editor } = props

  useLayoutEffect(() => {
    // node.insertNode()
    const blockNode = Block.create({
      type: NodeType.IMAGE,
    })
    console.log(node.getPath(node.key).toString())
    // node.insertNode(fromJS([0]), blockNode)
    node.setNode(fromJS([]), Text.create('test'))
    editor.replaceNodeByKey(node.key, node)
  }, [])


  return (
    <div {...attributes} style={{ borderTop: '1px solid red', borderBottom: '1px solid red' }}>
      {children}
    </div>
  )
}