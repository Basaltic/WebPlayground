import './SimpleCharts.css'
import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const data = [4, 8, 15, 16, 23, 42]
const dataWithName = [
  { name: 'Locke', value: 4 },
  { name: 'Reyes', value: 8 },
  { name: 'Ford', value: 15 },
  { name: 'Jarrah', value: 16 },
  { name: 'Shephard', value: 23 },
  { name: 'Kwon', value: 42 },
]

export default function SimpleCharts() {
  const svgChartContainer = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const width = 960,
      height = 500

    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(dataWithName, d => d.value as any)])

    const barWidth = width / data.length

    const chart = d3
      .select(svgChartContainer.current)
      .attr('width', width)
      .attr('height', height * data.length)

    const svgBar = chart
      .selectAll('g')
      .data(dataWithName)
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(${i * barWidth}, 0)`)

    svgBar
      .append('rect')
      .attr('y', d => y(d.value))
      .attr('width', barWidth - 1)
      .attr('height', d => height - y(d.value))

    svgBar
      .append('text')
      .attr('x', barWidth / 2)
      .attr('y', d => y(d.value) + 3)
      .attr('dy', '.75em')
      .text(d => d.name + ' - ' + d.value)

    

  }, [])

  return (
    <>
      <svg ref={svgChartContainer} className="chart" width="420" height="120"></svg>
    </>
  )
}
