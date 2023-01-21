import React, { Component } from 'react'
import axios from "axios";
import BulletPoint from "../images/bulletPoint.png"
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

const time_frame = ['1H', '1D', '1W', '1M', '1Y']

const backend_url = "http://54.158.91.9:8000/"
// const backend_url = "http://127.0.0.1:8000/" 
var toggle = true
var walletID = ""

export default class Graph extends Component {  

    select = (data,event) => {
        if(data == "1H"){
            this.props.state['accountDetailed']['graph'] = this.props.state['accountDetailed']['hourlyGraph']
        }else if (data == "1D"){
            this.props.state['accountDetailed']['graph'] = this.props.state['accountDetailed']['dailyGraph']
        }else if (data == "1W"){
            this.props.state['accountDetailed']['graph'] = this.props.state['accountDetailed']['weeklyGraph']
        }else if(data == "1M"){
            this.props.state['accountDetailed']['graph'] = this.props.state['accountDetailed']['monthlyGraph']
        }else if(data == "1Y"){
            this.props.state['accountDetailed']['graph'] = this.props.state['accountDetailed']['yearlyGraph']
        }
        this.setPropsState()
        
        for (let i = 0; i < document.getElementsByClassName("hour").length; i++) {
            document.getElementsByClassName("hour")[i].classList.remove("active")
          }
    
        event.target.classList.add("active")
    }

    assetTableHttpRequest = () => {
        var url = backend_url + "api/toshi/accounthistory/"
        
        axios.post( url , this.props.state).then((response) => {
            console.log("ACCOUNT DETAILS: ",response.data)
            this.props['state']['accountDetailed']['table'] = response.data['profile_response']
            this.setPropsState()

        }).catch(error => {
            console.log(error)
          })
      }

      graphHttpRequest = () => {
        var url = backend_url + "api/toshi/accountGraph/"
        axios.post(url, this.props.state).then((response) => {
          console.log(response.data['profile_response'])
          this.props.state['accountDetailed']['hourlyGraph'] = response.data['profile_response'][0]
          this.props.state['accountDetailed']['dailyGraph'] = response.data['profile_response'][1]
          this.props.state['accountDetailed']['weeklyGraph'] = response.data['profile_response'][2]
          this.props.state['accountDetailed']['monthlyGraph'] = response.data['profile_response'][3]
          this.props.state['accountDetailed']['yearlyGraph'] = response.data['profile_response'][4]
          this.props.state['accountDetailed']['graph'] = response.data['profile_response'][4]
          this.setPropsState()
          console.log("ACCOUNT GRAPGH STATE: ",this.props.state)
        });
      }
    
      setPropsState = () => {
        this.setState(this.props.state)
      }
    
      componentDidUpdate = () => {
        if(walletID != this.props['state']['header']['walletAddress']){
            this.assetTableHttpRequest()
            this.graphHttpRequest()
          }
          walletID = this.props['state']['header']['walletAddress']
      }
      

  render() {
    return (
    <div className = "table-overview-outer-container">
        <div className='profile-header-text'>
            Your Wallet History
        </div>
        <div className='date-change'>
            <button className='hour' onClick={this.select.bind(this, time_frame[0])}>{time_frame[0]}</button>
            <button className='hour' onClick={this.select.bind(this, time_frame[1])}>{time_frame[1]}</button>
            <button className='hour' onClick={this.select.bind(this, time_frame[2])}>{time_frame[2]}</button>
            <button className='hour' onClick={this.select.bind(this, time_frame[3])}>{time_frame[3]}</button>
            <button className='hour active' onClick={this.select.bind(this, time_frame[4])}>{time_frame[4]}</button>
        </div>
        <div className='account-container'>
            <div className='account-ids'>
                <div className='asset-text-first-history'>
                    Asset
                </div>
                <div className='asset-text-history'>
                    Total Transactions
                </div>
                <div className='asset-text-history'>
                    Profit TX
                </div>
                <div className='asset-text-history'>
                    Profit Total
                </div>
            </div>
            <div className='account-table'>
                <div className='account-detailed-inner-container'>
                    {
                    this.props['state']['accountDetailed']['table'].length == 0 ? (
                        <div></div>
                    ) : 
                    this.props['state']['accountDetailed']['table'].map((account, index) => {
                        return (
                            <div key={index} className='account-detailed-ids'>
                                <div className='asset-text-data-detailed-first-element'>
                                    <div className='account-token-outer-container'>
                                        <img className='account-bullet' src = {BulletPoint} />
                                        <div className='account-token-inner-container'>
                                            <div className='account-top-row'>
                                                <div className='account-token-name'>
                                                    {account[3]}
                                                </div>
                                                <div className='account-token-symbol'>
                                                    {account[4]}
                                                </div>
                                            </div>
                                            <div className='account-bottom-row'>
                                                <div className='account-token-allocation'>
                                                    {account[5]}
                                                </div>
                                                <div className='account-token-allocation-percentage'>
                                                    ({account[6]}%)
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='asset-text-data-detailed-second-element'>
                                {account[0]}
                                </div>
                                <div className='asset-text-data-detailed'>
                                {account[1]}
                                </div>
                                <div className='asset-text-data-detailed'>
                                 {
                                    account[2] < 0 ? (
                                        <div className='account-table-small-eth'> 1 </div>
                                    ) : 
                                    account[2]
                                 }
                                </div>
                            </div>
                        )
                    })
                    }
                </div>      
                <div className='chart-container'>
                    <LineChart
                        background={{ fill: "red" }}
                        fill={"red"}
                        width={400}
                        height={300}
                        data={
                            this.props.state['accountDetailed']['graph'].length == 0 ? (
                            <></>
                            ) : 
                            this.props.state['accountDetailed']['graph']
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
    </div>
        
    )
  }
}



