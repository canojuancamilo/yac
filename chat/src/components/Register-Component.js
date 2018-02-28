import React, { Component } from 'react';
import Login from './Login-Component';
import firebase from 'firebase';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      estado:1,
      mensaje:'',
      array:{}
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
    var name = document.getElementById("name").value;
    var n=0;

    if(email==="" || password==="" || name===""){
      document.getElementById("message").innerHTML="NINGUN CAMPO DEBE ESTAR VACIO";
    }
    else{
      document.getElementById("message").innerHTML="";
       
      var starCountRef = firebase.database().ref('users');
      starCountRef.once('value', (snapshot) => {
        var r=snapshot.val();
        this.setState({array:snapshot.val()})

        for(var i=1;i<= Object.keys(this.state.array).length;i++) {

          if(email == this.state.array['user'+i].email || name== this.state.array['user'+i].name){
            document.getElementById("message").innerHTML="El CORREO O EL NOMBRE INGRESADO YA EXISTEN";
          }

        }

        if(document.getElementById("message").innerHTML===""){

          firebase.database().ref("users").once('value', (snapshot) => {
            var datas = snapshot.val();
            n=Object.keys(datas).length+1;
            
            firebase.database().ref('users').child("user"+n).set({
              email:email,
              password:password,
              name:name
            });

          });

          document.getElementById("message").innerHTML="REGISTRADO CORRECTAMENTE";
        }
      })
    }
    document.getElementById("email").value="";
    document.getElementById("password").value="";
    document.getElementById("name").value="";
  }

  render() {
    return (
      <div className="">
        {
        (this.state.estado===1
          ?
            <div>
              <div className="header">
                  REGISTER ME TO CHAT
              </div>
              <div className="content">
                  <div>
                    EMAIL
                  </div>
                  <div>
                    <input type="email" id="email" placeholder="me@example.org"/>
                  </div>
                  <div>
                    NAME
                  </div>
                  <div>
                    <input type="text" id="name" placeholder="name"/>
                  </div>
                  <div>
                    PASSWORD
                  </div>
                  <div>
                    <input type="password" id="password"/>
                  </div>
              </div>
              <div  className="buttons-login">
                <div className="btn1">
                  <button onClick={this.change_state.bind(this,2)} className="btn1-login btn">Login</button>
                </div>
                <div className="btn2">
                  <button onClick={this.RegisterUser.bind()} className="btn2-login btn">Register me</button>
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