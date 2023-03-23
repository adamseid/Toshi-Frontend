import logo from "./images/left-bar-logo3.png"
import overview from "./images/left-bar-chart.png"
import favourite from "./images/left-bar-star.png"
import settings from "./images/left-bar-gear.png"
import twitter from "./images/twitter-logo.png"
import telegram from "./images/telegram-logo.png"
import website from "./images/website-logo.png"
import docs from "./images/left-bar-docs.png"
import profileImage from './images/temp-profile-image.png'
import { useState } from "react"
import "../../../App.css"
import { useNavigate } from "react-router-dom";
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';


const LeftBar = ({walletId}) => {

    const navigate = useNavigate();

    function handleClick(pageName) {
        if (pageName == "overview"){
            navigate("/");
        }else if (pageName == "profile"){
            navigate("/profile");
        }else if (pageName == "account"){
            navigate("/account");
        }
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
            <div>
            <div className="left-bar-logo-container">
                <img src={logo} className="left-bar-logo" />
                {/* <div className="left-bar-text-container">
                    <div className="left-bar-toshi">
                        Toshi
                    </div>
                    <div className="left-bar-tools">
                        Tools
                    </div>
                </div> */}
            </div>
            

            <div className="pages-container">
                
                <div className="page-item" onClick={() => handleClick('account')}>
                    <img src={overview} className="page-image" />
                    <div className="page-text">
                        Overview
                    </div>
                </div>
                
                {/* <div className="page-item" onClick={() => handleClick('profile')}>
                    <img src={favourite} className="page-image" />
                    <div className="page-text">
                        Profile
                    </div>
                </div>
                <div className="page-item" onClick={() => handleClick('account')}>
                    <img src={settings} className="page-image" />
                    <div className="page-text">
                        History
                    </div>
                </div> */}
            </div>
            </div>

            <div>
            <div className="social-container">
                <a href = "https://twitter.com/Toshi_Tools" className="social-item" target="_blank">
                    <img className="social-image" src={twitter} />
                    <div className="social-text">
                        Twitter
                    </div>
                </a>
                <a href = "https://t.me/ToshiToolsGateway"  className="social-item" target="_blank">
                    <img className="social-image" src={telegram} />
                    <div className="social-text">
                        Telegram
                    </div>
                </a>
                <a href = "https://www.toshi.tools/"  className="social-item" target="_blank">
                    <img className="social-image" src={website} />
                    <div className="social-text">
                        Website
                    </div>
                </a>
            </div>
            <a href={"https://etherscan.io/address/" + walletId} target="_blank">
            <div className="header-account-container">
                { walletId ? <Jazzicon diameter={40} seed={jsNumberForAddress(walletId)} /> :
                <img src={profileImage} className="header-profile-image" />
                }
                <div className="header-profile-id">
                    Account 1
                </div>
                <div className="header-profile-id">
                
                    {walletId}
                
                </div>
                
            </div>
            </a>
            </div>
        </div>
    )
}

export default LeftBar;
