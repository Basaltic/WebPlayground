import React, { useRef, useEffect } from 'react'
import * as PIXI from 'pixi.js'

export default () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      // setup renderer and ticker
      var renderer = new PIXI.Renderer({ width: 800, height: 600, backgroundColor: 0x1099bb })
      containerRef.current.appendChild(renderer.view)
      var stage = new PIXI.Container()

      // setup ticker
      var ticker = new PIXI.Ticker()
      ticker.add((...args) => {
        renderer.render(stage)
        console.log(args)
        console.log(ticker.FPS)
      }, PIXI.UPDATE_PRIORITY.LOW)
      // ticker.start()

      // setup sprites
      var sprite = PIXI.Sprite.from(
        '	https://fe-1256886009.cos.ap-shanghai.myqcloud.com/assets/%E5%88%87%E5%9B%BE/%E5%9B%BE%E7%89%87/%E5%9B%9B%E5%9B%BE2%402x.png',
      )
      sprite.anchor.set(0.5)
      sprite.position.set(renderer.screen.width / 2, renderer.screen.height / 2)
      sprite.interactive = true
      sprite.buttonMode = true

      sprite.on('pointerdown', function() {
        sprite.scale.x *= 1.25
        sprite.scale.y *= 1.25
      })

      stage.addChild(sprite)

      ticker.add(function(delta) {
        sprite.rotation += 0.1 * delta
      })
    }
  }, [])

  return <div ref={containerRef} />
}
