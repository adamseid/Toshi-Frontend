import React, { Component } from 'react'

export default class Test extends Component {

    ws = new WebSocket('ws://localhost:8000/ws/toshi/')

    componentDidMount() {
        this.ws.onopen = () => {
            this.ws.send(
                JSON.stringify({
                    request: 'connect',
                    location: ['']
                })
            )
        }
    }

    select = () => {
        this.ws.send(
            JSON.stringify({
                request: 'select',
                location: ['overview', 'top-performers'],
                time_frame: 'blub'
            })
        )
    }

  render() {
    return (
        <div>
            <div>Test</div>
            <button onClick={this.select}>blub</button>
        </div>
      
    )
  }
}
