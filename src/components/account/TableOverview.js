import React, { Component } from 'react'
import profileImage from "../profile/header/images/temp-profile-image.png"
import axios from "axios";


const backend_url = "http://ws.toshitools.app/"
// const backend_url = "http://127.0.0.1:8000/" 
var toggle = true
var walletID = ""

export default class Graph extends Component {  

    assetTableHttpRequest = () => {
        var url = backend_url + "api/toshi/account/"
        
        axios.post( url , this.props.state).then((response) => {
            console.log("ACCOUNT RESPONSE: ",response.data)
            this.props.state['accountOverview']['table'] = response.data['profile_response']['accountOverview']['table']
            this.setPropsState()
            console.log("STATE RESPONSE: ", this.props.state['accountOverview']['table'])
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
            Your Wallet History Overview
        </div>
        <div className='account-container'>
            <div className='account-ids'>
                <div className='asset-text'>
                    Eth Balance
                </div>
                <div className='asset-text'>
                    Profit Total
                </div>
                <div className='asset-text'>
                    TX Sum
                </div>
                <div className='asset-text'>
                    Profit TX
                </div>
                <div className='asset-text'>
                    Profit %
                </div>
            </div>
            {
              this.props.state['accountOverview']['table'].length == 0 ? (
                <></>
              ) : 
              this.props.state['accountOverview']['table'].map((account, index) => {
                return (
                    <div key={index} className='account-ids'>
                        <div className='asset-text-data'>
                            {account[4]}
                        </div>
                        <div className='asset-text-data'>
                            {account[0]}
                        </div>
                        <div className='asset-text-data'>
                            {account[1]}
                        </div>
                        <div className='asset-text-data'>
                            {account[2]}
                        </div>
                        <div className='asset-text-data'>
                            {account[3]}
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



