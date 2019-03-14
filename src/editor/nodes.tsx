import React from 'react';
import { Editor, Block } from 'slate';
import { RenderNodeProps } from 'slate-react';
import Image from './components/Image';
import EditableImage from './components/EditableImagePixi';
import ProductContainer from './components/ProductContainer';
import Paragraph from './components/Paragraph';

/**
 * Node Type 是相同的
 * 但是分Block 和 Inline
 */

export enum NodeType {
  PARAGRAPH = 'paragraph',

  IMAGE = 'image',
  EDITABLE_IMAGE = 'editable_image',
  PRODUCT_CONTAINER = 'product_container',

  AI_TITLE = 'ai_title',
}

/**
 * Nodes
 */
export default (props: RenderNodeProps, editor: Editor, next: () => any) => {
  switch (props.node.type) {
    case NodeType.PRODUCT_CONTAINER:
      return <ProductContainer {...props} />;

    case NodeType.PARAGRAPH:
      return <Paragraph {...props} />;
    case NodeType.IMAGE:
      return <Image {...props} />;
    case NodeType.EDITABLE_IMAGE:
      return <EditableImage {...props} />;

    default:
      return next();
  }
};
