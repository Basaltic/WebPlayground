import Html from 'slate-html-serializer';
import { BoldMark, CodeMark, ItalicMark, MarkType } from '../marks';
import React from 'react';
import { NodeType } from '../nodes';

const rules = [
  {
    serialize(obj: any, children: any) {
      if (obj.object === 'inline') {
        switch (obj.type) {
          case NodeType.PARAGRAPH:
            return <div>{children}</div>;
          case NodeType.IMAGE:
            return <div>{children}</div>;
          case NodeType.PRODUCT_CONTAINER:
            return <div>{children}</div>;
        }
      } else if (obj.object === 'block') {
        switch (obj.type) {
          case NodeType.PARAGRAPH:
            return <p>{children}</p>;
          case NodeType.IMAGE:
            return <div>Image</div>;
          case NodeType.EDITABLE_IMAGE:
            return <div>Editable Image</div>;
          case NodeType.PRODUCT_CONTAINER:
            return <div>{children}</div>;
        }
      } else if (obj.object === 'mark') {
        switch (obj.type) {
          case MarkType.BOLD:
            return <BoldMark>{children}</BoldMark>;
          case MarkType.CODE:
            return <CodeMark>{children}</CodeMark>;
          case MarkType.ITALIC:
            return <ItalicMark>{children}</ItalicMark>;
        }
      }
    },
  },
];

const html = new Html({ rules });

export default html;
