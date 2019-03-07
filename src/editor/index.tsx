import React, { useState } from 'react';
import Box from '../system/Box';
import { Value } from 'slate';
import { Editor } from 'slate-react';
import html from './html';
import blocks from './nodes';
import marks from './marks';
import plugins from './plugins';
import LeftBar from './LeftBar';
import initialValue from './initialValue';

export default () => {
  const [value, setValue] = useState<Value>(Value.fromJSON(initialValue));
  const [editor, setEditor] = useState<Editor | null>(null)

  const onValueChange = (change: { operations: any; value: Value }) => {
    setValue(change.value);
    const jsonStr = JSON.stringify(value.toJSON());
    const htmlStr = html.serialize(value);

    // console.log(change.operations)
    // console.log(value.toJSON());
  };

  // 点击编辑空白区域的时候聚焦
  const clickToFocuse = () => {
    if (editor && !editor.value.selection.isFocused) {
      editor.focus()
    }
  }
  
  return (
    <Box display="flex" justifyContent="space-around" backgroundColor="#eee" height={1}>
      <LeftBar editor={editor} />
      <Box width={500} backgroundColor="white" mt={20} onClick={clickToFocuse}>
        <Editor ref={setEditor} value={value} plugins={plugins} onChange={onValueChange} renderNode={blocks} renderMark={marks}  />
      </Box>
      <Box width={300} backgroundColor="white" mt={20}>
        Right Bar
      </Box>
    </Box>
  );
};
