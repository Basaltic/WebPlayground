import css from './index.module.css'
import React, { useRef, useEffect } from 'react'
import { TweenLite, TimelineLite, TweenMax, TimelineMax, Bounce, Power0 } from 'gsap'
import Draggable from 'gsap/Draggable'

export default () => {
  const square = useRef<HTMLDivElement>(null)


  const mainTimeline = useRef<TimelineMax>(new TimelineMax())

  useEffect(() => {
    if (square.current) {
      mainTimeline.current
        .add(TweenMax.to(square.current, 2, { x: 200, rotation: 360, ease: Power0.easeInOut }))
        .add(TweenMax.to(square.current, 3, { x: 400 }), '')
        .add(TweenMax.staggerTo('rect', 0.5, { xPercent: 100 }, 0.4), '-=2')
    }

    return () => mainTimeline.current && mainTimeline.current.kill()
  }, [])

  const play = () => {
    if (mainTimeline.current) {
      mainTimeline.current.play()
    }
  }

  const pause = () => {
    if (mainTimeline.current) {
      mainTimeline.current.pause()
    }
  }

  const restart = () => mainTimeline.current && mainTimeline.current.restart()

  const reverse = () => mainTimeline.current && mainTimeline.current.reverse()

  return (
    <div className={css.anime}>
      <div className={css.square} ref={square}></div>
      <br></br>
      <svg style={{ width: '100%'}}>
        <line className={css.rule} x1="181.223" y1="0" x2="181.223" y2="205.061" />
        <rect x="18.24" y="11.245" className={css.box} width="163.319" height="38.865" />
        <rect x="53.611" y="58.843" className={css.box} width="127.948" height="38.865" />
        <rect x="105.14" y="107.314" className={css.box} width="76.419" height="38.865" />
        <rect x="142.694" y="154.773" className={css.box} width="38.865" height="38.865" />
      </svg>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <button onClick={play}>play</button>
      <button onClick={pause}>pause</button>
      <button onClick={restart}>restart</button>
      <button onClick={reverse}>reverse</button>
    </div>
  )
}
