import React from 'react'
import { CountProvider, useCount, useSelectCount } from './context'

export default () => {
  console.log('app')
  return (
    <CountProvider>
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
