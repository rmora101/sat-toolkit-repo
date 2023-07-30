import React from 'react';
import Navbar from './containers/Navbar';
import { useState } from 'react';
import './App.css';
import BasicTable from './containers/Table.tsx';


function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <div className='content'>
      <BasicTable></BasicTable>
      </div>
    </div>
  );
}

export default App;
