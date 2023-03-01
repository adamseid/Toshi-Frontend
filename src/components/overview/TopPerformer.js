import React, { Component } from 'react'
import Graph from './top_performer/Graph'
import profileImage from '../overview/header/images/temp-profile-image.png'
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
const time_frame = ['1D', '1W', '1M', '1Y']


export default class TopPerformer extends Component {


    select = (data, event) => {
        this.props.ws.send(
            JSON.stringify({
                request: 'select',
                location: ['overview', 'top-performers'],
                time_frame: data
            })
        )
        for (let i = 0; i < document.getElementsByClassName("year").length; i++) {
            document.getElementsByClassName("year")[i].classList.remove("active")
        }

        event.target.classList.add("active")
    }

    render() {
        return (
            <div>
                <div className='profile-header-text'>
                        Top Performer
                </div>
                <div className='date-change'>
                    {time_frame.map((data, i) => (
                        <div key={i} >
                            <button className='year' onClick={this.select.bind(this, data)}>{data}</button>
                        </div>
                    ))}

                </div>
                <div className='profile-wallet-information'>
                    <div className='profile-wallet-information-left'>
                        <img className='profile-image' src={profileImage} />
                    </div>
                    <div className='profile-wallet-information-right'>
                        <div className='wallet-worth'>
                            {
                                this.props.state['top_performer']['difference']
                            }
                        </div>
                        <div className='wallet-change'>
                            {
                                this.props.state['daily_top_performers']['data'].length == 0 ? (
                                    console.log("NO WALLET ID")
                                ) :
                                this.props.state['top_performer']['graph'][1] ? (
                                    this.props.state['top_performer']['graph'][1]['pv'] - this.props.state['top_performer']['graph'][0]['pv']) / (this.props.state['top_performer']['graph'][0]['pv']

                                ):
                                console.log("HEYYYYY")
                            }
                        </div>
                        <div className='wallet-id'>
                            {
                                this.props.state['daily_top_performers']['data'].length == 0 ? (
                                    console.log("NO WALLET ID")
                                ) :
                                <a href={"https://etherscan.io/address/" + this.props.state['daily_top_performers']['data'][0][0]} target="_blank">
                                {this.props.state['daily_top_performers']['data'][0][0].substring(0, 6) + "..." +  this.props.state['daily_top_performers']['data'][0][0].substring(38, 42)}
                                </a>
                            }
                        </div>
                    </div>
                </div>
                <div className='chart-outer-container'>
                    <div className='chartTitle'>
                        Wallet Performance
                    </div>
                    <div className='chart-container'>
                        <div>
                            {
                                console.log("STATE: " ,this.props.state)
                            }
                        </div>
                        <LineChart
                        width={600}
                        height={400}
                        data={this.props.state['top_performer']['graph']}
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
                            width={120} >
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
            </div>
        )
    }
}
