import React, { useState, useMemo, useContext, useRef, useReducer } from 'react'

const CountContext = React.createContext<any>({
  count1: 0,
  count2: 0,
  count3: 0,
  setCount1: () => {},
  setCount2: () => {},
  setCount3: () => {},
})

let count3 = 0
export function CountProvider(props: any) {
  const [count1, setCount1] = useState<number>(0)
  const [count2, setCount2] = useState<number>(0)

  const setCount3 = (value: number) => {
    count3 += 1
    console.log(count3)
  }

  const value = {
    count1,
    count2,
    count3,
    setCount1,
    setCount2,
    setCount3,
  }

  return <CountContext.Provider value={value} {...props} />
}

export function useCount() {
  const context = useContext(CountContext)
  const [, forceUpdate] = useReducer(s => s + 1, 0)

  const setCountX = () => {
    context.setCount3()
    forceUpdate({})
  }

  return {
    ...context,
    setCountX,
  }
}

export function useSelectCount() {
  return count3
}
