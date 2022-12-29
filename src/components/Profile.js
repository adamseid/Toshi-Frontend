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
export function webSocket (){
  return new WebSocket('ws://build-DMSLo-101U365JD1Q4D-1878096217.us-east-1.elb.amazonaws.com/ws/toshi-profile/')
} 
export default class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = default_state
  }


// ws = new WebSocket('ws://localhost:8000/ws/toshi-profile/')

connectSocket = () => {
  const ws= new WebSocket('ws://build-DMSLo-101U365JD1Q4D-1878096217.us-east-1.elb.amazonaws.com/ws/toshi-profile/')
    ws.onopen = () => {
       console.log('connected innside profile')
   }
 
   ws.onmessage = (e) => {
       let data = JSON.parse(e.data)
       console.log("data->"+data)
       let state = updateState(data, this.state, default_state)
       this.setState(state)
   }
}

componentDidMount() {
  try{
    this.connectSocket();
  
  }catch(e){
console.error(e);
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
