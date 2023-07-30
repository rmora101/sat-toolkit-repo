import React from 'react';
import Navbar from './Navbar';
import { useState } from 'react';
import './App.css';


function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <div className='content'>
      </div>
    </div>
  );
}

export default App;
