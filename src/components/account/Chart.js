import React from 'react'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
  } from "recharts";

export const Chart = ( { graphData } ) => {

    

  return (
    <div className="account-container">
        <div className="chart-container">
            <LineChart
              width={1200}
              height={600}
              data={
                graphData == [] ? (
                  <></>
                ) : 
                graphData
              }
              margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0
              }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke={"#313233"}/>
              <XAxis 
              dataKey="time_name"
              tick={{ fill: '#FFFFFF' }} 
              tickLine={{ stroke: '#FFFFFF' }} 
              stroke="#FFFFFF"
              height = {60}
              label={{ value: 'Time', angle: 0, position: 'bottom', offset:"-25", }}
              >
              </XAxis>
              <YAxis 
              label={{ value: 'Amount (USD)', angle: 90, position: 'right', offset:"-10"}}
              orientation="right" 
              tick={{ fill: '#FFFFFF' }} 
              tickLine={{ stroke: '#FFFFFF' }}
              tickCount = {10}
              stroke="#FFFFFF"
              width={80}
              domain={[0, "auto"]}
               >
              </YAxis>
              <Legend verticalAlign="top" display={false} />
              <Legend display={true} />
              <Line
                  type="natural"
                  dataKey="USD"
                  stroke="green"
                  activeDot={{ stroke: 'red', strokeWidth: 0, r: 5 }}
                  dot = {false}
              />
              {/* <Tooltip cursor={false} /> */}
              <Tooltip cursor={{ stroke: "#86F9A6", strokeDasharray: 5 }} />
            </LineChart>
        </div>
    </div>
  )
}


