import React, { Component } from 'react'
import profileImage from "../profile/header/images/temp-profile-image.png"
import axios from "axios";


// const backend_url = "https://ws.toshitools.app/"
const backend_url = "http://127.0.0.1:8000/" 
var toggle = true
var walletID = ""

export default class Graph extends Component {  

    // assetTableHttpRequest = () => {
    //     var url = backend_url + "api/toshi/account/"
    //     console.log(url)
    //     axios.post( url , this.props.state).then((response) => {
    //         console.log("ACCOUNT RESPONSE: ",response.data)
    //         this.props.state['accountOverview']['table'] = response.data['profile_response']['accountOverview']['table']
    //         this.setPropsState()
    //         console.log("STATE RESPONSE: ", this.props.state['accountOverview']['table'])
    //     }).catch(error => {
    //         console.log(error)
    //       })
    //   }

    assetTableHttpRequest = () => {
        var url = backend_url + "api/toshi/accounthistory/"
        
        axios.post( url , this.props.state).then((response) => {
            console.log("ACCOUNT DETAILS: ",response.data)
            this.props['state']['accountOverview']['table'] = response.data['profile_response'][0]
            this.props['state']['accountOverview']['ethUsd'] = response.data['profile_response'][6]
            let sum = 0;
            let tokensProfitable = 0;
            let totalgas = 0;
            response.data['profile_response'][0].forEach((token)=>{
                sum += token[2];
                totalgas += token[10];
                if(token[2] > 0){
                    tokensProfitable += 1;
                }
            })
            this.props['state']['accountOverview']['profit'] = sum;
            this.props['state']['accountOverview']['tokensTraded'] = response.data['profile_response'][0].length
            this.props['state']['accountOverview']['tokensProfitable'] = tokensProfitable;
            this.props['state']['accountOverview']['totalGas'] = totalgas;
            this.setPropsState()
            console.log("TABLEOVERVIEW STATE: " + this.props.state['accountOverview'])
        }).catch(error => {
            console.log(error)
          })
      }

      setPropsState = () => {
        this.setState(this.props.state)
      }
    
      componentDidUpdate = () => {
        if(walletID != this.props['state']['header']['walletAddress']){
            this.assetTableHttpRequest()
          }
          walletID = this.props['state']['header']['walletAddress']
      }
      

  render() {
    return (
    <div className = "table-overview-outer-container">
        <div className='profile-header-text'>
            Profit History Overview
        </div>
        <div className='account-container'>
            <div className='account-ids'>
                <div className='asset-text'>
                    Profit Total
                </div>
                <div className='asset-text'>
                    Total Tokens Traded
                </div>
                <div className='asset-text'>
                    Total Tokens Profitable
                </div>
                <div className='asset-text'>
                    Win Rate
                </div>
                <div className='asset-text'>
                    Total spent on gas fees (USD)
                </div>
            </div>
            
                <div className='account-ids'>
                    <div className='asset-text-data'>
                        ${Math.round(this.props.state.accountOverview.profit*this.props.state.accountOverview.ethUsd*10)/10}
                    </div>
                    <div className='asset-text-data'>
                        {this.props.state.accountOverview.tokensTraded}
                    </div>
                    <div className='asset-text-data'>
                        {this.props.state.accountOverview.tokensProfitable}
                    </div>
                    <div className='asset-text-data'>
                        %{Math.round(this.props.state.accountOverview.tokensProfitable / this.props.state.accountOverview.tokensTraded * 100 * 10)/10}
                    </div>
                    <div className='asset-text-data'>
                        ${Math.round(this.props.state.accountOverview.totalGas * this.props.state.accountOverview.ethUsd * 10000 )/10000}
                    </div>
                </div>
      
        </div>
    </div>
        
    )
  }
}



