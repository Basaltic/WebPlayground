import React, { useRef, useEffect } from 'react'
import PIXI from 'pixi.js'

export default () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
    }
  }, [])

  return <div ref={containerRef} />
}
