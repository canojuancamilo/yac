import React, { Component } from 'react';
import firebase from 'firebase';

class Contacts extends Component {
    constructor(props){
        super(props);
        this.state={
          estado:1,
          contacts:[],
          array:{},
          User:[],
          n_messages:1,
          html_message_para:[],
          html_message_de:[]
        }
        this.change_state=this.change_state.bind(this);
        this.mostrar_contactos=this.mostrar_contactos.bind(this);
        this.Message_to_contact=this.Message_to_contact.bind(this);
        this.mostrar_mensajes=this.mostrar_mensajes.bind(this);
        this.change_state=this.change_state.bind(this);
        this.enviar_mensaje=this.enviar_mensaje.bind(this);
    }
    
    change_state(esta){
        this.setState({estado:esta});
        return this.state.estado;
    }
    
    Message_to_contact(user){
        this.setState({User:user})
        this.mostrar_mensajes();
        document.getElementById("content-message").className = "content-message1";
        document.getElementById("content-me").className = "content-message1";
        return this.state.User;
    }

    mostrar_contactos(){
        var refirebase = firebase.database().ref('users');
        refirebase.on('value', (snapshot) => {
            var contacts=[];
            this.setState({array:snapshot.val()})
            for(var i=1;i<= Object.keys(this.state.array).length;i++) {
                if('user'+i===this.props.user){

                }else{
                    contacts.push(  
                        <div  key={'user'+i} className="contacts">
                            <div key={'l'+i} className="contact-name">
                                {this.state.array['user'+i].name}
                            </div>
                            <div key={i} className="contact-email">
                                {this.state.array['user'+i].email}
                            </div>
                            <div  key={'q'+i} className="contact-email">
                                <button onClick={this.Message_to_contact.bind(this,'user'+i)} className="btn-message">enviar mensaje</button>
                            </div>
                        </div>
                    );
                }
            }
            this.setState({contacts:contacts});
            return this.state.contacts;
        });
    }

    enviar_mensaje(){
        var for_user=this.state.User;
        var of_user=this.props.user;
        var momentoActual = new Date();
        var hora = momentoActual.getHours() 
        var minuto = momentoActual.getMinutes() 
        var segundo = momentoActual.getSeconds()
        var message=document.getElementById("message").value;
        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth()+1; //hoy es 0!
        var yyyy = hoy.getFullYear();
        
        if(message===""){

        }else{
            firebase.database().ref("messages").child(of_user).once('value', (snapshot) => {
                var datas = snapshot.val();
                var n =1;
                if(datas=== null){
                    n=1;
                }
                else{
                    n=Object.keys(datas).length+1;
                }
    
                firebase.database().ref('messages').child(of_user).child('message'+n).set({
                    message:message,
                    hora:hora,
                    minuto:minuto,
                    segundo:segundo,
                    dia:dd,
                    mes:mm,
                    ano:yyyy,
                    de:of_user,
                    para:for_user
                }); 
            });
    
            firebase.database().ref("messages").child(for_user).once('value', (snapshot) => {
                var datas = snapshot.val();
                var n =1;
                if(datas=== null){
                    n=1;
                }
                else{
                    n=Object.keys(datas).length+1;
                }
    
                firebase.database().ref('messages').child(for_user).child('message'+n).set({
                    message:message,
                    hora:hora,
                    minuto:minuto,
                    segundo:segundo,
                    dia:dd,
                    mes:mm,
                    ano:yyyy,
                    de:of_user,
                    para:for_user
                  }); 
            });
            document.getElementById("message").value="";
        }
    }

    mostrar_mensajes(){
        var for_user=this.state.User;
        var of_user=this.props.user;
       
        if(for_user.length===0){
            for_user="user1";
        }
        
        firebase.database().ref("messages").child(for_user).on('value', (snapshot) => {
            
            var datas=snapshot.val();
            var html_message=[];
            if(datas!= null){
                for(var i=1; i<=Object.keys(datas).length; i++){
                    if(datas["message"+i].de===for_user && datas["message"+i].para===of_user){
                        firebase.database().ref("users").child(for_user).once('value', (snap) => {
                            var dat=snap.val();
                            html_message.push(
                                <div key={i} className="con-messa">
                                    <div className="con-user">{dat.name}</div>
                                    <div className="con-message">{datas["message"+i].message}</div>
                                    <div className="con-fecha">{datas["message"+i].dia}/{datas["message"+i].mes}/{datas["message"+i].ano}</div>
                                    <div className="con-hora">{datas["message"+i].hora}:{datas["message"+i].minuto}:{datas["message"+i].segundo}</div>
                                </div>
                            )
                        })
                    }
                }
            }
            this.setState({html_message_de:html_message})
        })

        firebase.database().ref("messages").child(of_user).on('value', (snapshot) => {
            var datas=snapshot.val();
            var html_message=[];
            if(datas!= null){
                for(var i=1; i<=Object.keys(datas).length; i++){
                    if(datas["message"+i].de===of_user && datas["message"+i].para===for_user){
                        firebase.database().ref("users").child(of_user).once('value', (snap) => {
                            var dat=snap.val();
                            html_message.push(
                                <div key={i} className="con-messa">
                                    <div className="con-user">{dat.name}</div>
                                    <div className="con-message">{datas["message"+i].message}</div>
                                    <div className="con-fecha">{datas["message"+i].hora}:{datas["message"+i].minuto}:{datas["message"+i].segundo}</div>
                                    <div className="con-hora">{datas["message"+i].dia}/{datas["message"+i].mes}/{datas["message"+i].ano}</div>
                                
                                </div>
                            )
                        })
                    }
                }
            }
             this.setState({html_message_para:html_message})
        })
        
    }
    
    componentWillMount() {
        this.mostrar_contactos();
        this.mostrar_mensajes();
    }

  render() {
    return (
      <div className="">
        {
        (this.state.estado===1
          ?
            <div>
                <div className="content-contact">
                <div className="contacts">
                    CONTACTS
                </div>
                    {this.state.contacts}
                </div>
                <div className="content-message" id="content-message">
                <div className="messa">
                    <div className="con-messa">
                        MENSAJES ENVIADOS
                    </div>
                    <div>
                        {this.state.html_message_para}
                    </div>
                </div>
                <div className="messa">
                    <div className="con-messa">    
                        MENSAJES RECIBIDOS
                    </div>
                    <div>
                        {this.state.html_message_de}
                    </div>
                </div>     
                </div>
                <div className="content-message" id="content-me">
                        <input type="text" placeholder="Escribir mensaje" className="mess" id="message"></input><button className="btn-mess" onClick={this.enviar_mensaje.bind()}>enviar</button>
                    </div>  
            </div>
          :
            ''
        )
      }
      
      </div>
    );
  }
}

export default Contacts;

    

    
  