import React, { Component } from 'react'
import axios from "axios";

const backend_url = "https://stagingws.toshitools.app/"
// const backend_url = "https://ws.toshitools.app/"
// const backend_url = "http://127.0.0.1:8000/" 
var toggle = true
var walletID = ""

export default class Graph extends Component {  
    
      setPropsState = () => {
        this.setState(this.props.state)
      }
    
      componentDidUpdate = () => {
        if(walletID != this.props['state']['header']['walletAddress']){
            // this.volumeHistoryHttpRequest()
          }
          walletID = this.props['state']['header']['walletAddress']
      }
      

  render() {
    return (
      <div className = "table-overview-outer-container">
      <div className='profile-header-text'>
        Volume History Overview
      </div>
      <div className='account-container'>
          <div className='account-ids'>
              <div className='asset-text'>
                Total Wallet Volume
              </div>
              <div className='asset-text'>
                Total Transfers In
              </div>
              <div className='asset-text'>
                Total Transfers Out
              </div>
              <div className='asset-text'>
                Total Wallet Profit Volume
              </div>
              <div className='asset-text'>
                Total Wallet Loss Volume
              </div>
          </div>
          <div className='account-ids'>
          {
            this.props.state.volumeHistoryOverview.table[4]?.map((account, index) => {
              return (
                <div key={index} className='asset-text-data'>
                    ${Math.round(account*100)/100}
                </div>
              )
          })
          } 
          </div>           
      </div>
  </div>
    )
  }
}



