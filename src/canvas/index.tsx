import React, { useRef, useEffect, useState } from 'react'
import './index.css'
import { Canvas2DUtil } from './main'
import { ApplicationTest } from './Test/applicationTest';
import { Application } from './Application/Application';
import { TestApplication } from './Test/TestApplication';

export default () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<Application | null>(null)

  let timer0: number = -1
  let timer1: number = -1

  useEffect(() => {
    if (canvasRef.current) {
      // const canvas2d: Canvas2DUtil = new Canvas2DUtil(canvasRef.current)
      // canvas2d.drawText('Hello World')

      // // Test
      // const app: Application = new Application(canvasRef.current)
      // app.update(0, 0)
      // app.render()

      // app.addTimer(timerCallback, 3, true, '调用一次')
      // app.addTimer(timerCallback, 5, false, '调用多次')

      // appRef.current = app

      const app: Application = new TestApplication(canvasRef.current)
      app.start()
    }
  }, [])

  // function timerCallback(id: number, data: string) {
  //   console.log(`当前调用Timer的id： ${id}, data: ${data}`)
  // }

  // const onStart = () => {
  //   if (appRef.current) {
  //     appRef.current.start()
  //   }
  // }

  // const onStop = () => {
  //   if (appRef.current) {
  //     // appRef.current.stop()
  //     appRef.current.removeTimer(timer1)
  //     console.log(appRef.current.timers.length)
  //     const id: number = appRef.current.addTimer(timerCallback, 10, true, '复用timer')
  //     console.log(id === 0)
  //   }
  // }

  return (
    <div>
      <div>
      {/* <button onClick={onStart}>Start</button>
      <button onClick={onStop}>Stop</button> */}
      </div>
      <canvas ref={canvasRef} width="200" height="200" />
    </div>
  )
}

