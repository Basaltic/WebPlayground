import Html from 'slate-html-serializer'
import { BoldMark, CodeMark, ItalicMark, MarkType } from '../marks'
import React from 'react'

const rules = [
  {
    serialize(obj: any, children: any) {
      if (obj.object === 'block') {
        switch (obj.type) {
          case 'paragraph':
            return <p>{children}</p>
        }
      } else if (obj.object === 'mark') {
        switch (obj.type) {
          case MarkType.BOLD:
            return <BoldMark>{children}</BoldMark>
          case MarkType.CODE:
            return <CodeMark>{children}</CodeMark>
          case MarkType.ITALIC:
            return <ItalicMark>{children}</ItalicMark>
        }
      }
    }
  }
]

const html = new Html({ rules })

export default html
