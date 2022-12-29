import React, { Component } from 'react'
import TopPerformer from './overview/TopPerformer'
import Header from './overview/Header'
import LeftBar from './overview/header/LeftBar'
import { updateState } from '../modules/Overview'
import DailyTopPerformers from './overview/DailyTopPerformers'
import Graph from './overview/top_performer/Graph'
import profileImage from './overview/header/images/temp-profile-image.png'
import TrendingWallet from "./overview/TrendingWallets"

// import ethereum from '../../images/ethereum.png'

const default_state = {
    top_performer: {
        graph: [],
        difference: 0,
    },
    daily_top_performers: {
        data: [],
    },
    trending_performers:{
        data: [],
    },
    header: {
        walletAddress: ""
    },
    profile: {
        graph: [],
        table: [],
    }
}

export default class Overview extends Component {
    ws = new WebSocket('ws://build-loadb-1AKB2BWGHE33W-25261184.us-east-1.elb.amazonaws.com/ws/toshi/')
    // ws = new WebSocket('ws://localhost:8000/ws/toshi/')

    constructor(props) {
        super(props)
        this.state = default_state
    }

    componentDidMount() {
        this.ws.onopen = () => {
            console.log('connected')
        }

        this.ws.onmessage = (e) => {
            let data = JSON.parse(e.data)
            let state = updateState(data, this.state, default_state)
            this.setState(state)
        }
    }

    render() {
        return (
            <div className='bg'>
                < Header
                state = {this.state}
                ws = {this.ws}
                 />
                <div className='overview-outer-container'>
                <div className='profile-left-side'>
                    <div className='profile-header-text'>
                        Top wallets Growth
                    </div>
                    <DailyTopPerformers
                        state={this.state}
                        ws={this.ws}
                    />
                    <div className='profile-header-text'>
                        Trending Wallets
                    </div>
                    <TrendingWallet
                            state={this.state}
                            ws={this.ws}
                    />
                </div>
                <div className='profile-right-side'>
                    <TopPerformer
                        state={this.state}
                        ws={this.ws} 
                    />
                </div>
            </div>

            </div>
        )
    }
}
