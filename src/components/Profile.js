import React, { Component } from 'react'
import Header from './profile/Header'
import { updateState } from '../modules/Profile'
import Graph from './profile/Graph'
import Table from './profile/Table'
import axios from "axios";
import LeftBar from "./profile/header/LeftBar"

// WEBSOCKET-LINK
// ('ws://dualstack.build-dmslo-1gg8dgp88n8zn-697868476.us-east-1.elb.amazonaws.com/ws/toshi-profile/')

const default_state = {

  header: {
      walletAddress: ""
  },
  profile: {
      graph: [],
      accountBalance: "",
      yearlyGraph:[],
      monthlyGraph:[],
      weeklyGraph:[],
      dailyGraph:[],
      hourlyGraph:[],
      table: [],
      component: []
  }
}

export default class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = default_state
  }

  urlWalletAddress = (wallet) => {
    this.state['header']['walletAddress'] = wallet
    this.updateWalletAddress()
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

  iswalletConnected = async () => {
    if (window.ethereum){
      const accounts = await window.ethereum.request({
        method: "eth_accounts"
      }).then((result) => {
        if(result[0]){
          if(result[0].length > 0){
            this.updateWalletAddress()
            const walletTest=this.state['header']['walletAddress'] = result[0]
            // const walletTest=this.state['header']['walletAddress'] =  "0xa542f325990ceb47e2ae8bd9dccf8960b16eb7a9"
            this.sendWalletAddress(walletTest);       
          }
        }
      })
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
    this.setState(this.state)
  }



  sendWalletAddress(result) {
    const walletAddress=JSON.stringify(result);
  }
  
  handleText = (event) => {
    this.state['header']['walletAddress'] = event.target.value
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  onPressed = async () => {
    if (window.ethereum){
      await window.ethereum.request({
        method: "eth_requestAccounts",
      }).then((result) => {
        if(result[0]){
          if(result[0].length > 0){
            this.updateWalletAddress()
            this.state['header']['walletAddress'] = result[0]
          }
          else{
            console.log("No wallet connected")
          }
        }
      })
    }
  }

  render() {
    return (
      <div className='bg'>
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
                  this.state['header']['walletAddress'] == "" ? (
                    <div className='connect_button' onClick={this.onPressed}>
                      Connect
                    </div>
                  ) : 
                  <div className='connect_button'>
                      {this.state['header']['walletAddress'].substring(0, 6) + "..." +  this.state['header']['walletAddress'].substring(38, 42)}
                  </div>
                }
              </div>
            </div>
          </div>
          <LeftBar walletId = {this.state['header']['walletAddress'].substring(0, 6) + "..." +  this.state['header']['walletAddress'].substring(38, 42)} />
        </div>
      <div className='profile-outer-container'>
        <div className='profile-left-side'>
        < Graph
          state = {this.state}
        />
        </div>
        <div className='profile-right-side'>
          < Table
            state = {this.state}
          />
        </div>
    </div>
  </div>
    )
  }
}
