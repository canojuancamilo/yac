import React, { Component } from 'react';
import './App.css';
import Login from './components/Login-Component';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      estado:1
    }
    this.change_state=this.change_state.bind(this);
  }

  change_state(esta){
    this.setState({estado:esta});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CHAT SIMPLE</h1>
        </header>
        {
          (
            this.state.estado === 1
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

export default App;
