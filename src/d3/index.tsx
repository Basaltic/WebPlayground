import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'

export default () => {
  const log = (v: any) => console.log(v)

  const lineCurve = d3.line().curve()
  console.log(lineCurve)

  const arcGenerator = d3
    .arc()

    .innerRadius(45)
    .outerRadius(34)
    .startAngle(0.8)
    .endAngle(6.2)
    .padAngle(6.2)
    .cornerRadius(50)

  const arcPath = arcGenerator({ innerRadius: 45, outerRadius: 34, startAngle: 0.8, endAngle: 6.2 }) as string

  console.log(arcPath)

  const xScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, 500])
  console.log(xScale(0.5))

  console.log(xScale.ticks())

  log(xScale(0.13234))
  log(xScale.nice()(0.13234))

  log(xScale(2))
  xScale.clamp(true)
  log(xScale(2))

  log(d3.rgb('rgb(255, 195,18)').toString())

  log(d3.interpolateBlues(0.1))

  // const dateString = 'Monday, September 09, 2019'
  // const today = d3.timeParse('%A, %B %d, %Y')(dateString)
  // log(today)

  let today: any = new Date()
  today = d3.timeFormat('%A, %B %d, %Y')(today)
  log(today)

  const interpolator = d3.interpolate(0, 100)
  const steps = d3.quantize(interpolator, 11)
  console.log(steps)

  d3.select('#path').attr('cx', 50).transition().attr('cx', 500)

  return (
    <div>
      <svg width="100" height="100">
        <path id="path" fill="cornflowerblue" d={arcPath} style={{ transform: 'translate(50%, 50%)' }} />
      </svg>
    </div>
  )
}
