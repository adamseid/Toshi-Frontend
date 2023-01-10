import React, { Component } from 'react'
import profileImage from "../profile/header/images/temp-profile-image.png"
import axios from "axios";


const backend_url = "http://dualstack.build-dmslo-1gg8dgp88n8zn-697868476.us-east-1.elb.amazonaws.com/"
// const backend_url = "http://127.0.0.1:8000/" 
var toggle = true
export default class Graph extends Component {  

    assetTableHttpRequest = () => {
        var url = backend_url + "api/toshi/assets/"
        
        axios.post( url , this.props.state).then((response) => {
          this.props.state['profile']['table'] = response.data['profile_response']['profile']['table']
          this.setPropsState()
        });
      }
    
      setPropsState = () => {
        this.setState(this.props.state)
      }
    
      componentDidUpdate = () => {
        if(this.props.state['header'] != ""){
            if(toggle){
                toggle = false
                this.assetTableHttpRequest()
            }
        }
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



