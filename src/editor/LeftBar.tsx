import React from 'react';
import Box from '../system/Box';
import { Editor } from 'slate-react';
import insertNode from './commands/insertNode';
import { NodeType } from './nodes';

interface IProps {
  editor: Editor | null;
}

export default (props: IProps) => {
  const { editor } = props;
  console.log(editor)
  return (
    <Box width={300} backgroundColor="white" mt={20}>
      <Box mb={10}>
        <button onClick={() => editor && editor.command(insertNode, NodeType.IMAGE)}>Image</button>
      </Box>
      <Box mb={10}>
        <button onClick={() => editor && editor.command(insertNode, NodeType.EDITABLE_IMAGE)}>Editable Image</button>
      </Box>
      <Box mb={10}>
        <button>Container</button>
      </Box>
    </Box>
  );
};
