import { Plugin } from 'slate-react';
import { Editor } from 'slate';

export default function EnterPlugin(): Plugin {
  return {
    onKeyDown(event: any, editor: Editor, next: () => any) {
      console.log(event.key)
      console.log(editor.value.selection.toJS())
      console.log(editor.value.anchorBlock.toJS())
      console.log(editor.value.nextBlock)

      editor.command

      // 在不同 block 或者 inline 中 enter的效果不同


      next()
    }
  };
}