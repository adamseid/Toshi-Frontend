import React from 'react'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Label,
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
              <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
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
              stroke="#FFFFFF"
              width={80} >
              </YAxis>
              <Legend verticalAlign="top" display={false} />
              <Legend display={true} />
              <Line
                  type="natural"
                  dataKey="USD"
                  stroke="#86F9A6"
                  activeDot={{ stroke: 'red', strokeWidth: 0, r: 5 }}
                  dot = {false}
              />
              <Tooltip cursor={false} />
            </LineChart>
        </div>
    </div>
  )
}


