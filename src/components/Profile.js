import React, { Component } from 'react'
import Header from './profile/Header'
import { updateState } from '../modules/Profile'
import Graph from './profile/Graph'
import Table from './profile/Table'



const default_state = {

  header: {
      walletAddress: ""
  },
  profile: {
      graph: [],
      table: [],
  }
}

export default class Profile extends Component {



  constructor(props) {
    super(props)
    this.state = default_state
  }

ws = new WebSocket('ws://localhost:8000/ws/toshi-profile/')

componentDidMount() {
  this.ws.onopen = () => {
      console.log('connected')
  }

  this.ws.onmessage = (e) => {
      let data = JSON.parse(e.data)
      console.log(data)
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
      <div className='profile-outer-container'>
        <div className='profile-left-side'>
        < Graph
          state = {this.state}
          ws = {this.ws}
        />
        </div>
        <div className='profile-right-side'>
          < Table
            state = {this.state}
            ws = {this.ws}
          />
        </div>
    </div>
  </div>
    )
  }
}
