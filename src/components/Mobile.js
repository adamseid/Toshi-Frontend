import React, { Component } from 'react'
import mobileImage from "./images/mobile-image.jpeg"


export default class Mobile extends Component {
  render() {
    return (
      <div className='mobile-outer-container'>
        <div className='mobile-inner-container'>
          <img src={mobileImage} />
          <div className='profile-header-text mobile-text'>
            Please visit Toshi Tools on 
            Desktop for an optimal 
            experience
          </div>
        </div>
      </div>
    )
  }
}
