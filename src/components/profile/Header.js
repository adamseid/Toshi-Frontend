import "../../App.css"
import { useHistory } from "react-router-dom";
import LeftBar from "./header/LeftBar"

import React, { Component } from 'react'

export default class Header extends Component {

  select = (data) => {
    console.log('select')
    this.props.ws.send(
        JSON.stringify({
            request: 'select',
            location: ['header'],
            time_frame: data
        })
    )
  }

  // componentDidUpdate(){
  //   this.iswalletConnected()
  // }

  componentDidMount(){
    this.iswalletConnected()
  }
  
  iswalletConnected = async () => {
    if (window.ethereum){
      const accounts = await window.ethereum.request({
        method: "eth_accounts"
      }).then((result) => {
        if(result){
          if(result[0].length > 0){
            this.props.state['header']['walletAddress'] = result[0]
            this.props.ws.send(
                JSON.stringify({
                    request: 'select',
                    location: ['header'],
                    time_frame: result[0]
                    // time_frame: "0xa542f325990CEB47e2AE8BD9dccF8960b16eB7a9"
                })
            )
          }
        }
      })
    }
  }

  onPressed = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      }).then((result) => {
        this.props.state['header']['walletAddress'] = result[0]
        console.log(result[0])
        this.props.ws.send(
          JSON.stringify({
              request: 'select',
              location: ['header'],
              time_frame: result[0]
          })
        )
      }).catch((err) => {
        console.log(err)
      });
    }else{
      alert("Get MetaMask!");
    }
  }

  render() {

    return (
      <div>
        <div className='outer-flex-box-container'>
          <div className='header-left'>
            Market Overview
          </div>
          <div className='inner-flex-box-container'>
            <div className='left-side'>
              <input type="text" id="search-text" name="search-text" placeholder='Search by token, wallet, ENS' />
              <div className='search'>
                Search
              </div>
            </div>
            <div className='right-side'>
              {
                this.props.state['header']['walletAddress'] == "" ? (
                  <div className='connect_button' onClick={this.onPressed}>
                    Connect
                  </div>
                ) : 
                <div className='connect_button'>
                    {this.props.state['header']['walletAddress'].substring(0, 6) + "..." +  this.props.state['header']['walletAddress'].substring(38, 42)}
                </div>
              }
            </div>
          </div>
        </div>
        <LeftBar walletId = {this.props.state['header']['walletAddress'].substring(0, 6) + "..." +  this.props.state['header']['walletAddress'].substring(38, 42)} />
      </div>
    )
  }
}
