import React, { useRef, useState } from 'react'
import Box from '../system/Box';
import { Value, ValueJSON, BlockJSON, Data, Operation } from 'slate'
import { Editor } from 'slate-react'
import html from './html';
import blocks, { BlockType } from './blocks';
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
    
    // console.log(jsonStr, htmlStr)
  }

  function insertImage(data: any = { url: 'abcd'}) {
    return editorRef.current && editorRef.current.insertBlock({ type: BlockType.IMAGE, data })
  }

  return (
    <Box display="flex" justifyContent="space-around" backgroundColor="#eee" height={1}>
      <Box width={300} backgroundColor="white" mt={20}>
        Left Bar
      </Box>
      <Box width={500} backgroundColor="white" mt={20}>
        <Box mb={10}>
          <button onClick={() => insertImage() }>Image</button>
        </Box>
        <Editor 
          ref={editorRef} 
          value={value} 
          // plugins={plugins} 
          onChange={onValueChange} 
          renderNode={blocks} 
          renderMark={marks} 
          />
      </Box>
      <Box width={300} backgroundColor="white" mt={20}>
        Right Bar
      </Box>
    </Box>
  )
}


