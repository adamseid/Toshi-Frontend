import React, { Component } from 'react'
import axios from "axios";


// const backend_url = "http://dualstack.build-dmslo-1gg8dgp88n8zn-697868476.us-east-1.elb.amazonaws.com/"
const backend_url = "http://127.0.0.1:8000/" 
var toggle = true
var walletID = ""

export default class Graph extends Component {  

    assetTableHttpRequest = () => {
        var url = backend_url + "api/toshi/accounthistory/"
        
        axios.post( url , this.props.state).then((response) => {
            console.log(response.data)

        }).catch(error => {
            console.log(error)
          });;
      }
    
      setPropsState = () => {
        this.setState(this.props.state)
      }
    
    //   componentDidUpdate = () => {
    //     if(walletID != this.props['state']['header']['walletAddress']){
    //         this.assetTableHttpRequest()
    //       }
    //       walletID = this.props['state']['header']['walletAddress']
    //   }
      

  render() {
    return (
    <div className = "table-overview-outer-container">
        <div className='profile-header-text'>
            Your Wallet History
        </div>
        <div className='account-container'>
            <div className='account-ids'>
                <div className='asset-text'>
                    Asset
                </div>
                <div className='asset-text'>
                    Total Transactions
                </div>
                <div className='asset-text'>
                    Profit TX
                </div>
                <div className='asset-text'>
                    Profit Total
                </div>
            </div>
            {
              this.props.state['profile']['table'].length == 0 ? (
                <></>
              ) : 
              this.props.state['profile']['table'].map((asset, index) => {
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



