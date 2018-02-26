import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Loguin from './components/loguin-component';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tests chat simple</h1>
        </header>
        <p className="App-intro">
        <Loguin></Loguin>
        </p>
      </div>
    );
  }
}

export default App;
