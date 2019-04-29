import React, { useRef, useEffect, useState } from 'react'
import './index.css'
import { Canvas2DUtil } from './main'
import { ApplicationTest } from './Test/applicationTest'
import { Application } from './Application/Application'
import { TestApplication } from './Test/TestApplication'
import { QuadraticBezierCurve, CubeBezierCurve } from './bezierCure'
import { vec2 } from './math2D'

export default () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<Application | null>(null)

  let timer0: number = -1
  let timer1: number = -1

  useEffect(() => {
    if (canvasRef.current) {
      const app: TestApplication = new TestApplication(canvasRef.current)
      app.start()

      const start = vec2.create(10, 10)
      const ctrl1 = vec2.create(100, 100)
      const ctrl2 = vec2.create(50, 100)
      const end = vec2.create(10, 200)
      const curve = new QuadraticBezierCurve(start, ctrl1, end)
      curve.update(10)
      curve.draw(app)
      // new CubeBezierCurve(start, ctrl1, ctrl2, end).draw(app)
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
