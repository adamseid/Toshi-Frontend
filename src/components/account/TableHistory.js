import React, { lazy, Suspense,Component } from 'react'
import axios from "axios";
import BulletPoint from "../images/bulletPoint.png";
import hideImage from "../images/hide.png";
import showImage from "../images/show.png";
import {BigNumberComma} from "./BigNumberComma"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import { NumberFormat } from "./NumberFormat";
import { ShortenTokenNameSymbol } from './ShortenTokenNameSymbol';

const backend_url = process.env.REACT_APP_.BACKEND_BASE_URL
const ITEMS_PER_PAGE = 1; // Number of items per page
var toggle = true;
var walletID = "";
const dexToolsURL = "https://etherscan.io/dex/uniswapv2/";
const time_frame = ['1H', '1D', '1W', '1M', '1Y', 'MAX'];

export default class TableHistory extends Component {

  componentDidUpdate = () => {
    console.log("UPDATED")
    console.log(this.props.state.tokenHistoryOverview.table[this.props.state.historyTime])
  }

  setPropsState = () => {
    this.setState(this.props.state);
  };

  componentDidUpdate = () => {
    if (walletID != this.props["state"]["header"]["walletAddress"]) {
      this.props["state"]["accountDetailed"]["table"] = [];
    }
    walletID = this.props["state"]["header"]["walletAddress"];
  };

  onClickSwitchHandlerHoldings = () => {
    this.props.state["tokenHistoryOverview"]["holdingsDisplay"] =
      !this.props.state["tokenHistoryOverview"]["holdingsDisplay"];
    this.setPropsState();
    console.log("switched");
  };

  onClickSwitchHandlerProfit = () => {
    this.props.state["tokenHistoryOverview"]["profitDisplay"] =
      !this.props.state["tokenHistoryOverview"]["profitDisplay"];
    this.setPropsState();
    console.log("switched");
  };

  handleClick = (page) => {
    console.log(page)
  };

  showAsset = (index) => {
    var itemRow = document.getElementsByClassName("account-detailed-ids")[index]
    this.props.tokenHistoryOverviewResponse(this.props.state.tokenHistoryOverview.table[this.props.state.historyTime][index],this.props.state.historyTime,"addition")
    var showImage = document.getElementsByClassName("show_image")[index]
    var hideImage = document.getElementsByClassName("hide_image")[index]
    showImage.style.display = "block"
    hideImage.style.display = "none"
    itemRow.style.opacity = "1"
  }

  hideAsset = (index) => {
    var itemRow = document.getElementsByClassName("account-detailed-ids")[index]
    this.props.tokenHistoryOverviewResponse(this.props.state.tokenHistoryOverview.table[this.props.state.historyTime][index],this.props.state.historyTime,"subtract")
    var showImage = document.getElementsByClassName("show_image")[index]
    var hideImage = document.getElementsByClassName("hide_image")[index]
    hideImage.style.display = "block"
    showImage.style.display = "none"
    itemRow.style.opacity = "0.3"
  }

  pageNumber = (e) => {
    var pageNumberClassName = e.target.classList[0]
    var targetPageNumber = parseInt(e.target.innerText)
    var pageNumberClassNameArr = document.getElementsByClassName(pageNumberClassName)
    for(let i=0;i<pageNumberClassNameArr.length;i++){
      pageNumberClassNameArr[i].classList.remove("active")
    }
    e.target.classList.add("active")
    this.props.state.tokenHistoryOverview.startPage = (targetPageNumber * this.props.state.tokenHistoryOverview.numberOfItems) - this.props.state.tokenHistoryOverview.numberOfItems
    this.props.state.tokenHistoryOverview.endPage = (targetPageNumber * this.props.state.tokenHistoryOverview.numberOfItems)
    this.setPropsState();
    var showImage = document.getElementsByClassName("show_image")
    var hideImage = document.getElementsByClassName("hide_image")
    var tokenRows = document.getElementsByClassName("account-detailed-ids")
    for(let i=0;i<showImage.length;i++){
      hideImage[i].style.display = "none"
    }
    for(let i=0;i<showImage.length;i++){
      showImage[i].style.display = "block"
    }
    for(let i=0;i<tokenRows.length;i++){
      tokenRows[i].style.opacity = "1"
    }
  }

  select = (data,event) => {
    if(data == "MAX"){
      this.props.state.historyTime = 4
    }else if (data == "1D"){
      this.props.state.historyTime = 0
    }else if (data == "1W"){
      this.props.state.historyTime = 1
    }else if(data == "1M"){
      this.props.state.historyTime = 2
    }else if(data == "1Y"){
      this.props.state.historyTime = 3
    }
    this.props.state.tokenHistoryOverview.endPage = 10
    var lengthOfTable = Math.ceil(this.props.state.tokenHistoryOverview.table[this.props.state.historyTime].length/ this.props.state['tokenHistoryOverview']['numberOfItems'])
    let numberofPagesArr = []
    for(let i = 0; i < lengthOfTable; i++){
      numberofPagesArr.push(i+1)
    }
    this.props.state['tokenHistoryOverview']['numberOfPages'] = numberofPagesArr
    this.setPropsState();

  }


  render() {
    return (
      <div className="table-overview-outer-container">
        <div className="profile-header-text">Token History Overview</div>
        <div className="account-container">
          <div className='tokenHistoryOverviewTitlesContainer'>
            <div className="tokenHistoryOverviewTitles">
              <div className="token_history_overview_title token_name">
                Token Name
              </div>

              <div className="token_history_overview_title total_transactions">
                <div className='divider_line_total_transactions'></div>
                Total Transactions
              </div>
              <div className="token_history_overview_title total_profit">
              <div className='divider_line_total_profit'></div>
                Total Profit
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={this.onClickSwitchHandlerProfit}
                    checked={
                      this.props.state["tokenHistoryOverview"]["profitDisplay"]
                    }
                  />
                  <span className="slider round"></span>
                  <span className="ETH-label">ETH</span>
                  <span className="USD-label">USD</span>
                </label>
              </div>
              <div className="token_history_overview_title current_holdings">
              <div className='divider_line_holdings'></div>
                Current Holdings
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={this.onClickSwitchHandlerHoldings}
                    checked={
                      this.props.state["tokenHistoryOverview"]["holdingsDisplay"]
                    }
                  />
                  <span className="slider round"></span>
                  <span className="ETH-label">ETH</span>
                  <span className="USD-label">USD</span>
                </label>
              </div>
              <div className='divider_line_hide_unhide'></div>
              <div className="token_history_overview_title hide_unhide">
                Hide/Unhide
              </div>
            </div>
          </div>
          <div className="account-table">
            <div className='tokenItmesContainer'>
              <Suspense fallback={<div>Loading...</div>}>
              <div>
              {this.props.state.tokenHistoryOverview.table[this.props.state.historyTime]?.slice(this.props.state.tokenHistoryOverview.startPage, this.props.state.tokenHistoryOverview.endPage).map((asset, index)=> {
                return (
              <div key={index} className="account-detailed-ids">
                  <div className="asset-text-data-detailed-first-element token_detailes">
                    <div className="account-token-outer-container">
                      <img className="account-bullet" src={
                        asset[9] ? asset[9] : BulletPoint
                      } />
                      <div className="account-token-inner-container">
                      <a className="account-top-row" href={"https://etherscan.io/token/" + asset[2]} target="_blank">
                      <div className="account-token-name nowrap"><ShortenTokenNameSymbol number={asset[0]}/></div>
                      <div className="account-token-symbol nowrap"><ShortenTokenNameSymbol number={asset[1]}/></div>
                      </a>
                      <div className="account-bottom-row">
                        <div className="account-token-allocation">
                          {Math.abs(Math.round(asset[4]*100)/100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </div>
                        <div className="account-token-allocation-percentage"></div>
                      </div>
                      </div>
                    </div>
                  </div>
 
                  <div className="asset-text-data-detailed total_transactions">
                    {asset[3]}
                  </div>
              
                  <div className="asset-text-data-detailed total_profit">
                    {asset[5] >= 0 ? (
                              <div className = "positive tokenHistoryTableBlock" key={index}>
                                <div className="nowrap">
                                  {this.props.state.tokenHistoryOverview.profitDisplay ? (
                                  asset[6] === 0 || asset[7] === 0 ? <>$0</> :
                                  asset[6] < 0.01 ? <>$<NumberFormat number={asset[6]}/></> : "$" + Math.abs(Math.round(asset[5]*100)/100)
                                  ): asset[6] === 0 || asset[7] === 0 ? <>0<span className="grey"> ETH</span></> : 
                                  asset[7] < 0.01 ? <><NumberFormat number={asset[7]}/><span className="grey"> ETH</span></> : 
                                  <>{Math.abs(Math.round((asset[7]/asset[6])*asset[5]*1000)/1000).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<span className="grey"> ETH</span></>}
                                </div>
                                <div className='bottom'>
                                    {asset[10]}%
                                </div>
                              </div>
                          ) :
                          <div className = "negative tokenHistoryTableBlock" key={index}>
                            <div className="nowrap">
                              {this.props.state.tokenHistoryOverview.profitDisplay ? (
                              asset[6] === 0 || asset[7] === 0 ? <>$0</> :
                              asset[6] < 0.01 ? <>$<NumberFormat number={asset[6]}/></> : "$" + Math.abs(Math.round(asset[5]*100)/100)
                              ): asset[6] === 0 || asset[7] === 0 ? <>0<span className="grey"> ETH</span></> : 
                              asset[7] < 0.01 ? <><NumberFormat number={asset[7]}/><span className="grey"> ETH</span></> : 
                              <>{Math.abs(Math.round((asset[7]/asset[6])*asset[5]*1000)/1000).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<span className="grey"> ETH</span></>}
                            </div>
                            {/* {Math.round(asset[7]*10000)/10000} */}
                              {/* <div>
                                  {Math.abs(Math.round((asset[5]*100))/100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              </div> */}
                              <div className='bottom'>
                                  {asset[10]}%
                              </div>
                          </div>}
                  </div>
                <div className="asset-text-data-detailed currentHoldings current_holdings">
                  <div className="nowrap">
                      {this.props.state.tokenHistoryOverview.holdingsDisplay ? (
                        asset[6] === 0 || asset[7] === 0 ? <>$0</> :
                      asset[6] < 0.01 ? <>$<NumberFormat number={asset[6]}/></> : "$" + Math.round(asset[6]*100)/100
                ): asset[6] === 0 || asset[7] === 0 ? <>0<span className="grey"> ETH</span></> : 
                asset[7] < 0.01 ? <><NumberFormat number={asset[7]}/><span className="grey"> ETH</span></> : 
                <>{Math.round(asset[7]*10000)/10000}<span className="grey"> ETH</span></>}
                  </div>
                </div>
                <div className="asset-text-data-detailed hide_unhide">
                    <img className='show_image' src={showImage} onClick={this.hideAsset.bind(this, index)} />
                    <img className='hide_image' src={hideImage} onClick={this.showAsset.bind(this, index)}/>
                </div>
              </div>
                )
              })}
            </div>
              </Suspense>
              
            </div>
          </div>
        </div>
        {
          this.props.state["tokenHistoryOverview"]["numberOfPages"].length > 0 ? (
            <div className='pagination_buttons_tokens'>
              {
                this.props.state["tokenHistoryOverview"]["numberOfPages"].map((asset, index)=> {
                  if(index == 0){
                    return (
                      <div key={index} className='page_number active' onClick={this.pageNumber}>
                        {asset}
                      </div>
                    )
                  }else{
                    return (
                      <div key={index} className='page_number' onClick={this.pageNumber}>
                        {asset}
                      </div>
                    )
                  }
                })
              }
            </div>
          ) : (
            <></>
          )
        }
        <div className='date-change_tokens'>
            <button className={"hour " + (this.props.state.historyTime===0 ? "active" : "")} onClick={this.select.bind(this, time_frame[1])}>{time_frame[1]}</button>
            <button className={"hour " + (this.props.state.historyTime===1 ? "active" : "")} onClick={this.select.bind(this, time_frame[2])}>{time_frame[2]}</button>
            <button className={"hour " + (this.props.state.historyTime===2 ? "active" : "")} onClick={this.select.bind(this, time_frame[3])}>{time_frame[3]}</button>
            <button className={"hour " + (this.props.state.historyTime===3 ? "active" : "")} onClick={this.select.bind(this, time_frame[4])}>{time_frame[4]}</button>
            <button className={"hour " + (this.props.state.historyTime===4 ? "active" : "")} onClick={this.select.bind(this, time_frame[5])}>{time_frame[5]}</button>
        </div>
      </div>
      
    );
  }
}
