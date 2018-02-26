import React, { Component } from 'react';
import './css-components/loguin-component.css';

class Loguin extends Component {
  render() {
    return (
      <div className="content-loguin">
        <div className="header">
            LOGUIN CHAT
        </div>
        <div className="content">
            <input type="text"/>
        </div>
      </div>
    );
  }
}

export default Loguin;