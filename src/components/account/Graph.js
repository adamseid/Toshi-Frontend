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
import axios from "axios";

const backend_url = process.env.REACT_APP_.BACKEND_BASE_URL

const time_frame = ['1H', '1D', '1W', '1M', '1Y']
var walletID = ""

export default class Graph extends Component {
  select = (data,event) => {
    if(data == "1H"){
      this.props.state['profile']['graph'][0] = this.props.state['profile']['hourlyGraph']
    }else if (data == "1D"){
      this.props.state['profile']['graph'][0] = this.props.state['profile']['dailyGraph']
    }else if (data == "1W"){
      this.props.state['profile']['graph'][0] = this.props.state['profile']['weeklyGraph']
    }else if(data == "1M"){
      this.props.state['profile']['graph'][0] = this.props.state['profile']['monthlyGraph']
    }else if(data == "1Y"){
      this.props.state['profile']['graph'][0] = this.props.state['profile']['yearlyGraph']
    }
    this.setPropsState()
    
    for (let i = 0; i < document.getElementsByClassName("hour").length; i++) {
        document.getElementsByClassName("hour")[i].classList.remove("active")
      }

    event.target.classList.add("active")
  }

  walletBalanceHttpRequest = () => {
    var url = backend_url + "api/toshi/walletBalance/"
    axios.post(url, this.props.state,).then((response) => {
      if(response.data['profile_response'] == ""){
        this.props.state['profile']['accountBalance'] = 0
      }else{
        this.props.state['profile']['accountBalance'] = response.data['profile_response']
      }
      this.setPropsState()
    });
  }

  graphHttpRequest = () => {
    var url = backend_url + "api/toshi/graph/"
    axios.post(url, this.props.state).then((response) => {
      console.log("GRAPH: ", response.data['profile_response'])
      this.props.state['profile']['graph'] = response.data['profile_response'][0]
      this.props.state['profile']['maxGraph'] = response.data['profile_response'][0]
      this.props.state['profile']['yearlyGraph'] = response.data['profile_response'][1]
      this.props.state['profile']['monthlyGraph'] = response.data['profile_response'][2]
      this.props.state['profile']['weeklyGraph'] = response.data['profile_response'][3]
      this.props.state['profile']['dailyGraph'] = response.data['profile_response'][4]
      // this.props.state['profile']['graph'] = [response.data['profile_response']['profile']['graph'][4],response.data['profile_response']['profile']['graph'][5],response.data['profile_response']['profile']['graph'][6]]
      this.setPropsState()
    });
  }

  setPropsState = () => {
    this.setState(this.props.state)
  }
  componentDidMount = () => {
    console.log("Current Props Mount: ",this.props['state']['header']['walletAddress'])
  }

  componentDidUpdate = () => {
    if(walletID != this.props['state']['header']['walletAddress']){
      this.walletBalanceHttpRequest()
      this.graphHttpRequest()
    }
    walletID = this.props['state']['header']['walletAddress']
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
                this.props.state['profile']['accountBalance'] ? (
                  Math.round((this.props.state['profile']['accountBalance']*100))/100
                ) :
                <>0</>
              }
            </div>
            <div className='wallet-change'>
              {
                this.props.state['profile']['graph'].length == 0 ? (
                  <></>
                ) : 
                Math.round(this.props.state['profile']['graph'][2] * 100) / 100
              }
            </div>
            <div className='wallet-id'>
            <a href={"https://etherscan.io/address/" + this.props.state['header']['walletAddress']}>
              {this.props.state['header']['walletAddress'].substring(0, 6) + "..." + this.props.state['header']['walletAddress'].substring(38, 42)}
            </a>
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
              <></>
            ) : 
              Math.round(this.props.state['profile']['graph'][1] * 100) / 100
          }
        </div>
        <div className='wallet-difference'>
          {
            this.props.state['profile']['graph'].length == 0 ? (
              <></>
            ) : 
            Math.round(this.props.state['profile']['graph'][2] * 100) / 100
          }
        </div>
        <div className='chart-outer-container'>
          <div className='chartTitle'>
            Wallet Performance
          </div>

          
          <div className='chart-container'>
            <LineChart
              background={{ fill: "red" }}
              fill={"red"}
              width={600}
              height={400}
              data={
                this.props.state['profile']['graph'].length == 0 ? (
                  <></>
                ) : 
                this.props.state['profile']['graph'][0]
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
