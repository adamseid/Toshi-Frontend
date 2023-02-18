import React, { Component } from 'react'
import Header from './profile/Header'
import { updateState } from '../modules/Profile'
import Graph from './profile/Graph'
import Table from './profile/Table'
import axios from "axios";
import LeftBar from "./profile/header/LeftBar"
import { useNavigate } from "react-router-dom";

// WEBSOCKET-LINK
// ('ws://dualstack.build-dmslo-1gg8dgp88n8zn-697868476.us-east-1.elb.amazonaws.com/ws/toshi-profile/')

const default_state = {

  header: {
      walletAddress: "",
      rerender: false,
  },
  profile: {
      graph: [],
      accountBalance: "",
      yearlyGraph:[],
      monthlyGraph:[],
      weeklyGraph:[],
      dailyGraph:[],
      hourlyGraph:[],
      profit:0,
      yearlyProfit: 0,
      monthlyProfit: 0,
      weeklyProfit: 0,
      dailyProfit: 0,
      hourlyProfit: 0,
      table: [],
      component: [],
      totalTokens: 0,
      displayTotalTokens: false,
  },
}

// const backend_url = "https://ws.toshitools.app/"
const backend_url = "http://127.0.0.1:8000/"

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
            // const walletTest=this.state['header']['walletAddress'] = result[0]
            const walletTest=this.state['header']['walletAddress'] = "0xFDA9d5B343cAd6bCDe6A2D14B4BcF28b17e05B2A"
            this.sendWalletAddress(walletTest);       
          }
        }
      })
    }
  }
  
  mobileAndTabletCheck = () => {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };


  componentDidMount(){

    if(this.mobileAndTabletCheck()){
      url = window.location['origin'] + '/mobile'
      window.location = url
    }

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
    console.log("Searched: ", this.state)
    event.preventDefault();
    this.updateWalletAddress();
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

  getTableState = () => {
    var url = backend_url + "api/toshi/assets/"
        
    axios.post( url , this.state).then((response) => {
      console.log("READ: ", response.data['profile_response']['profile']['table'])
      this.state['profile']['table'] = response.data['profile_response']['profile']['table']
      this.setState(this.state)
    }).catch(error => {
      this.state['profile']['table'] = []
      this.setState(this.state)
    });
  }

  getTotalTokens = () => {
    var tokensSum = 0
    this.state['profile']['table'].forEach((asset)=> (tokensSum += asset[5]))
    this.state['profile']['totalTokens'] = tokensSum;
    this.setState(this.state)
  }

  onClickTotalLiqEth = () => {
    document.querySelectorAll(".profile-left-buttons")[0].classList.add("active-button")
    document.querySelectorAll(".profile-left-buttons")[1].classList.remove("active-button")
    this.state['profile']['displayTotalTokens'] = false;
    this.setState(this.state)
  }

  onClickTotalTokens = () => {
    document.querySelectorAll(".profile-left-buttons")[1].classList.add("active-button")
    document.querySelectorAll(".profile-left-buttons")[0].classList.remove("active-button")
    this.getTableState();
    this.getTotalTokens();
    this.state['profile']['displayTotalTokens'] = true;
    this.setState(this.state)
    console.log(this.state['profile']['table'])
    console.log(this.state['profile']['totalTokens'])
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
          <div className='profile-left-buttons-container'>
            <div className="profile-left-buttons active-button" onClick={this.onClickTotalLiqEth}>Total Liquid Eth</div>
            <div className="profile-left-buttons" onClick={this.onClickTotalTokens}>Total Tokens</div>
          </div>
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
