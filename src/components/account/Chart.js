import React, { useState, useRef} from 'react'

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

export const Chart = ( { graphData, ranges, ticks} ) => {

  const [currency, setCurrency] = useState(true)
  const ethRef = useRef()
  const usdRef = useRef()
  const [time, setTime] = useState(3)

  let date, end, begin, counter, currentRange, currentTicks;

  const UNIX_YEAR = 31536000
  const UNIX_MONTH = 2628000
  const UNIX_WEEK = 604800
  const UNIX_DAY = 86400
  const UNIX_HOUR = 3600
  const time_frame = ['1H', '1D', '1W', '1M', '1Y', 'MAX']

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  let count = 0

  const findMedian = () => {
    if(time === 3){ 
      currentRange = ranges[1]
    } else if(time === 2){
      currentRange = ranges[2]
    } else if(time === 1){
      currentRange = ranges[3]
    } else if(time === 0){
      currentRange = ranges[4]
    } else if(time === 4){
      currentRange = ranges[0]
    }
    if(currency){
      return (currentRange[0]["USD"]+currentRange[1]["USD"])/2
    } else {
      return (currentRange[0]["ETH"]+currentRange[1]["ETH"])/2
    }
  }

  const findDomain = () => {
    end = Date.now()/1000
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

  const findTicks = () => {
    if(time === 3){
      currentTicks = ticks[0]
    } else if(time === 2){
      currentTicks = ticks[1]
    } else if(time === 1){
      currentTicks = ticks[2]
    } else if(time === 0){
      currentTicks = ticks[3]
    } else if(time === 4){
      currentTicks = ticks[0]
    }
    return currentTicks
  }

  const onClickHandler = (e) => {
    if(!e.target.classList.contains("active")){
      setCurrency(prevCurrency => !prevCurrency)
      e.target.classList.add("active")
      if(e.target === usdRef.current){
        ethRef.current.classList.remove("active")
      } else if(e.target === ethRef.current) {
        usdRef.current.classList.remove("active")
      }
    }
  }

  const onTimeChangeHandler = (data) => {
    if(data == "MAX"){
      setTime(4)
    }else if (data == "1D"){
      setTime(0)
    }else if (data == "1W"){
      setTime(1)
    }else if(data == "1M"){
      setTime(2)
    }else if(data == "1Y"){
      setTime(3)
    }
  }

  return (
    <>
    <div className="chart-text">Total Wallet Value</div>
    <div className="chart-text">{ graphData?.length != 0 && graphData ? (currency? (graphData?.at(-1)["USD"] < 0 ? "-$" + Math.abs(graphData?.at(-1)["USD"]?.toFixed(2)) :"$" + graphData?.at(-1)["USD"]?.toFixed(2)) : Math.round(graphData?.at(-1)["ETH"]*10000)/10000 + " ETH") : 0}</div>
    <div className="chart-button-container">
      <div className="chart-button" onClick={onClickHandler} ref={ethRef}>ETH</div>
      <div className="chart-button active" onClick={onClickHandler} ref={usdRef}>USD</div>
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

            >
              <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey={currency ? "USD" : "ETH"} stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke={"#313233"}/>
              <XAxis 
              dataKey = "time"
              type="number"
              domain={!graphData ? []: findDomain()}
              tick={{ fill: '#FFFFFF' }} 
              ticks = {!graphData ? [] : findTicks()}
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
              domain={currency ? [ -100 , "auto"] : [-0.5, "auto"]}
               >
              </YAxis>
              <Legend verticalAlign="top" display={false} />
              <Legend display={true} />
              {/* <Line
                  type="linear"
                  dataKey={currency ? "USD" : "ETH"}
                  stroke="#86F9A6"
                  strokeWidth={"3"}
                  activeDot={{ stroke: 'red', strokeWidth: 0, r: 5 }}
                  dot = {false}
              /> */}
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
                return currency ? `$${number}` : Math.round(number * 10000)/10000
              }}
              
              />
              {ranges ? <ReferenceLine
                y={findMedian()}
                stroke= "#86F9A6"
                strokeDasharray= "3"
              /> : <></>
              }
              
            </AreaChart>
        </div>
    </div>
    <div className='date-change'>
      <button className={"hour " + (time===0 ? "active" : "")} onClick={()=>onTimeChangeHandler(time_frame[1])}>{time_frame[1]}</button>
      <button className={"hour " + (time===1 ? "active" : "")}  onClick={()=>onTimeChangeHandler(time_frame[2])}>{time_frame[2]}</button>
      <button className={"hour " + (time===2 ? "active" : "")}  onClick={()=>onTimeChangeHandler(time_frame[3])}>{time_frame[3]}</button>
      <button className={"hour " + (time===3 ? "active" : "")}  onClick={()=>onTimeChangeHandler(time_frame[4])}>{time_frame[4]}</button>
      <button className={"hour " + (time===4 ? "active" : "")}  onClick={()=>onTimeChangeHandler(time_frame[5])}>{time_frame[5]}</button>
    </div>
    
    </>
  )
}


