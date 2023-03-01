import React, { Component } from 'react'
import "../../App.css"

const time_frame = ['1H', '1D', '1W', '1M', '1Y']


export default class DailyTopPerformers extends Component {

    select = (data,event) => {
        for (let i = 0; i < document.getElementsByClassName("hour").length; i++) {
            document.getElementsByClassName("hour")[i].classList.remove("active")
          }

        event.target.classList.add("active")
        this.props.ws.send(
            JSON.stringify({
                request: 'select',
                location: ['overview', 'daily-top-performers'],
                time_frame: data
            })
        )
    }

    

    render() {
        return (
            <div>
                <div className='assets-container'>
                    <div className='table-ids'>
                        <div className='asset-text'>
                            ID
                        </div>
                        <div className='asset-text-middle'>
                            LARGEST ASSET
                        </div>
                        <div className='asset-text'>
                            Growth
                        </div>
                    </div>
                    {this.props.state.daily_top_performers.data.map((asset, index) => {
                        return (

                            <div key={index} className='table-item'>
                                <div className='table-left'>
                                    <div className='table-inner-token-container'>
                                        <div className='table-token-container'>
                                            <div className='top-token-container'>
                                                <a href={"https://etherscan.io/address/" + asset[0]}>
                                                {
                                                    asset[0].substring(0, 6) + "..." +  asset[0].substring(38, 42)
                                                }
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='top-token-container'>
                                </div>
                                <div className='top-token-container'>
                                    {asset[1]}
                                </div>
                                <div className='table-right'>
                                    <div className='table-amount-container'>
                                        <div className='table-amount'>
                                            {Math.round((asset[2]*100))/100}
                                        </div>
                                        <div className='table-price-change'>
                                            {Math.round((asset[3]*100))/100}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>


                <div>
 
                </div>
            </div>
        )
    }
}
