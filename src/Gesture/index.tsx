import React, { useEffect, useRef } from 'react'
import Hammer from 'hammerjs'


export default () => {
  const ref = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   if (ref.current) {
  //     const hammer = new Hammer(ref.current)
  //     hammer.on('pan', (ev) => {
  //       console.log('pan')
  //     })

  //     hammer.on('press', (ev) => {
  //       console.log('press')
  //     })

  //     hammer.on('swipe', (ev) => {
  //       console.log('swipe')
  //     })

  //     hammer.on('tap', (ev) => {
  //       console.log('tap')
  //     })

  //     hammer.on('rotate', (ev) => {
  //       console.log('rotate')
  //     })

  //     hammer.on('pinch', (ev) => {
  //       console.log('pinch')
  //     })

  //     hammer.get('pinch').set({ enable: true})
  //     hammer.get('rotate').set({ enable: true})
  //   }
  // }, [])

  return (
    <div ref={ref} style={{ marginLeft: 200, marginTop: 200, width: 100, height: 100, backgroundColor: 'red' }}>
    </div>
  )
}
