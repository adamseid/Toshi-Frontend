import React, { Component } from 'react'
import profileImage from "../profile/header/images/temp-profile-image.png"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Label
} from "recharts";
const ws2 = new WebSocket('wss://build-loadb-1w6r869nnd2xy-378492499.us-east-1.elb.amazonaws.com/ws/toshi-profile/')

const time_frame = ['1H', '1D', '1W', '1M', '1Y']

export default class Graph extends Component {
  select = (data,event) => {
    const ws2 = new WebSocket('wss://build-loadb-1w6r869nnd2xy-378492499.us-east-1.elb.amazonaws.com/ws/toshi-profile/')
    console.log('select')
    for (let i = 0; i < document.getElementsByClassName("hour").length; i++) {
        document.getElementsByClassName("hour")[i].classList.remove("active")
      }

    event.target.classList.add("active")

    ws2.onopen = () => {
      console.log('❌❌❌❌THIS IS connected')
      ws2.send(
        JSON.stringify({
          request: 'select',
          location: ['profile', 'graph'],
          time_frame: data
        })
      )
    }
}

  render() {
    return (
        <div>
          <div className='profile-wallet-information'>
            <div className='profile-wallet-information-left'>
              <img className='profile-image' src = {profileImage} />
            </div>
            <div className='profile-wallet-information-right'>
              <div className='wallet-worth'>
                {
                  this.props.state['profile']['graph'].length == 0 ? (
                    console.log("EMPTY")
                  ) : 
                  Math.round((this.props.state['profile']['graph']['data'][3]*100))/100
                }
              </div>
              <div className='wallet-change'>
                {
                  this.props.state['profile']['graph'].length == 0 ? (
                    console.log("EMPTY")
                  ) : 
                  Math.round(this.props.state['profile']['graph']['data'][2] * 100) / 100
                }
              </div>
              <div className='wallet-id'>
                {this.props.state['header']['walletAddress'].substring(0, 6) + "..." + this.props.state['header']['walletAddress'].substring(38, 42)}
              </div>
            </div>
          </div>
          <div className='profile-header-text'>
            Wallet Performance
          </div>
          <div className='date-change'>
            {time_frame.map((data, i) => (
              <div key={i}>
                  <button className='hour' onClick={this.select.bind(this, data)}>{data}</button>
              </div>
            ))}
          </div>
          <div className='wallet-amount'>
            {
              this.props.state['profile']['graph'].length == 0 ? (
                console.log("EMPTY")
              ) : 
               Math.round(this.props.state['profile']['graph']['data'][1] * 100) / 100
            }
          </div>
          <div className='wallet-difference'>
            {
              this.props.state['profile']['graph'].length == 0 ? (
                console.log("EMPTY")
              ) : 
               Math.round(this.props.state['profile']['graph']['data'][2] * 100) / 100
            }
          </div>
          <div className='chart-outer-container'>
            <div className='chartTitle'>
              Wallet Performance
            </div>
            <div>
            {
                console.log("STATE: " , this.props.state['profile'])
            }
            </div>

            
            <div className='chart-container'>
              <LineChart
                background={{ fill: "red" }}
                fill={"red"}
                width={600}
                height={400}
                data={
                  this.props.state['profile']['graph'].length == 0 ? (
                    console.log("EMPTY")
                  ) : 
                  this.props.state['profile']['graph']['data'][0]
                }
                margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0
                }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#FFFFFF' }} tickLine={{ stroke: '#FFFFFF' }} stroke="#FFFFFF">
                </XAxis>
                <YAxis 
                orientation="right" 
                tick={{ fill: '#FFFFFF' }} 
                tickLine={{ stroke: '#FFFFFF' }} 
                stroke="#FFFFFF"
                width={80} >
                </YAxis>
                <Legend verticalAlign="top" display={false} />
                <Tooltip />
                <Legend
                    display={true}
                />
                <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#86F9A6"
                    activeDot={{ r: 8 }}
                />
              </LineChart>
            </div>
          </div>
        </div>
    )
  }
}
