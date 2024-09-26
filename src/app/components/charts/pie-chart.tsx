"use client"
import { useState } from "react"
import { Pie } from "@visx/shape"
import { Group } from "@visx/group"
import { Text } from "@visx/text"
import { colors } from "../../common/utils/helpers"
import { PieArcDatum } from "@visx/shape/lib/shapes/Pie"
import { prettyPrice } from "../../common/utils/prettyCV"

export interface PieChartProps {
  // data: any[]
  // height: number
  // width: number
  // xName: string
  // yName: string
  // errorHandler?: (msg: string) => void
}

export default function PieChart(
  {
    // data,
    // xName,
    // yName,
    // errorHandler
  }: PieChartProps
) {
  const [active, setActive] = useState<Data | null>(null)
  const width = 250
  const half = width / 2

  type Data = { source: string; target: string; valueUsd: number }
  const data: Data[] = [
    { source: "source1", target: "target1", valueUsd: 100 },
    { source: "source2", target: "target2", valueUsd: 400 },
    { source: "source3", target: "target3", valueUsd: 200 }
  ]

  if (!data.length) return null
  return (
    <svg width={width} height={width}>
      <Group top={width / 2} left={width / 2}>
        <Pie
          data={data}
          pieValue={data => data["valueUsd"]}
          outerRadius={half}
          innerRadius={({ data }) => {
            const activeSizeDelta =
              active && active["source"] == data["source"] ? 32 : 16
            return half - activeSizeDelta
          }}
          padAngle={0.03}
        >
          {pie => {
            return pie.arcs.map((arc, index) => {
              return (
                <g
                  key={arc.data["source"]}
                  onMouseEnter={() => setActive(arc.data)}
                  onMouseLeave={() => setActive(null)}
                >
                  <path d={pie.path(arc)!} fill={colors[index]}></path>
                </g>
              )
            })
          }}
        </Pie>
        {active ? (
          <>
            <Text textAnchor="middle" fill="#fff" fontSize={20} dy={-15}>
              {active.source}
            </Text>
            <Text textAnchor="middle" fill="#aaa" fontSize={20} dy={15}>
              {`$${prettyPrice(active.valueUsd)}`}
            </Text>
          </>
        ) : (
          <>
            <Text textAnchor="middle" fill="#fff" fontSize={20} dy={-15}>
              {data.length + " Source" + (data.length == 1 ? "" : "s")}
            </Text>
            <Text textAnchor="middle" fill="#aaa" fontSize={20} dy={15}>
              {`$ ${Math.floor(data.reduce((acc, d) => acc + d["valueUsd"], 0))}`}
            </Text>
          </>
        )}
      </Group>
    </svg>
  )
}
