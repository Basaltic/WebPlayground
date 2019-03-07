import { Plugin } from 'slate-react';
import { Editor, Selection } from 'slate';
import { NodeType } from '../nodes';
import EnterPlugin from './EnterPlugin';

function MarkHotkey(type: string, key: string) {
  return {
    onKeyDown(event: any, editor: Editor, next: any) {
      if (!event.ctrlKey || event.key !== key) {
        return next();
      }

      event.preventDefault();
      editor.toggleMark(type);
    },
  };
}

const plugins: any = [
  EnterPlugin()
];

export default plugins;
