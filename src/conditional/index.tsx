import React, { memo } from 'react'

export default () => {

}

export const IF = memo((props: { condition: boolean; children: JSX.Element } ) => {
  const { condition, children } = props
  if (condition === true) {
    return <>{children}</>
  }

  return null
})