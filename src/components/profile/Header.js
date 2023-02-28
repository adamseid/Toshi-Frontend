import "../../App.css"
import { useHistory } from "react-router-dom";
import LeftBar from "./header/LeftBar"
import axios from "axios";

import React, { Component } from 'react'
export default class Header extends Component {



  urlWalletAddress = (wallet) => {
    this.props.state['header']['walletAddress'] = wallet
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
            const walletTest=this.props.state['header']['walletAddress'] = result[0]
            // const walletTest=this.props.state['header']['walletAddress'] =  "0xa542f325990ceb47e2ae8bd9dccf8960b16eb7a9"
            this.sendWalletAddress(walletTest);       
            this.httpPostRequest()     
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

  httpPostRequest = () => {
    axios.post("http://54.158.91.9:8000/api/toshi/", this.props.state).then((response) => {
      console.log("THIS IS THE RESPONSE FROM BACKEND: ", response.data['profile_response'])
      this.props.state['profile'] = response.data['profile_response']['profile']
      this.updateWalletAddress()
    });
  }
  
  updateWalletAddress () {
    this.setState(this.props.state)
  }

  sendWalletAddress(result) {
    const walletAddress=JSON.stringify(result);
  }
  
  handleText = (event) => {
    this.props.state['header']['walletAddress'] = event.target.value
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.updateWalletAddress()
    document.getElementById("search-text").value = ""
  }

  onPressed = async () => {
    if (window.ethereum){
      await window.ethereum.request({
        method: "eth_requestAccounts",
      }).then((result) => {
        if(result[0]){
          if(result[0].length > 0){
            this.updateWalletAddress()
            this.props.state['header']['walletAddress'] = result[0]
            this.httpPostRequest()
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
      <div>
        <div className='outer-flex-box-container'>
          <div className='header-left'>
            Profile Overview
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