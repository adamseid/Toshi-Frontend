import React, { Component } from 'react'
import profileImage from "../profile/header/images/bulletPoint.png"
import axios from "axios";

const backend_url = "https://stagingws.toshitools.app/"
// const backend_url = "https://ws.toshitools.app/"
// const backend_url = "http://127.0.0.1:8000/" 
var toggle = true
var walletID = ""

export default class Graph extends Component {  

    assetTableHttpRequest = () => {
        var url = backend_url + "api/toshi/assets/"
        
        axios.post( url , this.props.state).then((response) => {
            console.log("READ: ", response.data['profile_response']['profile']['table'])
            this.props.state['profile']['table'] = response.data['profile_response']['profile']['table']
            this.setPropsState()
        }).catch(error => {
            this.props.state['profile']['table'] = []
            this.setPropsState()
          });
      }
    
      setPropsState = () => {
        this.setState(this.props.state)
      }
    
      componentDidUpdate = () => {
        console.log("WALLET ID: ", walletID)
        console.log("PROPS WALLET ID: ", this.props['state']['header']['walletAddress'])
        if(walletID != this.props['state']['header']['walletAddress']){
            console.log("sadfasdfa sdfas df asdf a sdf a")
            this.assetTableHttpRequest()
          }
          walletID = this.props['state']['header']['walletAddress']
      }

      numberOfZeros = (number) => {
        return Math.floor(Math.abs(Math.log10(number))) - 1;
      };
    
      convertDecimalFormat = (number) => {
        if (number < 0.01) {
            number = parseInt(number.toString().replace(".", "")).toString().slice(0,4)
            return number;
        } 
        return null;
      };
      

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
                            {
                                asset.length == 5 ?(
                                    <img className = "profile_token_image" src={profileImage} />
                                ) : (
                                    <img className = "profile_token_image" src={asset[5]} />
                                )
                            }
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
                                {
                                    asset[2] < 0.001 && asset[2] > 0 ? (
                                        <div className='table-token-price'>
                                            <span>0.0</span>
                                            <sub>
                                                {this.numberOfZeros(asset[2])}
                                            </sub>
                                            <span>{this.convertDecimalFormat(asset[2])}</span>
                                        </div>
                                    ) : (
                                        <div className='table-token-price'>
                                            {asset[2]}
                                        </div>
                                    )
                                }
                                {
                                    asset[4] < 0.001 && asset[4] > 0 ? (
                                        <div className='table-token-allocation'>
                                            <span>%0.0</span>
                                            <sub>
                                                {this.numberOfZeros(asset[4])}
                                            </sub>
                                            <span>{this.convertDecimalFormat(asset[4])}</span>
                                        </div>
                                    ) : (
                                        <div className='table-token-allocation'>
                                            {asset[4]}%
                                        </div>
                                    )
                                }
                            </div>
                            </div>
                        </div>
                        <div className='personal-table-right'>
                            <div className='table-amount-container'>
                                {
                                    asset[3] < 0.001 && asset[3] > 0 ? (
                                        <div className='table-amount'>
                                            <span>$0.0</span>
                                            <sub>
                                                {this.numberOfZeros(asset[3])}
                                            </sub>
                                            <span>{this.convertDecimalFormat(asset[3])}</span>
                                        </div>
                                    ) : (
                                        <div className='table-amount'>
                                            ${asset[3]}
                                        </div>
                                    )
                                }
                            {/* <div className='table-price-change'>
                                {asset[5]}
                            </div> */}
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



