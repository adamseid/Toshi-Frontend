import React, { Component } from 'react'
import Web3 from "web3";

export default class MetaMask extends Component {

    constructor(props) {
        super(props);
        this.props.state = {
          loading: false,
          address: "",
          error: ""
        };
    }

    onPressConnect = () => {
        this.props.loading = true

        // try {
        // const yourWebUrl = "localhost:3000"; // Replace with your domain
        // const deepLink = `https://metamask.app.link/dapp/${yourWebUrl}`;
        // const downloadMetamaskUrl = "https://metamask.io/download.html";
    
        // if (window?.ethereum?.isMetaMask) {
        //     // Desktop browser
        //     const accounts = await window.ethereum.request({
        //     method: "eth_requestAccounts",
        //     });
    
        //     const account = Web3.utils.toChecksumAddress(accounts[0]);
        //     await handleLogin(account);
        // } else {
        //     window.open(downloadMetamaskUrl);
        // }
        // } catch (error) {
        // console.log(error);
        // this.props.address = ""
        // }
    
        // this.props.loading = false
    }

    handleLogin = async (address) => {
        console.log(address)
    }


    render() {
    return (
        <div>
        <button onClick={this.onPressConnect}> Connect </button>
        </div>
    )
    }
}



// // import { useState } from 'react';
// import Web3 from "web3";
// import { useState } from "react";
// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithCustomToken, signOut } from "firebase/auth";
// import axios from "axios";

// import "../App.css";
// import ConnectWalletButton from "./ConnectWalletButton";
// import mobileCheck from "../helpers/mobileCheck";
// import getLinker from "../helpers/deepLink";
// const projectID = 'de71f2f9-dd8e-4e60-a8a0-4a6fb859d688';


// const firebaseConfig = {
//   apiKey: "AIzaSyCxhQhTBtaFWsgiyOfu1vHHckUL_HeebNA",
//   authDomain: "meta-mask-798a2.firebaseapp.com",
//   projectId: "meta-mask-798a2",
//   storageBucket: "meta-mask-798a2.appspot.com",
//   messagingSenderId: "1042130489895",
//   appId: "1:1042130489895:web:1577eb65c4e9cb41d27402",
//   measurementId: "G-YV924NE648"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// const Modal = () => {


//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [address, setAddress] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   // WHEN A USER PRESSES CONNECT WALLET

//   const onPressConnect = async () => {
//     setLoading(true);
  
//     try {
//       const yourWebUrl = "localhost:3001"; // Replace with your domain
//       const deepLink = `https://metamask.app.link/dapp/${yourWebUrl}`;
//       const downloadMetamaskUrl = "https://metamask.io/download.html";
  
//       if (window?.ethereum?.isMetaMask) {
//         // Desktop browser
//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         });
  
//         const account = Web3.utils.toChecksumAddress(accounts[0]);
//         await handleLogin(account);
//       } else if (mobileCheck()) {
//         // Mobile browser
//         const linker = getLinker(downloadMetamaskUrl);
//         linker.openURL(deepLink);
//       } else {
//         window.open(downloadMetamaskUrl);
//       }
//     } catch (error) {
//       console.log(error);
//       setAddress("");
//     }
  
//     setLoading(false);
//   };

//   const handleLogin = async (address) => {
//     const baseUrl = "http://localhost:4000";
//     const response = await axios.get(`${baseUrl}/message?address=${address}`);
//     const messageToSign = response?.data?.messageToSign;
//     const walletAddress = messageToSign.split(" ")[2];
//     // const walletAddress = "9ecb809c1e58bd579b66dcd896b7d005464e30e9";

//     if (!messageToSign) {
//       throw new Error("Invalid message to sign");
//     }

//     const signature = await web3.eth.personal.sign(messageToSign, address);

//     const jwtResponse = await axios.get(
//       `${baseUrl}/jwt?address=${address}&signature=${signature}`
//     );

//     const customToken = jwtResponse?.data?.customToken;

//     if (!customToken) {
//       throw new Error("Invalid JWT");
//     }

//     await signInWithCustomToken(auth, customToken);
//     // Fix This
//     setUsername(address);
//     handleSubmit(walletAddress);
//   };

//   const onPressLogout = () => {
//     setAddress("");
//     signOut(auth);
//   };

//   const handleSubmit = async (pass) => {
//     // console.log("hello world");

//     const authObject = { 'Project-ID': projectID, 'User-Name': pass, 'User-Secret': pass };
//     console.log("hello world2");
//     console.log(projectID);
//     console.log(pass);
//     var data = {
//       "username": pass,
//       "secret": pass,
//       "email": "johnDoe@mail.com",
//       "first_name": "John",
//       "last_name": "Doe",
//     };

//     var config = {
//       method: 'post',
//       url: 'https://api.chatengine.io/users/',
//       headers: {
//         'PRIVATE-KEY': '{{69489ced-0489-44fc-b0ee-ff398b8d5933}}'
//       },
//       data : data
//     };


//     try {
//       const res = await axios.get('https://api.chatengine.io/chats', { headers: authObject });
//       console.log(res);

//       localStorage.setItem('username', pass);
//       localStorage.setItem('password', pass);

//       window.location.reload();
//       setError('');
//     } catch (err) {
//       setError('Oops, incorrect credentials.');
//     }
//   };



//   return (
//     <div className="App">
//       <header className="App-header">
//         <ConnectWalletButton
//           onPressConnect={onPressConnect}
//           onPressLogout={onPressLogout}
//           loading={loading}
//           address={address}
//         />
//       </header>
//     </div>
//   );
// };

// export default Modal;