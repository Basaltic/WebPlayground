import { Editor } from 'slate-react';
import { NodeType } from '../nodes';

export default function insertNode(editor: Editor, type: NodeType, data: any = { url: '' }) {
  // Insert Block or Inline in condition
  // 把Node分为两种，一种是普通的Node，一种是容器Node
  // 1.普通的Node，每次占一行 Block
  // 2.容器Node，可以容纳其他的Node作为 Inline。容器节点可以添加一个属性，告知是否可以多层嵌套。

  console.log(editor.value.anchorBlock)
  console.log(editor.value.nextBlock)

  editor.focus()

  return editor && editor.insertBlock({ type, data });
}