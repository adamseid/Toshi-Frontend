import "../../App.css"
import LeftBar from "./header/LeftBar"

import React, { Component } from 'react'

export default class Header extends Component {

  handleText = (event) => {
    this.props.state['header']['walletAddress'] = event.target.value
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
    }else{
      // INVALID WALLET ADDRESS
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.isValid(this.props.state['header']['walletAddress'])){
      var url = "http://localhost:3000/profile?" + this.props.state['header']['walletAddress']
      console.log(url)
      window.location.href = url;
    }else{
      alert("Invalid Wallet Address")
    }
  }

  
  select = (data) => {
    console.log('select')
    this.props.ws.send(
        JSON.stringify({
            request: 'select',
            location: ['Header'],
            time_frame: data
        })
    )
  }

  componentDidMount(){
    this.iswalletConnected()
  }
  
  updateWalletAddress (wallet) {
    this.setState(this.props.state)
  }

  iswalletConnected = async () => {
    if (window.ethereum){
      const accounts = await window.ethereum.request({
        method: "eth_accounts"
      }).then((result) => {
        if(result){
          if(result[0].length > 0){
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
              location: ['Header'],
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
