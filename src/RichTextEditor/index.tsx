import './index.css'
import React, { useRef, useEffect, useState } from 'react'

/**
 * 可行性 demo
 * 1.光标 done
 * 2.动态计算character大小，把光标移动到所在文字 done
 * 3.输入事件监听 done
 * 4.拖动选择
 */

export default () => {
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const [text, setText] = useState<string>('')
  const [position, setPosition] = useState<any>({ top: 0, left: 0 })

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener('input', (e: any) => {
        addText(e.data)
        console.log('input', e)
      })

      inputRef.current.addEventListener('keydown', e => {
        // e.stopPropagation()
        console.log('keydown', e)
      })

      inputRef.current.addEventListener('compositionstart', e => {
        console.log('compositionstart', e)
      })

      inputRef.current.addEventListener('compositionend', e => {
        console.log('compositionend', e)
      })

      window.addEventListener('keydown', e => {
        console.log('window:keydown', e)
      })
    }
  }, [])

  const addText = (t: string) => {
    setText(text + t)
  }

  const onClickContent = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const onCursorChange = (x: number, y: number) => {
    setPosition({ top: y, left: x - 400 })
  }

  return (
    <>
      <div>
        <div className="content" onClick={onClickContent}>
          <OneLineText text="lajsldjfkjsaldflsajdfa" />
          <br />
          <OneLineText text="a" />
          <br />
          <OneLineText text="l" />
          <br />
          <OneLineText text="abcdefghijklmnopqrstuvwxyz" onXYChange={onCursorChange} />
          {text}
          <div className="cursor" style={{ top: position.top, left: position.left }}>
            <div className="caret" style={{ borderColor: 'red', height: 16 }}></div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
      <textarea ref={inputRef} style={{ position: 'fixed', left: 0 }} />
    </>
  )
}

function OneLineText(props: { text: string; onXYChange?: (x: number, y: number) => void }) {
  const { text, onXYChange } = props

  const self = useRef<HTMLDivElement>(null)

  const [overlayWidth, setOverlayWidth] = useState<number>(0)

  const onClick = (e: any) => {
    console.log(e.target.clientHeight / 2)
    console.log(e.clientX)
    console.log(e.clientY)
    let X = e.clinetX
    const Y = e.clientY - e.target.clientHeight / 2
    const offsetStatic = e.clientX
    let offset = e.clientX - 400 // 400是left距离
    for (let i = 0; i < text.length; i++) {
      const w = getTextWidth(text.charAt(i))
      if (offset - w <= 0) {
        // 在character的小于一般的距离
        if (offset <= w / 2) {
          X = offsetStatic - offset
          console.log('<= w ', offsetStatic - offset)
        } else {
          X = offsetStatic - offset + w
          console.log('>= w ', offsetStatic - offset + w)
        }
        break
      } else {
        offset -= w
      }
    }

    if (onXYChange) {
      onXYChange(X, Y)
    }

    setOverlayWidth(e.target.clientWidth)
  }

  return (
    <div ref={self} className="oneline" onClick={onClick}>
      <div className="oneline-selection-overlay" style={{ width: overlayWidth }}></div>
      <div className="oneline-content">{text}</div>
    </div>
  )
}

function getTextWidth(t: string) {
  const text = document.createElement('div')
  document.body.appendChild(text)

  text.style.font = 'times new roman'
  text.style.fontSize = 16 + 'px'
  text.style.height = 'auto'
  text.style.width = 'auto'
  text.style.position = 'absolute'
  text.style.whiteSpace = 'no-wrap'
  text.innerHTML = t

  const width = text.clientWidth
  const formattedWidth = width

  console.log(formattedWidth)

  document.body.removeChild(text)

  return formattedWidth
}
