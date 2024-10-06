"use client"
import { useState } from "react"
import { Pie } from "@visx/shape"
import { Group } from "@visx/group"
import { Text } from "@visx/text"
import { colors, ValuePieChartData } from "../../common/utils/helpers"
import { PieArcDatum } from "@visx/shape/lib/shapes/Pie"
import { prettyPrice } from "../../common/utils/prettyCV"

export interface PieChartProps {
  data: ValuePieChartData[]
  name: string
  // height: number
  // width: number
  // xName: string
  // yName: string
  // errorHandler?: (msg: string) => void
}

export default function PieChart({
  data,
  name
  // xName,
  // yName,
  // errorHandler
}: PieChartProps) {
  const [active, setActive] = useState<ValuePieChartData | null>(null)
  const width = 250
  const half = width / 2

  console.log({ piechartdata: data })

  if (!data.length) return null
  return (
    <svg width={width} height={width}>
      <Group top={width / 2} left={width / 2}>
        <Pie
          data={data}
          pieValue={data => data.value}
          outerRadius={half}
          innerRadius={({ data }) => {
            const activeSizeDelta =
              active && active.token == data.token ? 32 : 16
            return half - activeSizeDelta
          }}
          padAngle={0.03}
        >
          {pie => {
            return pie.arcs.map((arc, index) => {
              return (
                <g
                  key={arc.data.token}
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
              {`${active.amount} ${active.token}`}
            </Text>
            {/* <Text textAnchor="middle" fill="#aaa" fontSize={20} dy={15}>
              {`STX ${prettyPrice(active.value)}`}
            </Text> */}
          </>
        ) : (
          <>
            <Text textAnchor="middle" fill="#fff" fontSize={20} dy={-15}>
              {data.length + ` ${name}` + (data.length == 1 ? "" : "s")}
            </Text>
            <Text textAnchor="middle" fill="#aaa" fontSize={20} dy={15}>
              {`${Math.floor(data.reduce((acc, d) => acc + d["value"], 0))}Ӿ`}
            </Text>
          </>
        )}
      </Group>
    </svg>
  )
}
