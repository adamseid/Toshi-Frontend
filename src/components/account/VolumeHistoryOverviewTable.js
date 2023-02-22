import React, { Component } from 'react'
import axios from "axios";

const backend_url = "https://stagingws.toshitools.app/"
// const backend_url = "https://ws.toshitools.app/"
// const backend_url = "http://127.0.0.1:8000/" 
var toggle = true
var walletID = ""

export default class Graph extends Component {  

    // volumeHistoryHttpRequest = () => {
    //     var url = backend_url + "api/toshi/volume_history_overview"
    //     console.log(url)
    //     axios.post( url , this.props.state).then((response) => {
    //         console.log("VOLUME HISTORY RESPONSE: ",response.data)
    //         this.props.state['volumeHistoryTable']['maxVolumeHistoryTable'] = [response.data['profile_response']]
    //         this.props.state['accountDetailed']['profitDict'] = [response.data['profile_response'][5]]
    //         this.setPropsState()
    //         console.log("VOLUME HISTORY STATE RESPONSE: ", this.props.state['volumeHistoryTable']['maxVolumeHistoryTable'])
    //         console.log(this.props.state.accountDetailed.profitDict)
    //     }).catch(error => {
    //         console.log(error)
    //       })
    //   }
    
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
          {
            this.props.state['volumeHistoryTable']['maxVolumeHistoryTable'].length == 0 ? (
              <></>
            ) : 
            this.props.state['volumeHistoryTable']['maxVolumeHistoryTable'].map((account, index) => {
              return (
                  <div key={index} className='account-ids'>
                      <div className='asset-text-data'>
                          ${Math.round(account[0]*100)/100}
                      </div>
                      <div className='asset-text-data'>
                          ${Math.round(account[1]*100)/100}
                      </div>
                      <div className='asset-text-data'>
                          ${Math.round(account[2]*100)/100}
                      </div>
                      <div className='asset-text-data'>
                          ${Math.round(account[3]*100)/100}
                      </div>
                      <div className='asset-text-data'>
                          ${Math.round(account[4]*-1*100)/100}
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



