import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
} from 'chart.js'

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)


export default class Graph extends Component {
    render() {
        return (
            <div>
                <div>Graph</div>
                <Line data={{
                    labels: this.props.state.top_performer.time,
                    datasets: [{
                        data: this.props.state.top_performer.balance,
                        backgroundColor: 'transparent',
                        borderColor: '#f26c6d',
                        tension: 0,
                        pointRadius: 0,
                        pointHoverRadius: 0
                    }]
                }} options={{
                    animation: false,
                    normalized: true,
                }}>

                </Line>
            </div>
        )
    }
}
