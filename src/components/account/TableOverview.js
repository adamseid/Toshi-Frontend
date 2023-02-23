import React, { Component } from "react";
import profileImage from "../profile/header/images/temp-profile-image.png";
import axios from "axios";


const backend_url = "https://stagingws.toshitools.app/"
// const backend_url = "https://ws.toshitools.app/"
// const backend_url = "http://127.0.0.1:8000/";
var toggle = true;
var walletID = "";

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
        
            <div className="account-ids">
              <div className="asset-text-data">
              {/* {
              this.props.state.accountDetailed.profitDict[0] ? 
              (Math.round(Object.values(this.props.state.accountDetailed.profitDict[0]).reduce((accumulator, currentValue)=> accumulator + currentValue[0], 0)*100)/100 >= 0 ? 
              <div className="green">+${Math.abs(Math.round(Object.values(this.props.state.accountDetailed.profitDict[0]).reduce((accumulator, currentValue)=> accumulator + currentValue[0], 0)*100)/100)}</div>
              : <div className="red">-${Math.abs(Math.round(Object.values(this.props.state.accountDetailed.profitDict[0]).reduce((accumulator, currentValue)=> accumulator + currentValue[0], 0)*100)/100)}</div>
              ) 
              : <></>
              } */}
              {
                this.props.state.profitHistoryOverview.table[4][0] >= 0 ?
                <div className = "green">
                  {this.props.state.profitHistoryOverview.table[4][0]}
                </div>:
                <div className = "red">
                  {this.props.state.profitHistoryOverview.table[4][0]}
                </div>
              }
            </div>
            <div className="asset-text-data">
              {/* {
              this.props.state.accountDetailed.profitDict[0] ? Object.values(this.props.state.accountDetailed.profitDict[0]).length : <></>
              } */}
              {
                this.props.state.profitHistoryOverview.table[4][1]
              }
            </div>
            <div className="asset-text-data">
              {/* {
              this.props.state.accountDetailed.profitDict[0] ? this.props.state.accountDetailed.tokensProfitable : <></>
              } */}
              {
                this.props.state.profitHistoryOverview.table[4][2]
              }
            </div>
    
            <div className="asset-text-data">
              {/* {
                this.props.state.accountDetailed.profitDict[0] ? 
                (Math.round(this.props.state.accountDetailed.tokensProfitable / Object.values(this.props.state.accountDetailed.profitDict[0]).length *100 *100)/100 >= 50 ? 
                <div className="green">{Math.round(this.props.state.accountDetailed.tokensProfitable / Object.values(this.props.state.accountDetailed.profitDict[0]).length *100 *100)/100 + "%"}</div>
                : <div className="red">{Math.round(this.props.state.accountDetailed.tokensProfitable / Object.values(this.props.state.accountDetailed.profitDict[0]).length *100 *100)/100 + "%"}</div>
                ) 
                : <></>
                } */}
              
              <div className={this.props.state.profitHistoryOverview.table[4][3] > 50 ? "green" : "red"}>
                {this.props.state.profitHistoryOverview.table[4][3]}%
              </div>
              
            </div>
            <div className="asset-text-data red">
              
              {/* {this.props.state.accountDetailed.profitDict[0] ? 
              (Object.values(this.props.state.accountDetailed.tokenDetails[0]).reduce((accumulator, currentValue) => accumulator + currentValue['gasFees'], 0) < 0.01 ? 
              (
              <div>
              <span>$0.0</span>
              <sub>
                {this.props.numberOfZeros(Object.values(this.props.state.accountDetailed.tokenDetails[0]).reduce((accumulator, currentValue) => accumulator + currentValue['gasFees'], 0))}
              </sub>
              <span>{this.props.convertDecimalFormat(Object.values(this.props.state.accountDetailed.tokenDetails[0]).reduce((accumulator, currentValue) => accumulator + currentValue['gasFees'], 0))}</span>
              </div>
              ) 
              : "$" + (Math.round(Object.values(this.props.state.accountDetailed.tokenDetails[0]).reduce((accumulator, currentValue) => accumulator + currentValue['gasFees'], 0)*100)/100))
              : <></>
              } */}
              {
                this.props.state.profitHistoryOverview.table[4][4]
              }
            </div> 
          </div>
        </div>
      </div>
    );
  }
}
