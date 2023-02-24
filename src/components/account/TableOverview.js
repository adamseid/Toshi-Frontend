import React, { Component } from "react";
import profileImage from "../profile/header/images/temp-profile-image.png";
import axios from "axios";
import { LoadingSpinner } from "./LoadingSpinner";


// const backend_url = "https://stagingws.toshitools.app/"
// const backend_url = "https://ws.toshitools.app/"
// const backend_url = "http://127.0.0.1:8000/";
var toggle = true;
var walletID = "";
const backend_url = process.env.REACT_APP_.BACKEND_BASE_URL

export default class Graph extends Component {

  setPropsState = () => {
    this.setState(this.props.state);
  };
  
  render() {
    return (
      <div className="table-overview-outer-container">
        <div className="profile-header-text">Profit History Overview</div>
        <div className="account-container">
          <div className="account-ids">
            <div className="asset-text">Profit Total</div>
            <div className="asset-text">Total Tokens Traded</div>
            <div className="asset-text">Total Tokens Profitable</div>
            <div className="asset-text">Win Rate</div>
            <div className="asset-text">Total spent on gas fees (USD)</div>
          </div>

          {this.props.state.isLoading ? <LoadingSpinner/> : 
          <div className="account-ids">
              <div className="asset-text-data">
              {
                this.props.state.profitHistoryOverview.table[this.props.state.time] ? 
                this.props.state.profitHistoryOverview.table[this.props.state.time][0] >= 0 ?
                <div className = "green">
                  +${(Math.round(this.props.state.profitHistoryOverview.table[this.props.state.time][0]*100)/100).toFixed(2)}
                </div>:
                <div className = "red">
                  -${Math.abs((Math.round(this.props.state.profitHistoryOverview.table[this.props.state.time][0]*100)/100)).toFixed(2)}
                </div>
                : <></>
              }
            </div>
            <div className="asset-text-data">
              {
                this.props.state.profitHistoryOverview.table[this.props.state.time] ?
                this.props.state.profitHistoryOverview.table[this.props.state.time][1]
                : <></>
              }
            </div>
            <div className="asset-text-data">
              {
                this.props.state.profitHistoryOverview.table[this.props.state.time] ?
                this.props.state.profitHistoryOverview.table[this.props.state.time][2]
                : <></>
              }
            </div>
    
            <div className="asset-text-data">
              {this.props.state.profitHistoryOverview.table[this.props.state.time] ? 
              <div className={this.props.state.profitHistoryOverview.table[this.props.state.time][3] > 50 ? "green" : "red"}>
                {Math.round(this.props.state.profitHistoryOverview.table[this.props.state.time][3]*100)/100}%
              </div>
              : <></>
              } 
            </div>
            <div className="asset-text-data red">
              {
                this.props.state.profitHistoryOverview.table[this.props.state.time] ?
                <>${(Math.round(this.props.state.profitHistoryOverview.table[this.props.state.time][4]*100)/100).toFixed(2)}</>
                : <></>
              }
            </div> 
          </div>}
            
        </div>
      </div>
    );
  }
}
