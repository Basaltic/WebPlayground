import css from './index.module.css'
import React, { useEffect, useRef } from 'react'
import anime, { AnimeInstance } from 'animejs'

export default () => {
  const square = useRef<HTMLDivElement>(null)

  const animeInstance = useRef<AnimeInstance | null>(null)

  useEffect(() => {
    animeInstance.current = anime({
      targets: square.current,

      scale: 2,
      translateX: 250,
      borderRadius: ['0%', '50%'],

      duration: 3000,
      endDelay: 2000,

      direction: 'alternate',
      easing: 'easeInOutSine',

      loop: true,
      autoplay: false,
    })
  }, [])

  const play = () => {
    if (animeInstance.current) {
      animeInstance.current.play()
    }
  }

  const pause = () => {
    if (animeInstance.current) {
      animeInstance.current.pause()
    }
  }

  const restart = () => animeInstance.current && animeInstance.current.restart()

  const reverse = () => animeInstance.current && animeInstance.current.reverse()

  const seek = (time: number) => animeInstance.current && animeInstance.current.seek(time)

  return (
    <div className={css.anime}>
      <div className={css.square} ref={square}></div>
      <br></br>
      <br></br>
      <button onClick={play}>play</button>
      <button onClick={pause}>pause</button>
      <button onClick={restart}>restart</button>
      <button onClick={reverse}>reverse</button>
      <br></br>
      <input onChange={e => seek(parseInt(e.target.value) || 0)} />
      {/* <button onClick={seek}>seek</button> */}
    </div>
  )
}
