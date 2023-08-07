import React from 'react';
import Navbar from './containers/Navbar.js';
import BasicTable from './containers/Table.tsx';
import Input from './containers/Stateselect.tsx';


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
