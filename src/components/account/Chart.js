import React, { useState } from 'react'

import {
    LineChart,
    AreaChart,
    Area,
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
  const UNIX_HOUR = 3600

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  let count = 0
  let counter = 0

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
    } else if(time === 4){
      counter = 0
      graphData.forEach((data)=> {
        if(data["time"] < (end-UNIX_YEAR)){
          counter++
          console.log("passed a year")
        }
        if(counter > 2){
          begin = end - UNIX_YEAR*2
        } else {
          begin = end - UNIX_YEAR
        }
      })
    }
    return [begin, end]
  }

  return (
    <>
    <div className="chart-text">Total Wallet Value</div>
    <div className="chart-text">${ graphData ? graphData.at(-1)["USD"] : 0}</div>
    <div className="chart-button-container">
      <div className="chart-button">ETH</div>
      <div className="chart-button">USD</div>
    </div>
    <div className="account-container">
        <div className="chart-container">
            <AreaChart
              width={1200}
              height={600}
              data={
                graphData == [] ? (
                  []
                ) : 
                graphData
              }
              margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0
              }}
              onMouseEnter={()=>console.log("enter")}
              onMouseLeave={()=>console.log("leave")}
            >
              <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="USD" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke={"#313233"}/>
              <XAxis 
              dataKey = "time"
              type="number"
              domain={!graphData ? []: findDomain()}
              tick={{ fill: '#FFFFFF' }} 
              ticks = {!graphData ? [] : ticks}
              tickFormatter={!graphData ? []: (label)=> {
                date = new Date(label * 1000.0)
                if(time === 3 || time === 4){
                  return `${date.getMonth() + 1}/${date.getFullYear()}`
                } else if(time === 2 || time === 1){
                  return `${monthNames[date.getMonth()]} ${date.getDate()}`
                } else if(time === 0){
                  if(count % 2 != 0){
                    count++
                    if(date.getHours() === 0){
                      return `${monthNames[date.getMonth()]} ${date.getDate()}`
                    } else {
                      return `${date.getHours()}:00`
                    }
                  } else {
                    count++
                    return ""
                  }  
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
              domain={[ -100 , "auto"]}
               >
              </YAxis>
              <Legend verticalAlign="top" display={false} />
              <Legend display={true} />
              <Line
                  type="linear"
                  dataKey="USD"
                  stroke="#86F9A6"
                  strokeWidth={"3"}
                  activeDot={{ stroke: 'red', strokeWidth: 0, r: 5 }}
                  dot = {false}
              />
              <Tooltip 
              // cursor={{ stroke: "#86F9A6", strokeDasharray: "3 3" }} 
              itemStyle={{color: "white"}} 
              contentStyle={{backgroundColor: "black", color: "white", borderRadius: "5px"}}
              // position={{x:0, y:0}}
              labelFormatter = {(date)=> {
                date = new Date(date * 1000.0)
                return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:00`
              }}
              formatter = {(number)=>{
                return `$${number}`
              }}
              
              />
              {currentRange ? <ReferenceLine
                y={(currentRange[0]["USD"]+currentRange[1]["USD"])/2}
                stroke= "#86F9A6"
                strokeDasharray= "3"
              /> : <></>
              }
              
            </AreaChart>
        </div>
    </div>
    </>
  )
}


