import React from 'react';
import Navbar from './containers/Navbar';
import { useState } from 'react';
import './App.css';
import BasicTable from './containers/Table.tsx';
import Input from './containers/Cityselect.tsx';


function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <section className='table'>
      <BasicTable></BasicTable>
      </section>
      <section className='cityInput'>
        <Input></Input>
      </section>
    </div>
  );
}

export default App;
