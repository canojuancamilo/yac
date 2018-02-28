import React, { Component } from 'react';
import Register from './Register-Component';
import firebase from 'firebase';
import Contacts from './Contacts-Component';

class Loguin extends Component {

  constructor(props){
    super(props);

    this.state={
      estado:1,
      array:{},
      user:''
    }

    this.change_state=this.change_state.bind(this);
    this.login=this.login.bind(this);
    this.change_user=this.change_user.bind(this);

  }

  change_state(esta){
    this.setState({estado:esta});
    return this.state.estado;
  }

  change_user(user){
    this.setState({user:user});
  }

  login(){

    var email=document.getElementById("email").value;
    var password=document.getElementById("password").value;
    var Ref_firebase = firebase.database().ref('users');

    if(email==="" || password===""){
      document.getElementById("message").innerHTML="ALGUN CAMPO ESTA VACIO";
    }else{
      Ref_firebase.once('value', (snapshot) => {

        var r=snapshot.val();
        this.setState({array:snapshot.val()})
  
        for(var i=1;i<= Object.keys(this.state.array).length;i++) {
  
          if(email == this.state.array['user'+i].email && password== this.state.array['user'+i].password){
            this.change_user('user'+i);
            this.change_state(3);
          }else{
            document.getElementById("message").innerHTML="LOS DATOS SON INCORRECTOS INTENTELO DE NUEVO.";
          }
        }
        
      });
    }
  }

  render() {
    return (
      <div className="content-login">
        {
        (
          this.state.estado===1
        ?
          <div>
            <div className="header">
              LOGIN CHAT
            </div>
              <div className="content">
                <div>
                  EMAIL
                </div>
                <div>
                  <input type="email" id="email"/>
                </div>
                <div>
                  PASSWORD
                </div>
                <div>
                  <input type="password" id="password"/>
                </div>
              </div>
              <div className="buttons-login">
                <div className="btn1">
                  <button onClick={this.change_state.bind(this,2)} className="btn1-login btn">Register me</button>
                </div>
                <div className="btn2">
                  <button onClick={this.login.bind(this)}className="btn2-login btn">Login</button>
                </div>
              </div>
              <div className="message">
                  <span id="message"></span>
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
        {
          (this.state.estado===3
          ?
            <div>
              <Contacts user={this.state.user}></Contacts>
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