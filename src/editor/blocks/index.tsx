import React from 'react'
import { Editor } from 'slate'
import { RenderNodeProps } from 'slate-react';
import Image from './Image'

export enum BlockType {
  IMAGE = 'image',
  EDITABLE_IMAGE = 'editable_image',
  AI_TITLE = 'ai_title',
}

export default (props: RenderNodeProps, editor: Editor, next: () => any) => {
  switch (props.node.type) {
    case BlockType.IMAGE:
      return <Image {...props}/>
    default:
      return next()
  }
}
