import "../../App.css"
import { useHistory } from "react-router-dom";
import LeftBar from "./header/LeftBar"

import React, { Component } from 'react'
const ws2= new WebSocket('ws://localhost:8000/ws/toshi-profile/')
export default class Header extends Component {

  select = (data) => {
    const ws2 = new WebSocket('ws://localhost:8000/ws/toshi-profile/')
    ws2.onopen = () => {
      console.log('❌❌❌❌THIS IS connected')
      ws2.send(
        JSON.stringify({
          request: 'select',
          location: ['header'],
          time_frame: data
        })
      )
    }
  }

  urlWalletAddress = (wallet) => {
    this.props.state['header']['walletAddress'] = wallet
    this.updateWalletAddress()
    // var ws = new WebSocket('ws://localhost:8000/ws/toshi-profile/')
  // FIXME: change all the socket connections to this approach
    ws2.onopen = () => {
      console.log('THIS IS connected')
      ws2.send(
        JSON.stringify({
          request: 'select',
          location: ['header'],
          time_frame: wallet
        })
      )
    }
  }

  componentDidMount(){
    if(window.location.href.includes("?")){
      var url = window.location.href
      var temp_wallet_address = window.location.href.split("?")[1]
      if(this.isValid(temp_wallet_address)){
        this.urlWalletAddress(temp_wallet_address)
      }
    }else{
      this.iswalletConnected()
    }
  }
  
  updateWalletAddress () {
    console.log("❌ updateWalletAddress information "+JSON.stringify(this.props.state));
    this.setState(this.props.state)
  }

  iswalletConnected = async () => {
    if (window.ethereum){
      const accounts = await window.ethereum.request({
        method: "eth_accounts"
      }).then((result) => {
        if(result){
          console.log("❌Wallet connected 2")
          console.log(JSON.stringify(result));
          if(result[0].length > 0){
            this.updateWalletAddress()
            const walletTest=this.props.state['header']['walletAddress'] = result[0]
            console.log("❌Wallet address update variable"+walletTest)
            console.log("❌Wallet address update"+result[0])
            this.sendWalletAddress(walletTest);
          }
        }
      })
    }
  }

  sendWalletAddress(result) {
    
    const walletAddress=JSON.stringify(result);
  //  const ws = new WebSocket('ws://build-DMSLo-101U365JD1Q4D-1878096217.us-east-1.elb.amazonaws.com/ws/toshi-profile/')
  const ws = new WebSocket('ws://localhost:8000/ws/toshi-profile/')
  ws.onopen = ()=>{
    ws.send(
      JSON.stringify({
          request: 'select',
          location: ['header'],
          time_frame: walletAddress
      })
  )
  }
  

  }
  isValid = (wallet) => {
    var i=0;
    var character='';
    if (wallet.length >= 26 && wallet.length <= 42){
      while (i <= wallet.length){
        character = wallet.charAt(i);
        if (character == character.toUpperCase()) {
          return true
        }
        if (character == character.toLowerCase()){
          console.log ('lower case true');
        }
      i++;
    }
    }
    return false
  }
  
  handleText = (event) => {
    this.props.state['header']['walletAddress'] = event.target.value
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.state['profile']['table']['data'] = []
    console.log("CLICKED")
    const ws = new WebSocket('ws://localhost:8000/ws/toshi-profile/')
    ws.onopen = ()=>{
      ws.send(
        JSON.stringify({
          request: 'select',
          location: ['header'],
          time_frame: this.props.state['header']['walletAddress']
        })
      )
    }
  }

  onPressed = async () => {
    if (window.ethereum){
      const accounts = await window.ethereum.request({
        method: "eth_accounts"
      }).then((result) => {
        if(result){
          if(result[0].length > 0){
            console.log("❌Wallet connected")
            console.log(result[0])
            this.updateWalletAddress()
            this.props.state['header']['walletAddress'] = result[0]
            this.props.ws.send(
                JSON.stringify({
                    request: 'select',
                    location: ['header'],
                    time_frame: result[0]
                })
            )
          }
          else{
            console.log("No wallet connected")
          }
        }
      })
    }



    // if (window.ethereum) {
    //   const accounts = await window.ethereum.request({
    //     method: "eth_requestAccounts",
    //   }).then((result) => {
    //     this.props.state['header']['walletAddress'] = result[0]
    //     this.props.ws.send(
    //       JSON.stringify({
    //           request: 'select',
    //           location: ['header'],
    //           time_frame: result[0]
    //       })
    //     )
    //   }).catch((err) => {
    //     console.log(err)
    //   });
    // }else{
    //   alert("Get MetaMask!");
    // }
  }


  render() {

    return (
      <div>
        <div className='outer-flex-box-container'>
          <div className='header-left'>
            Market Overview
          </div>
          <div className='inner-flex-box-container'>
            <form className='left-side' onSubmit={this.handleSubmit}>
              <input type="text" onChange={this.handleText} id="search-text" name="search-text" placeholder='Search by token, wallet, ENS' />
              <input type="submit" id = "submit" value="Submit" className='search' />
            </form>
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