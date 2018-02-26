import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';

const config={
        apiKey: "AIzaSyCMN2PsEls0bKRCZEnpCRi-v2BdthVMaNc",
        authDomain: "chat-simple-1a25c.firebaseapp.com",
        databaseURL: "https://chat-simple-1a25c.firebaseio.com",
        projectId: "chat-simple-1a25c",
        storageBucket: "",
        messagingSenderId: "1078163781951"
      }
      firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
