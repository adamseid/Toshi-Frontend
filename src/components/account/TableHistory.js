import React, { Component } from "react";
import axios from "axios";
import BulletPoint from "../images/bulletPoint.png";
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

// const time_frame = ['1H', '1D', '1W', '1M', '1Y']

// const backend_url = "https://ws.toshitools.app/"
const backend_url = "http://127.0.0.1:8000/";
var toggle = true;
var walletID = "";
const dexToolsURL = "https://etherscan.io/dex/uniswapv2/";

export default class Graph extends Component {
  // select = (data,event) => {
  //     if(data == "1H"){
  //         this.props.state['accountDetailed']['graph'] = this.props.state['accountDetailed']['hourlyGraph']
  //         this.props['state']['accountDetailed']['table'] = this.props['state']['accountDetailed']['hourlyTable']
  //     }else if (data == "1D"){
  //         this.props.state['accountDetailed']['graph'] = this.props.state['accountDetailed']['dailyGraph']
  //         this.props['state']['accountDetailed']['table'] = this.props['state']['accountDetailed']['dailyTable']
  //     }else if (data == "1W"){
  //         this.props.state['accountDetailed']['graph'] = this.props.state['accountDetailed']['weeklyGraph']
  //         this.props['state']['accountDetailed']['table'] = this.props['state']['accountDetailed']['weeklyTable']
  //     }else if(data == "1M"){
  //         this.props.state['accountDetailed']['graph'] = this.props.state['accountDetailed']['monthlyGraph']
  //         this.props['state']['accountDetailed']['table'] = this.props['state']['accountDetailed']['monthlyTable']
  //     }else if(data == "1Y"){
  //         this.props.state['accountDetailed']['graph'] = this.props.state['accountDetailed']['yearlyGraph']
  //         this.props['state']['accountDetailed']['table'] = this.props['state']['accountDetailed']['yearlyTable']
  //     }
  //     this.setPropsState()

  //     for (let i = 0; i < document.getElementsByClassName("hour").length; i++) {
  //         document.getElementsByClassName("hour")[i].classList.remove("active")
  //       }

  //     event.target.classList.add("active")
  // }

  // assetTableHttpRequest = () => {
  //     var url = backend_url + "api/toshi/accounthistory/"

  //     axios.post( url , this.props.state).then((response) => {
  //         console.log("ACCOUNT DETAILS: ",response.data)
  //         this.props['state']['accountDetailed']['table'] = response.data['profile_response'][0]
  //         this.props['state']['accountDetailed']['yearlyTable'] = response.data['profile_response'][0]
  //         this.props['state']['accountDetailed']['monthlyTable'] = response.data['profile_response'][1]
  //         this.props['state']['accountDetailed']['weeklyTable'] = response.data['profile_response'][2]
  //         this.props['state']['accountDetailed']['dailyTable'] = response.data['profile_response'][3]
  //         this.props['state']['accountDetailed']['hourlyTable'] = response.data['profile_response'][4]
  //         this.props['state']['accountDetailed']['ethPriceChange'] = response.data['profile_response'][5]

  //         this.setPropsState()

  //     }).catch(error => {
  //         console.log(error)
  //       })
  //   }

  graphHttpRequest = () => {
    var url = backend_url + "api/toshi/accountGraph/";
    axios.post(url, this.props.state).then((response) => {
      console.log(response.data["profile_response"]);
      this.props.state["accountDetailed"]["hourlyGraph"] =
        response.data["profile_response"][0];
      this.props.state["accountDetailed"]["dailyGraph"] =
        response.data["profile_response"][1];
      this.props.state["accountDetailed"]["weeklyGraph"] =
        response.data["profile_response"][2];
      this.props.state["accountDetailed"]["monthlyGraph"] =
        response.data["profile_response"][3];
      this.props.state["accountDetailed"]["yearlyGraph"] =
        response.data["profile_response"][4];
      this.props.state["accountDetailed"]["graph"] =
        response.data["profile_response"][4];
      this.props.state["accountDetailed"]["ethUsd"] =
        response.data["profile_response"][6];
      this.setPropsState();
      console.log("ACCOUNT GRAPGH STATE: ", this.props.state);
    });
  };

  getCurrentHoldings = () => {
    var url = "http://127.0.0.1:8000/" + "api/toshi/assets/";

    axios
      .post(url, this.props.state)
      .then((response) => {
        console.log(
          "READ assets response: ",
          response.data["profile_response"]["profile"]["table"]
        );
        const currentHoldings = {};
        response.data["profile_response"]["profile"]["table"].forEach((asset)=>{
          currentHoldings[asset[0]] = [asset[4], asset[3]]
        })
        this.props.state["accountDetailed"]["currentHoldings"] =
          currentHoldings;
        // this.props.state["profile"]["table"].push();
        this.setPropsState();
        console.log("Read State Profile Table: " + JSON.stringify(this.props.state["accountDetailed"]["currentHoldings"]));
      })
      .catch((error) => {
        this.props.state["accountDetailed"]["currentHoldings"] = {};
        this.setPropsState();
        console.log("Error in getCurrentHoldings" + error.message);
      });
  };

  setPropsState = () => {
    this.setState(this.props.state);
  };

  componentDidUpdate = () => {
    if (walletID != this.props["state"]["header"]["walletAddress"]) {
      this.props["state"]["accountDetailed"]["table"] = [];
      // this.assetTableHttpRequest()
      this.graphHttpRequest();
      this.getCurrentHoldings();
    }
    walletID = this.props["state"]["header"]["walletAddress"];
  };

  onClickSwitchHandler = () => {
    this.props.state["accountDetailed"]["holdingsDisplay"] =
      !this.props.state["accountDetailed"]["holdingsDisplay"];
    this.setPropsState();
    console.log("switched");
  };

  render() {
    return (
      <div className="table-overview-outer-container">
        <div className="profile-header-text">Token History Overview</div>
        {/* <div className='date-change'>
            <button className='hour' onClick={this.select.bind(this, time_frame[0])}>{time_frame[0]}</button>
            <button className='hour' onClick={this.select.bind(this, time_frame[1])}>{time_frame[1]}</button>
            <button className='hour' onClick={this.select.bind(this, time_frame[2])}>{time_frame[2]}</button>
            <button className='hour' onClick={this.select.bind(this, time_frame[3])}>{time_frame[3]}</button>
            <button className='hour active' onClick={this.select.bind(this, time_frame[4])}>{time_frame[4]}</button>
        </div> */}
        <div className="account-container">
          <div className="tokenHistoryOverviewTitles">
            <div className="asset-text-first-history">Asset</div>
            <div className="asset-text-history">Total Transactions</div>
            {/* <div className='asset-text-history'>
                    Profit TX
                </div> */}
            <div className="asset-text-history nowrap">
              Total Profit <br />
              (USD)
            </div>
            <div className="asset-text-history nowrap">
              Current Holdings
              <br />
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={this.onClickSwitchHandler}
                  checked={
                    this.props.state["accountDetailed"]["holdingsDisplay"]
                  }
                />
                <span className="slider round"></span>
                <span className="ETH-label">ETH</span>
                <span className="USD-label">USD</span>
              </label>
            </div>
          </div>
          <div className="account-table">
            <div>
              <div className="account-detailed-ids">
              <div className="asset-text-data-detailed-first-element">
                {this.props.state.accountDetailed.profitDict[0] ? 
                    Object.keys(this.props.state.accountDetailed.profitDict[0]).map(
                            (key, index) => {
                            return (  
                                 
                                <div key={index} className="account-token-outer-container">
                                    <img className="account-bullet" src={BulletPoint} />
                                    <div className="account-token-inner-container">
                                    <a className="account-top-row">
                                        <div className="account-token-name">{key}</div>
                                        <div className="account-token-symbol"></div>
                                    </a>
                                    <div className="account-bottom-row">
                                        <div className="account-token-allocation"></div>
                                        <div className="account-token-allocation-percentage"></div>
                                    </div>
                                    </div>
                                </div>
                                
                            );
                            }
                        ) : <></>   
                    }
                </div>
   
                <div className="asset-text-data-detailed">
                    {this.props.state.accountDetailed.transactionsPerToken[0] ? 
                    Object.values(this.props.state.accountDetailed.transactionsPerToken[0]).map((value,index) => {
                        return (
                        <div key={index} className="tokenHistoryTableBlock">
                            {value}
                        </div>
                        )
                    } )
                    : <></>}
                </div>
                
                
                <div className="asset-text-data-detailed">
                  {this.props.state.accountDetailed.profitDict[0] && this.props.state.accountDetailed.tokenDetails[0]? 
                    Object.values(this.props.state.accountDetailed.profitDict[0]).map((value, index)=> {
                        return (
                            value[0] >= 0 ? (
                                <div className = "positive tokenHistoryTableBlock" key={index}>
                                    <div>
                                        +${value[0]}
                                    </div>
                                    <div className='bottom'>
                                        {(Object.values(this.props.state.accountDetailed.tokenDetails[0])[index]) ? Math.round(value[0]/(Object.values(this.props.state.accountDetailed.tokenDetails[0])[index])["expense"]*100*10)/10 : <></>}%
                                    </div>
                                </div>
                            ) :
                            <div className = "negative tokenHistoryTableBlock" key={index}>
                                <div>
                                    -${Math.abs(value[0])}
                                </div>
                                <div className='bottom'>
                                    {(Object.values(this.props.state.accountDetailed.tokenDetails[0])[index]) ? Math.round(value[0]/(Object.values(this.props.state.accountDetailed.tokenDetails[0])[index]["expense"])*100*10)/10 : <></>}%
                                </div>
                            </div>
                        )
                    }
                    ) : <></>
                  }
                </div>
                <div className="asset-text-data-detailed">
                  {this.props.state['accountDetailed']['profitDict'][0] && this.props.state['accountDetailed']['currentHoldings'] ? 
                  this.props.state['accountDetailed']['holdingsDisplay'] ? 
                            (Object.keys(this.props.state.accountDetailed.profitDict[0]).map((token, index) => {
                                return(
                                  <div className="tokenHistoryTableBlock" key={index}>
                                  {this.props.state.accountDetailed.currentHoldings.hasOwnProperty(token) ? 
                                  
                                  <div><div className="nowrap">${Math.round(this.props.state["accountDetailed"]["currentHoldings"][token][1]*100)/100}</div><div>%{Math.round(this.props.state["accountDetailed"]["currentHoldings"][token][0]*100)/100}</div></div> :
                                  <div><div className="nowrap">$0</div><div>0%</div></div>}
                                  </div>
                                )
                            }))
                            : 
                            (Object.keys(this.props.state.accountDetailed.profitDict[0]).map((token, index) => {
                                return(
                                  <div className="tokenHistoryTableBlock" key={index}>
                                    {(this.props.state.accountDetailed.currentHoldings.hasOwnProperty(token) ? 
                                    this.props.state["accountDetailed"]["currentHoldings"][token][1]/this.props.state["accountDetailed"]["ethUsd"] < 0.01 ?
                                    (<div>
                                      <div className="nowrap">
                                        <span>0.0</span>
                                        <sub>
                                          {this.props.numberOfZeros(this.props.state["accountDetailed"]["currentHoldings"][token][1]/this.props.state["accountDetailed"]["ethUsd"])}
                                        </sub>
                                        <span>{this.props.convertDecimalFormat(this.props.state["accountDetailed"]["currentHoldings"][token][1]/this.props.state["accountDetailed"]["ethUsd"])} ETH</span>
                                      </div>
                                      <div>%{Math.round(this.props.state["accountDetailed"]["currentHoldings"][token][0]*100)/100}</div>
                                    </div>) : (
                                      <div>
                                         <div className="nowrap">
                                            {Math.round(this.props.state["accountDetailed"]["currentHoldings"][token][1]/this.props.state["accountDetailed"]["ethUsd"]*10000)/10000} ETH
                                         </div>
                                         <div>%{Math.round(this.props.state["accountDetailed"]["currentHoldings"][token][0]*100)/100}</div>
                                      </div> 
                                    )
                                    :
                                    <div><div className="nowrap">0 ETH</div><div>0%</div></div>)}
                                  </div>
                                )
                            })) : <></>}
                </div>
              </div>
            </div>

            <div className="chart-container">
              <LineChart
                background={{ fill: "red" }}
                fill={"red"}
                width={400}
                height={300}
                data={
                  this.props.state["accountDetailed"]["graph"].length == 0 ? (
                    <></>
                  ) : (
                    this.props.state["accountDetailed"]["graph"]
                  )
                }
                margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#FFFFFF" }}
                  tickLine={{ stroke: "#FFFFFF" }}
                  stroke="#FFFFFF"
                ></XAxis>
                <YAxis
                  orientation="right"
                  tick={{ fill: "#FFFFFF" }}
                  tickLine={{ stroke: "#FFFFFF" }}
                  stroke="#FFFFFF"
                  width={80}
                ></YAxis>
                <Legend verticalAlign="top" display={false} />
                <Tooltip />
                <Legend display={true} />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#86F9A6"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
