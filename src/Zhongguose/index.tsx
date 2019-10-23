import './index.css'
import React from 'react'
import data from '../test/ChineseColor.json'

export default () => {
  return (
    <div>
      <div>同样的文字</div>
      <div>同样的文字</div>
      <img src="/images/1.jpeg" srcSet="/images/1.jpeg 1x, /images/2.png 2x" />
    </div>
    // <div style={{ display: 'flex', flexWrap: 'wrap',  }}>
    //   {data.map(({ name, color }) => (
    //     <ColorFlipCard name={name} bColor={`rgb(${color.r}, ${color.g}, ${color.b})`} />
    //   ))}
    // </div>
  )
}

// flipCard test
// function ColorFlipCard(props: { bColor: string; name: string }) {
//   const { bColor, name } = props
//   return (
//     <div style={{ display: 'inline-block', margin: 5 }}>
//       <div className="flip-card">
//         <div className="flip-card-inner">
//           <div className="flip-card-front" style={{ backgroundColor: bColor }}></div>
//           <div className="flip-card-back">{name}</div>
//         </div>
//       </div>
//     </div>
//   )
// }
