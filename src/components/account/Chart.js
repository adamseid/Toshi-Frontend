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

export const Chart = ( { graphData, currentRange, ticks, time } ) => {

  let date, end, begin;
  const UNIX_YEAR = 31536000
  const UNIX_MONTH = 2628000
  const UNIX_WEEK = 604800
  const UNIX_DAY = 86400

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const findDomain = () => {
    end = Date.now()/1000
    // This can be a switch statement
    if(time === 3){
      begin = end - UNIX_YEAR
    } else if(time === 2){
      begin = end - UNIX_MONTH
    } else if(time === 1){
      begin = end - UNIX_WEEK
    } else if(time === 0){
      begin = end - UNIX_DAY
    }
    return [begin, end]
  }

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
              dataKey = "time"
              type="number"
              domain={findDomain()}
              tick={{ fill: '#FFFFFF' }} 
              ticks = {ticks}
              tickFormatter={(label)=> {
                date = new Date(label * 1000)
                if(time === 3 || time === 4){
                  return `${date.getMonth() + 1}/${date.getFullYear()}`
                } else if(time === 2 || time === 1){
                  return `${monthNames[date.getMonth()]} ${date.getDate()}`
                } else if(time === 0){
                  return `${date.getHours()}:00`
                }
              }}
              allowDataOverflow = {true}
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
                  type="basis"
                  dataKey="USD"
                  stroke="#86F9A6"
                  strokeWidth={"3"}
                  activeDot={{ stroke: 'red', strokeWidth: 0, r: 5 }}
                  dot = {false}
              />
              {/* <Tooltip cursor={false} /> */}
              <Tooltip cursor={{ stroke: "#86F9A6", strokeDasharray: "3 3" }} itemStyle={{color: "green"}}/>
              {currentRange ? <ReferenceLine
                y={(currentRange[0]["USD"]+currentRange[1]["USD"])/2}
                stroke= "#86F9A6"
                strokeDasharray= "3"
              /> : <></>
              }
              
            </LineChart>
        </div>
    </div>
  )
}


