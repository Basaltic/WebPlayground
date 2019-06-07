import React from 'react'
import './App.css'
import MD5 from './test/MD5'
import FileHandler from './test/FileHandler'
import Box from './system/Box'
import RXJSPlayground from './test/RXJSPlayground'
import HtmlToCanvas from './test/HtmlToCanvas'
import Editor from './editor'
import EditableImagePixi from './editor/components/EditableImagePixi'
import EditableImage from './editor/components/EditableImage'
import Canvas from './canvas'
import Three from './three'
import Pixi from './pixi'
import StateManagement from './stateManagement'
import { Fabric } from './fabric/Fabric'

export default () => {
  // html2canvas(document.body).then((canvas) => {
  //   canvas.toDataURL('image/png')
  // })

  return (
    <div className="App">
      {/* <Box
        width={0.5}
        height={100}
        maxWidth={200}
        minWidth={0.1}
        maxHeight={300}
        minHeight={0.1}
        p={10}
        pl={0.5}
        pb={100}
        pr={100}
        pt={20}
        m={10}
        ml={0.1}
        mb={100}
        mr={100}
        mt={20}
        borderRadius={[1, 2, 3, 4, 5]}
        border={2}
        color={"red"}
        float="left"
      >
        <div>
          <MD5 />
        </div>
        <div>
          <FileHandler />
        </div>
      </Box> */}
      {/* <RXJSPlayground /> */}
      {/* <HtmlToCanvas /> */}
      {/* <Editor /> */}
      {/* <EditableImagePixi /> */}
      {/* <EditableImage /> */}
      {/* <Canvas /> */}
      {/* <Three /> */}
      {/* <Pixi /> */}
      {/* <StateManagement /> */}
      <Fabric />
    </div>
  )
}
