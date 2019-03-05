import React from 'react'
import { Editor } from 'slate'
import { RenderNodeProps } from 'slate-react';


export default (props: RenderNodeProps, editor: Editor, next: () => any) => {
  switch (props.node.type) {
    default:
      return next()
  }
}
