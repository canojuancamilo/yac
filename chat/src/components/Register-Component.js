import React, { Component } from 'react';
import './Style-Components/Login-Component.css';
import Login from './Login-Component';
import firebase from 'firebase';

class Register extends Component {
    constructor(props){
        super(props);
        this.state={
          estado:1,
          mensaje:''
        }
        this.RegisterUser=this.RegisterUser.bind(this);
        this.change_state=this.change_state.bind(this);
    }
    
    change_state(esta){
        this.setState({estado:esta});
    }
    
    RegisterUser() {
        document.getElementById("message").innerHTML="";  
        var email=document.getElementById("email").value;
        var password= document.getElementById("password").value;
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
            console.log(error.code);
            console.log(error.message);
            document.getElementById("message").innerHTML=error.message;
        });
        var message=document.getElementById("message").innerHTML;
        if(message===""){
            document.getElementById("message").innerHTML="registrado correctamente";
        }
        document.getElementById("email").value="";
        document.getElementById("password").value="";
    }

  render() {
    return (
      <div className="content-login">
        {
        (this.state.estado===1
          ?
            <div>
            <div className="header">
                REGISTER ME TO CHAT
            </div>
            <div className="content">
                <div>
                  EMAIL:<input type="email" id="email" placeholder="me@example.org"/>
                </div>
                <div>
                  PASSWORD:<input type="password" id="password"/>
                </div>
                <div>
                    <span id="message"></span>
                </div>
            </div>
            <div>
              <div>
                <button onClick={this.RegisterUser.bind()}>Register me</button>
              </div>
              <div>
                <button onClick={this.change_state.bind(this,2)}>Login</button>
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
                <Login></Login>
            </div>
          :
            ''
        )
      }
            
      </div>
    );
  }
}

export default Register;