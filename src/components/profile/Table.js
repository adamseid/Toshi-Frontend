import React, { Component } from 'react'
import profileImage from "../profile/header/images/temp-profile-image.png"
import axios from "axios";



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



