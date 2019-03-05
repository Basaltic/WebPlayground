import React, { useRef, useState } from 'react'
import Box from '../system/Box';
import { Value, ValueJSON, BlockJSON, Data, Operation } from 'slate'
import { Editor } from 'slate-react'
import html from './html';
import nodes from './nodes';
import marks from './marks';

const initialValue: ValueJSON = {
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: '默认文字'
              }
            ]
          }
        ]
      } as BlockJSON
    ]
  }
}

export default () => {
  const editorRef = useRef<Editor>(null)
  const [value, setValue] = useState<Value>(Value.fromJSON(initialValue))

  const onValueChange = (change: { operations: any, value: Value }) => {
    setValue(change.value)
    const jsonStr = JSON.stringify(value.toJSON())
    const htmlStr = html.serialize(value)
    
    console.log(jsonStr, htmlStr)
  }


  return (
    <Box display="flex" justifyContent="space-around" backgroundColor="#eee" height={1}>
      <Box width={300} backgroundColor="white" mt={20}>
        Left Bar
      </Box>
      <Box width={500} backgroundColor="white" mt={20}>
        <Editor 
          ref={editorRef} 
          value={value} 
          // plugins={plugins} 
          onChange={onValueChange} 
          renderNode={nodes} 
          renderMark={marks} 
          />
      </Box>
      <Box width={300} backgroundColor="white" mt={20}>
        Right Bar
      </Box>
    </Box>
  )
}