import React, { lazy, Suspense,Component } from 'react'
import axios from "axios";
import BulletPoint from "../images/bulletPoint.png";
import hideImage from "../images/hide.png";
import showImage from "../images/show.png";
import {BigNumberComma} from "./BigNumberComma"
import { NumberFormat } from "./NumberFormat";
import { ShortenTokenNameSymbol } from './ShortenTokenNameSymbol';

const backend_url = process.env.REACT_APP_.BACKEND_BASE_URL
const ITEMS_PER_PAGE = 1; // Number of items per page
var toggle = true;
var walletID = "";
const dexToolsURL = "https://etherscan.io/dex/uniswapv2/";

export default class WalletAssets extends Component {

  componentDidUpdate = () => {
    console.log("UPDATED")
    console.log(this.props.state.tokenHistoryOverview.table[this.props.state.time])
  }

  setPropsState = () => {
    this.setState(this.props.state);
  };

  componentDidUpdate = () => {
    // console.log("NEW ITEM: ", this.props["state"]['tokenHistoryOverview']['table'])
    if (walletID != this.props["state"]["header"]["walletAddress"]) {
      this.props["state"]["accountDetailed"]["table"] = [];
      // this.graphHttpRequest();
    }
    walletID = this.props["state"]["header"]["walletAddress"];
  };

  onClickSwitchHandler = () => {
    this.props.state["tokenHistoryOverview"]["holdingsDisplay"] =
      !this.props.state["tokenHistoryOverview"]["holdingsDisplay"];
    this.setPropsState();
    console.log("switched");
  };

  handleClick = (page) => {
    console.log(page)
  };

  showAsset = (index) => {
    var itemRow = document.getElementsByClassName("account-detailed-ids")[index]
    this.props.tokenHistoryOverviewResponse(this.props.state.tokenHistoryOverview.table[this.props.state.time][index],this.props.state.time,"addition")
    var showImage = document.getElementsByClassName("show_image")[index]
    var hideImage = document.getElementsByClassName("hide_image")[index]
    showImage.style.display = "block"
    hideImage.style.display = "none"
    itemRow.style.opacity = "1"
  }

  hideAsset = (index) => {
    var itemRow = document.getElementsByClassName("account-detailed-ids")[index]
    this.props.tokenHistoryOverviewResponse(this.props.state.tokenHistoryOverview.table[this.props.state.time][index],this.props.state.time,"subtract")
    var showImage = document.getElementsByClassName("show_image")[index]
    var hideImage = document.getElementsByClassName("hide_image")[index]
    hideImage.style.display = "block"
    showImage.style.display = "none"
    itemRow.style.opacity = "0.3"
  }

  pageNumber = (e) => {
    var pageNumberClassName = e.target.classList[0]
    var targetPageNumber = parseInt(e.target.innerText)
    // console.log(e.target.innerText)
    var pageNumberClassNameArr = document.getElementsByClassName(pageNumberClassName)
    for(let i=0;i<pageNumberClassNameArr.length;i++){
      pageNumberClassNameArr[i].classList.remove("active")
    }
    e.target.classList.add("active")
    this.props.state.tokenHistoryOverview.startPage = (targetPageNumber * this.props.state.tokenHistoryOverview.numberOfItems) - this.props.state.tokenHistoryOverview.numberOfItems
    this.props.state.tokenHistoryOverview.endPage = (targetPageNumber * this.props.state.tokenHistoryOverview.numberOfItems)
    this.setPropsState();
    // console.log(this.props.state.tokenHistoryOverview)
  }

  render() {
    return (
      <div className="table-overview-outer-container">
        <div className="profile-header-text">Wallet Assets</div>
        <div className="account-container">
          <div className='walletAssetsTitlesContainer'>
            <div className="walletAssetsItems">
              Token name
            </div>
            <div className='divider_line_wallet_assets_left'></div>
            <div className='walletAssetsItems'>
              Token Price (USD)
            </div>
            <div className='divider_line_wallet_assets_right'></div>
            <div className='walletAssetsItems'>
              Token Value
            </div>
          </div>
          <div className="account-table">
            <Suspense fallback={<div>Loading...</div>}>
              <div className='walletAssetsTokenNameOuterContainer'>
                {
                  this.props.state.tokenHistoryOverview.table[this.props.state.time]?.slice(this.props.state.tokenHistoryOverview.startPage, this.props.state.tokenHistoryOverview.endPage).map((asset, index)=> {
                    return (
                      <div key={index} className="walletAssetsTokenNameContainer">
                        <div className="walletAssetsTokenName">
                          <img className="account-bullet" src={asset[9] ? asset[9] : BulletPoint} />
                          <div className="account-token-inner-container">
                            <a className="account-top-row" href={"https://etherscan.io/token/" + asset[2]} target="_blank">
                              <div className="account-token-name nowrap"><ShortenTokenNameSymbol number={asset[0]}/></div>
                              <div className="account-token-symbol nowrap"><ShortenTokenNameSymbol number={asset[1]}/></div>
                            </a>
                            <div className="account-bottom-row">
                              <div className="account-token-allocation">{Math.abs(Math.round(asset[4]*100)/100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                              <div className="account-token-allocation-percentage"></div>
                            </div>
                          </div>
                        </div>
                        <div className="walletAssetsTokenName">
                          {
                            this.props.state.tokenHistoryOverview.holdingsDisplay ? (
                            asset[6] === 0 || asset[7] === 0 ? <>$0</> :
                            asset[6] < 0.01 ? <>$<NumberFormat number={asset[6]}/></> : "$" + (Math.round((asset[6]/asset[4])*100)/100)
                            ): asset[6] === 0 || asset[7] === 0 ? <>0</> : 
                            asset[7] < 0.01 ? <><NumberFormat number={asset[6]}/></> : 
                            <>${(Math.round((asset[6]/asset[4])*100)/100)}</>
                          }
                        </div>
                        <div className="walletAssetsTokenName">
                          {
                            this.props.state.tokenHistoryOverview.holdingsDisplay ? (
                            asset[6] === 0 || asset[7] === 0 ? <>$0</> :
                            asset[6] < 0.01 ? <>$<NumberFormat number={asset[6]}/></> : "$" + Math.round(asset[6]*100)/100
                            ): asset[6] === 0 || asset[7] === 0 ? <>0</> : 
                            asset[7] < 0.01 ? <><NumberFormat number={asset[6]}/></> : 
                            <>${Math.round(asset[6]*100)/100}</>
                          }
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </Suspense>
          </div>
        </div>
        {
          this.props.state["tokenHistoryOverview"]["numberOfPages"].length > 0 ? (
            <div className='pagination_buttons'>
              {
                this.props.state["tokenHistoryOverview"]["numberOfPages"].map((asset, index)=> {
                  // console.log(index)
                  if(index == 0){
                    return (
                      <div key={index} className='page_number_wallet_asset active' onClick={this.pageNumber}>
                        {asset}
                      </div>
                    )
                  }else{
                    return (
                      <div key={index} className='page_number_wallet_asset' onClick={this.pageNumber}>
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
      </div>
    );
  }
}
