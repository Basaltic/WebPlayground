import './index.css'
import React from 'react'

export default () => {
  const images: any[] = []
  for (let i = 0; i < 25; i++) {
    const width = 100//getRandomSize(200, 400)
    const height = 100//getRandomSize(200, 400)
    // images.push(<img key={i} src={`https://placekitten.com/${width}/${height}`} alt="pretty kitty" />)
    images.push(
      <div key={i} className="grid-item" style={{ width, height }}>
        <h1>{i}</h1>
      </div>,
    )
  }

  // 1.横向自适应布局
  return (
    <>
      {/* <div>Foo</div> */}
      <div className="grid">{images}</div>
      {/* <div>Bar</div> */}
    </>
  )
}

// function getRandomSize(min: number, max: number) {
//   return Math.round(Math.random() * (max - min) + min)
// }
