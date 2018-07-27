import React, { Component } from 'react';
// import { Router, Route, Link } from 'react-router'

import Home from './pages/home/Home'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App" style={{height: window.innerHeight}}>
        <Home />
      </div>
    );
  }
}

export default App;
