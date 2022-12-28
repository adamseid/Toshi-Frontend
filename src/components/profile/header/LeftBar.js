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

    const history = useNavigate();

    function handleClick() {
      history.push("/overview");
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
                <div className="page-item">
                    <img src={overview} className="page-image" />
                    <a className="page-text" href="http://dms-toshi-frontend-site.s3-website-us-east-1.amazonaws.com/overview">
                        Overview
                    </a>
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
                <div className="social-item">
                    <img className="social-image" src={twitter} />
                    <div className="social-text">
                        Twitter
                    </div>
                </div>
                <div className="social-item">
                    <img className="social-image" src={telegram} />
                    <div className="social-text">
                        Telegram
                    </div>
                </div>
                <div className="social-item">
                    <img className="social-image" src={website} />
                    <div className="social-text">
                        Website
                    </div>
                </div>
                <div className="social-item">
                    <img className="social-image" src={docs} />
                    <div className="social-text">
                        Docs
                    </div>
                </div>
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