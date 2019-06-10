import React, { useState } from 'react'
import { CountProvider, useCount, useSelectCount } from './context'
import produce, { applyPatches, original } from 'immer'

export default () => {
  const [state, setState] = useState({ countA: 1, countB: 2, list: [{ word: 'lulu' }, { word: 'huhu' }] })

  const list = state.list
  const countA = state.countA
  const countB = state.countB

  const addCountA = () =>
    setState(
      produce(state, draft => {
        draft.countA += 1
      }),
    )

  const changeWord = () => {
    const newState = produce(state, draft => {
      draft.list[0].word = 'to lulu'
      console.log(original(draft.list))
    })
    console.log(newState)
    setState(newState)
  }

  console.log(
    [{}, {}, {}].map(
      produce((draft, index) => {
        draft.index = index
      }),
    ),
  )

  return (
    <CountProvider>
      <div>{countA}</div>
      <button onClick={addCountA}>A</button>
      <div>{countB}</div>
      <button>B</button>
      {list.map(d => (
        <div key={d.word}>{d.word}</div>
      ))}
      <button onClick={changeWord}>C</button>
      <Count1 />
      <br />
      <br />
      <Count2 />
      <br />
      <br />
      <Count3 />
    </CountProvider>
  )
}

function Count1() {
  const { count1, setCount1 } = useCount()

  return (
    <div>
      <div>{count1}</div>
      <button onClick={() => setCount1(count1 + 1)}>add1</button>
    </div>
  )
}

function Count2() {
  const { count2, setCount2 } = useCount()

  return (
    <div>
      <div>{count2}</div>
      <button onClick={() => setCount2(count2 + 1)}>add1</button>
    </div>
  )
}

function Count3() {
  const count3 = useSelectCount()
  const { setCountX } = useCount()

  return (
    <div>
      <div>{count3}</div>
      <button onClick={() => setCountX(count3 + 1)}>add1</button>
    </div>
  )
}
