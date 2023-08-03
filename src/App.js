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
      <section className='cityInput'>
        <Input></Input>
      </section>
      <section className='table'>
      <BasicTable></BasicTable>
      </section>

    </div>
  );
}

export default App;
