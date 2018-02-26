import React, { Component } from 'react';
import './Style-Components/Login-Component.css';
import Register from './Register-Component';
import firebase from 'firebase';

class Loguin extends Component {

  constructor(props){
    super(props);
    this.state={
      estado:1
    }
    this.change_state=this.change_state.bind(this);
    this.login=this.login.bind(this);
    this.observador=this.observador.bind(this);
  }

  change_state(esta){
    this.setState({estado:esta});
  }

  login(){
    var email=document.getElementById("email").value;
    var password=document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      console.log(error.code);
      console.log(error.message);
      document.getElementById("message").innerHTML=error.message;
    });
    this.observador();
  }

observador(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log(user.email,user.displayName)
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });
}

 componentWillMount() {
        
    }
  render() {
    return (
      <div className="content-login">
      {
        (this.state.estado===1
          ?
            <div>
              <div className="header">
                LOGIN CHAT
              </div>
              <div className="content">
                <div>
                  EMAIL:<input type="email" id="email"/>
                </div>
                <div>
                  PASSWORD:<input type="password" id="password"/>
                </div>
              </div>
              <div>
                <div>
                  <button onClick={this.change_state.bind(this,2)}>Register me</button>
                </div>
                <div>
                  <button onClick={this.login.bind(this)}>Login</button>
                </div>
                <div>
                  <span id="message"></span>
                </div>
              </div>
            </div>
          :
            ''
        )
      }
      {
        (this.state.estado===2
          ?
            <div>
              <Register></Register>
            </div>
          :
            ''
        )
      }   
      </div>
    );
  }
}

export default Loguin;