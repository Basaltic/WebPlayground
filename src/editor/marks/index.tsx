import React from 'react'
import { Editor } from 'slate'
import { RenderMarkProps } from 'slate-react'

export enum MarkType {
  BOLD = 'bold',
  CODE = 'code',
  ITALIC = 'italic',
  COLOR = 'color',
  FONT_SIZE = 'font-size'
}

export function BoldMark(props: any) {
  return <strong {...props.attributes}>{props.children}</strong>
}

export function CodeMark(props: any) {
  return <code {...props.attributes}>{props.children}</code>
}

export function ItalicMark(props: any) {
  return <em {...props.attributes}>{props.children}</em>
}

export default (props: RenderMarkProps, editor: Editor, next: () => any) => {
  switch (props.mark.type) {
    case MarkType.BOLD:
      return <BoldMark {...props} />
    case MarkType.CODE:
      return <CodeMark {...props} />
    case MarkType.ITALIC:
      return <ItalicMark {...props} />
    default:
      return next()
  }
}
