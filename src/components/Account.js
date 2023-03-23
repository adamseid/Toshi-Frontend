import React, { lazy, Suspense,Component } from 'react'
import Header from './account/Header'
import { updateState } from '../modules/Profile'
import Graph from './account/Graph'
import TableOverview from './account/TableOverview'
import TableHistory from './account/TableHistory'
import VolumeHistoryOverviewTable from './account/VolumeHistoryOverviewTable'
import axios from "axios";
import LeftBar from "./account/header/LeftBar"
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from './account/LoadingSpinner'
import { Chart } from "./account/Chart";
import WalletAssets from './account/WalletAssets'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import profileImage from "./profile/header/images/temp-profile-image.png"
import modalImage from "./images/modalImage.png"
import MyWallet from "./images/my_wallet_button.png"

// WEBSOCKET-LINK
// ('ws://dualstack.build-dmslo-1gg8dgp88n8zn-697868476.us-east-1.elb.amazonaws.com/ws/toshi-profile/')

const default_state = {

  header: {
      walletAddress: "",
      connectedWalletAddress: "",
      isLoggedIn: false,
  },
  accountOverview: {
      table: [],
      ethUsd: 0,
      profit: 0,
      tokensTraded: 0,
      
      totalGas: 0,
  },
  accountDetailed: {
    profitDict: 0,
    tokensProfitable: 0,
    transactionsPerToken: 0,
    tokenDetails: 0,
    currentHoldings: {},
    ethUsd: 1,
    table: [],
    graph: [],
    yearlyGraph:[],
    monthlyGraph:[],
    weeklyGraph:[],
    dailyGraph:[],
    hourlyGraph:[],
    yearlyTable:[],
    monthlyTable:[],
    weeklyTable:[],
    dailyTable:[],
    hourlyTable:[],
    maxTable:[],
    ethPriceChange: 0,
    holdingsDisplay: false,
    profitDisplay: false,
  },
  volumeHistoryTable: {
    maxVolumeHistoryTable:[],
  },
  profile: {
    table: [],
  },
  profitHistoryOverview : {
    table: []
  },
  volumeHistoryOverview : {
    table: []
  },
  tokenHistoryOverview : {
    table: [],
    holdingsDisplay: false,
    startPage : 0,
    endPage : 10,
    numberOfItems : 10,
    numberOfPages : [],
  },
  time: 3,
  historyTime: 3,
  showEth: false,
  isLoading: false,
}

let wallet_balance;

const backend_url = process.env.REACT_APP_.BACKEND_BASE_URL
var walletID = ""
const Web3 = require('web3');
const web3 = new Web3("https://eth-mainnet.g.alchemy.com/v2/_mEa4ksrzCdb8fgB5_7-4doIZrMWwpKf")
const erc20TokenAbi = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{ "name": "", "type": "string" }],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{ "name": "", "type": "string" }],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{ "name": "_owner", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "balance", "type": "uint256" }],
    "payable": false,
    "type": "function"
  },
]
const tokenContractAddress = '0x77a90B04d64189d4D09508612C09219bC6816BdC';
const time_frame = ['1H', '1D', '1W', '1M', '1Y', 'MAX']

export default class Profile extends Component {
  

  constructor(props) {
    super(props)
    this.state = default_state
  }

  volumeHistoryHttpRequest = () => {
    this.state.isLoading = true;
    this.setState(this.state)
    var url = backend_url + "api/toshi/history"
    axios.post( url  , this.state).then((response) => {
      var incomingData = response.data['profile_response']
      this.state['profitHistoryOverview']['table'] = incomingData[0]
      this.state['volumeHistoryOverview']['table'] = incomingData[1]
      this.state['tokenHistoryOverview']['table'] = incomingData[2]
      this.state.isLoading = false;
      this.setState(this.state)
    }).catch(error => {
      console.log(error)
    })
  }

  graphHttpRequest = () => {
    var url = backend_url + "api/toshi/accountGraph/";
    axios.post(url, this.state).then((response) => {
      console.log("GRAPH: ", response.data['profile_response'])
      this.state['profile']['graph'] = response.data['profile_response'][0]
      this.state['profile']['ranges'] = response.data['profile_response'][1]
      this.state['profile']['ticks'] = response.data['profile_response'][2]
      this.setState(this.State);
    });
  };

  select = (data,event) => {
    if(data == "MAX"){
      this.state.time = 4
    }else if (data == "1D"){
      this.state.time = 0
    }else if (data == "1W"){
      this.state.time = 1
    }else if(data == "1M"){
      this.state.time = 2
    }else if(data == "1Y"){
      this.state.time = 3
    }

    this.setState(this.state)
  }

  // componentDidUpdate = () => {
  //   walletID = this['state']['header']['walletAddress']
  //   console.log(this['state']['header']['walletAddress'])
  //   if(walletID == ""){
  //     console.log("SIGNED OUT")
  //   }
  //   console.log("SIGNED IN")
  //   if(walletID != this['state']['header']['walletAddress']){
  //     if(walletID != ""){
  //       this.graphHttpRequest()
  //       this['state']['accountDetailed']['table'] = []
  //       this.connectAndSendWebsocketRequest(this['state']['header']['walletAddress']);
  //       this.iswalletConnected()
  //       // this.graphHttpRequest()
  //     }
  //   }      
  // }

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
            const walletTest=this.state['header']['walletAddress'] = result[0];
            const userAddress = result[0];
            const erc20Contract = new web3.eth.Contract(erc20TokenAbi, tokenContractAddress);
            erc20Contract.methods.balanceOf(userAddress).call((error, result) => {
              if (!error) {
                var tokenAmount = result / (10 ** 9)
                var remainder = tokenAmount - 4000000000
                if(remainder >= 0 || userAddress == "0x0741cE75543B9a2D69afFF096e587f7bAa5E4F13" ||  userAddress == "0x0741ce75543b9a2d69afff096e587f7baa5e4f13"|| userAddress == "0x1cab3c4ad653148f15b4ad8d7b5bd96ad968279c"|| userAddress == "0xae719f64348d9cc7b781746b95584a971d1bcb71"|| userAddress == "0xfda9d5b343cad6bcde6a2d14b4bcf28b17e05b2a"){
                  this.state.header.connectedWalletAddress = userAddress
                  this.state.header.isLoggedIn = true
                  this.updateWalletAddress()
                  this.graphHttpRequest()
                  this.updateWalletAddress()
                  this.connectAndSendWebsocketRequest(userAddress)
                  document.getElementById("search-text").disabled = false
                }else{
                  this.state.header.isLoggedIn = false
                  this.updateWalletAddress()
                  remainder = Math.abs(remainder)
                }
              } else {
                console.error(error);
              }
            });
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
    this.state['profitHistoryOverview']['table'] = []
    document.getElementById("search-text").disabled = true
    this.setState(this.state)

    if(this.mobileAndTabletCheck()){
      url = window.location['origin'] + '/mobile'
      window.location = url
    }

    if(window.location.href.includes("?")){
      var url = window.location.href
      var temp_wallet_address = window.location.href.split("?")[1]
      if(this.isValid(temp_wallet_address)){
        this.urlWalletAddress(temp_wallet_address)
        this.connectAndSendWebsocketRequest(temp_wallet_address)
        this.graphHttpRequest()
      }
    }else{
      this.iswalletConnected()
    }

  }

  tokenHistoryOverviewResponse = (itemRow,year,action) => {
    var profit = itemRow[5]
    var transfersIn = itemRow[12]
    var transfersOut = itemRow[13]
    var profitHistoryOverviewTable = this.state['profitHistoryOverview']['table'][year]
    var volumeHistoryOverviewTable = this.state['volumeHistoryOverview']['table'][year]
    if(action == "subtract"){
      profitHistoryOverviewTable[0] = profitHistoryOverviewTable[0] - profit
      profitHistoryOverviewTable[1] = profitHistoryOverviewTable[1] - 1
      volumeHistoryOverviewTable[0] = volumeHistoryOverviewTable[0] - transfersOut - transfersIn
      volumeHistoryOverviewTable[1] = volumeHistoryOverviewTable[1] - transfersIn
      volumeHistoryOverviewTable[2] = volumeHistoryOverviewTable[2] - transfersOut
      if(profit >=0){
        profitHistoryOverviewTable[2] = profitHistoryOverviewTable[2] - 1
        volumeHistoryOverviewTable[3] = volumeHistoryOverviewTable[3] - profit
      }else{
        volumeHistoryOverviewTable[4] = volumeHistoryOverviewTable[4] - profit
      }
    }else if(action == "addition"){
      volumeHistoryOverviewTable[0] = volumeHistoryOverviewTable[0] + transfersOut + transfersIn
      volumeHistoryOverviewTable[1] = volumeHistoryOverviewTable[1] + transfersIn
      volumeHistoryOverviewTable[2] = volumeHistoryOverviewTable[2] + transfersOut
      profitHistoryOverviewTable[0] = profitHistoryOverviewTable[0] + profit
      profitHistoryOverviewTable[1] = profitHistoryOverviewTable[1] + 1
      if(profit >=0){
        profitHistoryOverviewTable[2] = profitHistoryOverviewTable[2] + 1
        volumeHistoryOverviewTable[3] = volumeHistoryOverviewTable[3] + profit
      }else{
        volumeHistoryOverviewTable[4] = volumeHistoryOverviewTable[4] + profit
      }
    }
    profitHistoryOverviewTable[3] = Math.round((profitHistoryOverviewTable[2]/profitHistoryOverviewTable[1])*100)
    this.setState(this.state)
  }

  connectAndSendWebsocketRequest(address){
    const ws = new WebSocket(process.env.REACT_APP_.BACKEND_BASE_URL_WEBSOCKET + 'toshi-history' + '/');
    
    ws.onopen = () => {
      console.log("history page websocket connected")
      if(ws.readyState){
        console.log("history page websocket ready")
        this.state.isLoading = true;
        document.body.classList.add("greyBackground");
        this.setState(this.state)
        ws.send(
            JSON.stringify({
                request: "connect",
                walletAddress: address,
            })
        )
        console.log("history page websocket sent 1")
      }
    }

    ws.onmessage = (e) => {
      console.log("history page websocket recieved: ", e)
      this.state.isLoading = false;
      this.setState(this.state)
      document.body.classList.remove("greyBackground");
      let data = JSON.parse(e.data)['response']
      let numberofPagesArr = []
      var lengthOfTable = Math.ceil(data[2][3].length/ this.state['tokenHistoryOverview']['numberOfItems'])
      this.state['profitHistoryOverview']['table'] = data[0]
      this.state['volumeHistoryOverview']['table'] = data[1]
      console.log(data)
      for (let i=0;i<data[2].length;i++){
        data[2][i] = data[2][i].sort((a, b) => (Math.abs(b[5]) - Math.abs(a[5])));
      }
      this.state['tokenHistoryOverview']['table'] = data[2]
      // console.log(this.state['tokenHistoryOverview']['table'])
      for(let i = 0; i < lengthOfTable; i++){
        numberofPagesArr.push(i+1)
      }
      this.state['tokenHistoryOverview']['numberOfPages'] = numberofPagesArr
    }
    this.updateWalletAddress()
    console.log("INCOMING DATA: ", this.state)
  }

  
  updateWalletAddress () {
    this.setState(this.state)
  }



  sendWalletAddress(result) {
    const walletAddress=JSON.stringify(result);
  }
  
  handleText = (event) => {
    // console.log(event.target.value)
    this.state['header']['walletAddress'] = event.target.value
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.updateWalletAddress();
    var incomingWallet = this.state.header.walletAddress
    if(incomingWallet != walletID){
      walletID = this.state.header.walletAddress
      if(incomingWallet != ""){
        this.graphHttpRequest()
        this['state']['accountDetailed']['table'] = []
        this.connectAndSendWebsocketRequest(this['state']['header']['walletAddress']);
      }
    }
    document.getElementById("search-text").value = ""
  }

  handleMyWallet = () => {
    if(this.state.header.connectedWalletAddress != ""){
      this.state['header']['walletAddress'] = this.state.header.connectedWalletAddress
      this.updateWalletAddress();
    }
 
  }

  onPressed = async () => {
    if (window.ethereum){
      await window.ethereum.request({
        method: "eth_requestAccounts",
      }).then((result) => {
        if(result[0]){
          if(result[0].length > 0){
            this.state['header']['walletAddress'] = result[0];
            const userAddress = result[0];
            const erc20Contract = new web3.eth.Contract(erc20TokenAbi, tokenContractAddress);
            erc20Contract.methods.balanceOf(userAddress).call((error, result) => {
              if (!error) {
                var tokenAmount = result / (10 ** 9)
                var remainder = tokenAmount - 4000000000
                if(remainder >= 0 || userAddress == "0x0741cE75543B9a2D69afFF096e587f7bAa5E4F13" ||  userAddress == "0x0741ce75543b9a2d69afff096e587f7baa5e4f13" || userAddress == "0x1cab3c4ad653148f15b4ad8d7b5bd96ad968279c"|| userAddress == "0xae719f64348d9cc7b781746b95584a971d1bcb71"|| userAddress == "0xfda9d5b343cad6bcde6a2d14b4bcf28b17e05b2a"){
                  this.state.header.connectedWalletAddress = userAddress
                  this.state.header.isLoggedIn = true
                  this.connectAndSendWebsocketRequest(userAddress)
                  this.updateWalletAddress()
                  this.graphHttpRequest()
                  this.updateWalletAddress()
                  document.getElementById("search-text").disabled = false
                }else{
                  this.state.header.isLoggedIn = false
                  this.updateWalletAddress()
                  remainder = Math.abs(remainder)
                }
              } else {
                console.error(error);
              }
            });
          }
          else{
            console.log("No wallet connected")
          }
        }
      })
    }
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

  clusterOnClick = (e) => {
    if(!e.target.classList.contains("active")){
      this.state.showEth = !this.state.showEth
      this.setState(this.state)
    }
  }

  render() {
    return (
      <div>
        {
          this.state.header.isLoggedIn == false ? (
            <div className='not_auth_container'>
              <div className='bg not_auth'>
                <div className='account_header'>
                  <div className='outer-flex-box-container'>
                    <div className='header-left'>
                        Wallet Overview
                    </div>
                    <div className='inner-flex-box-container'>
                      <form className='left-side' onSubmit={this.handleSubmit}>
                        <input className="mr" type="text" onChange={this.handleText} id="search-text" name="search-text" placeholder='Search by token, wallet, ENS'  disabled={true}/>
                        <input type="submit" id = "submit" value="Submit" className='search mr' style={{cursor: 'pointer'}} />
                      </form>
                      
                      <div className='right-side'>
                        {
                          this.state['header']['connectedWalletAddress'] == "" ? (
                            <div className='connect_button' onClick={this.onPressed}>
                              Connect
                            </div>
                          ) : 
                          <div className="my-wallet-container">
                            {this.state.header.connectedWalletAddress == "" ? <></>:
                              <div onClick={this.handleMyWallet} style={{cursor: 'pointer'}}>
                                <img src={MyWallet} className="my-wallet-img mr"></img>
                              </div>
                            }
                          <div className='connect_button'>
                              {this.state.header.connectedWalletAddress.substring(0, 6) + "..." +  this.state.header.connectedWalletAddress.substring(38, 42)}
                          </div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                  <LeftBar walletId = {this.state['header']['walletAddress'].substring(0, 6) + "..." +  this.state['header']['walletAddress'].substring(38, 42)} />
                </div>
              <div className='account-outer-container'>
              <div className='profile-wallet-information'>
                  <div className='profile-wallet-information-left'>
                    {this.state['header']['walletAddress']? <Jazzicon className="jazzicon" diameter={153} seed={jsNumberForAddress(this.state['header']['walletAddress'])} /> :
                    <img className='profile-image' src = {profileImage} />
                    }
                    
                  </div>
                  <div className='profile-wallet-information-right'>
                    <div className='wallet-worth'>
                    {/* { this.state.profile.graph?.length != 0 && this.state.profile.graph ? (this.state.showEth? (this.state.profile.graph[0]["USD"] < 0 ? "-$" + Math.abs(this.state.profile.graph[0]["USD"]?.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") :"$" + this.state.profile.graph[0]["USD"]?.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : Math.round(this.state.profile.graph[0]["ETH"]*10000)/10000 + " ETH") : 0} */}
                      { this.state.profile.graph?.length != 0 && this.state.profile.graph ? (this.state.showEth ? (Math.round(this.state.profile.graph[0]["ETH"]*10000)/10000).toFixed(4) + " ETH" : (this.state.profile.graph[0]["USD"] < 0 ? "-$" + Math.abs((this.state.profile.graph[0]["USD"]?.toFixed(2)))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") :"$" + (this.state.profile.graph[0]["USD"]?.toFixed(2)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")))) : 0 }
                    
                    </div>
                    <div className='wallet-id'>
                      {this.state.header.walletAddress ? 
                      <>
                      <a href={"https://etherscan.io/address/" + this.state['header']['walletAddress']} target="_blank">
                      {this.state['header']['walletAddress'].substring(0, 6) + "..." + this.state['header']['walletAddress'].substring(38, 42)}
                      </a>
                      {
                        this.state.header.walletAddress === this.state.header.connectedWalletAddress ? 
                        <span className="my-wallet">
                          My Wallet
                        </span> : <></>
                      }
                      
                      </>
                      :
                      <span>...</span>
                    }
                    
                    </div>
                    <div className="chart-button-container">
                      <div className={"chart-button" + (this.state.showEth ? " active" : "")} onClick={this.clusterOnClick}>ETH</div>
                      <div className={"chart-button" + (this.state.showEth ? "" : " active")} onClick={this.clusterOnClick}>USD</div>
                    </div>
                  </div>
                </div>
                <div className='date-change'>
                    <button className={"hour " + (this.state.time===0 ? "active" : "")} onClick={this.select.bind(this, time_frame[1])}>{time_frame[1]}</button>
                    <button className={"hour " + (this.state.time===1 ? "active" : "")} onClick={this.select.bind(this, time_frame[2])}>{time_frame[2]}</button>
                    <button className={"hour " + (this.state.time===2 ? "active" : "")} onClick={this.select.bind(this, time_frame[3])}>{time_frame[3]}</button>
                    <button className={"hour " + (this.state.time===3 ? "active" : "")} onClick={this.select.bind(this, time_frame[4])}>{time_frame[4]}</button>
                    <button className={"hour " + (this.state.time===4 ? "active" : "")} onClick={this.select.bind(this, time_frame[5])}>{time_frame[5]}</button>
                </div>
                < TableOverview
                    state = {this.state}
                    numberOfZeros = {this.numberOfZeros}
                    convertDecimalFormat = {this.convertDecimalFormat}
                />
                < VolumeHistoryOverviewTable
                  state = {this.state}
                />
                <Chart
                  graphData = {this.state['profile']['graph']}
                  ranges = {this.state['profile']['ranges']}
                  ticks = {this.state['profile']['ticks']}
                />
                < WalletAssets
                    state = {this.state}
                    numberOfZeros = {this.numberOfZeros}
                    convertDecimalFormat = {this.convertDecimalFormat}
                    tokenHistoryOverviewResponse = {this.tokenHistoryOverviewResponse}
                />
                < TableHistory
                    state = {this.state}
                    numberOfZeros = {this.numberOfZeros}
                    convertDecimalFormat = {this.convertDecimalFormat}
                    tokenHistoryOverviewResponse = {this.tokenHistoryOverviewResponse}
                />
            </div>
          </div>
              <div className='un_authenticated_user_modal_container'>
                <img className='un_authenticated_user_modal_container_image' src={modalImage} />
                <div className='un_authenticated_user_modal_container_title'>
                  Tier 1 Holder Required to use Dapp
                </div>
                <div className='un_authenticated_user_modal_container_text'>
                  Please Connect a wallet that has at least 4,000,000,000 $TOSHI 
                </div>
                <div className='connect_button_modal' onClick={this.onPressed}>
                  Connect Wallet
                </div>
                <a href = "https://www.toshi.tools/#holder-tiers" className='un_authenticated_user_modal_container_button_container'>
                  <div className='un_authenticated_user_modal_container_button'>
                    What is a Tier 1 Holder?
                  </div>
                </a>
              </div>
            </div>
          ) : (
            <div className='bg'>
              <div className='account_header'>
                <div className='outer-flex-box-container'>
                  <div className='header-left'>
                      Wallet Overview
                  </div>
                  <div className='inner-flex-box-container'>
                    <form className='left-side' onSubmit={this.handleSubmit}>
                      <input className="mr" type="text" onChange={this.handleText} id="search-text" name="search-text" placeholder='Search by token, wallet, ENS' />
                      <input type="submit" id = "submit" value="" className='search mr' style={{cursor: 'pointer'}} />
                      <div className="search-label">Search</div>
                    </form>
                    
                    <div className='right-side'>
                      {
                        this.state['header']['connectedWalletAddress'] == "" ? (
                          <div className='connect_button' onClick={this.onPressed}>
                            Connect
                          </div>
                        ) : 
                        <div className="my-wallet-container">
                          {this.state.header.connectedWalletAddress == "" ? <></>:
                            <div onClick={this.handleMyWallet} style={{cursor: 'pointer'}}>
                              <img src={MyWallet} className="my-wallet-img mr"></img>
                            </div>
                          }
                        <div className='connect_button'>
                            {this.state.header.connectedWalletAddress.substring(0, 6) + "..." +  this.state.header.connectedWalletAddress.substring(38, 42)}
                        </div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
                <LeftBar walletId = {this.state['header']['walletAddress'].substring(0, 6) + "..." +  this.state['header']['walletAddress'].substring(38, 42)} />
              </div>
            <div className='account-outer-container'>
            <div className='profile-wallet-information'>
                <div className='profile-wallet-information-left'>
                  {this.state['header']['walletAddress']? <Jazzicon className="jazzicon" diameter={170} seed={jsNumberForAddress(this.state['header']['walletAddress'])} /> :
                  <img className='profile-image' src = {profileImage} />
                  }
                  
                </div>
                <div className='profile-wallet-information-right'>
                  <div className='wallet-worth'>
                    {/* { this.state.profile.graph?.length != 0 && this.state.profile.graph ? (this.state.showEth ? (Math.round(this.state.profile.graph?.at(-1)["ETH"]*10000)/10000).toFixed(4) + " ETH" : (this.state.profile.graph?.at(-1)["USD"] < 0 ? "-$" + Math.abs((this.state.profile.graph?.at(-1)["USD"]?.toFixed(2))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") :"$" + (this.state.profile.graph?.at(-1)["USD"]?.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")))) : 0 } */}
                    { this.state.profile.graph?.length != 0 && this.state.profile.graph ? (this.state.showEth ? (Math.round(this.state.profile.graph[0]["ETH"]*10000)/10000).toFixed(4) + " ETH" : (this.state.profile.graph[0]["USD"] < 0 ? "-$" + Math.abs((this.state.profile.graph[0]["USD"]?.toFixed(2)))?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") :"$" + (this.state.profile.graph[0]["USD"]?.toFixed(2)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")))) : 0 }

                  </div>
                  <div className='wallet-id'>
                    {this.state.header.walletAddress ? 
                    <>
                    <a href={"https://etherscan.io/address/" + this.state['header']['walletAddress']} target="_blank">
                    {this.state['header']['walletAddress'].substring(0, 6) + "..." + this.state['header']['walletAddress'].substring(38, 42)}
                    </a>
                    {
                      this.state.header.walletAddress === this.state.header.connectedWalletAddress ? 
                      <span className="my-wallet">
                        My Wallet
                      </span> : <></>
                    }
                    
                    </>
                    :
                    <span>...</span>
                  }
                  
                  </div>
                  <div className="chart-button-container">
                    <div className={"chart-button" + (this.state.showEth ? " active" : "")} onClick={this.clusterOnClick}>ETH</div>
                    <div className={"chart-button" + (this.state.showEth ? "" : " active")} onClick={this.clusterOnClick}>USD</div>
                  </div>
                </div>
              </div>
              <div className="time-header-text">Select Data Timeframe</div>
              <div className='date-change'>
                  <button className={"hour " + (this.state.time===0 ? "active" : "")} onClick={this.select.bind(this, time_frame[1])}>{time_frame[1]}</button>
                  <button className={"hour " + (this.state.time===1 ? "active" : "")} onClick={this.select.bind(this, time_frame[2])}>{time_frame[2]}</button>
                  <button className={"hour " + (this.state.time===2 ? "active" : "")} onClick={this.select.bind(this, time_frame[3])}>{time_frame[3]}</button>
                  <button className={"hour " + (this.state.time===3 ? "active" : "")} onClick={this.select.bind(this, time_frame[4])}>{time_frame[4]}</button>
                  <button className={"hour " + (this.state.time===4 ? "active" : "")} onClick={this.select.bind(this, time_frame[5])}>{time_frame[5]}</button>
              </div>
              {this.state.isLoading ? <LoadingSpinner/> : <></>}
              < TableOverview
                  state = {this.state}
                  numberOfZeros = {this.numberOfZeros}
                  convertDecimalFormat = {this.convertDecimalFormat}
              />
              < VolumeHistoryOverviewTable
                state = {this.state}
              />
              <Chart
                graphData = {this.state['profile']['graph']}
                ranges = {this.state['profile']['ranges']}
                ticks = {this.state['profile']['ticks']}
              />
              < WalletAssets
                  state = {this.state}
                  numberOfZeros = {this.numberOfZeros}
                  convertDecimalFormat = {this.convertDecimalFormat}
                  tokenHistoryOverviewResponse = {this.tokenHistoryOverviewResponse}
              />
              < TableHistory
                  state = {this.state}
                  numberOfZeros = {this.numberOfZeros}
                  convertDecimalFormat = {this.convertDecimalFormat}
                  tokenHistoryOverviewResponse = {this.tokenHistoryOverviewResponse}
              />
          </div>
        </div>
          )
        }
  </div>
    )
  }
}
