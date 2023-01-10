import logo from "./images/left-bar-logo.png"
import overview from "./images/left-bar-chart.png"
import favourite from "./images/left-bar-star.png"
import settings from "./images/left-bar-gear.png"
import twitter from "./images/left-bar-twitter.png"
import telegram from "./images/left-bar-telegram.png"
import website from "./images/left-bar-website.png"
import docs from "./images/left-bar-docs.png"
import profileImage from './images/temp-profile-image.png'
import { useState } from "react"
import "../../../App.css"
import { useNavigate } from "react-router-dom";


const LeftBar = ({walletId}) => {

    const navigate = useNavigate();

    function handleClick() {
        navigate("/");
    }

    function onHover() {
        document.getElementsByClassName("social-text");
        document.getElementsByClassName("social-image");
        document.getElementsByClassName("left-bar-toshi");
        document.getElementsByClassName("left-bar-tools");
        document.getElementsByClassName("left-bar-logo");
        document.getElementsByClassName("page-text");
        document.getElementsByClassName("page-image");
        document.getElementsByClassName("page-item");
        console.log(document.getElementsByClassName("left-bar-container")[0]);

    }

    


    return (
        <div className="left-bar-container">
            <div className="left-bar-logo-container">
                <img src={logo} className="left-bar-logo" />
                <div className="left-bar-text-container">
                    <div className="left-bar-toshi">
                        Toshi
                    </div>
                    <div className="left-bar-tools">
                        Tools
                    </div>
                </div>
            </div>

            <div className="pages-container">
                <div className="page-item" onClick={handleClick}>
                    <img src={overview} className="page-image" />
                    <div className="page-text">
                        Overview
                    </div>
                </div>
                <div className="page-item">
                    <img src={favourite} className="page-image" />
                    <div className="page-text">
                        Favourites
                    </div>
                </div>
                <div className="page-item">
                    <img src={settings} className="page-image" />
                    <div className="page-text">
                        Settings
                    </div>
                </div>
            </div>

            <div className="social-container">
                <a href = "https://www.twitter.com" className="social-item">
                    <img className="social-image" src={twitter} />
                    <div className="social-text">
                        Twitter
                    </div>
                </a>
                <a href = "https://www.telegram.com"  className="social-item">
                    <img className="social-image" src={telegram} />
                    <div className="social-text">
                        Telegram
                    </div>
                </a>
                <div className="social-item" onClick={handleClick}>
                    <img className="social-image" src={website} />
                    <a className="social-text">
                        Website
                    </a>
                </div>
                <a href = "https://www.google.ca/docs/about/" className="social-item">
                    <img className="social-image" src={docs} />
                    <div className="social-text">
                        Docs
                    </div>
                </a>
            </div>

            <div className="header-account-container">
                <img src={profileImage} className="header-profile-image" />
                <div className="header-profile-id">
                    Account 1
                </div>
                <div className="header-profile-id">
                    {walletId}
                </div>
            </div>
        </div>
    )
}

export default LeftBar;
