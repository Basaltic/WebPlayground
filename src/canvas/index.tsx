import React, { useRef, useEffect, useState } from 'react'
import './index.css'
import { Canvas2DUtil } from './main'
import { ApplicationTest } from './Test/applicationTest'
import { Application } from './Application/Application'
import { TestApplication } from './Test/TestApplication'

export default () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<Application | null>(null)

  let timer0: number = -1
  let timer1: number = -1

  useEffect(() => {
    if (canvasRef.current) {
      // const app: TestApplication = new TestApplication(canvasRef.current)
      // app.start()
    }
  }, [])

  return (
    <div>
      <div>{/* <button onClick={onStart}>Start</button>
      <button onClick={onStop}>Stop</button> */}</div>
      <canvas ref={canvasRef} width="600" height="600" />
    </div>
  )
}
