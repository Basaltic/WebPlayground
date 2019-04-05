import React, { useRef, useEffect } from 'react'
import './index.css'
import { Canvas2DUtil } from './main'

export default () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const canvas2d: Canvas2DUtil = new Canvas2DUtil(canvasRef.current)
      canvas2d.drawText('Hello World')
    }
  }, [])

  return (
    <div>
      <canvas ref={canvasRef} width="500" height="500" />
    </div>
  )
}

