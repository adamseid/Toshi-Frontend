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
    console.log(this.props.state.walletAssetsTokens.table)
  }

  setPropsState = () => {
    this.setState(this.props.state);
  };

  componentDidUpdate = () => {
    // console.log("NEW ITEM: ", this.props["state"]['walletAssetsTokens']['table'])
    if (walletID != this.props["state"]["header"]["walletAddress"]) {
      this.props["state"]["accountDetailed"]["table"] = [];
      // this.graphHttpRequest();
    }
    walletID = this.props["state"]["header"]["walletAddress"];
  };


  pageNumber = (e) => {
    // var pageNumberClassName = e.target.classList[0]
    var targetPageNumber = parseInt(e.target.innerText)
    // console.log(e.target.innerText)
    // var pageNumberClassNameArr = document.getElementsByClassName(pageNumberClassName)
    // for(let i=0;i<pageNumberClassNameArr.length;i++){
    //   pageNumberClassNameArr[i].classList.remove("active")
    // }
    // e.target.classList.add("active")
    this.props.state.walletAssetsTokens.currentPage = targetPageNumber - 1;
    this.props.state.walletAssetsTokens.startPage = (targetPageNumber * this.props.state.walletAssetsTokens.numberOfItems) - this.props.state.walletAssetsTokens.numberOfItems
    this.props.state.walletAssetsTokens.endPage = (targetPageNumber * this.props.state.walletAssetsTokens.numberOfItems)
    this.setPropsState();
    // console.log(this.props.state.walletAssetsTokens)
  }

  pageTurnHandler = (num) => {
    var targetPageNumber = this.props.state.walletAssetsTokens.currentPage + 1 + num
    this.props.state.walletAssetsTokens.currentPage = targetPageNumber - 1;
    this.props.state.walletAssetsTokens.startPage = ((targetPageNumber) * this.props.state.walletAssetsTokens.numberOfItems) - this.props.state.walletAssetsTokens.numberOfItems
    this.props.state.walletAssetsTokens.endPage = ((targetPageNumber) * this.props.state.walletAssetsTokens.numberOfItems)
    this.setPropsState();
  }

  pageEndsHandler = (page) => {
    this.props.state.walletAssetsTokens.currentPage = page;
    var targetPageNumber = this.props.state.walletAssetsTokens.currentPage + 1
    this.props.state.walletAssetsTokens.startPage = ((targetPageNumber) * this.props.state.walletAssetsTokens.numberOfItems) - this.props.state.walletAssetsTokens.numberOfItems
    this.props.state.walletAssetsTokens.endPage = ((targetPageNumber) * this.props.state.walletAssetsTokens.numberOfItems)
    this.setPropsState();
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
          <div className='green_horizontal_line' />
          <div className="account-table">
            <Suspense fallback={<div>Loading...</div>}>
              <div className='walletAssetsTokenNameOuterContainer'>
                {
                  this.props.state.walletAssetsTokens.table.sort((a,b)=>b[6]-a[6])?.slice(this.props.state.walletAssetsTokens.startPage, this.props.state.walletAssetsTokens.endPage).map((asset, index)=> {
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
                              <div className="account-token-allocation">
                                {
                                  asset[4] < 0.01 ? (
                                    <NumberFormat number={asset[4]}/>
                                  ) : (
                                    Math.abs(Math.round(asset[4]*100)/100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                  )
                                }
                              </div>
                              <div className="account-token-allocation-percentage"></div>
                            </div>
                          </div>
                        </div>
                        <div className="walletAssetsTokenName">
                          {
                            Math.abs(asset[6]/asset[4]) < 0.01 &&  Math.abs(asset[6]/asset[4]) != 0 ? (
                              <div>$<NumberFormat number={(asset[6]/asset[4])}/></div>
                            ) : (
                              "$" + Math.abs(Math.round((asset[6]/asset[4])*100)/100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            )
                          }
                        </div>
                        <div className="walletAssetsTokenName">
                          {
                            Math.abs(asset[6]) < 0.01 &&  Math.abs(asset[6]) != 0 ? (
                              <div>$<NumberFormat number={(asset[6])}/></div>
                            ) : (
                              "$" + Math.abs(Math.round((asset[6])*100)/100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            )
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
          this.props.state["walletAssetsTokens"]["numberOfPages"].length > 0 ? (
            <div className='pagination_buttons'>
              {this.props.state.walletAssetsTokens.currentPage > 0 && 
                <>
                  <span className="page_number" onClick={()=>this.pageEndsHandler(0)}>First</span>
                  <span className="page_number" onClick={()=>this.pageTurnHandler(-1)}>Prev</span>
                </>
                }
              {
                this.props.state["walletAssetsTokens"]["numberOfPages"].slice(this.props.state.walletAssetsTokens.currentPage, this.props.state.walletAssetsTokens.currentPage + 3).map((asset, index)=> {
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
              {this.props.state.walletAssetsTokens.currentPage < this.props.state.walletAssetsTokens.numberOfPages.length-1 && 
                <>
                  <span className="page_number" onClick={()=>this.pageTurnHandler(1)}>Next</span>
                  <span className="page_number" onClick={()=>this.pageEndsHandler(this.props.state.walletAssetsTokens.numberOfPages.length-1)}>Last</span>
                </>}
            </div>
          ) : (
            <></>
          )
        }
      </div>
    );
  }
}
