import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FileUpload from '../src/components/FileUpload';
import firebase from 'firebase';

class App extends Component {

  constructor(){
    super();


  }

  render() {
    return (
      <div className="App">
        <FileUpload />
      </div>
    );
  }
}

export default App;
