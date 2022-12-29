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

const time_frame = ['1H', '1D', '1W', '1M', '1Y']
const ws2 = new WebSocket('ws://build-dmslo-1gg8dgp88n8zn-697868476.us-east-1.elb.amazonaws.com/ws/toshi-profile/')

export default class Graph extends Component {  
  select = (data,event) => {
    const ws2 = new WebSocket('ws://build-dmslo-1gg8dgp88n8zn-697868476.us-east-1.elb.amazonaws.com/ws/toshi-profile/')
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
    console.log('select')
}

  render() {
    return (
    <div>
        <div className='profile-header-text'>
            Your Assets
        </div>
        <div className='assets-container'>
            <div className='table-ids'>
                <div className='asset-text'>
                    Asset
                </div>
                <div className='asset-text'>
                    Amount
                </div>
            </div>
            {
              this.props.state['profile']['table'].length == 0 ? (
                console.log("EMPTY")
              ) : 
              this.props.state['profile']['table']['data'].map((asset, index) => {
                return (
                    <div key={index} className='table-item'>
                        <div className='personal-table-left'>
                            <div className='table-inner-token-container'>
                            <div className='table-token-container'>
                                <div className='table-token-full'>
                                    {asset[0]}
                                </div>
                                <div className='table-token-short'>
                                {asset[1]}
                                </div>
                            </div>
                            <div className='table-token-price-container'>
                                <div className='table-token-price'>
                                {Math.round(asset[2] * 100) / 100}
                                </div>
                                <div className='table-token-allocation'>
                                {asset[3]}
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className='personal-table-right'>
                            <div className='table-amount-container'>
                            <div className='table-amount'>
                                {Math.round(asset[4] * 100) / 100}
                            </div>
                            <div className='table-price-change'>
                                {asset[5]}
                            </div>
                            </div>
                        </div>
                    </div>
                )
            })
            }            
        </div>
    </div>
        
    )
  }
}



