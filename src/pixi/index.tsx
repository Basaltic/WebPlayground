import React, { useRef, useEffect } from 'react'
import * as PIXI from 'pixi.js'
import bunny from './assets/bunny.png'

export default () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const app = new PIXI.Application()
    }
  }, [])

  return <div ref={containerRef} />
}
